import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BariatricSurgeriesComponent } from './bariatric-surgeries.component';

describe('BariatricSurgeriesComponent', () => {
  let component: BariatricSurgeriesComponent;
  let fixture: ComponentFixture<BariatricSurgeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BariatricSurgeriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BariatricSurgeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
