import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandoutStatusFiltersComponent } from './handout-status-filters.component';

describe('HandoutStatusFiltersComponent', () => {
  let component: HandoutStatusFiltersComponent;
  let fixture: ComponentFixture<HandoutStatusFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandoutStatusFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandoutStatusFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
