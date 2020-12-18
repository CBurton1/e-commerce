import { Action } from "@ngrx/store";

export enum SidebarActions {
  TOGGLE_ACCOUNT = "sidebar/TOGGLE_ACCOUNT",
  TOGGLE_BAG = "sidebar/TOGGLE_BAG",
  TOGGLE_SEARCH = "sidebar/TOGGLE_SEARCH"
}

export class ToggleAccount implements Action {
  readonly type = SidebarActions.TOGGLE_ACCOUNT;
  constructor() {}
}

export class ToggleBag implements Action {
  readonly type = SidebarActions.TOGGLE_BAG;
  constructor() {}
}

export class ToggleSearch implements Action {
  readonly type = SidebarActions.TOGGLE_SEARCH;
  constructor() {}
}