import { all } from "redux-saga/effects";
import { userSagas } from "./user";
import { authSagas } from "./auth";
import { categorySagas } from "./category";
import { holidaySagas } from "./holiday";

export default function* rootSaga() {
  yield all([...userSagas, ...authSagas, ...categorySagas, ...holidaySagas]);
}
