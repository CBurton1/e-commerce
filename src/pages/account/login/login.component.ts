import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, tap } from "rxjs/operators";

import { State } from "../../../core/store";
import { LoginState, loginState } from "./login.selectors";

@Component({
  selector: "ecs-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public loading = false;
  public state: Observable<LoginState>;

  constructor(
    private store: Store<State>
  ) {
    this.state = this.store.select(loginState)
      .pipe(
        // @ts-ignore
        filter((state: LoginState) => !!state),
        tap((state: LoginState) => {
          console.log(state);
        })
      );
  }

  public ngOnInit(): void {
  }
}
