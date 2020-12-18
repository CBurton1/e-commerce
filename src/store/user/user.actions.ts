import { Action } from "@ngrx/store";

export enum UserActions {
  CREATE_USER = "user/CREATE_USER",
  CREATED_USER = "user/CREATED_USER",
  READ_CURRENT_USER = "user/READ_CURRENT_USER",
  RECEIVED_CURRENT_USER = "user/RECEIVED_CURRENT_USER",
  READ_USERS = "user/READ_USERS",
  RECEIVED_USERS = "user/RECEIVED_USERS",
  UPDATE_CURRENT_USER = "user/UPDATE_CURRENT_USER",
  UPDATED_CURRENT_USER = "user/UPDATED_CURRENT_USER",
  DELETE_USER = "user/DELETE_USER",
  DELETED_USER ="user/DELETED_USER"
}

export class CreateUser implements Action {
  readonly type = UserActions.CREATE_USER;
  constructor(public user: ECS.User) {}
}

export class CreatedUser implements Action {
  readonly type = UserActions.CREATED_USER;
  constructor(public user: ECS.User) {}
}

export class ReadCurrentUser implements Action {
  readonly type = UserActions.READ_CURRENT_USER;
  constructor() {}
}

export class ReceivedCurrentUser implements Action {
  readonly type = UserActions.RECEIVED_CURRENT_USER;
  constructor(public user: ECS.User) {}
}

export class ReadUsers implements Action {
  readonly type = UserActions.READ_USERS;
  constructor() {}
}

export class ReceivedUsers implements Action {
  readonly type = UserActions.RECEIVED_USERS;
  constructor(public users: ECS.User[]) {}
}

export class UpdateCurrentUser implements Action {
  readonly type = UserActions.UPDATE_CURRENT_USER;
  constructor(public user: ECS.User) {}
}

export class UpdatedCurrentUser implements Action {
  readonly type = UserActions.UPDATED_CURRENT_USER;
  constructor(public user: ECS.User) {}
}

export class DeleteUser implements Action {
  readonly type = UserActions.DELETE_USER;
  constructor(public userId: string) {}
}

export class DeletedUser implements Action {
  readonly type = UserActions.DELETED_USER;
  constructor(public userId: string) {}
}
