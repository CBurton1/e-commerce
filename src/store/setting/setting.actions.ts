import { createAction, props } from "@ngrx/store";

export const createSetting = createAction(
  "[Create Setting Component] Create Setting",
  props<{setting: ECS.Setting}>()
);

export const createdSetting = createAction(
  "[Create Setting Component] Created Setting",
  props<{setting: ECS.Setting}>()
);

export const readSettings = createAction(
  "[Settings List] Read Settings via Service",
  props<{limit?: number}>()
);

export const receivedSettings = createAction(
  "[Settings List] Received Settings via Service",
  props<{settings: ECS.Setting[]}>()
);

export const updateSetting = createAction(
  "[Settings List Operations] Update Setting",
  props<{setting: ECS.Setting}>()
);

export const updatedSetting = createAction(
  "[Settings List Operations] Updated Setting",
  props<{setting: ECS.Setting}>()
);

export const deleteSetting = createAction(
  "[Settings List Operations] Delete Setting",
  props<{settingId: string}>()
);

export const deletedSetting = createAction(
  "[Settings List Operations] Deleted Setting",
  props<{settingId: string}>()
);

export const settingActionTypes = {
  createSetting,
  createdSetting,
  readSettings,
  receivedSettings,
  updateSetting,
  updatedSetting,
  deleteSetting,
  deletedSetting
};
