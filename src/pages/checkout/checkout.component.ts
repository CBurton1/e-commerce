import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, tap } from "rxjs/operators";

import { State } from "../../store/";
import { CheckoutState, checkoutState } from "./checkout.selectors";

@Component({
  selector: "ecs-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"]
})
export class CheckoutComponent implements OnInit {
  public loading = false;
  public state: Observable<CheckoutState>;

  constructor(
    private store: Store<State>
  ) {
    this.state = this.store.select(checkoutState)
      .pipe(
        // @ts-ignore
        filter((state: CheckoutState) => !!state),
        tap((state: CheckoutState) => {
          console.log(state);
        })
      );
  }

  public ngOnInit(): void {
  }
}
