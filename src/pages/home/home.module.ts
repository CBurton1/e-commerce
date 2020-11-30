import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home-routing.module";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    SharedModule
  ],
  declarations: [
    HomeComponent
  ],
  exports: [
  ],
  providers: []
})
export class HomeModule {}
