import { Injectable } from '@angular/core';
import { ICampaign } from './campaign-interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CampaignListService {
  private mockCampaignData: ICampaign[] = [
      {
        title: 'Campaign 1',
        id: 1,
        creationDate: '13/01/2000',
        lastModifiedDate: '28/10/2025'
      },
      {
        title: 'The Falls of Dunleigh',
        id: 2,
        creationDate: '1/09/2018',
        lastModifiedDate: '16/05/2026'
      },
      {
        title: 'The Rise of The Dread Lord',
        id: 3,
        creationDate: '28/12/2025',
        lastModifiedDate: '16/05/2026'
      },
      {
        title: 'Skywalker: A New Hope',
        id: 4,
        creationDate: '28/12/2025',
        lastModifiedDate: '16/05/2026'
      }
    ]

    getCampaignList(searchTerm: string): Observable<ICampaign[]> {
      if (searchTerm.trim() === '') {
        return of(this.mockCampaignData);
      }

      const filteredData = this.mockCampaignData.filter(campaign =>
        campaign.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return of(filteredData);
    }
}
