import { Coin, CoinData, SQLResponse } from 'src/app/types/types';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManageHoldingsService {

  constructor(private http: HttpClient) { }

  getSupportedCoins(): Observable<string[]> {
    return this.http.get<CoinData[]>('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .pipe(
      map((data: CoinData[]) => { return data.map((coin: CoinData) => { return coin.id }) })
    );
  }

  getHeldCoins(): Observable<string[]> {
    return this.http.get<Coin[]>('http://18.190.141.163/api/stash').pipe(
      map((data: Coin[]) => { return data.map((coin: Coin) => { return coin.coin }) })
    )
  }
  
  addOrUpdateCoin(coin: string, amount: string | undefined): Observable<SQLResponse> {
    return this.http.post<SQLResponse>(`http://18.190.141.163/api/addOrUpdateCoin`, {coin, amount});
  }
}
