import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyIntakeFiltersComponent } from './daily-intake-filters.component';

describe('DailyIntakeFiltersComponent', () => {
  let component: DailyIntakeFiltersComponent;
  let fixture: ComponentFixture<DailyIntakeFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyIntakeFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyIntakeFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
