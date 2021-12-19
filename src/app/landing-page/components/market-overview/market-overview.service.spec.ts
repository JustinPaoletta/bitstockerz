import { TestBed } from '@angular/core/testing';

import { MarketOverviewService } from './market-overview.service';

describe('MarketOverviewService', () => {
  let service: MarketOverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketOverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
