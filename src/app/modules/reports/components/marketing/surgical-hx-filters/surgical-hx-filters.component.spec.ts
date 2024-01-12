import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgicalHxFiltersComponent } from './surgical-hx-filters.component';

describe('SurgicalHxFiltersComponent', () => {
  let component: SurgicalHxFiltersComponent;
  let fixture: ComponentFixture<SurgicalHxFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurgicalHxFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurgicalHxFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
