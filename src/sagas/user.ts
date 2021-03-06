import {
  UserAction,
  USER_SIGNIN_SUCCESS,
  fetchUserDataSuccess,
  CHANGE_USER_SETTINGS,
  ChangeUserSettings,
  saveUserSettingsSuccess
} from "../actions";
import { call, put, takeLatest } from "redux-saga/effects";
import { fetchUserData, saveUserSettings } from "../api";
import { StoreState } from "../reducers";

function* _fetchUserData(action: UserAction) {
  try {
    const userData: user.User = yield call(fetchUserData);
    yield put(fetchUserDataSuccess(userData));
  } catch (error) {
    console.error(error);
  }
}

const getUserData = (state: StoreState) => state.user;

function* _saveUserSettings(action: ChangeUserSettings) {
  yield call(saveUserSettings, action.newSettings);
  yield put(saveUserSettingsSuccess());
}

export const userSagas = [
  takeLatest([USER_SIGNIN_SUCCESS], _fetchUserData),
  takeLatest([CHANGE_USER_SETTINGS], _saveUserSettings)
];
