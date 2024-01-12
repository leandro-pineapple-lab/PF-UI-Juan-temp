import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentSummaryFiltersComponent } from './appointment-summary-filters.component';

describe('AppointmentSummaryFiltersComponent', () => {
  let component: AppointmentSummaryFiltersComponent;
  let fixture: ComponentFixture<AppointmentSummaryFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentSummaryFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentSummaryFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
