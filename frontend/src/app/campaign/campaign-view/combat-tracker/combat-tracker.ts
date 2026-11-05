import { Component, ElementRef, viewChild } from '@angular/core';
import { NpcCard } from './npc-card/npc-card';
import { INpcHpChange } from './npc-card/npc-hp-change';
import { INpc } from './interfaces/npc';
import { NewNpcForm } from './new-npc-form/new-npc-form';
import { INewNpcFormDetails } from './new-npc-form/new-npc-form-details';

@Component({
  selector: 'app-combat-tracker',
  imports: [NpcCard, NewNpcForm],
  templateUrl: './combat-tracker.html',
  styleUrl: './combat-tracker.css',
})
export class CombatTracker {
  newNpcDialog = viewChild<ElementRef<HTMLDialogElement>>('modal');
  pendingHpChanges: Record<number, number | null> = {};

  mockNpcData: INpc[] = [
    {
      id: 1,
      name: 'Jonathan The Barbarian',
      currentHp: 125,
      maxHp: 150
    },
    {
      id: 2,
      name: 'Jonathan The Barbarian',
      currentHp: 125,
      maxHp: 150
    },
    {
      id: 3,
      name: 'Jonathan The Barbarian',
      currentHp: 125,
      maxHp: 150
    },
    {
      id: 4,
      name: 'Jonathan The Barbarian',
      currentHp: 125,
      maxHp: 150
    },
    {
      id: 1,
      name: 'Jonathan The Barbarian',
      currentHp: 125,
      maxHp: 150
    },
    {
      id: 2,
      name: 'Jonathan The Barbarian',
      currentHp: 125,
      maxHp: 150
    },
    {
      id: 3,
      name: 'Jonathan The Barbarian',
      currentHp: 125,
      maxHp: 150
    },
    {
      id: 4,
      name: 'Jonathan The Barbarian',
      currentHp: 125,
      maxHp: 150
    },
  ];

  createNewNpc(npcDetails:INewNpcFormDetails) {
    const npc: INpc = {
      name: npcDetails.name,
      maxHp: Number(npcDetails.hp),
      currentHp: Number(npcDetails.hp),
      id: this.mockNpcData.length + 1
    }

    this.mockNpcData.push(npc);

    this.newNpcDialog()?.nativeElement.close();
  }

  updateHpChangeList(payload: INpcHpChange) {
    this.pendingHpChanges[payload.id] = payload.hpChangeAmount;

    console.log(this.pendingHpChanges);
  }
}
