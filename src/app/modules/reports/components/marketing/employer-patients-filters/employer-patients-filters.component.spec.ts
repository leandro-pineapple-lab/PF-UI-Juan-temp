import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerPatientsFiltersComponent } from './employer-patients-filters.component';

describe('EmployerPatientsFiltersComponent', () => {
  let component: EmployerPatientsFiltersComponent;
  let fixture: ComponentFixture<EmployerPatientsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerPatientsFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerPatientsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
