import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ContactComponent } from "./contact.component";
import { ContactRoutingModule } from "./contact-routing.module";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    ContactRoutingModule,
    SharedModule,
    SharedModule
  ],
  declarations: [
    ContactComponent
  ],
  exports: [
  ],
  providers: []
})
export class ContactModule {}
