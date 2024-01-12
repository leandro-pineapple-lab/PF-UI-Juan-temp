import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowAlertIfComponent } from './workflow-alert-if.component';

describe('WorkflowAlertIfComponent', () => {
  let component: WorkflowAlertIfComponent;
  let fixture: ComponentFixture<WorkflowAlertIfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowAlertIfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowAlertIfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
