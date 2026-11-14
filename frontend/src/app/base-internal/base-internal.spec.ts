import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseInternal } from './base-internal';

describe('BaseInternal', () => {
  let component: BaseInternal;
  let fixture: ComponentFixture<BaseInternal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseInternal],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseInternal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
