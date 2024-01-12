import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreDLetterSentFiltersComponent } from './pre-d-letter-sent-filters.component';

describe('PreDLetterSentFiltersComponent', () => {
  let component: PreDLetterSentFiltersComponent;
  let fixture: ComponentFixture<PreDLetterSentFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreDLetterSentFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreDLetterSentFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
