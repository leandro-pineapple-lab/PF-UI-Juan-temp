import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadmissionsFiltersComponent } from './readmissions-filters.component';

describe('ReadmissionsFiltersComponent', () => {
  let component: ReadmissionsFiltersComponent;
  let fixture: ComponentFixture<ReadmissionsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadmissionsFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadmissionsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
