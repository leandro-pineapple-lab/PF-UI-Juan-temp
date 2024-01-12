import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreOpComponent } from './pre-op.component';

describe('PreOpComponent', () => {
  let component: PreOpComponent;
  let fixture: ComponentFixture<PreOpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreOpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreOpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
