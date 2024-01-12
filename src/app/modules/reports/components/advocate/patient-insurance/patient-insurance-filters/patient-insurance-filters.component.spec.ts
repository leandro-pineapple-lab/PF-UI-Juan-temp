import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientInsuranceFiltersComponent } from './patient-insurance-filters.component';

describe('PatientInsuranceFiltersComponent', () => {
  let component: PatientInsuranceFiltersComponent;
  let fixture: ComponentFixture<PatientInsuranceFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientInsuranceFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientInsuranceFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
