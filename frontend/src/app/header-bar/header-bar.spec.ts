import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBar } from './header-bar';
import { HeaderBarDatasourceService } from './services/header-bar-datasource-service';
import { of } from 'rxjs';

describe('HeaderBar', () => {
  let component: HeaderBar;
  let fixture: ComponentFixture<HeaderBar>;
  let datasourceMock: {
    getDisplayName: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    datasourceMock = {
      getDisplayName: vi.fn().mockReturnValue(of('Frodo Baggins')),
    };

    await TestBed.configureTestingModule({
      imports: [HeaderBar],
      providers: [
        {
          provide: HeaderBarDatasourceService,
          useValue: datasourceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign the api result to displayName', () => {
    expect(datasourceMock.getDisplayName).toHaveBeenCalled();
    expect(fixture.componentInstance.displayName()).toBe('Frodo Baggins');
  });
});
