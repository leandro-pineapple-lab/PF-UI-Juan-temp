import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowAlertGenerateComponent } from './workflow-alert-generate.component';

describe('WorkflowAlertGenerateComponent', () => {
  let component: WorkflowAlertGenerateComponent;
  let fixture: ComponentFixture<WorkflowAlertGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowAlertGenerateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowAlertGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
