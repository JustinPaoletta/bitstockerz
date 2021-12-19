import { Component, OnDestroy, OnInit } from '@angular/core';
import { ManageHoldingsService } from './manage-holdings.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-manage-holdings',
  templateUrl: './manage-holdings.component.html',
  styleUrls: ['./manage-holdings.component.scss']
})
export class ManageHoldingsComponent implements OnInit, OnDestroy {

  amountEntered: string = '';
  coinsHeld: string[] = [];
  selected: string = '';
  supportedCoins: string[] = [];
  
  addOrUpdateCoinSub$: Subscription = new Subscription;
  heldCoinsSub$: Subscription = new Subscription;
  supportedCoinsSub$: Subscription = new Subscription;
  

  constructor(private manageHoldings: ManageHoldingsService) { }

  ngOnInit(): void {
    this.heldCoinsSub$ = this.manageHoldings.getHeldCoins().subscribe((coinsHeld: string[]) => {
      this.coinsHeld = coinsHeld;
    })
    this.supportedCoinsSub$ = this.manageHoldings.getSupportedCoins().subscribe((supportedCoins: string[]) => {
      this.supportedCoins = supportedCoins;
    })
  }

  addOrUpdateCoin(): void {
    this.addOrUpdateCoinSub$ = this.manageHoldings.addOrUpdateCoin(this.selected, this.amountEntered).subscribe();
  }

  ngOnDestroy(): void {
    this.heldCoinsSub$.unsubscribe();
    this.supportedCoinsSub$.unsubscribe();
    this.addOrUpdateCoinSub$.unsubscribe();
  }

}
