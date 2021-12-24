import { CoinData } from './../../../types/types';
import { HoldingsTableService } from './../holdings-table/holdings-table.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ManageHoldingsService } from './manage-holdings.service';
import { Subscription, switchMap } from 'rxjs';


@Component({
  selector: 'app-manage-holdings',
  templateUrl: './manage-holdings.component.html',
  styleUrls: ['./manage-holdings.component.scss']
})
export class ManageHoldingsComponent implements OnInit, OnDestroy {

  amountEntered: string | undefined = undefined;
  coinsHeld: string[] = [];
  selected: string = '';
  supportedCoins: string[] = [];
  supportedCoinsCopy: string[] = [];

  inputValue: string = '';
  
  addOrUpdateCoinSub$: Subscription = new Subscription;
  heldCoinsSub$: Subscription = new Subscription;
  supportedCoinsSub$: Subscription = new Subscription;
  

  constructor(private manageHoldingsService: ManageHoldingsService,
    private holdingsTableService: HoldingsTableService) { }

  ngOnInit(): void {
    this.heldCoinsSub$ = this.manageHoldingsService.getHeldCoins().subscribe((coinsHeld: string[]) => {
      this.coinsHeld = coinsHeld;
    })
    this.supportedCoinsSub$ = this.manageHoldingsService.getSupportedCoins().subscribe((supportedCoins: string[]) => {
      this.supportedCoins = supportedCoins;
      this.supportedCoinsCopy = supportedCoins;
    })
  }

  addOrUpdateCoin(): void {
    if (this.amountEntered) {
      this.addOrUpdateCoinSub$ = this.manageHoldingsService.addOrUpdateCoin(this.selected, this.amountEntered)
      .pipe(
        switchMap(() => { return this.holdingsTableService.myHoldings60()})
      ).subscribe((coinData: CoinData[]) => {
        // update tableData 
        this.holdingsTableService.holdings.next(coinData);
        this.clearInputField();
      });
    }
  }

  clearInputField(): void {
    this.amountEntered = '';
  }

  filterSupportedCoins(val: string) {
    this.supportedCoins = this.supportedCoinsCopy.filter((coin) => {  
      if (coin.indexOf(val.toLowerCase()) > -1) { return coin }  return  
    })
  }

  ngOnDestroy(): void {
    this.heldCoinsSub$.unsubscribe();
    this.supportedCoinsSub$.unsubscribe();
    this.addOrUpdateCoinSub$.unsubscribe();
  }

}
