import { TestBed } from '@angular/core/testing';

import { DowloadPdfService } from './dowload-pdf.service';

describe('DowloadPdfService', () => {
  let service: DowloadPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DowloadPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
