import { createSelector } from "@ngrx/store";

import { user } from "../../store/user/user.selectors";

export interface ShopState {
  user: ECS.User | undefined;
}

export const shopState = createSelector(
  user,
  (user): ShopState | undefined => {
    return {
      user
    };
  }
);
