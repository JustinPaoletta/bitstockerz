import { CoinData } from 'src/app/types/types';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MarketCap100 } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class TradingPlaygroundService {
  constructor(private http: HttpClient) {}

  getCoinData(): Observable<MarketCap100[]> {
    return this.http.get<MarketCap100[]>(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    );
  }

  getCoinById(coinId: string): Observable<CoinData> {
    return this.http.get<CoinData>(
      `https://api.coingecko.com/api/v3/coins/${coinId}?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`
    );
  }
}
