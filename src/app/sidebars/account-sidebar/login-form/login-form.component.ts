import { Component, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";

import { State } from "src/store";
import { UserService } from "../../../../services/user.service";
import { MyErrorStateMatcher } from "../../../../shared/error-state-matcher";
import { take } from 'rxjs/operators';
import { FormType } from "../account-sidebar.component";
import { ReceivedCurrentUser } from 'src/store/user/user.actions';

@Component({
  selector: "ecs-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent {
  @Output() public toggleForm: EventEmitter<FormType> = new EventEmitter();
  public loginForm: FormGroup;
  public matcher = new MyErrorStateMatcher();
  public loading = false;

  constructor(
    private store: Store<State>,
    private userService: UserService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required])
    });
  }

  public onLogin(): void {
    if (!this.loginForm.valid) {
      return;
    }

    this.loading = true;

    this.userService.login(this.loginForm.value.email, this.loginForm.value.password)
      .pipe(take(1))
      .subscribe((user: ECS.User) => {
        this.loading = false;
        this.store.dispatch(new ReceivedCurrentUser(user));
      }, (error) => {
        switch (error.code) {
          case "auth/email-not-verified":
            this.loginForm.controls.email.setErrors({ loginError : error.message });
            break;
          case "auth/user-not-found":
            this.loginForm.controls.email.setErrors({ loginError : "No account with that email exists" });
            break;
          case "auth/wrong-password":
            this.loginForm.controls.password.setErrors({ loginError : "Please check your credentials and try again" });
            break;
        }

        this.loading = false;
      });
  }

  public onClickSignup(): void {
    this.toggleForm.emit("signup");
  }

  public onForgotPassword(): void {
    this.toggleForm.emit("forgotPassword");
  }
}
