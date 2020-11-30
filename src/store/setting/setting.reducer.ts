import { createReducer, on} from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter, Update } from "@ngrx/entity";

import { settingActionTypes } from "./setting.actions";

export interface SettingState extends EntityState<ECS.Setting> {}
export const adapter: EntityAdapter<ECS.Setting> = createEntityAdapter<ECS.Setting>();
export const initialState = adapter.getInitialState();

export const settingReducer = createReducer(
  initialState,
  // CRUD ACTIONS
  on(settingActionTypes.createdSetting, (state, action) => {
    return adapter.addOne(action.setting, state);
  }),

  on(settingActionTypes.receivedSettings, (state, action) => {
    return adapter.addMany(action.settings, state);
  }),

  on(settingActionTypes.updatedSetting, (state, action) => {
    const update: Update<ECS.Setting> = {
      id: action.setting.id,
      changes: action.setting
    };

    return adapter.updateOne(update, state);
  }),

  on(settingActionTypes.deletedSetting, (state, action) => {
    return adapter.removeOne(action.settingId, state);
  })
);
