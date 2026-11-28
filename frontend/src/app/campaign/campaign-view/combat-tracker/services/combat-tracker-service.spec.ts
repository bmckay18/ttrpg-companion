import { TestBed } from '@angular/core/testing';

import { CombatTrackerService } from './combat-tracker-service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../../../environments/environment';
import { INewNpcRequest } from './new-npc-request';
import { INpc } from '../interfaces/npc';
import { IHpChangeDto } from '../interfaces/hp-change-dto';

describe('CombatTrackerService', () => {
  let service: CombatTrackerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CombatTrackerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllNpcsForCampaign', () => {
    it('should call the API with the campaign ID', () => {
      const mockNpcs: INpc[] = [
        {
          name: 'The Lich',
          id: 1,
          currentHp: 15,
          maxHp: 20,
        },
      ];

      const campaignId = 5;

      service.getAllNpcsForCampaign(campaignId).subscribe((response) => {
        expect(response).toEqual(mockNpcs);
      });

      const request = httpMock.expectOne(`${environment.apiUrl}/campaigns/${campaignId}/npcs`);

      expect(request.request.method).toBe('GET');

      request.flush(mockNpcs);
    });
  });

  describe('createNewNpcs', () => {
    it('should call the API with a valid NPC payload', () => {
      const payload: INewNpcRequest = {
        name: 'The Lich',
        hp: 150,
      };

      const campaignId = 5;

      service.createNewNpc(payload, 5).subscribe();

      const request = httpMock.expectOne(`${environment.apiUrl}/campaigns/${campaignId}/npcs`);

      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual(payload);

      request.flush([]);
    });
  });

  describe('updateNpcHp', () => {
    it('should call the API with a valid payload', () => {
      const payload: IHpChangeDto[] = [
        {
          id: 1,
          hpAmountChanged: -150,
        },
      ];

      const campaignId = 3;

      service.updateNpcHp(payload, campaignId).subscribe();

      const request = httpMock.expectOne(
        `${environment.apiUrl}/campaigns/${campaignId}/npcs/health`,
      );

      expect(request.request.method).toBe('PATCH');
      expect(request.request.body).toEqual(payload);

      request.flush([]);
    });
  });

  describe('deleteNpc', () => {
    it('should call the API with a valid NPC route parameter', () => {
      const campaignId = 3;
      const npcId = 15;

      service.deleteNpc(npcId, campaignId).subscribe();

      const request = httpMock.expectOne(
        `${environment.apiUrl}/campaigns/${campaignId}/npcs/${npcId}`,
      );

      expect(request.request.method).toBe('DELETE');

      request.flush([]);
    });
  });
});
