import { Component } from '@angular/core';
import { ICampaign } from './campaign-interface';

@Component({
  selector: 'app-campaign',
  imports: [],
  templateUrl: './campaign.html',
  styleUrl: './campaign.css',
})
export class Campaign {
  cardData: ICampaign[] = [
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
    }
  ]

  filterCampaigns(content: string) {
    console.log(content);
  }
}
