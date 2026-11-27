import { inject, Injectable } from '@angular/core';
import { INpc } from '../interfaces/npc';
import { IHpChangeDto } from '../interfaces/hp-change-dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { INewNpcRequest } from './new-npc-request';

@Injectable({
  providedIn: 'root',
})
export class CombatTrackerService {
  private http = inject(HttpClient);
  private mockNpcData: INpc[] = [
    {
      id: 1,
      name: 'Jonathan The Barbarian',
      currentHp: 125,
      maxHp: 150,
    },
    {
      id: 2,
      name: 'Jonathan The Barbarian',
      currentHp: 125,
      maxHp: 150,
    },
    {
      id: 3,
      name: 'Jonathan The Barbarian',
      currentHp: 125,
      maxHp: 150,
    },
    {
      id: 4,
      name: 'Jonathan The Barbarian',
      currentHp: 125,
      maxHp: 150,
    },
    {
      id: 5,
      name: 'Jonathan The Barbarian',
      currentHp: 125,
      maxHp: 150,
    },
    {
      id: 6,
      name: 'Jonathan The Barbarian',
      currentHp: 125,
      maxHp: 150,
    },
    {
      id: 7,
      name: 'Jonathan The Barbarian',
      currentHp: 125,
      maxHp: 150,
    },
    {
      id: 8,
      name: 'Jonathan The Barbarian',
      currentHp: 125,
      maxHp: 150,
    },
  ];

  getAllNpcsForCampaign(id: number): Observable<INpc[]> {
    return this.http.get<INpc[]>(`${environment.apiUrl}/campaigns/${id}/npcs`);
  }

  createNewNpc(npcData: INewNpcRequest, campaignId: number): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/campaigns/${campaignId}/npcs`, npcData);
  }

  updateNpcHp(hpChangedList: IHpChangeDto[], campaignId: number): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/campaigns/${campaignId}/npcs/update`, hpChangedList);
  }

  deleteNpc(id: number) {
    console.log(id);
  }
}
