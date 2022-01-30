import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of, Subject, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Coin, CoinData, SQLResponse } from 'src/app/types/types';

@Injectable({
  providedIn: 'root',
})
export class HoldingsTableService {
  constructor(private http: HttpClient) {}

  holdings: Subject<CoinData[]> = new Subject<CoinData[]>();

  myHoldings60(): Observable<CoinData[]> {
    return timer(0, 60000).pipe(
      switchMap(() => {
        return this.getStash().pipe(
          switchMap((stash: Coin[]) => {
            return this.getPricingInfo(stash);
          })
        );
      })
    );
  }

  getPricingInfo(stash: Coin[]): Observable<CoinData[]> {
    return forkJoin(
      stash.map((crypto: Coin) => {
        return this.http.get<CoinData>(
          `https://api.coingecko.com/api/v3/coins/${crypto.coin}`
        );
      })
    ).pipe(
      map((prices: CoinData[]) => {
        return prices.map((price: CoinData) => {
          stash.map((crypto: Coin) => {
            if (crypto.coin === price.id) {
              price.amount_owned = crypto.amount;
              price.price = price.market_data.current_price.usd;
              price.total_value =
                price.market_data.current_price.usd *
                Number(price.amount_owned);
            }
          });
          return price;
        });
      })
    );
  }

  getStash(): Observable<Coin[]> {
    return this.http.get<Coin[]>('http://18.190.141.163/api/stash');
  }

  deleteCoin(coin: string): Observable<SQLResponse> {
    return this.http.delete<SQLResponse>(
      `http://18.190.141.163/api/deleteCoin`,
      { body: { coin } }
    );
  }

  calculateTotalCrypto(pricingData: CoinData[]): Observable<number> {
    let totalCrypto: number = 0;

    pricingData.forEach((price: CoinData) => {
      totalCrypto +=
        Number(price.amount_owned) * price.market_data.current_price.usd;
    });

    return of(totalCrypto);
  }
}
