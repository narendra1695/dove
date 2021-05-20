import { TestBed } from '@angular/core/testing';

import { DovesService } from './doves.service';

describe('DovesService', () => {
  let service: DovesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DovesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
