import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerPatientsPageComponent } from './employer-patients-page.component';

describe('EmployerPatientsPageComponent', () => {
  let component: EmployerPatientsPageComponent;
  let fixture: ComponentFixture<EmployerPatientsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerPatientsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerPatientsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
