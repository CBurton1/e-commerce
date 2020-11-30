import { createReducer, on} from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter, Update } from "@ngrx/entity";

import { dealActionTypes } from "./deal.actions";

export interface DealState extends EntityState<ECS.Deal> {}
export const adapter: EntityAdapter<ECS.Deal> = createEntityAdapter<ECS.Deal>();
export const initialState = adapter.getInitialState();

export const dealReducer = createReducer(
  initialState,
  // CRUD ACTIONS
  on(dealActionTypes.createdDeal, (state, action) => {
    return adapter.addOne(action.deal, state);
  }),

  on(dealActionTypes.receivedDeals, (state, action) => {
    return adapter.addMany(action.deals, state);
  }),

  on(dealActionTypes.updatedDeal, (state, action) => {
    const update: Update<ECS.Deal> = {
      id: action.deal.id,
      changes: action.deal
    };

    return adapter.updateOne(update, state);
  }),

  on(dealActionTypes.deletedDeal, (state, action) => {
    return adapter.removeOne(action.dealId, state);
  })
);

