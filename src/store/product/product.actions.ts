import { createAction, props } from "@ngrx/store";

export const createProduct = createAction(
  "[Create Product Component] Create Product",
  props<{product: ECS.Product}>()
);

export const createdProduct = createAction(
  "[Create Product Component] Created Product",
  props<{product: ECS.Product}>()
);

export const readProducts = createAction(
  "[Products List] Read Products via Service",
  props<{limit?: number}>()
);

export const receivedProducts = createAction(
  "[Products List] Received Products via Service",
  props<{products: ECS.Product[]}>()
);

export const updateProduct = createAction(
  "[Products List Operations] Update Product",
  props<{product: ECS.Product}>()
);

export const updatedProduct = createAction(
  "[Products List Operations] Updated Product",
  props<{product: ECS.Product}>()
);

export const deleteProduct = createAction(
  "[Products List Operations] Delete Product",
  props<{productId: string}>()
);

export const deletedProduct = createAction(
  "[Products List Operations] Deleted Product",
  props<{productId: string}>()
);

export const productActionTypes = {
  createProduct,
  createdProduct,
  readProducts,
  receivedProducts,
  updateProduct,
  updatedProduct,
  deleteProduct,
  deletedProduct
};
