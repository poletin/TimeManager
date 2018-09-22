import {
  USER_SIGNOUT,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_ANON,
  USER_SIGNOUT_SUCCESS,
  AuthAction,
  USER_SIGNIN_FAILED
} from "../actions";

export type AuthStateOption =
  | "checking"
  | "logging in"
  | "logging out"
  | "logged in"
  | "logged out";

export interface AuthState {
  state: AuthStateOption;
  busy: boolean;
}

const defaultValue: AuthState = {
  state: "checking",
  busy: true
};

export default function auth(
  state: AuthState = defaultValue,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case USER_SIGNIN_ANON:
      return { ...state, state: "logging in", busy: true };
    case USER_SIGNIN_SUCCESS:
      return { ...state, state: "logged in", busy: false };
    case USER_SIGNOUT:
      return { ...state, state: "logging out", busy: true };
    case USER_SIGNOUT_SUCCESS:
    case USER_SIGNIN_FAILED:
      return { ...state, state: "logged out", busy: false };
    default:
      return state;
  }
}
