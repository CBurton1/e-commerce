import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

import { SharedModule } from "../../shared/shared.module";

// components
import { AccountSidebarComponent } from "./account-sidebar/account-sidebar.component";
import { ForgotPasswordFormComponent } from "./account-sidebar/forgot-password-form/forgot-password-form.component";
import { LoginFormComponent } from "./account-sidebar/login-form/login-form.component";
import { SignupFormComponent } from "./account-sidebar/signup-form/signup-form.component";
import { BagSidebarComponent } from "./bag-sidebar/bag-sidebar.component";
import { SearchSidebarComponent } from "./search-sidebar/search-sidebar.component";
import { UserComponent } from "./account-sidebar/user/user.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [
    AccountSidebarComponent,
    BagSidebarComponent,
    SearchSidebarComponent,
    LoginFormComponent,
    SignupFormComponent,
    ForgotPasswordFormComponent,
    UserComponent
  ],
  exports: [
    AccountSidebarComponent,
    BagSidebarComponent,
    SearchSidebarComponent
  ],
  providers: []
})
export class SidebarsModule {}
