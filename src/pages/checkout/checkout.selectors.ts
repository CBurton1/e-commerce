import { createSelector } from "@ngrx/store";

import { user } from "../../core/store/user/user.selectors";

export interface CheckoutState {
  user: ECS.User;
}

export const checkoutState = createSelector(
  user,
  (user): CheckoutState | undefined => {
    if (!user) {
      return;
    }

    return {
      user
    };
  }
);
