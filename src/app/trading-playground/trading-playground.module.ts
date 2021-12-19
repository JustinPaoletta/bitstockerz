import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TradingPlaygroundRoutingModule } from './trading-playground-routing.module';
import { TradingPlaygroundComponent } from './trading-playground.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CoinSpinnerComponent } from './components/coin-spinner/coin-spinner.component';


@NgModule({
  declarations: [
    CoinSpinnerComponent,
    TradingPlaygroundComponent
  ],
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
    TradingPlaygroundRoutingModule
  ]
})
export class TradingPlaygroundModule { }
