import { Component, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { take } from "rxjs/operators";

import { State } from "src/store";
import { UserService } from "../../../../services/user.service";
import { MyErrorStateMatcher } from "../../../../shared/error-state-matcher";
import { MustMatch } from "../../../../shared/validators/MustMatch.validator";
import { FormType } from "../account-sidebar.component";

@Component({
  selector: "ecs-signup-form",
  templateUrl: "./signup-form.component.html",
  styleUrls: ["./signup-form.component.scss"]
})
export class SignupFormComponent {
  @Output() public toggleForm: EventEmitter<FormType> = new EventEmitter();
  public signupForm: FormGroup;
  public matcher = new MyErrorStateMatcher();
  public loading = false;
  public success = false;

  constructor(
    private store: Store<State>,
    private userService: UserService
  ) {
    this.signupForm = new FormGroup({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(60),
        // check whether the entered password has a number
        Validators.pattern(/\d/),
        // check whether the entered password has upper case letter
        Validators.pattern(/[A-Z]/),
        // check whether the entered password has a lower-case letter
        Validators.pattern(/[a-z]/),
      ]),
      confirmPassword: new FormControl("", [Validators.required])
    }, {
      validators: [MustMatch("password", "confirmPassword")]
    });
  }

  public onSignup(): void {
    if (!this.signupForm.valid) {
      return;
    }

    this.loading = true;

    const signupData: ECS.SignUpData = {
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName
    };

    this.userService.createUser(signupData)
      .pipe(take(1))
      .subscribe((user: ECS.User) => {
        this.loading = false;
        this.success = true;
      }, (error: firebase.default.auth.Error) => {
        this.signupForm.controls.email.setErrors({ signupError : error.message });
        this.loading = false;
      });
  }

  public onClickLogin(): void {
    this.toggleForm.emit("login");
  }
}
