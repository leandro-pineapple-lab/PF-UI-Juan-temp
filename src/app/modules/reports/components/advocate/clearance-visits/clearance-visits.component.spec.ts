import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearanceVisitsComponent } from './clearance-visits.component';

describe('ClearanceVisitsComponent', () => {
  let component: ClearanceVisitsComponent;
  let fixture: ComponentFixture<ClearanceVisitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClearanceVisitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearanceVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
