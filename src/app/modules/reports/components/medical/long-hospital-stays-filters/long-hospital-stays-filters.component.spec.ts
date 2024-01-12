import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongHospitalStaysFiltersComponent } from './long-hospital-stays-filters.component';

describe('LongHospitalStaysFiltersComponent', () => {
  let component: LongHospitalStaysFiltersComponent;
  let fixture: ComponentFixture<LongHospitalStaysFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LongHospitalStaysFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LongHospitalStaysFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
