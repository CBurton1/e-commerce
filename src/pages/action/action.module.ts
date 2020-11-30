import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ActionComponent } from "./action.component";
import { ActionRoutingModule } from "./action-routing.module";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    ActionRoutingModule,
    SharedModule,
    SharedModule
  ],
  declarations: [
    ActionComponent
  ],
  exports: [
  ],
  providers: []
})
export class ActionModule {}
