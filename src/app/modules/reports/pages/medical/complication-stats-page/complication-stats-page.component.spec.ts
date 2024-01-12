import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplicationStatsPageComponent } from './complication-stats-page.component';

describe('ComplicationStatsPageComponent', () => {
  let component: ComplicationStatsPageComponent;
  let fixture: ComponentFixture<ComplicationStatsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplicationStatsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplicationStatsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
