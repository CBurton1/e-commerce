import { ProductActions } from "./product.actions";

export interface State {}

export const initialState: State = {};

export function reducer(state = initialState, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}
