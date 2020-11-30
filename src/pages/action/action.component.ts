import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, tap } from "rxjs/operators";

import { State } from "../../core/store/";
import { ActionState, actionState } from "./action.selectors";

@Component({
  selector: "ecs-action",
  templateUrl: "./action.component.html",
  styleUrls: ["./action.component.scss"]
})
export class ActionComponent implements OnInit {
  public loading = false;
  public state: Observable<ActionState>;

  constructor(
    private store: Store<State>
  ) {
    this.state = this.store.select(actionState)
      .pipe(
        // @ts-ignore
        filter((state: ActionState) => !!state),
        tap((state: ActionState) => {
          console.log(state);
        })
      );
  }

  public ngOnInit(): void {
  }
}
