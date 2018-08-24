import { userSignInSuccess, UserAction, USER_SIGNIN_ANON } from "../actions";
import { call, put, takeLatest } from "redux-saga/effects";
import { signInAnonym } from "../api";
  
  
  function* _signInAnon(action: UserAction) {
    const user = yield call(signInAnonym);
    yield put(userSignInSuccess("This is data"));
  }
  
  export const userSagas = [
    takeLatest([USER_SIGNIN_ANON], _signInAnon)
  ];