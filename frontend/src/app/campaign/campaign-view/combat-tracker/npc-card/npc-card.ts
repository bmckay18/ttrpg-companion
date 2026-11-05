import { Component, input, output } from '@angular/core';
import { INpc } from '../interfaces/npc';
import { INpcHpChange } from '../interfaces/npc-hp-change';

@Component({
  selector: 'app-npc-card',
  imports: [],
  templateUrl: './npc-card.html',
  styleUrl: './npc-card.css',
})
export class NpcCard {
  npcData = input.required<INpc>();
  hpChanged = output<INpcHpChange>();

  updateHp(amount: string) {
    let parsedNumber: number | null = Number(amount);

    if (Number.isNaN(parsedNumber) || parsedNumber === 0) {
      parsedNumber = null;
    }
    
    this.hpChanged.emit({
      id: this.npcData().id,
      hpChangeAmount: parsedNumber
    });
  }
}


