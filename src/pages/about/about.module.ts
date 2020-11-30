import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { AboutComponent } from "./about.component";
import { AboutRoutingModule } from "./about-routing.module";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    AboutRoutingModule,
    SharedModule,
    SharedModule
  ],
  declarations: [
    AboutComponent
  ],
  exports: [
  ],
  providers: []
})
export class AboutModule {}
