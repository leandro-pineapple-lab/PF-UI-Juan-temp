import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeworkStatusComponent } from './homework-status.component';

describe('HomeworkStatusComponent', () => {
  let component: HomeworkStatusComponent;
  let fixture: ComponentFixture<HomeworkStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeworkStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeworkStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
