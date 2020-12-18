import { Component, Input } from "@angular/core";
import { Store } from "@ngrx/store";

import { State } from "src/store";
import { ToggleAccount, ToggleBag, ToggleSearch } from "../../store/sidebar/sidebar.actions";

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

  public toggleAccountSidebar(): void {
    this.store.dispatch(new ToggleAccount());
  }

  public toggleBagSidebar(): void {
    this.store.dispatch(new ToggleBag());
  }

  public toggleSearchSidebar(): void {
    this.store.dispatch(new ToggleSearch());
  }
}
