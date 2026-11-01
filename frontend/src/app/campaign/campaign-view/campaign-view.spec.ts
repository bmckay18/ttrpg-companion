import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignView } from './campaign-view';
import { provideRouter } from '@angular/router';

describe('CampaignView', () => {
  let component: CampaignView;
  let fixture: ComponentFixture<CampaignView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignView],
      providers: [
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CampaignView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
