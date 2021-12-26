import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TradingPlaygroundService } from './trading-playground.service';

describe('TradingPlaygroundService', () => {
  let service: TradingPlaygroundService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(TradingPlaygroundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
