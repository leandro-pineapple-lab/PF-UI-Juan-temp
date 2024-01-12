import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandoutStatusPageComponent } from './handout-status-page.component';

describe('HandoutStatusPageComponent', () => {
  let component: HandoutStatusPageComponent;
  let fixture: ComponentFixture<HandoutStatusPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandoutStatusPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandoutStatusPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
