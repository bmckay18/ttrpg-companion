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

  private mockCampaignData: ICampaign[] = [
    {
      name: 'Campaign 1',
      id: 1,
      creationDate: '13/01/2000',
      modifiedDate: '28/10/2025',
    },
    {
      name: 'The Falls of Dunleigh',
      id: 2,
      creationDate: '1/09/2018',
      modifiedDate: '16/05/2026',
    },
    {
      name: 'The Rise of The Dread Lord',
      id: 3,
      creationDate: '28/12/2025',
      modifiedDate: '16/05/2026',
    },
    {
      name: 'Skywalker: A New Hope',
      id: 4,
      creationDate: '28/12/2025',
      modifiedDate: '16/05/2026',
    },
  ];

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
