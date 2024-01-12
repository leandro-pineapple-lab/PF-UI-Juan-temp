import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDataAccessPageComponent } from './patient-data-access-page.component';

describe('PatientDataAccessPageComponent', () => {
  let component: PatientDataAccessPageComponent;
  let fixture: ComponentFixture<PatientDataAccessPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientDataAccessPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientDataAccessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
