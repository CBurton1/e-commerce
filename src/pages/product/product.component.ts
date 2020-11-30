import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, tap } from "rxjs/operators";

import { State } from "../../core/store/";
import { ProductState, productState } from "./product.selectors";

@Component({
  selector: "ecs-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})
export class ProductComponent implements OnInit {
  public loading = false;
  public state: Observable<ProductState>;

  constructor(
    private store: Store<State>
  ) {
    this.state = this.store.select(productState)
      .pipe(
        // @ts-ignore
        filter((state: ProductState) => !!state),
        tap((state: ProductState) => {
          console.log(state);
        })
      );
  }

  public ngOnInit(): void {
  }
}
