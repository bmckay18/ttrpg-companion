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

  getAllNpcsForCampaign(id: number): Observable<INpc[]> {
    return this.http.get<INpc[]>(`${environment.apiUrl}/campaigns/${id}/npcs`);
  }

  createNewNpc(npcData: INewNpcRequest, campaignId: number): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/campaigns/${campaignId}/npcs`, npcData);
  }

  updateNpcHp(hpChangedList: IHpChangeDto[], campaignId: number): Observable<void> {
    return this.http.patch<void>(
      `${environment.apiUrl}/campaigns/${campaignId}/npcs/health`,
      hpChangedList,
    );
  }

  deleteNpc(npcId: number, campaignId: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/campaigns/${campaignId}/npcs/${npcId}`);
  }
}
