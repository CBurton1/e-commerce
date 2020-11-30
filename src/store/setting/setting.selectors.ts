import { createSelector } from "@ngrx/store";

import { SettingState } from "./setting.reducer";

export const settingState = (state: any): SettingState => {
  return state.setting;
};

export const settings = createSelector(
  settingState,
  (state): ECS.Setting[] | undefined => {
    if (!state.entities) {
      return;
    }

    return Object.values(state.entities) as ECS.Setting[];
  }
);

export const settingIds = createSelector(
  settingState,
  (state): string[] | number[] | undefined => {
    if (!state.ids) {
      return;
    }

    return state.ids;
  }
);
