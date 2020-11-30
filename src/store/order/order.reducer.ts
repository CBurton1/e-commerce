import { createReducer, on} from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter, Update } from "@ngrx/entity";

import { orderActionTypes } from "./order.actions";

export interface OrderState extends EntityState<ECS.Order> {}
export const adapter: EntityAdapter<ECS.Order> = createEntityAdapter<ECS.Order>();
export const initialState = adapter.getInitialState();

export const orderReducer = createReducer(
  initialState,
  // CRUD ACTIONS
  on(orderActionTypes.createdOrder, (state, action) => {
    return adapter.addOne(action.order, state);
  }),

  on(orderActionTypes.receivedOrders, (state, action) => {
    return adapter.addMany(action.orders, state);
  }),

  on(orderActionTypes.updatedOrder, (state, action) => {
    const update: Update<ECS.Order> = {
      id: action.order.id,
      changes: action.order
    };

    return adapter.updateOne(update, state);
  }),

  on(orderActionTypes.deletedOrder, (state, action) => {
    return adapter.removeOne(action.orderId, state);
  })
);
