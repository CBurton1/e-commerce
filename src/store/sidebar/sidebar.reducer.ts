import { SidebarActions } from "./sidebar.actions";

export interface State {
  bagOpen: boolean;
  accountOpen: boolean;
  searchOpen: boolean;
}

export const initialState: State = {
  accountOpen: false,
  bagOpen: false,
  searchOpen: false
};

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case SidebarActions.TOGGLE_ACCOUNT:
      return { ...state, accountOpen: !state.accountOpen, bagOpen: false, searchOpen: false };

    case SidebarActions.TOGGLE_BAG:
      return { ...state, accountOpen: false, bagOpen: !state.bagOpen, searchOpen: false };

    case SidebarActions.TOGGLE_SEARCH:
      return { ...state, accountOpen: false, bagOpen: false, searchOpen: !state.searchOpen };

    default:
      return state;
  }
}
