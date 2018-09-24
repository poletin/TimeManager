import {
  UserAction,
  USER_SIGNIN_SUCCESS,
  fetchUserDataSuccess,
  SAVE_USER_SETTINGS
} from "../actions";
import { call, put, takeLatest, select } from "redux-saga/effects";
import {
  fetchUserData,
  saveUserSettings
} from "../api";
import { StoreState } from "../reducers";
import { UserState } from "../reducers/user";



function* _fetchUserData(action: UserAction) {
  const userData: { name: string } = yield call(fetchUserData);
  yield put(fetchUserDataSuccess(userData));
}

const getUserData = (state: StoreState) => state.user;

function* _saveUserSettings(action: UserAction) {
  const user: UserState = yield select(getUserData);
  yield call(saveUserSettings, user);
}

export const userSagas = [
  takeLatest([USER_SIGNIN_SUCCESS], _fetchUserData),
  takeLatest([SAVE_USER_SETTINGS], _saveUserSettings)
];
