import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { CampaignListService } from './campaign-list-service';
import { debounceTime, distinctUntilChanged, startWith, Subject, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { NewCampaignForm } from './new-campaign-form/new-campaign-form';

@Component({
  selector: 'app-campaign',
  imports: [AsyncPipe, NewCampaignForm],
  templateUrl: './campaign.html',
  styleUrl: './campaign.css',
})
export class Campaign {
  private searchTerms = new Subject<string>();
  campaignListService = inject(CampaignListService);

  newCampaignModal = viewChild<ElementRef<HTMLDialogElement>>('modal');

  campaigns$ = this.searchTerms.pipe(
    startWith(''),
    debounceTime(500),
    distinctUntilChanged(),
    switchMap((searchTerm) => this.campaignListService.getCampaignList(searchTerm)),
  );

  filterCampaigns(searchTerm: string) {
    this.searchTerms.next(searchTerm);
  }

  createCampaign(campaignName: string) {
    this.campaignListService.createCampaign(campaignName);

    this.searchTerms.next('');

    this.newCampaignModal()?.nativeElement.close();
  }
}
