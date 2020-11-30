import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { AdminComponent } from "./admin.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    SharedModule
  ],
  declarations: [
    AdminComponent
  ],
  exports: [
  ],
  providers: []
})
export class AdminModule {}
