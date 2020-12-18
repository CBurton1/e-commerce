import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { State } from "../../../store";
import { BagSidebarState, bagSidebarState } from "./bag-sidebar.selectors";
import { ToggleBag } from "../../../store/sidebar/sidebar.actions";

@Component({
  selector: "ecs-bag-sidebar",
  templateUrl: "./bag-sidebar.component.html",
  styleUrls: ["./bag-sidebar.component.scss"]
})
export class BagSidebarComponent {
  public state: Observable<BagSidebarState | undefined>;

  constructor(
    private store: Store<State>
  ) {
    this.state = this.store.select(bagSidebarState);
  }

  public closeBagSidebar(): void {
    this.store.dispatch(new ToggleBag());
  }
}
