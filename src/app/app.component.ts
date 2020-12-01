import { Component } from "@angular/core";
import { Store } from "@ngrx/store";

import { State } from "../store";

@Component({
  selector: "ecs-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  public message = "This is the banner message";
  public siteName = "E-commerce Site";

  constructor(private store: Store<State>) {}
}
