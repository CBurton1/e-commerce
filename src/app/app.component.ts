import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { State } from "../store";
import { AppState, appState } from "./app.selectors";
import { readCategories } from "../store/category/category.actions";
import { ReadUsers, ReceivedCurrentUser } from "../store/user/user.actions";
import { UserService } from "../services/user.service";

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
    private store: Store<State>,
    private userService: UserService
  ) {
    this.userService.checkLogin()
      .subscribe((user) => {
        if (user) {
          this.store.dispatch(new ReceivedCurrentUser(user));
        }
      });

    // @ts-ignore
    this.state = this.store.select(appState);

    // send for data
    this.store.dispatch(readCategories({}));
    this.store.dispatch(new ReadUsers());

    // banner and header height
    document.documentElement.style.setProperty("--banner-height", "52px");
    document.documentElement.style.setProperty("--header-height", "70px");
  }
}
