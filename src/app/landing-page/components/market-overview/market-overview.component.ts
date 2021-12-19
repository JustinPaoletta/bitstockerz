import { MarketCap100 } from './../../../types/types';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MarketOverviewService } from './market-overview.service';
import { Subscription } from 'rxjs';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-market-overview',
  templateUrl: './market-overview.component.html',
  styleUrls: ['./market-overview.component.scss']
})
export class MarketOverviewComponent implements OnInit, OnDestroy {

  dataSource: MatTableDataSource<MarketCap100> = new MatTableDataSource<MarketCap100>();
  displayedColumns: string[] = ['market_cap_rank',  'symbol', 'current_price', 'market_cap'];

  marketCapSub$: Subscription = new Subscription;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator | null;
  @ViewChild(MatSort) sort: MatSort = {} as MatSort;

  constructor(private marketOverview: MarketOverviewService) { }

  ngOnInit(): void {
    this.marketCapSub$ = this.marketOverview.getMarketCap().subscribe((data: MarketCap100[]) => {
        this.dataSource = new MatTableDataSource<MarketCap100>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.marketCapSub$.unsubscribe();
  }
  
}
