import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, tap } from "rxjs/operators";

import { State } from "../../../core/store";
import { SignupState, signupState } from "./signup.selectors";

@Component({
  selector: "ecs-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  public loading = false;
  public state: Observable<SignupState>;

  constructor(
    private store: Store<State>
  ) {
    this.state = this.store.select(signupState)
      .pipe(
        // @ts-ignore
        filter((state: SignupState) => !!state),
        tap((state: SignupState) => {
          console.log(state);
        })
      );
  }

  public ngOnInit(): void {
  }
}
