import {
  userSignInSuccess,
  UserAction,
  USER_SIGNIN_ANON,
  USER_SIGNOUT,
  userSignOutSuccess,
  userSignInFailed
} from "../actions";
import { call, put, takeLatest } from "redux-saga/effects";
import { signInAnonym, signOut, generateTestData } from "../api";

function* _signInAnon(action: UserAction) {
  try {
    const user: firebase.User = yield call(signInAnonym);
    yield call(generateTestData, user.uid);
    yield put(userSignInSuccess(user.uid));
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
  takeLatest([USER_SIGNIN_ANON], _signInAnon),
  takeLatest([USER_SIGNOUT], _signOut)
];
