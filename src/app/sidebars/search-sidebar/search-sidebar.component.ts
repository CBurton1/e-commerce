import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { SearchSidebarState, searchSidebarState } from "./search-sidebar.selectors";
import { State } from "../../../store/router/router.reducer";
import { ToggleSearch } from "../../../store/sidebar/sidebar.actions";

@Component({
  selector: "ecs-search-sidebar",
  templateUrl: "./search-sidebar.component.html",
  styleUrls: ["./search-sidebar.component.scss"]
})
export class SearchSidebarComponent {
  public state: Observable<SearchSidebarState | undefined>;

  constructor(
    private store: Store<State>
  ) {
    this.state = this.store.select(searchSidebarState);
  }

  public closeSearchSidebar(): void {
    this.store.dispatch(new ToggleSearch());
  }
}
