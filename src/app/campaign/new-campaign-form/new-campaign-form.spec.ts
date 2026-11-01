import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCampaignForm } from './new-campaign-form';
import { NgForm } from '@angular/forms';
import { outputToObservable } from '@angular/core/rxjs-interop';

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

  describe('submitForm', () => {
    it('should output the title to the parent component', () => {
      component.title = 'Rise of Dread';

      const mockForm = { resetForm: vi.fn() } as unknown as NgForm;

      outputToObservable(component.campaignName).subscribe((value) => {
        expect(value).toBe('Rise of Dread');
      });

      component.submitForm(mockForm);

      expect(mockForm.resetForm).toHaveBeenCalled();
    });
  });
});
