import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountByStatusFiltersComponent } from './count-by-status-filters.component';

describe('CountByStatusFiltersComponent', () => {
  let component: CountByStatusFiltersComponent;
  let fixture: ComponentFixture<CountByStatusFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountByStatusFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountByStatusFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
