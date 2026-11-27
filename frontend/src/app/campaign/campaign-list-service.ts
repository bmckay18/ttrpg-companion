import { inject, Injectable } from '@angular/core';
import { ICampaign } from './campaign-interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CampaignListService {
  private http = inject(HttpClient);

  getCampaignList(searchTerm: string): Observable<ICampaign[]> {
    return this.http.get<ICampaign[]>(`${environment.apiUrl}/campaigns`, {
      params: {
        searchTerm: searchTerm ?? ''
      }
    });
  }

  createCampaign(title: string): Observable<void> {
    if (title.length < 5 || title == null) {
      throw new Error('The title must be greater than 5 characters');
    }

    const payload = {
      name: title
    };

    return this.http.post<void>(`${environment.apiUrl}/campaigns/create`, payload);
  }
}
