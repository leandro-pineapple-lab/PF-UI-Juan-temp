import { TestBed } from '@angular/core/testing';

import { SurgeonService } from './surgeon.service';

describe('SurgeonService', () => {
  let service: SurgeonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurgeonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
