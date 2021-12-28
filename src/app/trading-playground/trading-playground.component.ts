import { HttpClient } from '@angular/common/http';
import { CoinData, MarketCap100 } from 'src/app/types/types';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TradingPlaygroundService } from './trading-playground.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { updateTradeData, clearState } from './redux/actions';
import { selectCoinData } from './redux/selectors';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-trading-playground',
  templateUrl: './trading-playground.component.html',
  styleUrls: ['./trading-playground.component.scss']
})
export class TradingPlaygroundComponent implements OnInit, OnDestroy {

  selected: string = '';

  coinDataSub$: Subscription = new Subscription;
  coinByIdSub$: Subscription = new Subscription;
  selectedCoinData: Subject<CoinData> = new Subject<CoinData>();
  supportedCoins: Observable<MarketCap100[]> = this.store$.select(selectCoinData);

  myChart!: Chart;

  constructor(
    private tradingsService: TradingPlaygroundService,
    private store$: Store,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getAllCoins();
  }

  getAllCoins(): void {
    this.coinDataSub$ = this.tradingsService.getCoinData()
      .pipe(
        take(1)
      )
      .subscribe((coinData: MarketCap100[]) => {
        this.store$.dispatch(updateTradeData({ coinData }))
      });
  }

  getSingleCoinInfo(): void {
    if (this.myChart) {
      this.myChart.destroy();
    }
    const dates: Set<string> = new Set();
    const prices: Set<number> = new Set();
    this.http.get(`https://api.coingecko.com/api/v3/coins/${this.selected}/market_chart/range?vs_currency=usd&from=1637815075&to=1640407081`).subscribe((data: any) => {
      data.prices.map((price: any) => {
        if (!dates.has(new Date(price[0]).toLocaleDateString("en-US"))) {
          prices.add(price[1])
        }
        dates.add(new Date(price[0]).toLocaleDateString("en-US"))
      })

      const ctx: any = document.getElementById('myChart');
      this.myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: Array.from(dates),
          datasets: [{
            label: 'Market Price Past 30 Days',
            data: Array.from(prices),
            borderColor: 'green',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      })
    })
    this.coinByIdSub$ = this.tradingsService.getCoinById(this.selected)
      .subscribe((coinInfo: CoinData) => {
        this.selectedCoinData.next(coinInfo);
      })
  }

  ngOnDestroy(): void {
    this.store$.dispatch(clearState());
    this.coinDataSub$.unsubscribe();
    this.coinByIdSub$.unsubscribe();
  }

}
