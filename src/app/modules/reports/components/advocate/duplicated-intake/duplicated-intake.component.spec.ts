import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicatedIntakeComponent } from './duplicated-intake.component';

describe('DuplicatedIntakeComponent', () => {
  let component: DuplicatedIntakeComponent;
  let fixture: ComponentFixture<DuplicatedIntakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuplicatedIntakeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicatedIntakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
