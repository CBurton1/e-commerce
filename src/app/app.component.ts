import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { State } from "../store";
import { AppState, appState } from "./app.selectors";
import { readCategories } from "../store/category/category.actions";

@Component({
  selector: "ecs-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  public message = "This is the banner message";
  public siteName = "E-commerce Site";

  public state: Observable<AppState>;

  constructor(
    private store: Store<State>
  ) {
    // @ts-ignore
    this.state = this.store.select(appState);
    this.store.dispatch(readCategories({}));
  }
}
