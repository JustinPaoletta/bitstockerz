import { CoinData } from './../../../types/types';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HoldingsTableService } from './holdings-table.service';
import { timer, Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { updateHoldings } from '../../redux/actions';
import { selectBalance } from '../../redux/selectors';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Coin } from 'src/app/types/types';


@Component({
  selector: 'app-holdings-table',
  templateUrl: './holdings-table.component.html',
  styleUrls: ['./holdings-table.component.scss']
})
export class HoldingsTableComponent implements OnInit, OnDestroy {

  dataSource: MatTableDataSource<CoinData> = new MatTableDataSource;
  displayedColumns: string[] = ['name',  'price', 'amount_owned', 'total_value'];

  myHoldings$: Observable<number> = timer(0, 30000).pipe(
    switchMap(() => {
      return this.holdingsTableService.getStash().pipe(
        switchMap((stash: Coin[]) => {
          return this.holdingsTableService.getPricingInfo(stash);
        }),
        map((data: CoinData[]) => { 
          this.dataSource = new MatTableDataSource<CoinData>(data);
          this.dataSource.sort = this.sort;
          return data; 
        }),
        switchMap((data: CoinData[]) => {
          return this.holdingsTableService.calculateTotalCrypto(data);
        })
      );
    })
  );
  myHoldingsSub$: Subscription = new Subscription;
  deleteCoinSub$: Subscription = new Subscription;
  portfolioTotal: Observable<string> = this.store$.select(selectBalance);

  @ViewChild(MatSort) sort: MatSort = {} as MatSort;

  constructor(
    private holdingsTableService: HoldingsTableService,
    private store$: Store
  ) { }

  ngOnInit(): void {
    this.myHoldingsSub$ = this.myHoldings$.pipe(
      map((totalHoldings: number) => { 
        this.store$.dispatch(
          updateHoldings({balance: String(totalHoldings)})
        );
      }),
      switchMap(() => {
        return this.portfolioTotal;
      })
    ).subscribe();
  }

  deleteCoin(coin: string): void {
    this.deleteCoinSub$ = this.holdingsTableService.deleteCoin(coin).subscribe();
  }

  ngOnDestroy(): void {
    this.deleteCoinSub$.unsubscribe();
    this.myHoldingsSub$.unsubscribe();
  }

}
