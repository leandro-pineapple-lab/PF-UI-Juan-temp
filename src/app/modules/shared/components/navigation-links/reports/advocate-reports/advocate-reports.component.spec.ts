import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvocateReportsComponent } from './advocate-reports.component';

describe('AdvocateReportsComponent', () => {
  let component: AdvocateReportsComponent;
  let fixture: ComponentFixture<AdvocateReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvocateReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvocateReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
