import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { RouterNavigated, RouterActions } from "./router.actions";

@Injectable({
  providedIn: "root",
})
export class RouterEffectsService {
  constructor(private actions: Actions) {}

  @Effect()
  routerNavigated: Observable<Action> = this.actions.pipe(
    ofType(RouterActions.NAVIGATION),
    map(() => {
      window.scrollTo(0, 0);

      return new RouterNavigated();
    })
  );
}
