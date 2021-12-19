import { HoldingsState } from './reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectHoldings =
  createFeatureSelector<HoldingsState>('holdings');

export const selectBalance = createSelector(
  selectHoldings,
  (state: HoldingsState) => state.balance
);

// how to use selector in a component

// this.store$.select(selectBalance).subscribe((selection) => {
//     console.log(selection)
// });