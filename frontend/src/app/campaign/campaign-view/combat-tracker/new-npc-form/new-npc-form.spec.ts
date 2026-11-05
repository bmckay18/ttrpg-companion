import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNpcForm } from './new-npc-form';

describe('NewNpcForm', () => {
  let component: NewNpcForm;
  let fixture: ComponentFixture<NewNpcForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewNpcForm],
    }).compileComponents();

    fixture = TestBed.createComponent(NewNpcForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialise the form', () => {
    expect(component.npcForm).toBeDefined();
    expect(component.npcForm.valid).toBe(false);
  })

  describe('npcForm', () => {
    it('should require a valid name', () => {
      component.npcForm.controls.name.setValue('');

      expect(component.npcForm.controls.name.valid).toBe(false);
      expect(component.npcForm.controls.name.hasError('required')).toBe(true);
    });

    it('should require a valid hp value', () => {
      component.npcForm.controls.hp.setValue('');

      expect(component.npcForm.controls.hp.valid).toBe(false);
      expect(component.npcForm.controls.hp.hasError('required')).toBe(true);
    })

    it('should be valid for a valid submission', () => {
      component.npcForm.setValue({
        name: 'John',
        hp: '123'
      });

      expect(component.npcForm.valid).toBe(true);
    })

    it('should call onSubmit on submission', () => {
      const onSubmitSpy = vi.spyOn(component, 'onSubmit');

      const form = fixture.nativeElement.querySelector('form');
      form.dispatchEvent(new Event('submit'));

      expect(onSubmitSpy).toHaveBeenCalled();
    })
  })

  describe('onSubmit', () => {
    it('should not emit if form is invalid', () => {
      const npcDetailsSpy = vi.fn();

      component.npcDetails.subscribe(npcDetailsSpy);

      component.onSubmit();

      expect(component.npcForm.invalid).toBe(true);
      expect(npcDetailsSpy).not.toHaveBeenCalled();
    });

    it('should emit npc data if form is valid', () => {
      const expectedFormData = {
        name: 'John',
        hp: '123'
      }
      
      component.npcForm.setValue(expectedFormData);

      const npcDetailsSpy = vi.fn();

      component.npcDetails.subscribe(npcDetailsSpy);

      component.onSubmit();

      expect(npcDetailsSpy).toHaveBeenCalledWith(expectedFormData);
    });

    it('should reset the form on submission', () => {
      const expectedFormData = {
        name: 'John',
        hp: '123'
      }

      const formResetSpy = vi.spyOn(component.npcForm, 'reset');
      
      component.npcForm.setValue(expectedFormData);

      component.onSubmit();

      expect(formResetSpy).toHaveBeenCalled();
    })
  })
});
