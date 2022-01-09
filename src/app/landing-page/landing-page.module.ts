import { MarketMoversComponent } from './components/market-movers/market-movers.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { CryptoNewsComponent } from './components/crypto-news/crypto-news.component';
import { MarketOverviewComponent } from './components/market-overview/market-overview.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    LandingPageComponent,
    CryptoNewsComponent,
    MarketOverviewComponent,
    MarketMoversComponent
  ],
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatCardModule,
    CommonModule,
    LandingPageRoutingModule,
    MatTableModule,
    FlexLayoutModule,
    MatSortModule
  ]
})
export class LandingPageModule { }
