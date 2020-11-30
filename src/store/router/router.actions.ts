import { Action } from "@ngrx/store";

export enum RouterActions {
  NAVIGATION = "@ngrx/router-store/navigation",
  NAVIGATED = "@ngrx/router-store/navigated"
}

export class RouterNavigation implements Action {
  readonly type = RouterActions.NAVIGATION;
  constructor() {}
}

export class RouterNavigated implements Action {
  readonly type = RouterActions.NAVIGATED;
  constructor() {}
}
