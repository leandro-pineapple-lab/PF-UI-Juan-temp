import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFavoriteReportModalComponent } from './add-favorite-report-modal.component';

describe('AddFavoriteReportModalComponent', () => {
  let component: AddFavoriteReportModalComponent;
  let fixture: ComponentFixture<AddFavoriteReportModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFavoriteReportModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFavoriteReportModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
