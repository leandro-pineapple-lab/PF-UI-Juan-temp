import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreDLetterSentComponent } from './pre-d-letter-sent.component';

describe('PreDLetterSentComponent', () => {
  let component: PreDLetterSentComponent;
  let fixture: ComponentFixture<PreDLetterSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreDLetterSentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreDLetterSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
