import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgicalSummaryComponent } from './surgical-summary.component';

describe('SurgicalSummaryComponent', () => {
  let component: SurgicalSummaryComponent;
  let fixture: ComponentFixture<SurgicalSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurgicalSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurgicalSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
