import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDataAccessFiltersComponent } from './patient-data-access-filters.component';

describe('PatientDataAccessFiltersComponent', () => {
  let component: PatientDataAccessFiltersComponent;
  let fixture: ComponentFixture<PatientDataAccessFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientDataAccessFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientDataAccessFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
