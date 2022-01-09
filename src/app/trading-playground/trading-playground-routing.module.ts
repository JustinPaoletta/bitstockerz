import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TradingPlaygroundComponent } from './trading-playground.component';

const routes: Routes = [{ path: '', component: TradingPlaygroundComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradingPlaygroundRoutingModule { }
