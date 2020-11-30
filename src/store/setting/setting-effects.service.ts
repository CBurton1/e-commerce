import { settingActionTypes } from "./setting.actions";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";
import { Injectable } from "@angular/core";

import { SettingService } from "../../services/setting.service";

@Injectable()
export class SettingEffectsService {
  constructor(
    private settingService: SettingService,
    private actions: Actions
  ) {}

  public createSetting = createEffect(() =>
    this.actions.pipe(
      ofType(settingActionTypes.createSetting),
      concatMap((action) => this.settingService.createSetting(action.setting)),
      map((setting) => settingActionTypes.createdSetting({ setting }))
    )
  );


  public readSettings = createEffect(() =>
    this.actions.pipe(
      ofType(settingActionTypes.readSettings),
      concatMap(() => this.settingService.readSettings()),
      map((settings) => settingActionTypes.receivedSettings({ settings }))
    )
  );

  public updateSetting = createEffect(() =>
    this.actions.pipe(
      ofType(settingActionTypes.updateSetting),
      concatMap((action) => this.settingService.updateSetting(action.setting)),
      map((setting) => settingActionTypes.updatedSetting({ setting }))
    )
  );

  public deleteSetting = createEffect(() =>
    this.actions.pipe(
      ofType(settingActionTypes.deleteSetting),
      concatMap((action) => this.settingService.deleteSetting(action.settingId)),
      map((settingId) => settingActionTypes.deletedSetting({ settingId }))
    )
  );
}

