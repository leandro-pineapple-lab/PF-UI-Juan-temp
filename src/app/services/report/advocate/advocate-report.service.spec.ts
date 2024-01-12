import { TestBed } from '@angular/core/testing';

import { AdvocateReportService } from './advocate-report.service';

describe('AdvocateReportService', () => {
  let service: AdvocateReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvocateReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
