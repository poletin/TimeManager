import {
  userSignInSuccess,
  UserAction,
  USER_SIGNIN_ANON,
  USER_SIGNOUT,
  userSignOutSuccess,
  userSignInFailed,
  USER_SIGNIN_EMAIL,
  UserSignInEmail,
  UserSignInAnon,
  USER_SINGUP_EMAIL,
  UserSignUpEmail
} from "../actions";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  signInAnonym,
  signOut,
  generateInitialData,
  signInEmail,
  signUpEmail
} from "../api";
import { RNFirebase } from "react-native-firebase";

function* _signIn(action: UserSignInEmail | UserSignInAnon | UserSignUpEmail) {
  try {
    let user: RNFirebase.User;
    switch (action.type) {
      case USER_SIGNIN_EMAIL:
        user = yield call(signInEmail, action.credentials);
        break;
      case USER_SINGUP_EMAIL:
        user = yield call(signUpEmail, action.credentials);
        yield call(generateInitialData, user.uid, action.credentials.name);
        break;
      case USER_SIGNIN_ANON:
        user = yield call(signInAnonym);
        yield call(generateInitialData, user.uid);
        break;
      default:
        throw "Unhandled Action";
    }
    yield put(userSignInSuccess(user));
  } catch (error) {
    const e: RNFirebase.RnError = error;
    yield put(userSignInFailed(e));
  }
}

function* _signOut(action: UserAction) {
  yield call(signOut);
  yield put(userSignOutSuccess());
}

export const authSagas = [
  takeLatest([USER_SIGNIN_ANON, USER_SIGNIN_EMAIL, USER_SINGUP_EMAIL], _signIn),
  takeLatest([USER_SIGNOUT], _signOut)
];
