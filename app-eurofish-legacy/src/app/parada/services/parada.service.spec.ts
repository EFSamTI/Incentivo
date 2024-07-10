import { TestBed } from '@angular/core/testing';

import { ParadaService } from './parada.service';

describe('ParadaService', () => {
  let service: ParadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
