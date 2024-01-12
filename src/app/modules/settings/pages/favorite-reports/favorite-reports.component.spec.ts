import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteReportsComponent } from './favorite-reports.component';

describe('FavoriteReportsComponent', () => {
  let component: FavoriteReportsComponent;
  let fixture: ComponentFixture<FavoriteReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
