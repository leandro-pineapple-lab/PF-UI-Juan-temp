import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowAlertWhenComponent } from './workflow-alert-when.component';

describe('WorkflowAlertWhenComponent', () => {
  let component: WorkflowAlertWhenComponent;
  let fixture: ComponentFixture<WorkflowAlertWhenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowAlertWhenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowAlertWhenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
