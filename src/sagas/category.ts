import {
  CategoryAction,
  USER_SIGNIN_SUCCESS,
  fetchCategorySuccess
} from "../actions";
import { RNFirebase } from "react-native-firebase";

import { call, put, takeLatest, select } from "redux-saga/effects";
import { fetchCategoryData } from "../api";
// import { StoreState } from "../reducers";
// import { CategoryState } from "../reducers/category";

function* _fetchCategoryData(action: CategoryAction) {
  // const categoryData: {{name: string, total: number}}
  const categoryData: RNFirebase.firestore.DocumentSnapshot[] = yield call(
    fetchCategoryData
  );
  yield put(fetchCategorySuccess(categoryData));
}

// const getCategoryData = (state: StoreState) => state.category;

export const categorySagas = [
  takeLatest([USER_SIGNIN_SUCCESS], _fetchCategoryData)
];
