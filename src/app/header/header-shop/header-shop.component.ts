import { Component, Input, OnInit, SimpleChanges, OnChanges } from "@angular/core";
import { Router } from "@angular/router";
import { createTree } from 'src/utils/tree';

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
    this.organizedCategories = createTree(JSON.parse(JSON.stringify(this.categories)));
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.categories) {
      this.organizedCategories = createTree(JSON.parse(JSON.stringify(changes.categories.currentValue)));
    }
  }
}
