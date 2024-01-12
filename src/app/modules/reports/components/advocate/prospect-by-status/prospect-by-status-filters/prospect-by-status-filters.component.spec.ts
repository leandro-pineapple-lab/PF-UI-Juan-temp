import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectByStatusFiltersComponent } from './prospect-by-status-filters.component';

describe('ProspectByStatusFiltersComponent', () => {
  let component: ProspectByStatusFiltersComponent;
  let fixture: ComponentFixture<ProspectByStatusFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProspectByStatusFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspectByStatusFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
