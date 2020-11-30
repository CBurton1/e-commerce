import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { CheckoutComponent } from "./checkout.component";
import { CheckoutRoutingModule } from "./checkout-routing.module";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule,
    SharedModule
  ],
  declarations: [
    CheckoutComponent
  ],
  exports: [
  ],
  providers: []
})
export class CheckoutModule {}
