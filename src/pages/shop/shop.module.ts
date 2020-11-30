import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ShopComponent } from "./shop.component";
import { ShopRoutingModule } from "./shop-routing.module";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule,
    SharedModule
  ],
  declarations: [
    ShopComponent
  ],
  exports: [
  ],
  providers: []
})
export class ShopModule {}
