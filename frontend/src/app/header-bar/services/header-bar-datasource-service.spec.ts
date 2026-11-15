import { TestBed } from '@angular/core/testing';

import { HeaderBarDatasourceService } from './header-bar-datasource-service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('HeaderBarDatasourceService', () => {
  let service: HeaderBarDatasourceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(HeaderBarDatasourceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve the display name', () => {
    const expectedName = 'Frodo Baggins';

    service.getDisplayName().subscribe(name => {
      expect(name).toBe(expectedName);
    });

    const request = httpMock.expectOne(
      `https://localhost:7202/api/user/display-name`
    );

    expect(request.request.method).toBe('GET');

    request.flush(expectedName);
  })
});
