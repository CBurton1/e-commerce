import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, tap } from "rxjs/operators";

import { State } from "../../core/store/";
import { HomeState, homeState } from "./home.selectors";

@Component({
  selector: "ecs-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  public loading = false;
  public state: Observable<HomeState>;

  constructor(
    private store: Store<State>
  ) {
    this.state = this.store.select(homeState)
      .pipe(
        // @ts-ignore
        filter((state: HomeState) => !!state),
        tap((state: HomeState) => {
          console.log(state);
        })
      );
  }

  public ngOnInit(): void {
  }
}
