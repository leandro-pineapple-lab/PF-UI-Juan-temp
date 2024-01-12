import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgicalHxPageComponent } from './surgical-hx-page.component';

describe('SurgicalHxPageComponent', () => {
  let component: SurgicalHxPageComponent;
  let fixture: ComponentFixture<SurgicalHxPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurgicalHxPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurgicalHxPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
