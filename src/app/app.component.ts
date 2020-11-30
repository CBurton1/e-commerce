import { Component } from "@angular/core";
import { Store } from "@ngrx/store";

import { State } from "../store";
import { readCategories } from 'src/store/category/category.actions';

@Component({
  selector: "ecs-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(private store: Store<State>) {}

  public ngOnInit() {
    this.store.dispatch(readCategories({}));
  }
}
