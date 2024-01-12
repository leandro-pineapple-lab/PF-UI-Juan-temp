import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyNumbersPageComponent } from './monthly-numbers-page.component';

describe('MonthlyNumbersPageComponent', () => {
  let component: MonthlyNumbersPageComponent;
  let fixture: ComponentFixture<MonthlyNumbersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyNumbersPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyNumbersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
