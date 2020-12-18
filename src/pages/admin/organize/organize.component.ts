import { Component, Input } from "@angular/core";
import { forkJoin } from "rxjs";
import { take } from "rxjs/operators";
import { Store } from "@ngrx/store";

import { CategoryService } from "../../../services/category.service";
import { updatedCategory } from "../../../store/category/category.actions";
import { State } from "../../../store/";

// @ts-ignore
google.charts.load("current", {
  packages: ["orgchart"],
});

@Component({
  selector: "ecs-organize",
  templateUrl: "./organize.component.html",
  styleUrls: ["./organize.component.scss"]
})
export class OrganizeComponent {
  @Input() public categories!: ECS.Category[];
  public selectedCategory: ECS.Category | undefined | {} = undefined;

  constructor(
    private categoryService: CategoryService,
    private store: Store<State>
  ) {}

  public onCategoriesChanged(categories: any): void {
    categories = JSON.parse(JSON.stringify(categories));
    this.categories = categories;
  }

  public onCategoryClicked(title: string): void {
    this.selectedCategory = this.categories.find((category: ECS.Category) => category.title === title);
  }

  public saveCategories(): void {
    const observables = this.categories.map((category) => {
      return this.categoryService.updateCategory(category);
    });

    forkJoin(observables)
      .pipe(take(1))
      .subscribe((categories: ECS.Category[]) => {
        for (const category of categories) {
          this.store.dispatch(updatedCategory({category}));
        }
      });
  }
}
