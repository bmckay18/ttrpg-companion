import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpcCard } from './npc-card';

describe('NpcCard', () => {
  let component: NpcCard;
  let fixture: ComponentFixture<NpcCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NpcCard],
    }).compileComponents();

    fixture = TestBed.createComponent(NpcCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
