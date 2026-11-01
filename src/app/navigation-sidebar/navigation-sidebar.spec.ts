import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationSidebar } from './navigation-sidebar';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { Component } from '@angular/core';

@Component({
  template: '<h1>Campaigns</h1>',
})
class MockCampaigns {}

describe('NavigationSidebar', () => {
  let component: NavigationSidebar;
  let fixture: ComponentFixture<NavigationSidebar>;
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationSidebar],
      providers: [provideRouter([{ path: 'campaigns', component: MockCampaigns }])],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationSidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();

    harness = await RouterTestingHarness.create();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display campaigns for campaigns route', async () => {
    await harness.navigateByUrl('/campaigns');

    expect(harness.routeNativeElement?.textContent).toContain('Campaigns');
  });
});
