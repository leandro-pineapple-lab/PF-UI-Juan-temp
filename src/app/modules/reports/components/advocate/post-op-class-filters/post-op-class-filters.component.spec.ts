import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostOpClassFiltersComponent } from './post-op-class-filters.component';

describe('PostOpClassFiltersComponent', () => {
  let component: PostOpClassFiltersComponent;
  let fixture: ComponentFixture<PostOpClassFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostOpClassFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostOpClassFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
