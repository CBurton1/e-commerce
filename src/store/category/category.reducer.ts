import { createReducer, on} from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter, Update } from "@ngrx/entity";

import { categoryActionTypes } from "./category.actions";

export interface CategoryState extends EntityState<ECS.Category> {}
export const adapter: EntityAdapter<ECS.Category> = createEntityAdapter<ECS.Category>();
export const initialState = adapter.getInitialState();

export const categoryReducer = createReducer(
  initialState,
  // CRUD ACTIONS
  on(categoryActionTypes.createdCategory, (state, action) => {
    return adapter.addOne(action.category, state);
  }),

  on(categoryActionTypes.receivedCategories, (state, action) => {
    return adapter.addMany(action.categories, state);
  }),

  on(categoryActionTypes.updatedCategory, (state, action) => {
    const update: Update<ECS.Category> = {
      id: action.category.id,
      changes: action.category
    };

    return adapter.updateOne(update, state);
  }),

  on(categoryActionTypes.deletedCategory, (state, action) => {
    return adapter.removeOne(action.categoryId, state);
  })
);
