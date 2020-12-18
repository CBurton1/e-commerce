import { createSelector } from "@ngrx/store";

import { user, users } from "../../store/user/user.selectors";
import { categories } from "../../store/category/category.selectors";

export interface AdminState {
  user: ECS.User | undefined;
  users: ECS.User[] | undefined;
  categories: ECS.Category[] | undefined;
}

export const adminState = createSelector(
  user,
  users,
  categories,
  (user, users, categories): AdminState | undefined => {
    if (!categories) {
      return;
    }

    return {
      user,
      users,
      categories
    };
  }
);
