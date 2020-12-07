import { Component, Input, OnInit, SimpleChanges, OnChanges } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "ecs-header-shop",
  templateUrl: "./header-shop.component.html",
  styleUrls: ["./header-shop.component.scss"]
})
export class HeaderShopComponent implements OnInit, OnChanges {
  @Input() public categories!: ECS.Category[];
  public organizedCategories: any;

  constructor(private router: Router) {}

  public ngOnInit(): void {
    this.organizedCategories = this.createTree(JSON.parse(JSON.stringify(this.categories)));
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.categories) {
      this.organizedCategories = this.createTree(JSON.parse(JSON.stringify(changes.categories.currentValue)));
    }
  }

  public selectCategory(category: ECS.Category): void {
    console.log(category);
  }

  public createTree(categories: any): any {
    const shopCategoryId = categories.find((category: ECS.Category) => category.title === "Shop").id;
    const resultTree: any = [];
    categories.forEach((category: any) => {
      // create new root parent category if category does not have any parent
      if (category.parentId === shopCategoryId) {
        category.route = `shop/${category.label.toLowerCase()}`;
        resultTree.push(category);
      }
      // else search for existing parent and attach child to it
      else {
        this.search_and_attach_child(resultTree, categories);
      }
    });

    return resultTree;
  }

  public search_and_attach_child(tree: any, categories: ECS.Category[]): any {
    if (!tree) {
      return;
    }

    tree.forEach((parentCategory: any) => {
      const category: any = categories.find((category: ECS.Category) => category.parentId === parentCategory.id);

      if (category) {
        category.route = `${parentCategory.route.toLowerCase()}/${category.label.toLowerCase()}`;
        parentCategory.children ? parentCategory.children.push(category) : parentCategory.children = [category];
      } else {
        this.search_and_attach_child(parentCategory.children, categories);
      }
    });
  }
}
