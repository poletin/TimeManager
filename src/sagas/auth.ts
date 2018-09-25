import {
  userSignInSuccess,
  UserAction,
  USER_SIGNIN_ANON,
  USER_SIGNOUT,
  userSignOutSuccess,
  userSignInFailed,
  USER_SIGNIN_EMAIL,
  UserSignInEmail,
  UserSignInAnon
} from "../actions";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  signInAnonym,
  signOut,
  generateTestData,
  signInEmail,
  signUpEmail
} from "../api";
import { RNFirebase } from "react-native-firebase";

function* _signIn(action: UserSignInEmail | UserSignInAnon) {
  try {
    let user: RNFirebase.User;
    if (action.type === USER_SIGNIN_EMAIL) {
      if (
        action.credentials.pressedButton &&
        action.credentials.pressedButton === "signUp"
      ) {
        user = yield call(signUpEmail, action.credentials);
        yield call(generateTestData, user.uid);
      } else {
        user = yield call(signInEmail, action.credentials);
      }
    } else {
      user = yield call(signInAnonym);
      yield call(generateTestData, user.uid);
    }
    yield put(userSignInSuccess(user));
  } catch (error) {
    console.error(error);
    yield put(userSignInFailed());
  }
}

function* _signOut(action: UserAction) {
  yield call(signOut);
  yield put(userSignOutSuccess());
}

export const authSagas = [
  takeLatest([USER_SIGNIN_ANON, USER_SIGNIN_EMAIL], _signIn),
  takeLatest([USER_SIGNOUT], _signOut)
];
