import { Component, ElementRef, inject, OnInit, signal, viewChild } from '@angular/core';
import { NpcCard } from './npc-card/npc-card';
import { INpcHpChange } from './interfaces/npc-hp-change';
import { INpc } from './interfaces/npc';
import { NewNpcForm } from './new-npc-form/new-npc-form';
import { INewNpcFormDetails } from './new-npc-form/new-npc-form-details';
import { CombatTrackerService } from './services/combat-tracker-service';
import { IHpChangeDto } from './interfaces/hp-change-dto';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { INewNpcRequest } from './services/new-npc-request';

@Component({
  selector: 'app-combat-tracker',
  imports: [NpcCard, NewNpcForm, AsyncPipe],
  templateUrl: './combat-tracker.html',
  styleUrl: './combat-tracker.css',
})
export class CombatTracker implements OnInit {
  newNpcDialog = viewChild<ElementRef<HTMLDialogElement>>('modal');
  pendingHpChanges: Record<number, number> = {};
  resetCounter = 0;

  combatTrackerService = inject(CombatTrackerService);
  
  private route = inject(ActivatedRoute);
  campaignId = Number(
    this.route.parent?.snapshot.paramMap.get('id')
  );

  npcData$ = signal<Observable<INpc[]>>(this.combatTrackerService.getAllNpcsForCampaign(this.campaignId));

  ngOnInit() {
    this.refreshData();
  }

  createNewNpc(npcDetails: INewNpcFormDetails) {
    const npcRequest: INewNpcRequest = {
      name: npcDetails.name,
      hp: Number(npcDetails.hp)
    };

    this.combatTrackerService.createNewNpc(npcRequest, this.campaignId).subscribe({
      next: () => {
        this.refreshData();

        this.newNpcDialog()?.nativeElement.close();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  refreshData() {
    this.npcData$.set(this.combatTrackerService.getAllNpcsForCampaign(this.campaignId));
  }

  updateTrackedHpList(payload: INpcHpChange) {
    if (payload.hpChangeAmount === null) {
      delete this.pendingHpChanges[payload.id];
    } else {
      this.pendingHpChanges[payload.id] = payload.hpChangeAmount;
    }

    console.log(this.pendingHpChanges);
  }

  submitHpChanges() {
    const payload = Object.entries(this.pendingHpChanges).map(
      ([key, value]) =>
        ({
          id: Number(key),
          hpAmountChanged: value,
        }) as IHpChangeDto,
    );

    this.combatTrackerService.updateNpcHp(payload, this.campaignId).subscribe({
      next: () => {
        this.resetFields();
        this.refreshData();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  resetFields() {
    this.resetCounter++;
    this.pendingHpChanges = {};
  }

  deleteNpc(id: number) {
    this.combatTrackerService.deleteNpc(id, this.campaignId).subscribe({
      next: () => {
        this.refreshData();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
