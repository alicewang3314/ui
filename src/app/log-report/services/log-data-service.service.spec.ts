import { TestBed } from '@angular/core/testing';

import { LogDataServiceService } from './log-data-service.service';

describe('LogDataServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogDataServiceService = TestBed.get(LogDataServiceService);
    expect(service).toBeTruthy();
  });
});
