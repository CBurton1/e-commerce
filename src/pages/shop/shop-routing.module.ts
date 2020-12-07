import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ShopComponent } from "./shop.component";

const routes: Routes = [
  {
    path: "",
    component: ShopComponent
  },
  {
    path: ":id",
    loadChildren: () => import("./shop.module").then(m => m.ShopModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule {}
