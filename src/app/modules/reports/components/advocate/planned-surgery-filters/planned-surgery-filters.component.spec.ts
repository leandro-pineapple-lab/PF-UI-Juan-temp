import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannedSurgeryFiltersComponent } from './planned-surgery-filters.component';

describe('PlannedSurgeryFiltersComponent', () => {
  let component: PlannedSurgeryFiltersComponent;
  let fixture: ComponentFixture<PlannedSurgeryFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlannedSurgeryFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlannedSurgeryFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
