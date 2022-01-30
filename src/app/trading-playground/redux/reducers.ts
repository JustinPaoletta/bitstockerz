import { MarketCap100 } from './../../types/types';
import { Action, createReducer, on } from '@ngrx/store';
import { clearState, updateTradeData } from './actions';

export interface TradingPlaygroundState {
  coinData: MarketCap100[];
}

export interface UpdateTradeData extends Action {
  coinData: MarketCap100[];
}

export const initialState: TradingPlaygroundState = { coinData: [] };

const _tradingPlaygroundReducer = createReducer(
  initialState,

  on(
    updateTradeData,
    (state: TradingPlaygroundState, action: UpdateTradeData) => {
      return {
        coinData: action.coinData,
      };
    }
  ),

  on(clearState, () => {
    return initialState;
  })
);

export function tradingPlaygroundReducer(
  state: TradingPlaygroundState = initialState,
  action: Action
) {
  return _tradingPlaygroundReducer(state, action);
}
