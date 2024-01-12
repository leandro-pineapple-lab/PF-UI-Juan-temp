import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerStatsPageComponent } from './employer-stats-page.component';

describe('EmployerStatsPageComponent', () => {
  let component: EmployerStatsPageComponent;
  let fixture: ComponentFixture<EmployerStatsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerStatsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerStatsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
