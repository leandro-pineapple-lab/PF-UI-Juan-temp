import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplicationsPageComponent } from './complications-page.component';

describe('ComplicationsPageComponent', () => {
  let component: ComplicationsPageComponent;
  let fixture: ComponentFixture<ComplicationsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplicationsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplicationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
