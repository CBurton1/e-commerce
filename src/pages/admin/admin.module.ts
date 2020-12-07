import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";

import { DragDropModule } from "@angular/cdk/drag-drop";

import { AdminComponent } from "./admin.component";
import { ProductsComponent } from "./products/products.component";
import { OrdersComponent } from "./orders/orders.component";
import { OrganizeComponent } from "./organize/organize.component";
import { NewCategoryFormComponent } from "./organize/new-category-form/new-category-form.component";
import { UsersComponent } from "./users/users.component";

import { AdminRoutingModule } from "./admin-routing.module";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    DragDropModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule
  ],
  declarations: [
    AdminComponent,
    ProductsComponent,
    OrdersComponent,
    OrganizeComponent,
    NewCategoryFormComponent,
    UsersComponent
  ],
  exports: [
  ],
  providers: []
})
export class AdminModule {}
