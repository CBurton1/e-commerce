import { createReducer, on} from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter, Update } from "@ngrx/entity";

import { productActionTypes } from "./product.actions";

export interface ProductState extends EntityState<ECS.Product> {}
export const adapter: EntityAdapter<ECS.Product> = createEntityAdapter<ECS.Product>();
export const initialState = adapter.getInitialState();

export const productReducer = createReducer(
  initialState,
  // CRUD ACTIONS
  on(productActionTypes.createdProduct, (state, action) => {
    return adapter.addOne(action.product, state);
  }),

  on(productActionTypes.receivedProducts, (state, action) => {
    return adapter.addMany(action.products, state);
  }),

  on(productActionTypes.updatedProduct, (state, action) => {
    const update: Update<ECS.Product> = {
      id: action.product.id,
      changes: action.product
    };

    return adapter.updateOne(update, state);
  }),

  on(productActionTypes.deletedProduct, (state, action) => {
    return adapter.removeOne(action.productId, state);
  })
);
