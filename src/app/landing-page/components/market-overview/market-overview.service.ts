import { MarketCap100 } from './../../../types/types';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarketOverviewService {

  constructor(private http: HttpClient) { }

  getMarketCap(): Observable<MarketCap100[]> {
    return this.http.get<MarketCap100[]>('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
  }
  
}
