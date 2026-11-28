import { TestBed } from '@angular/core/testing';

import { CampaignListService } from './campaign-list-service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ICampaign } from './campaign-interface';
import { environment } from '../../environments/environment';

describe('CampaignListService', () => {
  let service: CampaignListService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(CampaignListService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCampaignList', () => {
    it('should call the API', () => {
      const mockCampaigns: ICampaign[] = [
        {
          name: 'Campaign 1',
          id: 1,
          creationDate: '2026-01-01',
          modifiedDate: '2026-01-01'
        }
      ];

      service.getCampaignList('').subscribe(result => {
        expect(result).toEqual(mockCampaigns);
      });

      const request = httpMock.expectOne(`${environment.apiUrl}/campaigns?searchTerm=`);

      expect(request.request.method).toBe('GET');

      request.flush(mockCampaigns);
    });

    it('should call the API with the provided searchTerm', () => {
      const searchTerm = 'lich';

      service.getCampaignList(searchTerm).subscribe();

      const request = httpMock.expectOne(req => 
        req.url === `${environment.apiUrl}/campaigns` && req.params.get('searchTerm') === searchTerm);

      request.flush([]);
    });
  });

  describe('createCampaign', () => {
    it('should call the API with a valid payload', () => {
      const title = 'The Lich';

      const payload = {
        name: title
      };

      service.createCampaign(title).subscribe();

      const request = httpMock.expectOne(`${environment.apiUrl}/campaigns/create`);

      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual(payload);

      request.flush([]);
    });

    it('should throw an error when the title length is less than 5', () => {
      expect(() => service.createCampaign('the')).toThrow();
    });
  });
});
