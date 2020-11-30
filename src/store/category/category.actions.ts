import { createAction, props } from "@ngrx/store";

export const createCategory = createAction(
  "[Create Category Component] Create Category",
  props<{category: ECS.Category}>()
);

export const createdCategory = createAction(
  "[Create Category Component] Created Category",
  props<{category: ECS.Category}>()
);

export const readCategories = createAction(
  "[Categorys List] Read Categories via Service",
  props<{limit?: number}>()
);

export const receivedCategories = createAction(
  "[Categorys List] Received Categories via Service",
  props<{categories: ECS.Category[]}>()
);

export const updateCategory = createAction(
  "[Categorys List Operations] Update Category",
  props<{category: ECS.Category}>()
);

export const updatedCategory = createAction(
  "[Categorys List Operations] Updated Category",
  props<{category: ECS.Category}>()
);

export const deleteCategory = createAction(
  "[Categorys List Operations] Delete Category",
  props<{categoryId: string}>()
);

export const deletedCategory = createAction(
  "[Categorys List Operations] Deleted Category",
  props<{categoryId: string}>()
);

export const categoryActionTypes = {
  createCategory,
  createdCategory,
  readCategories,
  receivedCategories,
  updateCategory,
  updatedCategory,
  deleteCategory,
  deletedCategory
};
