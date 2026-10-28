import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCampaignForm } from './new-campaign-form';

describe('NewCampaignForm', () => {
  let component: NewCampaignForm;
  let fixture: ComponentFixture<NewCampaignForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCampaignForm],
    }).compileComponents();

    fixture = TestBed.createComponent(NewCampaignForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
