import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgicalSummaryFiltersComponent } from './surgical-summary-filters.component';

describe('SurgicalSummaryFiltersComponent', () => {
  let component: SurgicalSummaryFiltersComponent;
  let fixture: ComponentFixture<SurgicalSummaryFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurgicalSummaryFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurgicalSummaryFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
