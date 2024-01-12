import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialConsultsComponent } from './initial-consults.component';

describe('InitialConsultsComponent', () => {
  let component: InitialConsultsComponent;
  let fixture: ComponentFixture<InitialConsultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialConsultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialConsultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
