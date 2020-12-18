import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, tap, take } from "rxjs/operators";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { State } from "../../store/";
import { ActionState, actionState } from "./action.selectors";
import { UserService } from "../../services/user.service";
import { MyErrorStateMatcher } from "../../shared/error-state-matcher";

@Component({
  selector: "ecs-action",
  templateUrl: "./action.component.html",
  styleUrls: ["./action.component.scss"]
})
export class ActionComponent {
  public loading = false;
  public resetPassword = false;
  public verifyEmail = true;
  public state: Observable<ActionState>;
  public resetPasswordForm: FormGroup;
  public matcher = new MyErrorStateMatcher();
  public success = false;
  public verificationError!: string;
  public verificationSuccess = false;

  constructor(
    private router: Router,
    private store: Store<State>,
    private userService: UserService
  ) {
    this.resetPasswordForm = new FormGroup({
      newPassword: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(60),
        // check whether the entered password has a number
        Validators.pattern(/\d/),
        // check whether the entered password has upper case letter
        Validators.pattern(/[A-Z]/),
        // check whether the entered password has a lower-case letter
        Validators.pattern(/[a-z]/),
      ])
    });

    this.state = this.store.select(actionState)
      .pipe(
        filter((actionState: ActionState) => !!actionState),
        take(1),
        tap((actionState: ActionState) => {
          switch (actionState.mode) {
            case "verifyEmail":
              this.verifyEmail = true;
              this.confirmEmail(actionState.code);
              break;
            case "resetPassword":
              this.resetPassword = true;
              break;
            default:
              this.router.navigate(["/"]);
              break;
          }
        })
      );
  }

  public confirmEmail(code: string): void {
    this.userService.confirmEmail(code)
      .pipe(take(1))
      .subscribe((result) => {
        this.verificationSuccess = true;
      }, (error) => {
        switch (error.code) {
          case "auth/expired-action-code":
            this.verificationError = error.message;
            break;
          case "auth/invalid-action-code":
            this.verificationError = error.message;
            break;
          case "auth/user-disabled":
            this.verificationError = error.message;
            break;
          case "auth/user-not-found":
            this.verificationError = error.message;
            break;
        }
      });
  }

  public onResetPassword(code: string): void {
    if (!this.resetPasswordForm.valid) {
      return;
    }

    this.loading = true;

    this.userService.resetPassword(this.resetPasswordForm.value.newPassword, code)
      .pipe(take(1))
      .subscribe((result: any) => {
        this.loading = false;
        this.success = true;
      }, (error: any) => {
        switch (error.code) {
          case "auth/expired-action-code":
            this.resetPasswordForm.controls.newPassword.setErrors({ resetError : error.message });
            break;
          case "auth/invalid-action-code":
            this.resetPasswordForm.controls.newPassword.setErrors({ resetError : error.message });
            break;
          case "auth/user-disabled":
            this.resetPasswordForm.controls.newPassword.setErrors({ resetError : error.message });
            break;
          case "auth/user-not-found":
            this.resetPasswordForm.controls.newPassword.setErrors({ resetError : error.message });
            break;
        }
      });
  }
}
