import {
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
  categoryFetchTimesSuccess,
  AddCategory,
  ADD_CATEGORY,
  addCategorySuccess,
  CATEGORY_ADD_MANUAL_TIME,
  CategoryAddManualTime,
  FETCH_CATEGORY_DATA
} from "../actions";

import { call, put, takeLatest, select, takeEvery } from "redux-saga/effects";
import {
  fetchCategoryData,
  updateCategory,
  uploadTimeRecordings,
  fetchTimesOfCategory,
  addCategory
} from "../api";
import { StoreState } from "../reducers";
import NavigationService from "../utils/NavigationService";

function* _fetchCategoryData(action: AuthAction) {
  const categoryData: categories.CategoryMap = yield call(fetchCategoryData);
  yield put(fetchCategorySuccess(categoryData));
}

function* _updateRecording(
  action:
    | CategoryStartRecording
    | CategoryPauseRecording
    | CategoryAddManualTime
) {
  const getCategoryData = (state: StoreState) =>
    state.category.categories[action.categoryId];
  const category: categories.Single = yield select(getCategoryData);
  yield call(updateCategory, action.categoryId, category);
  if (
    action.type === CATEGORY_PAUSE_RECORDING ||
    action.type === CATEGORY_ADD_MANUAL_TIME
  ) {
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
  const times: times.Single[] = yield call(
    fetchTimesOfCategory,
    action.categoryId
  );
  yield put(categoryFetchTimesSuccess(action.categoryId, times));
}

function* _addCategory(action: AddCategory) {
  const newCategory: { id: string; category: categories.Single } = yield call(
    addCategory,
    action.settings
  );
  yield put(addCategorySuccess(newCategory.category, newCategory.id));
  yield NavigationService.navigate("Home");
}
export const categorySagas = [
  takeLatest([USER_SIGNIN_SUCCESS, FETCH_CATEGORY_DATA], _fetchCategoryData),
  takeEvery(
    [
      CATEGORY_START_RECORDING,
      CATEGORY_PAUSE_RECORDING,
      CATEGORY_ADD_MANUAL_TIME
    ],
    _updateRecording
  ),
  takeEvery([CHANGE_CATEGORY_SETTINGS], _updateCategorySettings),
  takeEvery([CATEGORY_FETCH_TIMES], _fetchTimes),
  takeEvery([ADD_CATEGORY], _addCategory)
];
