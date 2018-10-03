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
import ToastService from "../utils/ToastService";

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
    case USER_SIGNIN_FAILED:
      handleError(action.error); // Intended fallthrough
    case USER_SIGNOUT_SUCCESS:
      return { ...state, status: "logged out", busy: false };
    default:
      return state;
  }
}

function handleError(error: RNFirebase.RnError) {
  let message = "Ein Fehler ist aufgetreten. Bitte versuche es erneut.";
  switch (error.code) {
    case "auth/invalid-email":
      message = "Ungültige E-Mail-Adresse";
      break;
    case "auth/user-disabled":
      message = "Der Benutzer wurde deaktiviert.";
      break;
    case "auth/user-not-found":
      message =
        "Der Benutzer wurde nicht gefunden. Versuche dich zu registrieren.";
      break;
    case "auth/wrong-password":
      message = "Falsches Passwort";
      break;
    case "auth/email-already-in-use":
      message = "Die E-Mail wird bereits verwendet. Versuche dich anzumelden.";
      break;
    case "auth/weak-password":
      message = "Das Passwort ist zu schwach.";
      break;
    case "auth/operation-not-allowed":
      // E-Mail Accounts are not enabled in firebase --> should not occur
      break;
  }
  ToastService.showError(message);
}
