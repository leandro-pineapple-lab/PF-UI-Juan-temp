import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingCategoryComponent } from './marketing-category.component';

describe('MarketingCategoryComponent', () => {
  let component: MarketingCategoryComponent;
  let fixture: ComponentFixture<MarketingCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketingCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketingCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
