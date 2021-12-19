import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.scss']
})
export class NavmenuComponent implements OnInit {

  router: Router;

  constructor(r: Router) { 
    this.router = r;
  }

  ngOnInit(): void {

  }

  loadAccountSettings() {
    this.router.navigate(['account']);
  }

  loadHoldings() {
    this.router.navigate(['holdings']);
  }

  loadTradingPlayground() {
    this.router.navigate(['trading-playground']);
  }

}
