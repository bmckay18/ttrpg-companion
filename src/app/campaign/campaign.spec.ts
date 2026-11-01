import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Campaign } from './campaign';
import { of } from 'rxjs';
import { CampaignListService } from './campaign-list-service';

describe('Campaign', () => {
  let component: Campaign;
  let fixture: ComponentFixture<Campaign>;
  const mockCampaignListService = {
    getCampaignList: vi.fn().mockReturnValue(of([])),
    createCampaign: vi.fn()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Campaign],
      providers: [
        { provide: CampaignListService, useValue: mockCampaignListService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Campaign);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCampaignList on load', () => {
    expect(mockCampaignListService.getCampaignList).toHaveBeenCalled();
  });

  describe('searchCampaign', () => {
    it('should call service with search term', () => {
      component.searchCampaigns('dunleigh');

      expect(mockCampaignListService.getCampaignList).toHaveBeenCalledWith('dunleigh');
    });
  });

  describe('createCampaign', () => {
    it('should call service with campaign name', () => {
      fixture.detectChanges();

      const modal = component.newCampaignModal()?.nativeElement;

      if (modal) {
        modal.close = vi.fn();
      }

      component.createCampaign('valor');

      expect(mockCampaignListService.createCampaign).toHaveBeenCalledWith('valor');
    });
  })

  describe('resetSearch', () => {
    it('should clear the search input and return all campaigns', () => {
      fixture.detectChanges();

      const input = component.inputField()?.nativeElement;

      if (input) {
        input.value = 'mock input';
      }

      component.resetSearch();

      expect(mockCampaignListService.getCampaignList).toHaveBeenCalledWith('');

      expect(input?.value).toBe('');
    });
  });
});
