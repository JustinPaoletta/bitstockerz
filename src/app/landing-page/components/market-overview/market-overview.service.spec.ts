import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { MarketOverviewService } from './market-overview.service';

describe('MarketOverviewService', () => {
  let service: MarketOverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(MarketOverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
