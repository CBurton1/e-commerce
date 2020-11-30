import { productActionTypes } from "./product.actions";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";
import { Injectable } from "@angular/core";

import { ProductService } from "../../services/product.service";

@Injectable()
export class ProductEffectsService {
  constructor(
    private productService: ProductService,
    private actions: Actions
  ) {}

  public createProduct = createEffect(() =>
    this.actions.pipe(
      ofType(productActionTypes.createProduct),
      concatMap((action) => this.productService.createProduct(action.product)),
      map((product) => productActionTypes.createdProduct({ product }))
    )
  );


  public readProducts = createEffect(() =>
    this.actions.pipe(
      ofType(productActionTypes.readProducts),
      concatMap(() => this.productService.readProducts()),
      map((products) => productActionTypes.receivedProducts({ products }))
    )
  );

  public updateProduct = createEffect(() =>
    this.actions.pipe(
      ofType(productActionTypes.updateProduct),
      concatMap((action) => this.productService.updateProduct(action.product)),
      map((product) => productActionTypes.updatedProduct({ product }))
    )
  );

  public deleteProduct = createEffect(() =>
    this.actions.pipe(
      ofType(productActionTypes.deleteProduct),
      concatMap((action) => this.productService.deleteProduct(action.productId)),
      map((productId) => productActionTypes.deletedProduct({ productId }))
    )
  );
}
