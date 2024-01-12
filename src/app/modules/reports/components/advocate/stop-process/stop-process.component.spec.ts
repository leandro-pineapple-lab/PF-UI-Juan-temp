import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopProcessComponent } from './stop-process.component';

describe('StopProcessComponent', () => {
  let component: StopProcessComponent;
  let fixture: ComponentFixture<StopProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StopProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StopProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
