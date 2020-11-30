import { dealActionTypes } from "./deal.actions";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";
import { Injectable } from "@angular/core";

import { DealService } from "../../services/deal.service";

@Injectable()
export class DealEffectsService {
  constructor(
    private dealService: DealService,
    private actions: Actions
  ) {}

  public createDeal = createEffect(() =>
    this.actions.pipe(
      ofType(dealActionTypes.createDeal),
      concatMap((action) => this.dealService.createDeal(action.deal)),
      map((deal) => dealActionTypes.createdDeal({ deal }))
    )
  );


  public readDeals = createEffect(() =>
    this.actions.pipe(
      ofType(dealActionTypes.readDeals),
      concatMap(() => this.dealService.readDeals()),
      map((deals) => dealActionTypes.receivedDeals({ deals }))
    )
  );

  public updateDeal = createEffect(() =>
    this.actions.pipe(
      ofType(dealActionTypes.updateDeal),
      concatMap((action) => this.dealService.updateDeal(action.deal)),
      map((deal) => dealActionTypes.updatedDeal({ deal }))
    )
  );

  public deleteDeal = createEffect(() =>
    this.actions.pipe(
      ofType(dealActionTypes.deleteDeal),
      concatMap((action) => this.dealService.deleteDeal(action.dealId)),
      map((dealId) => dealActionTypes.deletedDeal({ dealId }))
    )
  );
}

