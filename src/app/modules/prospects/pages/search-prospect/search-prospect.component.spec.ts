import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchProspectComponent } from './search-prospect.component';

describe('SearchProspectComponent', () => {
  let component: SearchProspectComponent;
  let fixture: ComponentFixture<SearchProspectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchProspectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
