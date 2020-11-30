import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { IconComponent } from "./icon/icon.component";
import { ImageComponent } from "./image/image.component";

@NgModule({
  declarations: [
    IconComponent,
    ImageComponent
  ],
  entryComponents: [],
  exports: [
    IconComponent,
    ImageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
})
export class SharedModule {}
