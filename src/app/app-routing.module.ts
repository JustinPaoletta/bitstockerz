import { HoldingsComponent } from './holdings/holdings.component';
import { TradingPlaygroundComponent } from './trading-playground/trading-playground.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';

const indexRoute: Route = {
  path: '',
  component: LandingPageComponent,
};

const fallbackRoute: Route = {
  path: '**',
  component: LandingPageComponent,
};

const routes: Routes = [
  { path: 'trading-playground', component: TradingPlaygroundComponent },
  { path: 'holdings', component: HoldingsComponent },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
  },
  indexRoute,
  fallbackRoute,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
