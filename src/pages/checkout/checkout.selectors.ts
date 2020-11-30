import { createSelector } from "@ngrx/store";

import { user } from "../../store/user/user.selectors";

export interface CheckoutState {
  user: ECS.User | undefined;
}

export const checkoutState = createSelector(
  user,
  (user): CheckoutState | undefined => {
    return {
      user
    };
  }
);
