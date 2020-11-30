import { Action } from "@ngrx/store";

export enum UserActions {
  GET_USER = "user/GET_USER",
  RECEIVED_USER = "user/RECEIVED_USER",
}

export class GetUser implements Action {
  readonly type = UserActions.GET_USER;
  constructor() {}
}

export class ReceivedUser implements Action {
  readonly type = UserActions.RECEIVED_USER;
  constructor(public user: ECS.User) {}
}
