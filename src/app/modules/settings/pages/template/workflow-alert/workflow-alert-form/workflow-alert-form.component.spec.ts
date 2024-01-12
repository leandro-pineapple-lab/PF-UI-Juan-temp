import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowAlertFormComponent } from './workflow-alert-form.component';

describe('WorkflowAlertFormComponent', () => {
  let component: WorkflowAlertFormComponent;
  let fixture: ComponentFixture<WorkflowAlertFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowAlertFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowAlertFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
