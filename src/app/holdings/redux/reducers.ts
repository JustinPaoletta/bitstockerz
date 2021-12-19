import { Action, createReducer, on } from "@ngrx/store";
import { updateHoldings } from './actions';

export interface HoldingsState {
  balance: string
}

export const initialState: HoldingsState = { balance: '' };
 
const _holdingsReducer = createReducer(
  initialState,
  on(updateHoldings, (state, action) => {
    return {
      balance: action.balance
    }
  })
);
 
export function holdingsReducer(state: HoldingsState | undefined, action: Action) {
  return _holdingsReducer(state, action);
}