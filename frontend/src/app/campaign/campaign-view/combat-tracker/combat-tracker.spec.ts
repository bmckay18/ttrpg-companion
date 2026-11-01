import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatTracker } from './combat-tracker';

describe('CombatTracker', () => {
  let component: CombatTracker;
  let fixture: ComponentFixture<CombatTracker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CombatTracker],
    }).compileComponents();

    fixture = TestBed.createComponent(CombatTracker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
