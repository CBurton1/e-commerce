import { createSelector } from "@ngrx/store";

import { queryParams } from "../../store/router/router.selectors";

export interface ActionState {
  code: string;
  mode: string;
}

export const actionState = createSelector(
  queryParams,
  (queryParams): ActionState => {
    return {
      code: queryParams.oobCode,
      mode: queryParams.mode
    };
  }
);
