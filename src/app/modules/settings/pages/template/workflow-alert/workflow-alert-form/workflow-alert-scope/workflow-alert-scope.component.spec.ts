import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowAlertScopeComponent } from './workflow-alert-scope.component';

describe('WorkflowAlertScopeComponent', () => {
  let component: WorkflowAlertScopeComponent;
  let fixture: ComponentFixture<WorkflowAlertScopeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowAlertScopeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowAlertScopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
