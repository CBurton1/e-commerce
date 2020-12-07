import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, tap } from "rxjs/operators";

import { State } from "../../store/";
import { AdminState, adminState } from "./admin.selectors";

@Component({
  selector: "ecs-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit {
  public loading = false;
  public selectedOption: "products" | "users" | "orders" | "organize shop" = "organize shop";
  public state: Observable<AdminState>;

  constructor(
    private store: Store<State>
  ) {
    this.state = this.store.select(adminState)
      .pipe(
        // @ts-ignore
        filter((state: AdminState) => !!state),
        tap((state: AdminState) => {
          // console.log(state);
        })
      );
  }

  public ngOnInit(): void {
  }
}
