import { ManageHoldingsComponent } from './../manage-holdings/manage-holdings.component';
import { CoinData } from './../../../types/types';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HoldingsTableService } from './holdings-table.service';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { updateHoldings } from '../../redux/actions';
import { selectBalance } from '../../redux/selectors';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-holdings-table',
  templateUrl: './holdings-table.component.html',
  styleUrls: ['./holdings-table.component.scss'],
})
export class HoldingsTableComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<CoinData> = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'price', 'amount_owned', 'total_value'];
  displayOverlay: boolean = false;

  myHoldingsSub$: Subscription = new Subscription();
  deleteCoinSub$: Subscription = new Subscription();
  portfolioTotal: Observable<string> = this.store$.select(selectBalance);

  @ViewChild(MatSort) sort: MatSort = {} as MatSort;

  constructor(
    private holdingsTableService: HoldingsTableService,
    private store$: Store,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // get table data and set it to the subject every 60 secs
    this.myHoldingsSub$ = this.holdingsTableService
      .myHoldings60()
      .pipe(
        map((coinData: CoinData[]) => {
          this.holdingsTableService.holdings.next(coinData);
        })
      )
      .subscribe();

    // subscribe to subject and update the table dataSource with its value
    this.holdingsTableService.holdings
      .pipe(
        map((data: CoinData[]) => {
          this.dataSource = new MatTableDataSource<CoinData>(data);
          this.dataSource.sort = this.sort;
          return data;
        }),
        switchMap((coinData: CoinData[]) => {
          return this.holdingsTableService.calculateTotalCrypto(coinData);
        }),
        map((totalHoldings: number) => {
          this.store$.dispatch(
            updateHoldings({ balance: String(totalHoldings) })
          );
        }),
        switchMap(() => {
          return this.portfolioTotal;
        })
      )
      .subscribe();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ManageHoldingsComponent);

    this.displayOverlay = true;

    dialogRef.afterClosed().subscribe((result) => {
      this.displayOverlay = false;
    });
  }

  deleteCoin(coin: string): void {
    this.deleteCoinSub$ = this.holdingsTableService
      .deleteCoin(coin)
      .pipe(
        switchMap(() => {
          return this.holdingsTableService.myHoldings60();
        })
      )
      .subscribe((coinData: CoinData[]) => {
        // update tableData
        this.holdingsTableService.holdings.next(coinData);
      });
  }

  ngOnDestroy(): void {
    this.deleteCoinSub$.unsubscribe();
    this.myHoldingsSub$.unsubscribe();
  }
}
