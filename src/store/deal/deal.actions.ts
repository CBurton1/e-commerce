import { createAction, props } from "@ngrx/store";

export const createDeal = createAction(
  "[Create Deal Component] Create Deal",
  props<{deal: ECS.Deal}>()
);

export const createdDeal = createAction(
  "[Create Deal Component] Created Deal",
  props<{deal: ECS.Deal}>()
);

export const readDeals = createAction(
  "[Deals List] Read Deals via Service",
  props<{limit?: number}>()
);

export const receivedDeals = createAction(
  "[Deals List] Received Deals via Service",
  props<{deals: ECS.Deal[]}>()
);

export const updateDeal = createAction(
  "[Deals List Operations] Update Deal",
  props<{deal: ECS.Deal}>()
);

export const updatedDeal = createAction(
  "[Deals List Operations] Updated Deal",
  props<{deal: ECS.Deal}>()
);

export const deleteDeal = createAction(
  "[Deals List Operations] Delete Deal",
  props<{dealId: string}>()
);

export const deletedDeal = createAction(
  "[Deals List Operations] Deleted Deal",
  props<{dealId: string}>()
);

export const dealActionTypes = {
  createDeal,
  createdDeal,
  readDeals,
  receivedDeals,
  updateDeal,
  updatedDeal,
  deleteDeal,
  deletedDeal
};
