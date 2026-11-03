import { Component } from '@angular/core';
import { NpcCard } from './npc-card/npc-card';
import { INpc } from './interfaces/npc';

@Component({
  selector: 'app-combat-tracker',
  imports: [NpcCard],
  templateUrl: './combat-tracker.html',
  styleUrl: './combat-tracker.css',
})
export class CombatTracker {
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
  ];
}
