import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ProductComponent } from "./product.component";
import { ProductRoutingModule } from "./product-routing.module";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    SharedModule
  ],
  declarations: [
    ProductComponent
  ],
  exports: [
  ],
  providers: []
})
export class ProductModule {}
