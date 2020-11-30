import { createSelector } from "@ngrx/store";

import { user } from "../../core/store/user/user.selectors";

export interface ProductState {
  user: ECS.User;
}

export const productState = createSelector(
  user,
  (user): ProductState | undefined => {
    if (!user) {
      return;
    }

    return {
      user
    };
  }
);
