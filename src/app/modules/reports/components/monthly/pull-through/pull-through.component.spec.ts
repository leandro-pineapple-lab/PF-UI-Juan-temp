import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PullThroughComponent } from './pull-through.component';

describe('PullThroughComponent', () => {
  let component: PullThroughComponent;
  let fixture: ComponentFixture<PullThroughComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PullThroughComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PullThroughComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
