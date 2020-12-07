import { createAction, props } from "@ngrx/store";

export const createProductStructure = createAction(
  "[Create ProductStructure Component] Create ProductStructure",
  props<{productStructure: ECS.ProductStructure}>()
);

export const createdProductStructure = createAction(
  "[Create ProductStructure Component] Created ProductStructure",
  props<{productStructure: ECS.ProductStructure}>()
);

export const readProductStructures = createAction(
  "[ProductStructures List] Read ProductStructures via Service",
  props<{limit?: number}>()
);

export const receivedProductStructures = createAction(
  "[ProductStructures List] Received ProductStructures via Service",
  props<{productStructures: ECS.ProductStructure[]}>()
);

export const updateProductStructure = createAction(
  "[ProductStructures List Operations] Update ProductStructure",
  props<{productStructure: ECS.ProductStructure}>()
);

export const updatedProductStructure = createAction(
  "[ProductStructures List Operations] Updated ProductStructure",
  props<{productStructure: ECS.ProductStructure}>()
);

export const deleteProductStructure = createAction(
  "[ProductStructures List Operations] Delete ProductStructure",
  props<{productStructureId: string}>()
);

export const deletedProductStructure = createAction(
  "[ProductStructures List Operations] Deleted ProductStructure",
  props<{productStructureId: string}>()
);

export const productStructureActionTypes = {
  createProductStructure,
  createdProductStructure,
  readProductStructures,
  receivedProductStructures,
  updateProductStructure,
  updatedProductStructure,
  deleteProductStructure,
  deletedProductStructure
};
