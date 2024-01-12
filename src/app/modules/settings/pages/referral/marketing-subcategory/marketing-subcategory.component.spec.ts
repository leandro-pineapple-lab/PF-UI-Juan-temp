import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingSubcategoryComponent } from './marketing-subcategory.component';

describe('MarketingSubcategoryComponent', () => {
  let component: MarketingSubcategoryComponent;
  let fixture: ComponentFixture<MarketingSubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketingSubcategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketingSubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
