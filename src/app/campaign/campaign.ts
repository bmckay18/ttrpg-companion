import { Component, inject } from '@angular/core';
import { CampaignListService } from './campaign-list-service';
import { debounceTime, distinctUntilChanged, startWith, Subject, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-campaign',
  imports: [AsyncPipe],
  templateUrl: './campaign.html',
  styleUrl: './campaign.css',
})
export class Campaign {
  private searchTerms = new Subject<string>();
  campaignListService = inject(CampaignListService);

  campaigns$ = this.searchTerms.pipe(
    startWith(''),
    debounceTime(500),
    distinctUntilChanged(),
    switchMap(searchTerm => this.campaignListService.getCampaignList(searchTerm))
  );

  filterCampaigns(searchTerm: string) {    
    this.searchTerms.next(searchTerm);
  }
}
