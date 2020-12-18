import { Component, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { take } from "rxjs/operators";

import { State } from "src/store";
import { UserService } from "../../../../services/user.service";
import { MyErrorStateMatcher } from "../../../../shared/error-state-matcher";
import { FormType } from "../account-sidebar.component";

@Component({
  selector: "ecs-forgot-password-form",
  templateUrl: "./forgot-password-form.component.html",
  styleUrls: ["./forgot-password-form.component.scss"]
})
export class ForgotPasswordFormComponent {
  @Output() public toggleForm: EventEmitter<FormType> = new EventEmitter();
  public forgotPasswordForm: FormGroup;
  public matcher = new MyErrorStateMatcher();
  public loading = false;
  public success = false;

  constructor(
    private store: Store<State>,
    private userService: UserService
  ) {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email])
    });
  }

  public onForgotPassword(): void {
    if (!this.forgotPasswordForm.valid) {
      return;
    }

    this.loading = true;
    this.userService.sendPasswordResetEmail(this.forgotPasswordForm.value.email)
      .pipe(take(1))
      .subscribe((result) => {
        this.loading = false;
        this.success = true;
      });
  }

  public onLogin(): void {
    this.toggleForm.emit("login");
  }
}
