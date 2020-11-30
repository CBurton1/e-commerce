import { createAction, props } from "@ngrx/store";

export const createOrder = createAction(
  "[Create Order Component] Create Order",
  props<{order: ECS.Order}>()
);

export const createdOrder = createAction(
  "[Create Order Component] Created Order",
  props<{order: ECS.Order}>()
);

export const readOrders = createAction(
  "[Orders List] Read Orders via Service",
  props<{limit?: number}>()
);

export const receivedOrders = createAction(
  "[Orders List] Received Orders via Service",
  props<{orders: ECS.Order[]}>()
);

export const updateOrder = createAction(
  "[Orders List Operations] Update Order",
  props<{order: ECS.Order}>()
);

export const updatedOrder = createAction(
  "[Orders List Operations] Updated Order",
  props<{order: ECS.Order}>()
);

export const deleteOrder = createAction(
  "[Orders List Operations] Delete Order",
  props<{orderId: string}>()
);

export const deletedOrder = createAction(
  "[Orders List Operations] Deleted Order",
  props<{orderId: string}>()
);

export const orderActionTypes = {
  createOrder,
  createdOrder,
  readOrders,
  receivedOrders,
  updateOrder,
  updatedOrder,
  deleteOrder,
  deletedOrder
};
