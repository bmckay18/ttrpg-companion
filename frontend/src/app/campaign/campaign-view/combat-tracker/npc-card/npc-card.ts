import { Component, ElementRef, input, OnChanges, output, viewChild } from '@angular/core';
import { INpc } from '../interfaces/npc';
import { INpcHpChange } from '../interfaces/npc-hp-change';

@Component({
  selector: 'app-npc-card',
  imports: [],
  templateUrl: './npc-card.html',
  styleUrl: './npc-card.css',
})
export class NpcCard implements OnChanges {
  npcData = input.required<INpc>();
  resetTrigger = input(0);
  hpChanged = output<INpcHpChange>();
  isDeleted = output<number>();

  inputField = viewChild<ElementRef<HTMLInputElement>>('hpChangedField');

  updateHp(amount: string) {
    let parsedNumber: number | null = Number(amount);

    if (Number.isNaN(parsedNumber) || parsedNumber === 0) {
      parsedNumber = null;
    }

    this.hpChanged.emit({
      id: this.npcData().id,
      hpChangeAmount: parsedNumber,
    });
  }

  ngOnChanges() {
    if (this.inputField()) {
      this.inputField()!.nativeElement.value = '';
    }
  }
}
