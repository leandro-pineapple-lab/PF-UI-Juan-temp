import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplicationFiltersComponent } from './complication-filters.component';

describe('ComplicationFiltersComponent', () => {
  let component: ComplicationFiltersComponent;
  let fixture: ComponentFixture<ComplicationFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplicationFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplicationFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
