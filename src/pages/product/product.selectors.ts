import { createSelector } from "@ngrx/store";

import { user } from "../../store/user/user.selectors";

export interface ProductState {
  user: ECS.User | undefined;
}

export const productState = createSelector(
  user,
  (user): ProductState | undefined => {
    return {
      user
    };
  }
);
