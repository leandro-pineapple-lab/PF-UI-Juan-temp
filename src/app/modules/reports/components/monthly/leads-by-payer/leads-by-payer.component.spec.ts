import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsByPayerComponent } from './leads-by-payer.component';

describe('LeadsByPayerComponent', () => {
  let component: LeadsByPayerComponent;
  let fixture: ComponentFixture<LeadsByPayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadsByPayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadsByPayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
