import { TestBed } from '@angular/core/testing';

import { MedicalService } from './medical-report.service';

describe('MedicalService', () => {
  let service: MedicalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
