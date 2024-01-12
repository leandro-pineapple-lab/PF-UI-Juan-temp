import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardTextComponent } from './standard-text.component';

describe('StandardTextComponent', () => {
  let component: StandardTextComponent;
  let fixture: ComponentFixture<StandardTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandardTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
