import {
  UserAction,
  USER_SIGNOUT,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_ANON,
  USER_SIGNOUT_SUCCESS,
  FETCH_USER_DATA_SUCCESS,
  USER_SETTING_CHANGED
} from "../actions";

export interface UserState {
  loggedIn: boolean;
  name: string;
}

const defaultValue: UserState = {
  loggedIn: false,
  name: ""
};

export default function user(
  state: UserState = defaultValue,
  action: UserAction
): UserState {
  switch (action.type) {
    case USER_SIGNIN_ANON:
      return { ...state };
    case USER_SIGNIN_SUCCESS:
      return { ...state, loggedIn: true };
    case USER_SIGNOUT:
      return { ...state };
    case USER_SIGNOUT_SUCCESS:
      return { ...state, loggedIn: false, name: "" };
    case FETCH_USER_DATA_SUCCESS:
      return { ...state, name: action.userData.name };
    case USER_SETTING_CHANGED:
      let newState = { ...state };
      newState[action.key] = action.value;
      return newState;
    default:
      return state;
  }
}
