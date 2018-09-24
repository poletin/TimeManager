import { all } from "redux-saga/effects";
import { userSagas } from "./user";
import { authSagas } from "./auth";

export default function* rootSaga() {
  yield all([...userSagas, ...authSagas]);
}
