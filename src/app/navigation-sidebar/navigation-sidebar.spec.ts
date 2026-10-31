import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationSidebar } from './navigation-sidebar';
import { provideRouter } from '@angular/router';

describe('NavigationSidebar', () => {
  let component: NavigationSidebar;
  let fixture: ComponentFixture<NavigationSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationSidebar],
      providers: [
        provideRouter([]),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationSidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
