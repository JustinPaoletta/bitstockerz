import { createAction, props } from '@ngrx/store';
 
export const updateHoldings = createAction(
  '[Holdings] Update Holdings',
  props<{ balance: string }>()
);
