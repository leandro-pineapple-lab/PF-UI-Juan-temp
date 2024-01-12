import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectByStatusComponent } from './prospect-by-status.component';

describe('ProspectByStatusComponent', () => {
  let component: ProspectByStatusComponent;
  let fixture: ComponentFixture<ProspectByStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProspectByStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspectByStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
