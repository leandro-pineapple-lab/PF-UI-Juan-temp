import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowAlertListComponent } from './workflow-alert-list.component';

describe('WorkflowAlertListComponent', () => {
  let component: WorkflowAlertListComponent;
  let fixture: ComponentFixture<WorkflowAlertListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowAlertListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowAlertListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
