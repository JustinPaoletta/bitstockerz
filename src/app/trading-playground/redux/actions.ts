import { MarketCap100 } from './../../types/types';
import { createAction, props } from '@ngrx/store';

export const updateTradeData = createAction(
  '[Trading Playground] Update Trade Data',
  props<{ coinData: Array<MarketCap100> }>()
);

export const clearState = createAction('[Trading Playground] Clear State');
