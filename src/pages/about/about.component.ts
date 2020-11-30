import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, tap } from "rxjs/operators";

import { State } from "../../core/store";
import { AboutState, aboutState } from "./about.selectors";

@Component({
  selector: "ecs-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"]
})
export class AboutComponent implements OnInit {
  public loading = false;
  public state: Observable<AboutState>;

  constructor(
    private store: Store<State>
  ) {
    this.state = this.store.select(aboutState)
      .pipe(
        // @ts-ignore
        filter((state: AboutState) => !!state),
        tap((state: AboutState) => {
          console.log(state);
        })
      );
  }

  public ngOnInit(): void {
  }
}
