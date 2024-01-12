import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedHomeworkFiltersComponent } from './completed-homework-filters.component';

describe('CompletedHomeworkFiltersComponent', () => {
  let component: CompletedHomeworkFiltersComponent;
  let fixture: ComponentFixture<CompletedHomeworkFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedHomeworkFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedHomeworkFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
