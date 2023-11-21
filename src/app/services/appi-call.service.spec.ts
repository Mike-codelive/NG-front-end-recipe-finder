import { TestBed } from '@angular/core/testing';

import { AppiCallService } from './appi-call.service';

describe('AppiCallService', () => {
  let service: AppiCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppiCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
