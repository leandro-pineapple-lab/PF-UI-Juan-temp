import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearanceVisitsFiltersComponent } from './clearance-visits-filters.component';

describe('ClearanceVisitsFiltersComponent', () => {
  let component: ClearanceVisitsFiltersComponent;
  let fixture: ComponentFixture<ClearanceVisitsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClearanceVisitsFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearanceVisitsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
