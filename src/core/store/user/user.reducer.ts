import { UserActions } from "./user.actions";

export interface State {
  user: ECS.User | undefined;
  isAdmin: boolean | undefined;
}

export const initialState: State = {
  user: undefined,
  isAdmin: undefined
};

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case UserActions.RECEIVED_USER:
      return { ...state, user: action.user, isAdmin: action.user && action.user.isAdmin };

    default:
      return state;
  }
}
