import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
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
export class OrganizeComponent implements OnInit {
  @Input() public categories!: ECS.Category[];
  public categoryForm!: FormGroup;
  public selectedCategory: ECS.Category | undefined = undefined;

  constructor(
    private categoryService: CategoryService,
    private store: Store<State>
  ) {}

  public ngOnInit(): void {
    // this.createCategoryForm();
  }

  public createCategoryForm(): void {
    this.categoryForm = new FormGroup({
      productStructureId: new FormControl(this.selectedCategory?.productStructureId || "", []),
      description: new FormControl(this.selectedCategory?.description || "", []),
      title: new FormControl(this.selectedCategory?.title || "", []),
      label: new FormControl(this.selectedCategory?.label || "", [])
    });
  }

  public onCategoriesChanged(categories: any): void {
    categories = JSON.parse(JSON.stringify(categories));
    this.categories = categories;
  }

  public onCategoryClicked(title: string): void {
    console.log(title);
    this.selectedCategory = this.categories.find((category: ECS.Category) => category.title === title);
    console.log(this.selectedCategory);
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
