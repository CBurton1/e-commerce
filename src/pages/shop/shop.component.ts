import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, tap } from "rxjs/operators";
import { Router } from "@angular/router";

import { State } from "../../store/";
import { ShopState, shopState } from "./shop.selectors";

@Component({
  selector: "ecs-shop",
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.scss"]
})
export class ShopComponent implements OnInit {
  public loading = false;
  public state: Observable<ShopState>;

  constructor(
    private store: Store<State>,
    private router: Router
  ) {
    this.state = this.store.select(shopState)
      .pipe(
        // @ts-ignore
        filter((state: ShopState) => !!state),
        tap((state: ShopState) => {
          console.log(state);
        })
      );

      console.log(this.router.url);
  }

  public ngOnInit(): void {
  }
}
