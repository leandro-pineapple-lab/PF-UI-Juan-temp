import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingReportsComponent } from './marketing-reports.component';

describe('MarketingReportsComponent', () => {
  let component: MarketingReportsComponent;
  let fixture: ComponentFixture<MarketingReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketingReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketingReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
