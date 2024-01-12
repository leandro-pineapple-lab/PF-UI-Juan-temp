import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeworkStatusFiltersComponent } from './homework-status-filters.component';

describe('HomeworkStatusFiltersComponent', () => {
  let component: HomeworkStatusFiltersComponent;
  let fixture: ComponentFixture<HomeworkStatusFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeworkStatusFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeworkStatusFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
