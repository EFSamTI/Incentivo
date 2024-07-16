import { TestBed } from '@angular/core/testing';

import { OrdenFabricacionService } from './orden-fabricacion.service';

describe('OrdenFabricacionService', () => {
  let service: OrdenFabricacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdenFabricacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
