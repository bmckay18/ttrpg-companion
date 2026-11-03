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
});
