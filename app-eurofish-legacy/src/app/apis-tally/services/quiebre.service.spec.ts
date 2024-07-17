import { TestBed } from '@angular/core/testing';

import { QuiebreService } from './quiebre.service';

describe('QuiebreService', () => {
  let service: QuiebreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuiebreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
