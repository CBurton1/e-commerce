import { Params } from "@angular/router";
import { routerReducer, RouterReducerState } from "@ngrx/router-store";

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export type State = RouterReducerState<RouterStateUrl>;
export const reducer = routerReducer;
