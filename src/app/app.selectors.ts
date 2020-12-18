import { createSelector } from "@ngrx/store";

import { sidebarOpen } from "../store/sidebar/sidebar.selectors";
import { categories } from "../store/category/category.selectors";
import { user } from "../store/user/user.selectors";

export interface AppState {
  sidebarOpen: boolean | undefined;
  categories: ECS.Category[];
  user: ECS.User | undefined;
}

export const appState = createSelector(
  sidebarOpen,
  categories,
  user,
  (sidebarOpen, categories, user): AppState | undefined => {
    if (!categories) {
      return;
    }

    return {
      sidebarOpen,
      categories,
      user
    };
  }
);
