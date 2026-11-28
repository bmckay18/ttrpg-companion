import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatTracker } from './combat-tracker';
import { CombatTrackerService } from './services/combat-tracker-service';
import { INewNpcFormDetails } from './new-npc-form/new-npc-form-details';
import { INpc } from './interfaces/npc';
import { INpcHpChange } from './interfaces/npc-hp-change';
import { IHpChangeDto } from './interfaces/hp-change-dto';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { firstValueFrom, of } from 'rxjs';
import { INewNpcRequest } from './services/new-npc-request';

describe('CombatTracker', () => {
  let component: CombatTracker;
  let fixture: ComponentFixture<CombatTracker>;
  let combatTrackerServiceMock: {
    getAllNpcsForCampaign: ReturnType<typeof vi.fn>;
    createNewNpc: ReturnType<typeof vi.fn>;
    updateNpcHp: ReturnType<typeof vi.fn>;
    deleteNpc: ReturnType<typeof vi.fn>;
  };

  let npcDataMock: INpc[];
  let modal: HTMLDialogElement | undefined;

  const campaignId = 123;

  beforeEach(async () => {
    npcDataMock = [
      {
        id: 1,
        name: 'James',
        currentHp: 5,
        maxHp: 20,
      },
    ];

    combatTrackerServiceMock = {
      getAllNpcsForCampaign: vi.fn().mockReturnValue(of(npcDataMock)),
      createNewNpc: vi.fn().mockReturnValue(of([])),
      updateNpcHp: vi.fn().mockReturnValue(of([])),
      deleteNpc: vi.fn().mockReturnValue(of([])),
    };

    await TestBed.configureTestingModule({
      imports: [CombatTracker],
      providers: [
        {
          provide: CombatTrackerService,
          useValue: combatTrackerServiceMock,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            parent: {
              snapshot: {
                paramMap: convertToParamMap({ id: campaignId })
              }
            }
          }
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CombatTracker);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call refreshData on initialisation', () => {
    const refreshDataSpy = vi.spyOn(component, 'refreshData');
    fixture.detectChanges();

    expect(refreshDataSpy).toHaveBeenCalled();
  });

  describe('createNewNpc', () => {
    beforeEach(() => {
      fixture.detectChanges();

      modal = component.newNpcDialog()?.nativeElement;

      if (modal) {
        modal.close = vi.fn();
      }
    });

    it('should call combat tracker service with valid npc object', () => {
      const mockNpcDetails: INewNpcFormDetails = {
        name: 'John',
        hp: '15',
      };

      const expectedNpcDetails: INewNpcRequest = {
        name: 'John',
        hp: 15
      };

      component.createNewNpc(mockNpcDetails);

      expect(combatTrackerServiceMock.createNewNpc).toHaveBeenCalledWith(expectedNpcDetails, campaignId);
    });

    it('should refresh the data after submission', () => {
      const refreshDataSpy = vi.spyOn(component, 'refreshData');

      const mockNpcDetails: INewNpcFormDetails = {
        name: 'John',
        hp: '15',
      };

      component.createNewNpc(mockNpcDetails);

      expect(refreshDataSpy).toHaveBeenCalled();
    });

    it('should close the dialog modal on submission', () => {
      const mockNpcDetails: INewNpcFormDetails = {
        name: 'John',
        hp: '15',
      };

      component.createNewNpc(mockNpcDetails);

      expect(modal?.close).toHaveBeenCalled();
    });
  });

  describe('refreshData', () => {
    it('should call the combat tracker service and assign result to npcData', async () => {
      const npcData: INpc[] = [
        {
          id: 1,
          name: 'James',
          currentHp: 5,
          maxHp: 20,
        },
        {
          id: 2,
          name: 'James',
          currentHp: 5,
          maxHp: 20,
        },
      ];

      combatTrackerServiceMock.getAllNpcsForCampaign = vi.fn().mockReturnValue(of(npcData));

      component.refreshData();

      expect(combatTrackerServiceMock.getAllNpcsForCampaign).toHaveBeenCalled();

      const result = await firstValueFrom(component.npcData$());

      expect(result.length).toBe(2);
    });
  });

  describe('updateTrackedHpList', () => {
    it('should create record for new valid data', () => {
      const payload: INpcHpChange = {
        id: 1,
        hpChangeAmount: 5,
      };

      component.updateTrackedHpList(payload);

      expect(component.pendingHpChanges[1]).toBe(5);
    });

    it('should update existing record with new data if valid', () => {
      const payload: INpcHpChange = {
        id: 1,
        hpChangeAmount: 5,
      };

      component.pendingHpChanges[1] = 10;

      component.updateTrackedHpList(payload);

      expect(component.pendingHpChanges[1]).toBe(5);
    });

    it('should delete record if valus is null', () => {
      const payload: INpcHpChange = {
        id: 1,
        hpChangeAmount: null,
      };

      component.pendingHpChanges[1] = 5;

      component.updateTrackedHpList(payload);

      expect('1' in component.pendingHpChanges).toBe(false);
    });
  });

  describe('submitHpChanges', () => {
    it('should call the combat tracker service with pending HP changes', () => {
      component.pendingHpChanges[1] = 5;

      const expectedPayload: IHpChangeDto[] = [
        {
          id: 1,
          hpAmountChanged: 5,
        },
      ];

      component.submitHpChanges();

      expect(combatTrackerServiceMock.updateNpcHp).toHaveBeenCalledWith(expectedPayload, campaignId);
    });

    it('should call resetFields and refreshData', () => {
      const refreshDataSpy = vi.spyOn(component, 'refreshData');
      const resetFieldsSpy = vi.spyOn(component, 'resetFields');

      component.submitHpChanges();

      expect(refreshDataSpy).toHaveBeenCalled();
      expect(resetFieldsSpy).toHaveBeenCalled();
    });
  });

  describe('resetFields', () => {
    it('should increment reset counter and clear pending HP changes', () => {
      component.pendingHpChanges[1] = 5;
      component.resetCounter = 1;

      component.resetFields();

      expect(component.resetCounter).toBe(2);
      expect('1' in component.pendingHpChanges).toBe(false);
    });
  });

  describe('deleteNpc', () => {
    it('should call combat tracker service with ID and call refreshData', () => {
      const refreshDataSpy = vi.spyOn(component, 'refreshData');

      component.deleteNpc(5);

      expect(combatTrackerServiceMock.deleteNpc).toHaveBeenCalledWith(5, campaignId);
      expect(refreshDataSpy).toHaveBeenCalled();
    });
  });
});
