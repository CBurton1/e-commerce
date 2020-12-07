import { createSelector } from "@ngrx/store";

import { user } from "../../store/user/user.selectors";
import { categories } from "../../store/category/category.selectors";

export interface AdminState {
  user: ECS.User | undefined;
  categories: ECS.Category[] | undefined;
}

export const adminState = createSelector(
  user,
  categories,
  (user, categories): AdminState | undefined => {
    if (!categories) {
      return;
    }

    return {
      user,
      categories
    };
  }
);
