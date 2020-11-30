import { orderActionTypes } from "./order.actions";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";
import { Injectable } from "@angular/core";

import { OrderService } from "../../services/order.service";

@Injectable()
export class OrderEffectsService {
  constructor(
    private orderService: OrderService,
    private actions: Actions
  ) {}

  public createOrder = createEffect(() =>
    this.actions.pipe(
      ofType(orderActionTypes.createOrder),
      concatMap((action) => this.orderService.createOrder(action.order)),
      map((order) => orderActionTypes.createdOrder({ order }))
    )
  );


  public readOrders = createEffect(() =>
    this.actions.pipe(
      ofType(orderActionTypes.readOrders),
      concatMap(() => this.orderService.readOrders()),
      map((orders) => orderActionTypes.receivedOrders({ orders }))
    )
  );

  public updateOrder = createEffect(() =>
    this.actions.pipe(
      ofType(orderActionTypes.updateOrder),
      concatMap((action) => this.orderService.updateOrder(action.order)),
      map((order) => orderActionTypes.updatedOrder({ order }))
    )
  );

  public deleteOrder = createEffect(() =>
    this.actions.pipe(
      ofType(orderActionTypes.deleteOrder),
      concatMap((action) => this.orderService.deleteOrder(action.orderId)),
      map((orderId) => orderActionTypes.deletedOrder({ orderId }))
    )
  );
}
