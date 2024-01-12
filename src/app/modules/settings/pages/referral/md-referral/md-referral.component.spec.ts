import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdReferralComponent } from './md-referral.component';

describe('MdReferralComponent', () => {
  let component: MdReferralComponent;
  let fixture: ComponentFixture<MdReferralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdReferralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
