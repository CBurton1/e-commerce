import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// ngrx
import { StoreModule } from "@ngrx/store";
import { StoreRouterConnectingModule, RouterStateSerializer } from "@ngrx/router-store";
import { EffectsModule } from "@ngrx/effects";
import { metaReducers, reducers, effects } from "../store";
import { CustomSerializer } from "../store/router/router.serializer";

// angular fire
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import {
  AngularFireAnalyticsModule,
  ScreenTrackingService,
  UserTrackingService,
  CONFIG
} from "@angular/fire/analytics";

// app
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { environment } from "../environments/environment";

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

    // firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAnalyticsModule
  ],
  providers: [
    {
      provide: RouterStateSerializer,
      useClass: CustomSerializer
    },
    ScreenTrackingService,
    UserTrackingService,
    {
      provide: CONFIG, useValue: {
        send_page_view: true,
        allow_ad_personalization_signals: false,
        anonymize_ip: true
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
