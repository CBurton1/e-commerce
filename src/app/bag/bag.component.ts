import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { State } from "../../store";
import { BagState, bagState } from "./bag.selectors";
import { toggleBag } from "../../store/bag/bag.actions";

@Component({
  selector: "ecs-bag",
  templateUrl: "./bag.component.html",
  styleUrls: ["./bag.component.scss"]
})
export class BagComponent {
  public state: Observable<BagState>;

  constructor(
    private store: Store<State>
  ) {
    // @ts-ignore
    this.state = this.store.select(bagState);
  }

  public closeBag(): void {
    this.store.dispatch(toggleBag());
  }
}
