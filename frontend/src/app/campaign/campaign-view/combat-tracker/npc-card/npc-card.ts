import { Component, input } from '@angular/core';
import { INpc } from '../interfaces/npc';

@Component({
  selector: 'app-npc-card',
  imports: [],
  templateUrl: './npc-card.html',
  styleUrl: './npc-card.css',
})
export class NpcCard {
  npcData = input.required<INpc>();
}
