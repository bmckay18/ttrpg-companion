import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { CampaignListService } from './campaign-list-service';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { NewCampaignForm } from './new-campaign-form/new-campaign-form';
import { ICampaign } from './campaign-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campaign',
  imports: [AsyncPipe, NewCampaignForm, DatePipe],
  templateUrl: './campaign.html',
  styleUrl: './campaign.css',
})
export class Campaign {
  campaignListService = inject(CampaignListService);
  router = inject(Router);
  campaigns$ = signal<Observable<ICampaign[]>>(this.campaignListService.getCampaignList(''));

  newCampaignModal = viewChild<ElementRef<HTMLDialogElement>>('modal');
  inputField = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  constructor() {
    this.searchCampaigns('');
  }

  createCampaign(campaignName: string) {
    this.campaignListService.createCampaign(campaignName).subscribe({
      next: () => {
        this.newCampaignModal()?.nativeElement.close();

        const currentSearch = this.inputField()!.nativeElement.value;

        this.searchCampaigns(currentSearch);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  searchCampaigns(searchTerm: string) {
    this.campaigns$.set(this.campaignListService.getCampaignList(searchTerm.trim().toLowerCase()));
  }

  resetSearch() {
    if (!this.inputField()) {
      return;
    }

    this.searchCampaigns('');

    this.inputField()!.nativeElement.value = '';
  }

  openCampaign(id: number) {
    this.router.navigate(['/app/campaigns', id]);
  }
}
