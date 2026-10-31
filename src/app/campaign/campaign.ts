import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { CampaignListService } from './campaign-list-service';
import { debounceTime, distinctUntilChanged, Observable, of, startWith, Subject, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { NewCampaignForm } from './new-campaign-form/new-campaign-form';
import { ICampaign } from './campaign-interface';

@Component({
  selector: 'app-campaign',
  imports: [AsyncPipe, NewCampaignForm],
  templateUrl: './campaign.html',
  styleUrl: './campaign.css',
})
export class Campaign {
  campaignListService = inject(CampaignListService);
  campaigns: Observable<ICampaign[]> = of([]);

  newCampaignModal = viewChild<ElementRef<HTMLDialogElement>>('modal');

  constructor() {
    this.searchCampaigns('');
  }

  createCampaign(campaignName: string) {
    this.campaignListService.createCampaign(campaignName);

    this.newCampaignModal()?.nativeElement.close();
  }

  searchCampaigns(searchTerm: string) {
    this.campaigns = this.campaignListService.getCampaignList(searchTerm);
  }
}
