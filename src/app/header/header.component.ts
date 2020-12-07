import { Component, Input } from "@angular/core";
import { Store } from "@ngrx/store";

import { State } from "src/store";
import { toggleBag } from "../../store/bag/bag.actions";

@Component({
  selector: "ecs-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
  @Input() public siteName!: string;
  @Input() public categories!: ECS.Category[];
  @Input() public message = "";
  public showShop = false;

  public constructor(private store: Store<State>) {}

  public toggleBag(): void {
    this.store.dispatch(toggleBag());
  }
}
