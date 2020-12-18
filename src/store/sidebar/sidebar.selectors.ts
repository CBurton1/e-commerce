import { createSelector } from "@ngrx/store";

import { State } from "./sidebar.reducer";

export const sidebarState = (state: any): State => {
  return state.sidebar;
};

export const accountOpen = createSelector(
  sidebarState,
  (state): boolean | undefined => {
    return state.accountOpen;
  }
);

export const bagOpen = createSelector(
  sidebarState,
  (state): boolean | undefined => {
    return state.bagOpen;
  }
);

export const searchOpen = createSelector(
  sidebarState,
  (state): boolean | undefined => {
    return state.searchOpen;
  }
);

export const sidebarOpen = createSelector(
  sidebarState,
  (state): boolean | undefined => {
    return state.accountOpen || state.bagOpen || state.searchOpen;
  }
);
