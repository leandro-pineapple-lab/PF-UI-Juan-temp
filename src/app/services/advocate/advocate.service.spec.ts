import { TestBed } from '@angular/core/testing';

import { AdvocateService } from './advocate.service';

describe('AdvocateService', () => {
  let service: AdvocateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvocateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
