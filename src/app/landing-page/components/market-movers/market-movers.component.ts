import { Component, OnInit } from '@angular/core';
import { forkJoin, map, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MarketOverviewService } from '../market-overview/market-overview.service';

@Component({
  selector: 'app-market-movers',
  templateUrl: './market-movers.component.html',
  styleUrls: ['./market-movers.component.scss'],
})
export class MarketMoversComponent implements OnInit {
  top10CoinsMovement: any;

  constructor(
    private http: HttpClient,
    private marketOverviewService: MarketOverviewService
  ) {}

  ngOnInit(): void {
    const date = new Date();
    const offsetOneDay = 24 * 60 * 60 * 1000 * 1;
    const yesterday = this.convertDateToLocaleString(
      new Date(date.setTime(date.getTime() - offsetOneDay))
    );

    let currentCoinPrices: any;

    this.marketOverviewService
      .getMarketCap()
      .pipe(
        map((coins) => {
          return coins.slice(0, 10);
        }),
        map((top10Coins) => {
          let coinIdlist = top10Coins.map((coin) => {
            return coin.id;
          });
          currentCoinPrices = top10Coins;
          return coinIdlist.map((coinId) => {
            return this.http.get<any>(
              `http://18.190.141.163/api/market-movers?coin=${coinId}&date=${yesterday}`
            );
          });
        }),
        switchMap((observables) => {
          return forkJoin(observables);
        })
      )
      .subscribe((data) => {
        let previousCoinPrices = data.map((coin: any) => {
          return {
            id: coin.id,
            previous_price: coin.market_data.current_price.usd,
            image: coin.image,
          };
        });

        let previousAndCurrentPrices = currentCoinPrices.map(
          (coinPrice: any) => {
            let match = previousCoinPrices.filter((coin: any) => {
              return coinPrice.id === coin.id;
            });
            let previousAndCurrentPrice = {
              id: match[0].id,
              previous_price: match[0].previous_price,
              current_price: coinPrice.current_price,
              image: match[0].image,
            };
            return previousAndCurrentPrice;
          }
        );

        this.top10CoinsMovement = this.calculatePercentOfMovement(
          previousAndCurrentPrices
        );
      });
  }

  convertDateToLocaleString(d: Date): string {
    return d.toLocaleDateString('es').split('/').join('-');
  }

  calculatePercentOfMovement(pricingData: any) {
    return pricingData.map((price: any) => {
      if (price.previous_price >= price.current_price) {
        return {
          id: price.id,
          decrease: (
            ((price.previous_price - price.current_price) /
              price.previous_price) *
            100
          ).toFixed(2),
          image: price.image,
        };
      } else {
        return {
          id: price.id,
          increase: (
            ((price.current_price - price.previous_price) /
              price.previous_price) *
            100
          ).toFixed(2),
          image: price.image,
        };
      }
    });
  }
}
