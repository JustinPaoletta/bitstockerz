import { CoinData, MarketCap100 } from 'src/app/types/types';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TradingPlaygroundService } from './trading-playground.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { updateTradeData } from './redux/actions';
import { selectCoinData } from './redux/selectors';

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

  constructor(
    private tradingsService: TradingPlaygroundService,
    private store$: Store
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
    this.coinByIdSub$ = this.tradingsService.getCoinById(this.selected)
      .subscribe((coinInfo: CoinData) => {
        this.selectedCoinData.next(coinInfo);
      });
  }

  ngOnDestroy(): void {
    this.coinDataSub$.unsubscribe();
    this.coinByIdSub$.unsubscribe();
  }

}
