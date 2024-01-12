import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedHomeworkComponent } from './completed-homework.component';

describe('CompletedHomeworkComponent', () => {
  let component: CompletedHomeworkComponent;
  let fixture: ComponentFixture<CompletedHomeworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedHomeworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedHomeworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
