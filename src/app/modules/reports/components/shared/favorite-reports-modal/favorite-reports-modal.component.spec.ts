import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteReportsModalComponent } from './favorite-reports-modal.component';

describe('FavoriteReportsModalComponent', () => {
  let component: FavoriteReportsModalComponent;
  let fixture: ComponentFixture<FavoriteReportsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteReportsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteReportsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
