import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopProcessFiltersComponent } from './stop-process-filters.component';

describe('StopProcessFiltersComponent', () => {
  let component: StopProcessFiltersComponent;
  let fixture: ComponentFixture<StopProcessFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StopProcessFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StopProcessFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
