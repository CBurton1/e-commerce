import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { DragDropModule } from "@angular/cdk/drag-drop";

import { IconComponent } from "./icon/icon.component";
import { ImageComponent } from "./image/image.component";
import { LoadingScreenComponent } from "./loading-screen/loading-screen.component";
import { OrgChartComponent } from "./org-chart/org-chart.component";

@NgModule({
  declarations: [
    IconComponent,
    ImageComponent,
    OrgChartComponent,
    LoadingScreenComponent
  ],
  entryComponents: [],
  exports: [
    IconComponent,
    ImageComponent,
    OrgChartComponent,
    LoadingScreenComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    DragDropModule
  ],
  providers: [],
})
export class SharedModule {}
