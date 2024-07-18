import { TestBed } from '@angular/core/testing';

import { DowloadExcelService } from './dowload-excel.service';

describe('DowloadExcelService', () => {
  let service: DowloadExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DowloadExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
