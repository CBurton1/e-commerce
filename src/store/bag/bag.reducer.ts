import { createReducer, on} from "@ngrx/store";

import { bagActionTypes } from "./bag.actions";

export interface BagState {
  // TODO update to order product
  orderProducts: ECS.Product[];
  bagOpen: boolean;
}

export const initialState: BagState = {
  orderProducts: [],
  bagOpen: false
};

export const bagReducer = createReducer(
  initialState,
  on(bagActionTypes.addedOrderProduct, (state, action) => {
    const orderProducts = JSON.parse(JSON.stringify(state.orderProducts));
    orderProducts.push(action.orderProduct);
    return { ...state, orderProducts };
  }),
  on(bagActionTypes.removedOrderProduct, (state, action) => {
    const orderProductIndex = state.orderProducts.findIndex((orderProduct) => orderProduct.id === action.orderProduct.id);
    const orderProducts = JSON.parse(JSON.stringify(state.orderProducts)).splice(orderProductIndex + 1);

    return { ...state, orderProducts };
  }),
  on(bagActionTypes.toggleBag, (state, action) => {
    return { ...state, bagOpen: !state.bagOpen };
  })
);
