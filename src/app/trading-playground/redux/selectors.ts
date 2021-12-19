import { TradingPlaygroundState } from './reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectTradingPlayground =
  createFeatureSelector<TradingPlaygroundState>('tradingPlayground');

export const selectCoinData = createSelector(
  selectTradingPlayground,
  (state: TradingPlaygroundState) => state.coinData
);
