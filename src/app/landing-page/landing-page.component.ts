import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
// import { updateHoldings } from '../redux/actions';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private store$: Store) { }

  ngOnInit(): void {
    // this.store$.dispatch(updateHoldings({balance: '7'}))
  }

}
