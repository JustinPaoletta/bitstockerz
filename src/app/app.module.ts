import { TradingPlaygroundModule } from './trading-playground/trading-playground.module';
import { HoldingsModule } from './holdings/holdings.module';
import { LandingPageModule } from './landing-page/landing-page.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavmenuComponent } from './components/navmenu/navmenu.component';
import { MatMenuModule } from '@angular/material/menu';
import { DarkModeToggleComponent } from './components/dark-mode-toggle/dark-mode-toggle.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from "@angular/flex-layout";
import { EnsureHttpsInterceptor } from './http-interceptor';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { holdingsReducer } from './holdings/redux/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { tradingPlaygroundReducer } from './trading-playground/redux/reducers';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavmenuComponent,
    DarkModeToggleComponent
  ],
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    LandingPageModule,
    HoldingsModule,
    TradingPlaygroundModule,
    StoreModule.forRoot({ holdings: holdingsReducer, tradingPlayground: tradingPlaygroundReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 50,
      logOnly: false,
    }),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: EnsureHttpsInterceptor, multi: true },
    Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
