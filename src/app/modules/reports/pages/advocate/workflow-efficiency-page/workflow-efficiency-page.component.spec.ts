import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowEfficiencyPageComponent } from './workflow-efficiency-page.component';

describe('WorkflowEfficiencyPageComponent', () => {
  let component: WorkflowEfficiencyPageComponent;
  let fixture: ComponentFixture<WorkflowEfficiencyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowEfficiencyPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkflowEfficiencyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
