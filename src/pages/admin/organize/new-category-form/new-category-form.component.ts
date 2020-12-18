import { Component, Input, EventEmitter, Output, SimpleChanges, OnChanges } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { take } from "rxjs/operators";

import { CategoryService } from "../../../../services/category.service";
import { State } from "../../../../store/";
import { MyErrorStateMatcher } from "../../../../shared/error-state-matcher";
import { updatedCategory, createdCategory } from "../../../../store/category/category.actions";

@Component({
  selector: "ecs-new-category-form",
  templateUrl: "./new-category-form.component.html",
  styleUrls: ["./new-category-form.component.scss"]
})
export class NewCategoryFormComponent implements OnChanges {
  @Output() formClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() public category!: any;
  @Input() public categories!: ECS.Category[];
  public shownCategories!: ECS.Category[];
  public categoryForm!: FormGroup;
  public categoryTree: any;
  public matcher = new MyErrorStateMatcher();
  public tooltips = {
    title: "The category title is just for you to be able to distinguish between other categories, ex: Men's Jeans",
    label: "The category label is what the customer sees as the name of category. They will not see the title.",
    description: "The description is the text a user see's when looking at this category on the shopping page",
    parentId: "The category that this category belongs to. ex: 'Men's Jean's' category would belong to a 'Men's' category"
  };

  constructor(
    private categoryService: CategoryService,
    private store: Store<State>
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.category) {
      this.category = changes.category.currentValue;
      this.createCategoryForm();
    }
  }

  public createCategoryForm(): void {
    this.categoryForm = new FormGroup({
      description: new FormControl(this.category?.description || "", [Validators.required]),
      title: new FormControl(this.category?.title || "", [Validators.required]),
      label: new FormControl(this.category?.label || [], []),
      parentId: new FormControl(this.category?.parentId || "", [Validators.required])
    });
  }

  public onSubmit(): void {
    if (!this.category.parentId) {
      const shopCategoryId = this.categories.find((category: ECS.Category) => category.title === "Shop")?.id;
      this.categoryForm.controls.parentId.setValue(shopCategoryId);
    }

    if (!this.categoryForm.valid) {
      return;
    }

    const obs = this.category.parentId ?
      this.categoryService.updateCategory({...this.categoryForm.value, id: this.category.id}) :
      this.categoryService.createCategory(this.categoryForm.value);

    obs
      .pipe((take(1)))
      .subscribe((category: ECS.Category) => {
        this.category.parentId ?
          this.store.dispatch(updatedCategory({ category})) :
          this.store.dispatch(createdCategory({category}));

        this.closeForm();
      });
  }

  public closeForm(): void {
    this.formClosed.emit(true);
  }
}
