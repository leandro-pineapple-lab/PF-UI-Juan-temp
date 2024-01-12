import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplicationStatsFiltersComponent } from './complication-stats-filters.component';

describe('ComplicationStatsFiltersComponent', () => {
  let component: ComplicationStatsFiltersComponent;
  let fixture: ComponentFixture<ComplicationStatsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplicationStatsFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplicationStatsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
