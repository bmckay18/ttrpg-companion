import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { NpcCard } from './npc-card/npc-card';
import { INpcHpChange } from './interfaces/npc-hp-change';
import { INpc } from './interfaces/npc';
import { NewNpcForm } from './new-npc-form/new-npc-form';
import { INewNpcFormDetails } from './new-npc-form/new-npc-form-details';
import { CombatTrackerService } from './services/combat-tracker-service';
import { IHpChangeDto } from './hp-change-dto';

@Component({
  selector: 'app-combat-tracker',
  imports: [NpcCard, NewNpcForm],
  templateUrl: './combat-tracker.html',
  styleUrl: './combat-tracker.css',
})
export class CombatTracker {
  newNpcDialog = viewChild<ElementRef<HTMLDialogElement>>('modal');
  pendingHpChanges: Record<number, number> = {}
  resetCounter = 0;

  combatTrackerService = inject(CombatTrackerService);

  npcData: INpc[] = []

  ngOnInit() {
    this.refreshData();
  }

  createNewNpc(npcDetails:INewNpcFormDetails) {
    const npc: INpc = {
      name: npcDetails.name,
      maxHp: Number(npcDetails.hp),
      currentHp: Number(npcDetails.hp),
      id: this.npcData.length + 1
    }

    this.combatTrackerService.createNewNpc(npc);
    this.refreshData();

    this.newNpcDialog()?.nativeElement.close();
  }

  refreshData() {
    this.npcData = this.combatTrackerService.getAllNpcsForCampaign();
  }

  updateTrackedHpList(payload: INpcHpChange) {
    if (payload.hpChangeAmount === null) {
      delete this.pendingHpChanges[payload.id];
    }
    else {
      this.pendingHpChanges[payload.id] = payload.hpChangeAmount;
    }

    console.log(this.pendingHpChanges);
  }

  submitHpChanges() {
    const payload = Object.entries(this.pendingHpChanges)
    .map(([key, value]) => ({
      id: Number(key),
      hpAmountChanged: value
    } as IHpChangeDto))

    this.combatTrackerService.updateNpcHp(payload);
    this.resetFields();
    this.refreshData();
  }

  resetFields() {
    this.resetCounter++;
    this.pendingHpChanges = {};
  }

  deleteNpc(id: number) {
    this.combatTrackerService.deleteNpc(id);
    this.refreshData();
  }
}
