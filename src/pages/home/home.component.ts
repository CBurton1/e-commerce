import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, tap, delay } from "rxjs/operators";

import { State } from "../../store/";
import { HomeState, homeState } from "./home.selectors";

@Component({
  selector: "ecs-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  public loading = true;
  public state: Observable<HomeState>;

  constructor(
    private store: Store<State>
  ) {
    this.state = this.store.select(homeState)
      .pipe(
        filter((state: HomeState) => !!state),
        tap((state: HomeState) => {
          this.loading = false;
        })
      );
  }

  public ngOnInit(): void {
  }
}
