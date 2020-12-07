import { productStructureActionTypes } from "./product-structure.actions";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";
import { Injectable } from "@angular/core";

import { ProductStructureService } from "../../services/product-structure.service";

@Injectable()
export class ProductStructureEffectsService {
  constructor(
    private productStructureService: ProductStructureService,
    private actions: Actions
  ) {}

  public createProductStructure = createEffect(() =>
    this.actions.pipe(
      ofType(productStructureActionTypes.createProductStructure),
      concatMap((action) => this.productStructureService.createProductStructure(action.productStructure)),
      map((productStructure) => productStructureActionTypes.createdProductStructure({ productStructure }))
    )
  );


  public readProductStructures = createEffect(() =>
    this.actions.pipe(
      ofType(productStructureActionTypes.readProductStructures),
      concatMap(() => this.productStructureService.readProductStructures()),
      map((productStructures) => productStructureActionTypes.receivedProductStructures({ productStructures }))
    )
  );

  public updateProductStructure = createEffect(() =>
    this.actions.pipe(
      ofType(productStructureActionTypes.updateProductStructure),
      concatMap((action) => this.productStructureService.updateProductStructure(action.productStructure)),
      map((productStructure) => productStructureActionTypes.updatedProductStructure({ productStructure }))
    )
  );

  public deleteProductStructure = createEffect(() =>
    this.actions.pipe(
      ofType(productStructureActionTypes.deleteProductStructure),
      concatMap((action) => this.productStructureService.deleteProductStructure(action.productStructureId)),
      map((productStructureId) => productStructureActionTypes.deletedProductStructure({ productStructureId }))
    )
  );
}
