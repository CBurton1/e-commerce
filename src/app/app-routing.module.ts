import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "about",
    loadChildren: () => import("../pages/about/about.module").then(m => m.AboutModule)
  },
  {
    path: "account",
    loadChildren: () => import("../pages/account/account.module").then(m => m.AccountModule)
  },
  {
    path: "action",
    loadChildren: () => import("../pages/action/action.module").then(m => m.ActionModule)
  },
  {
    path: "admin",
    loadChildren: () => import("../pages/admin/admin.module").then(m => m.AdminModule)
  },
  {
    path: "checkout",
    loadChildren: () => import("../pages/checkout/checkout.module").then(m => m.CheckoutModule)
  },
  {
    path: "contact",
    loadChildren: () => import("../pages/contact/contact.module").then(m => m.ContactModule)
  },
  {
    path: "",
    loadChildren: () => import("../pages/home/home.module").then(m => m.HomeModule)
  },
  {
    path: "product",
    loadChildren: () => import("../pages/product/product.module").then(m => m.ProductModule)
  },
  {
    path: "shop",
    loadChildren: () => import("../pages/shop/shop.module").then(m => m.ShopModule)
  },
  {
    path: "**", redirectTo: "/"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
