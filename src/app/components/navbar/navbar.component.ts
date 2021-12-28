import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, switchMap } from 'rxjs';
import { HoldingsTableService } from 'src/app/holdings/components/holdings-table/holdings-table.service';
import { updateHoldings } from 'src/app/holdings/redux/actions';
import { selectBalance } from 'src/app/holdings/redux/selectors';
import { CoinData } from 'src/app/types/types';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  portfolioTotal: Observable<string> = this.store$.select(selectBalance);
  isHoldingsView: Boolean | undefined

  constructor(private holdingsTableService: HoldingsTableService, private store$: Store, private location: Location, private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      if (this.location.path() === '/holdings') {
        this.isHoldingsView = true;
      } else {
        this.isHoldingsView = false;
      }
    });

    this.holdingsTableService.myHoldings60().pipe(
      map((coinData: CoinData[]) => {
        this.holdingsTableService.holdings.next(coinData);
      })
    ).subscribe();

    this.holdingsTableService.holdings.pipe(
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
    ).subscribe();
  }

}
