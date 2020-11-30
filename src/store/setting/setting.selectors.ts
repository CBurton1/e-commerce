import { createSelector } from "@ngrx/store";

import { State } from "./setting.reducer";

export const settingState = (state: any): State => {
  return state.setting;
};
