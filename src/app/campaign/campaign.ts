import { Component, inject } from '@angular/core';
import { ICampaign } from './campaign-interface';
import { CampaignListService } from './campaign-list-service';

@Component({
  selector: 'app-campaign',
  imports: [],
  templateUrl: './campaign.html',
  styleUrl: './campaign.css',
})
export class Campaign {
  campaignData: ICampaign[] = [];
  campaignListService = inject(CampaignListService);

  constructor() {
    this.filterCampaigns('');   
  }

  filterCampaigns(searchTerm: string) {    
    this.campaignListService.getCampaignList(searchTerm).subscribe(campaignData => {
      this.campaignData = campaignData;
    });
  }
}
