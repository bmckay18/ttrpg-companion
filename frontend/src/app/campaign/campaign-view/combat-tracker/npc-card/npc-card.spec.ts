import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpcCard } from './npc-card';
import { INpc } from '../interfaces/npc';
import { INpcHpChange } from '../interfaces/npc-hp-change';

describe('NpcCard', () => {
  let component: NpcCard;
  let fixture: ComponentFixture<NpcCard>;

  let mockNpc: INpc = {
    id: 1,
    name: 'James',
    currentHp: 5,
    maxHp: 10
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NpcCard],
    }).compileComponents();

    fixture = TestBed.createComponent(NpcCard);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('npcData', mockNpc);
    fixture.detectChanges();

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('updateHp', () => {
    it('should emit hp changed object for valid value', () => {
      const emitSpy = vi.fn();

      const expectedResult: INpcHpChange = {
        id: 1,
        hpChangeAmount: 15
      };

      component.hpChanged.subscribe(emitSpy);

      component.updateHp('15');

      expect(emitSpy).toHaveBeenCalledWith(expectedResult);
    });

    it('should set hp changed amount to null for invalid input', () => {
      const emitSpy = vi.fn();

      const expectedResult: INpcHpChange = {
        id: 1,
        hpChangeAmount: null
      };

      component.hpChanged.subscribe(emitSpy);

      component.updateHp('abc');

      expect(emitSpy).toHaveBeenCalledWith(expectedResult);
    });

    it('should set hp changed amount to null for string 0 input', () => {
      const emitSpy = vi.fn();

      const expectedResult: INpcHpChange = {
        id: 1,
        hpChangeAmount: null
      };

      component.hpChanged.subscribe(emitSpy);

      component.updateHp('0');

      expect(emitSpy).toHaveBeenCalledWith(expectedResult);
    });
  });

  describe('ngOnChanges', () => {
    it('should clear input field on reset trigger', () => {
      const input = fixture.nativeElement.querySelector('input');

      input.value = '50';

      fixture.componentRef.setInput('resetTrigger', 1);
      fixture.detectChanges();

      expect(input.value).toBe('');
    })
  })
});
