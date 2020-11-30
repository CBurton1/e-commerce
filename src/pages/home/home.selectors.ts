import { createSelector } from "@ngrx/store";

import { user } from "../../store/user/user.selectors";
import { categories } from "../../store/category/category.selectors";

export interface HomeState {
  user: ECS.User | undefined;
  categories: ECS.Category[];
}

export const homeState = createSelector(
  user,
  categories,
  (user, categories): HomeState | undefined | any => {
    if (!categories) {
      return;
    }

    return {
      user,
      categories
    };
  }
);
