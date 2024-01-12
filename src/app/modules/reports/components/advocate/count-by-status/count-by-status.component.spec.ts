import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountByStatusComponent } from './count-by-status.component';

describe('CountByStatusComponent', () => {
  let component: CountByStatusComponent;
  let fixture: ComponentFixture<CountByStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountByStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountByStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
