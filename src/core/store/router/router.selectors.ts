import { Params } from "@angular/router";
import { createSelector } from "@ngrx/store";

import { RouterStateUrl } from "./router.reducer";

export const routerState = (state: any): RouterStateUrl => {
  return state.router.state;
};

export const url = createSelector(
  routerState,
  (state): string => {
    return state.url;
  }
);

export const params = createSelector(
  routerState,
  (state): Params => {
    return state.params;
  }
);

export const queryParams = createSelector(
  routerState,
  (state): Params => {
    return state.queryParams;
  }
);
