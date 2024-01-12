import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsByPayerFiltersComponent } from './leads-by-payer-filters.component';

describe('LeadsByPayerFiltersComponent', () => {
  let component: LeadsByPayerFiltersComponent;
  let fixture: ComponentFixture<LeadsByPayerFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadsByPayerFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadsByPayerFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
