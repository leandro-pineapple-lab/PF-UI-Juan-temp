import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongHospitalStaysPageComponent } from './long-hospital-stays-page.component';

describe('LongHospitalStaysPageComponent', () => {
  let component: LongHospitalStaysPageComponent;
  let fixture: ComponentFixture<LongHospitalStaysPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LongHospitalStaysPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LongHospitalStaysPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
