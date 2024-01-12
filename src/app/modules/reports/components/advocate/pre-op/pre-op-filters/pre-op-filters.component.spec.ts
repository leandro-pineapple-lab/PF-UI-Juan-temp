import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreOpFiltersComponent } from './pre-op-filters.component';

describe('PreOpFiltersComponent', () => {
  let component: PreOpFiltersComponent;
  let fixture: ComponentFixture<PreOpFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreOpFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreOpFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
