import { Component } from '@angular/core';
import { NpcCard } from './npc-card/npc-card';

@Component({
  selector: 'app-combat-tracker',
  imports: [NpcCard],
  templateUrl: './combat-tracker.html',
  styleUrl: './combat-tracker.css',
})
export class CombatTracker {}
