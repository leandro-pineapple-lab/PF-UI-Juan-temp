import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowAlertComponent } from './workflow-alert.component';

describe('WorkflowAlertComponent', () => {
  let component: WorkflowAlertComponent;
  let fixture: ComponentFixture<WorkflowAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
