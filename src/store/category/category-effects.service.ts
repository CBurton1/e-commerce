import { createEffect, Actions, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";
import { Injectable } from "@angular/core";

import { categoryActionTypes } from "./category.actions";
import { CategoryService } from "../../services/category.service";

@Injectable()
export class CategoryEffectsService {
  constructor(
    private categoryService: CategoryService,
    private actions: Actions
  ) {}

  public createCategory = createEffect(() =>
    this.actions.pipe(
      ofType(categoryActionTypes.createCategory),
      concatMap((action) => this.categoryService.createCategory(action.category)),
      map((category) => categoryActionTypes.createdCategory({ category }))
    )
  );


  public readCategories = createEffect(() =>
    this.actions.pipe(
      ofType(categoryActionTypes.readCategories),
      concatMap(() => this.categoryService.readCategories()),
      map((categories) => categoryActionTypes.receivedCategories({ categories }))
    )
  );

  public updateCategory = createEffect(() =>
    this.actions.pipe(
      ofType(categoryActionTypes.updateCategory),
      concatMap((action) => this.categoryService.updateCategory(action.category)),
      map((category) => categoryActionTypes.updatedCategory({ category }))
    )
  );

  public deleteCategory = createEffect(() =>
    this.actions.pipe(
      ofType(categoryActionTypes.deleteCategory),
      concatMap((action) => this.categoryService.deleteCategory(action.categoryId)),
      map((categoryId) => categoryActionTypes.deletedCategory({ categoryId }))
    )
  );
}
