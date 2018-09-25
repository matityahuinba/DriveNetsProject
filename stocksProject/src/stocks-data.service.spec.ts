import { TestBed, inject } from '@angular/core/testing';

import { StocksDataService } from './stocks-data.service';

describe('StocksDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StocksDataService]
    });
  });

  it('should be created', inject([StocksDataService], (service: StocksDataService) => {
    expect(service).toBeTruthy();
  }));
});
