import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsSummaryPageComponent } from './appointments-summary-page.component';

describe('AppointmentsSummaryPageComponent', () => {
  let component: AppointmentsSummaryPageComponent;
  let fixture: ComponentFixture<AppointmentsSummaryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentsSummaryPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentsSummaryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
