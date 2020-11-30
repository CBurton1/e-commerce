import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// ngrx
import { StoreModule } from "@ngrx/store";
import { StoreRouterConnectingModule, RouterStateSerializer } from "@ngrx/router-store";
import { EffectsModule } from "@ngrx/effects";
import { metaReducers, reducers, effects } from "../core/store";
import { CustomSerializer } from "../core/store/router/router.serializer";

// app
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";

// page modules
import { AboutModule } from "../pages/about/about.module";
import { AccountModule } from "../pages/account/account.module";
import { ActionModule } from "../pages/action/action.module";
import { AdminModule } from "../pages/admin/admin.module";
import { CheckoutModule } from "../pages/checkout/checkout.module";
import { ContactModule } from "../pages/contact/contact.module";
import { HomeModule } from "../pages/home/home.module";
import { ProductModule } from "../pages/product/product.module";
import { ShopModule } from "../pages/shop/shop.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // pages
    AboutModule,
    AccountModule,
    ActionModule,
    AdminModule,
    CheckoutModule,
    ContactModule,
    HomeModule,
    ProductModule,
    ShopModule,

    // ngrx
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({
      stateKey: "router" // name of reducer key
    }),
    EffectsModule.forRoot(effects),
  ],
  providers: [
    {
      provide: RouterStateSerializer,
      useClass: CustomSerializer
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
