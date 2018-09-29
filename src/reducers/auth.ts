import {
  USER_SIGNOUT,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_ANON,
  USER_SIGNOUT_SUCCESS,
  AuthAction,
  USER_SIGNIN_FAILED,
  USER_SIGNIN_EMAIL,
  USER_SINGUP_EMAIL
} from "../actions";
import { RNFirebase } from "react-native-firebase";

export interface AuthState {
  firebaseUser: RNFirebase.User | null;
  status: auth.Status;
  busy: boolean;
}

const defaultValue: AuthState = {
  firebaseUser: null,
  status: "checking",
  busy: true
};

export default function auth(
  state: AuthState = defaultValue,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case USER_SIGNIN_ANON:
    case USER_SIGNIN_EMAIL:
    case USER_SINGUP_EMAIL:
      return { ...state, status: "logging in", busy: true };
    case USER_SIGNIN_SUCCESS:
      return { ...state, status: "logged in", busy: false };
    case USER_SIGNOUT:
      return { ...state, status: "logging out", busy: true };
    case USER_SIGNOUT_SUCCESS:
    case USER_SIGNIN_FAILED:
      return { ...state, status: "logged out", busy: false };
    default:
      return state;
  }
}
