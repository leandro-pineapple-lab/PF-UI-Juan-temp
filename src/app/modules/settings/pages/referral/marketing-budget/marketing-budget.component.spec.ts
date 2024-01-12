import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingBudgetComponent } from './marketing-budget.component';

describe('MarketingBudgetComponent', () => {
  let component: MarketingBudgetComponent;
  let fixture: ComponentFixture<MarketingBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketingBudgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketingBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
