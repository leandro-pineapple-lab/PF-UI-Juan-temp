import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostOpClassPageComponent } from './post-op-class-page.component';

describe('PostOpClassPageComponent', () => {
  let component: PostOpClassPageComponent;
  let fixture: ComponentFixture<PostOpClassPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostOpClassPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostOpClassPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
