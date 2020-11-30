import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, tap } from "rxjs/operators";

import { State } from "../../store/";
import { AccountState, accountState } from "./account.selectors";

@Component({
  selector: "ecs-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"]
})
export class AccountComponent implements OnInit {
  public loading = false;
  public state: Observable<AccountState>;

  constructor(
    private store: Store<State>
  ) {
    this.state = this.store.select(accountState)
      .pipe(
        // @ts-ignore
        filter((state: AccountState) => !!state),
        tap((state: AccountState) => {
          console.log(state);
        })
      );
  }

  public ngOnInit(): void {
  }
}
