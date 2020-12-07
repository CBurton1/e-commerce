import { Component, Input, EventEmitter, Output, SimpleChanges, OnChanges } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";

import { CategoryService } from "../../../../services/category.service";
import { State } from "../../../../store/";
import { MyErrorStateMatcher } from "../../../../shared/error-state-matcher";

@Component({
  selector: "ecs-new-category-form",
  templateUrl: "./new-category-form.component.html",
  styleUrls: ["./new-category-form.component.scss"]
})
export class NewCategoryFormComponent implements OnChanges {
  @Output() formClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() public category!: ECS.Category;
  @Input() public categories!: ECS.Category[];
  public categoryForm!: FormGroup;
  public matcher = new MyErrorStateMatcher();
  public tooltips = {
    title: "The category title is just for you to be able to distinguish between other categories, ex: Men's Jeans",
    label: "The category label is what the customer sees, ex: You may have a category for Men, and inside the Men catgory have a category for 'Men's Jeans', but you'd probably want to label it 'Jeans' as then the user would then see the label of 'Jeans' under the category of 'Men'",
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

    if (changes.categories) {
      this.categories = changes.categories.currentValue
        .filter((category: ECS.Category) => {
          const notCurrent = category.id !== this.category.id;
          const notChild = category.parentId !== this.category.id;
          // TODO make sure it's not any children recursive
          return notCurrent && notChild;
        });
    }
  }

  public createCategoryForm(): void {
    console.log(this.category);
    this.categoryForm = new FormGroup({
      productStructureId: new FormControl(this.category?.productStructureId || "", [Validators.required]),
      description: new FormControl(this.category?.description || "", [Validators.required]),
      title: new FormControl(this.category?.title || "", [Validators.required]),
      label: new FormControl(this.category?.label || [], []),
      parentId: new FormControl(this.category?.parentId || "", [Validators.required])
    });

    console.log(this.categoryForm);
  }

  public onSubmit(): void {
  }

  public closeForm(): void {
    this.formClosed.emit(true);
  }
}
