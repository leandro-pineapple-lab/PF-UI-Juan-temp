import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeworkTemplateComponent } from './homework-template.component';

describe('HomeworkTemplateComponent', () => {
  let component: HomeworkTemplateComponent;
  let fixture: ComponentFixture<HomeworkTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeworkTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeworkTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
