import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceVerificationComponent } from './insurance-verification.component';

describe('InsuranceVerificationComponent', () => {
  let component: InsuranceVerificationComponent;
  let fixture: ComponentFixture<InsuranceVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
