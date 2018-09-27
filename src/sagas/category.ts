import {
  CategoryAction,
  USER_SIGNIN_SUCCESS,
  fetchCategorySuccess,
  CATEGORY_START_RECORDING,
  CATEGORY_PAUSE_RECORDING,
  AuthAction,
  CategoryStartRecording,
  CategoryPauseRecording,
  categoryRecordingsSent
} from "../actions";
import { RNFirebase } from "react-native-firebase";

import { call, put, takeLatest, select } from "redux-saga/effects";
import {
  fetchCategoryData,
  updateCategory,
  uploadTimeRecordings
} from "../api";
import { takeEvery } from "redux-saga";
import { StoreState } from "../reducers";
// import { StoreState } from "../reducers";
// import { CategoryState } from "../reducers/category";

function* _fetchCategoryData(action: AuthAction) {
  const categoryData: RNFirebase.firestore.DocumentSnapshot[] = yield call(
    fetchCategoryData
  );
  yield put(fetchCategorySuccess(categoryData));
}

function* _updateRecording(
  action: CategoryStartRecording | CategoryPauseRecording
) {
  const getCategoryData = (state: StoreState) =>
    state.category.categories[action.categoryId];
  const category: categories.Single = yield select(getCategoryData);
  yield call(updateCategory, action.categoryId, category);
  if (action.type === CATEGORY_PAUSE_RECORDING) {
    const getUnsentRecordings = (state: StoreState) =>
      state.category.unsentRecordings;
    const unsent: categories.Recording[] = yield select(getUnsentRecordings);
    yield call(uploadTimeRecordings, unsent);
    yield put(categoryRecordingsSent());
  }
}

export const categorySagas = [
  takeLatest([USER_SIGNIN_SUCCESS], _fetchCategoryData),
  takeEvery(
    [CATEGORY_START_RECORDING, CATEGORY_PAUSE_RECORDING],
    _updateRecording
  )
];
