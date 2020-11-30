import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { AccountComponent } from "./account.component";
import { AccountRoutingModule } from "./account-routing.module";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    SharedModule
  ],
  declarations: [
    AccountComponent
  ],
  exports: [
  ],
  providers: []
})
export class AccountModule {}
