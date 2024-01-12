import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialConsultsFiltersComponent } from './initial-consults-filters.component';

describe('InitialConsultsFiltersComponent', () => {
  let component: InitialConsultsFiltersComponent;
  let fixture: ComponentFixture<InitialConsultsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialConsultsFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialConsultsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
