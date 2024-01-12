import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowEfficiencyFiltersComponent } from './workflow-efficiency-filters.component';

describe('WorkflowEfficiencyFiltersComponent', () => {
  let component: WorkflowEfficiencyFiltersComponent;
  let fixture: ComponentFixture<WorkflowEfficiencyFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowEfficiencyFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkflowEfficiencyFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
