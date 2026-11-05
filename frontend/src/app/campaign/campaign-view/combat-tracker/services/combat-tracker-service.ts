import { Injectable } from '@angular/core';
import { INpc } from '../interfaces/npc';
import { IHpChangeDto } from '../interfaces/hp-change-dto';

@Injectable({
  providedIn: 'root',
})
export class CombatTrackerService {
  private mockNpcData: INpc[] = [
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
        id: 5,
        name: 'Jonathan The Barbarian',
        currentHp: 125,
        maxHp: 150
      },
      {
        id: 6,
        name: 'Jonathan The Barbarian',
        currentHp: 125,
        maxHp: 150
      },
      {
        id: 7,
        name: 'Jonathan The Barbarian',
        currentHp: 125,
        maxHp: 150
      },
      {
        id: 8,
        name: 'Jonathan The Barbarian',
        currentHp: 125,
        maxHp: 150
      },
    ];

    getAllNpcsForCampaign(): INpc[] {
      return this.mockNpcData;
    }

    createNewNpc(npcData: INpc) {
      this.mockNpcData.push(npcData);
    }

    updateNpcHp(hpChangedList: IHpChangeDto[]) {
      console.log(hpChangedList);
    }

    deleteNpc(id: number) {
      console.log(id);
    }
}
