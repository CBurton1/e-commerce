import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { State } from "src/store";
import { AccountSidebarState, accountSidebarState } from "./account-sidebar.selectors";
import { ToggleAccount } from "../../../store/sidebar/sidebar.actions";
import { MyErrorStateMatcher } from "../../../shared/error-state-matcher";

export type FormType = "forgotPassword" | "login" | "signup";

@Component({
  selector: "ecs-account-sidebar",
  templateUrl: "./account-sidebar.component.html",
  styleUrls: ["./account-sidebar.component.scss"]
})
export class AccountSidebarComponent {
  public signupForm: FormGroup;
  public matcher = new MyErrorStateMatcher();
  public state: Observable<AccountSidebarState | undefined>;
  public showLogin = true;
  public showForgotPassword = false;
  public showSignup = false;

  constructor(
    private store: Store<State>
  ) {
    this.state = this.store.select(accountSidebarState);
    this.signupForm = new FormGroup({
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      confirmPassword: new FormControl("", [Validators.required])
    });
  }

  public closeAccountSidebar(): void {
    this.store.dispatch(new ToggleAccount());
  }

  public toggleForm(form: FormType): void {
    switch (form) {
      case "login":
        this.showLogin = true;
        this.showForgotPassword = false;
        this.showSignup = false;
        break;
      case "signup":
        this.showLogin = false;
        this.showForgotPassword = false;
        this.showSignup = true;
        break;
      case "forgotPassword":
        this.showLogin = false;
        this.showForgotPassword = true;
        this.showSignup = false;
        break;
    }
  }
}
