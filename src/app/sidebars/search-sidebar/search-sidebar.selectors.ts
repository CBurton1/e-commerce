import { createSelector } from "@ngrx/store";

import { searchOpen } from "../../../store/sidebar/sidebar.selectors";

export interface SearchSidebarState {
  searchOpen: boolean | undefined;
}

export const searchSidebarState = createSelector(
  searchOpen,
  (searchOpen): SearchSidebarState | undefined => {
    return {
      searchOpen
    };
  }
);
