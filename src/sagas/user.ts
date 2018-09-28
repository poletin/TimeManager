import {
  UserAction,
  USER_SIGNIN_SUCCESS,
  fetchUserDataSuccess,
  SAVE_USER_SETTINGS,
  CHANGE_USER_SETTINGS,
  ChangeUserSettings
} from "../actions";
import { call, put, takeLatest, select } from "redux-saga/effects";
import { fetchUserData, saveUserSettings } from "../api";
import { StoreState } from "../reducers";
import { UserState } from "../reducers/user";

function* _fetchUserData(action: UserAction) {
  const userData: user.User = yield call(fetchUserData);
  try {
    yield put(fetchUserDataSuccess(userData));
  } catch (error) {
    console.log(error);
  }
}

const getUserData = (state: StoreState) => state.user;

function* _saveUserSettings(action: ChangeUserSettings) {
  yield call(saveUserSettings, action.newSettings);
}

export const userSagas = [
  takeLatest([USER_SIGNIN_SUCCESS], _fetchUserData),
  takeLatest([CHANGE_USER_SETTINGS], _saveUserSettings)
];
