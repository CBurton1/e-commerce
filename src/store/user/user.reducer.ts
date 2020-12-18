import { UserActions } from "./user.actions";
import { cloneDeep } from '../../utils/clone';

export interface State {
  currentUser: ECS.User | undefined;
  users: ECS.User[] | undefined;
}

export const initialState: State = {
  currentUser: undefined,
  users: undefined
};

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case UserActions.CREATED_USER:
    case UserActions.RECEIVED_CURRENT_USER: {
      return { ...state, currentUser: action.user };
    }

    case UserActions.RECEIVED_USERS: {
      return { ...state, users: action.users };
    }

    case UserActions.UPDATED_CURRENT_USER: {
      const users = cloneDeep(state.users);
      const userIndex = users.find((user: ECS.User) => user.id === action.user.id);
      users[userIndex] = action.user;

      return { ...state, users };
    }

    case UserActions.DELETED_USER: {
      const users = cloneDeep(state.users);
      const userIndex = users.find((user: ECS.User) => user.id === action.user.id);

      users.splice(userIndex, 1);

      return { ...state, users };
    }

    default:
      return state;
  }
}
