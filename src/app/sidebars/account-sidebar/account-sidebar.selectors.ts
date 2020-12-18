import { createSelector } from "@ngrx/store";

import { accountOpen } from "../../../store/sidebar/sidebar.selectors";
import { user } from "../../../store/user/user.selectors";

export interface AccountSidebarState {
  accountOpen: boolean | undefined;
  user: ECS.User | undefined;
}

export const accountSidebarState = createSelector(
  accountOpen,
  user,
  (accountOpen, user): AccountSidebarState | undefined => {
    return {
      accountOpen,
      user
    };
  }
);
