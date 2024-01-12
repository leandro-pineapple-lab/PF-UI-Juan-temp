import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadmissionsPageComponent } from './readmissions-page.component';

describe('ReadmissionsPageComponent', () => {
  let component: ReadmissionsPageComponent;
  let fixture: ComponentFixture<ReadmissionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadmissionsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadmissionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
