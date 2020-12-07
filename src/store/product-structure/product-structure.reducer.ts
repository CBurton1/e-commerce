import { createReducer, on} from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter, Update } from "@ngrx/entity";

import { productStructureActionTypes } from "./product-structure.actions";

export interface ProductStructureState extends EntityState<ECS.ProductStructure> {}
export const adapter: EntityAdapter<ECS.ProductStructure> = createEntityAdapter<ECS.ProductStructure>();
export const initialState = adapter.getInitialState();

export const productStructureReducer = createReducer(
  initialState,
  // CRUD ACTIONS
  on(productStructureActionTypes.createdProductStructure, (state, action) => {
    return adapter.addOne(action.productStructure, state);
  }),

  on(productStructureActionTypes.receivedProductStructures, (state, action) => {
    return adapter.addMany(action.productStructures, state);
  }),

  on(productStructureActionTypes.updatedProductStructure, (state, action) => {
    const update: Update<ECS.ProductStructure> = {
      id: action.productStructure.id,
      changes: action.productStructure
    };

    return adapter.updateOne(update, state);
  }),

  on(productStructureActionTypes.deletedProductStructure, (state, action) => {
    return adapter.removeOne(action.productStructureId, state);
  })
);
