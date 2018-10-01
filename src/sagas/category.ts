import {
  CategoryAction,
  USER_SIGNIN_SUCCESS,
  fetchCategorySuccess,
  CATEGORY_START_RECORDING,
  CATEGORY_PAUSE_RECORDING,
  AuthAction,
  CategoryStartRecording,
  CategoryPauseRecording,
  categoryRecordingsSent,
  ChangeCategorySettings,
  CHANGE_CATEGORY_SETTINGS,
  CATEGORY_FETCH_TIMES,
  CategoryFetchTimes,
  categoryFetchTimesSuccess
} from "../actions";
import { RNFirebase } from "react-native-firebase";

import { call, put, takeLatest, select, takeEvery } from "redux-saga/effects";
import {
  fetchCategoryData,
  updateCategory,
  uploadTimeRecordings,
  fetchTimesOfCategory
} from "../api";
import { StoreState } from "../reducers";
// import { StoreState } from "../reducers";
// import { CategoryState } from "../reducers/category";

function* _fetchCategoryData(action: AuthAction) {
  const categoryData: { [key: string]: categories.Single } = yield call(
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

function* _updateCategorySettings(action: ChangeCategorySettings) {
  yield call(updateCategory, action.selectedCategory, action.updatedSettings);
}

function* _fetchTimes(action: CategoryFetchTimes) {
  console.log("saga1");
  const times: times.Single[] = yield call(
    fetchTimesOfCategory,
    action.categoryId
  );
  console.log("saga2");
  yield put(categoryFetchTimesSuccess(action.categoryId, times));
  console.log("saga3");
}

export const categorySagas = [
  takeLatest([USER_SIGNIN_SUCCESS], _fetchCategoryData),
  takeEvery(
    [CATEGORY_START_RECORDING, CATEGORY_PAUSE_RECORDING],
    _updateRecording
  ),
  takeEvery([CHANGE_CATEGORY_SETTINGS], _updateCategorySettings),
  takeEvery([CATEGORY_FETCH_TIMES], _fetchTimes)
];
