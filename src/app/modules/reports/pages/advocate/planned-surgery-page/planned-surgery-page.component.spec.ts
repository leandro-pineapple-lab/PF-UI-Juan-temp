import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannedSurgeryPageComponent } from './planned-surgery-page.component';

describe('PlannedSurgeryPageComponent', () => {
  let component: PlannedSurgeryPageComponent;
  let fixture: ComponentFixture<PlannedSurgeryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlannedSurgeryPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlannedSurgeryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
