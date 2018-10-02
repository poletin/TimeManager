import {
  FETCH_HOLIDAYS,
  fetchHolidaysSuccess,
  HolidayAction,
  fetchHolidays
} from "../actions";

import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchCategoryData,
  updateCategory,
  uploadTimeRecordings,
  fetchTimesOfCategory,
  addCategory
} from "../api";

function* _fetchHoliday(action: HolidayAction) {
  const holidays: holidays.HolidayMap = yield call(fetchHolidays);
  yield put(fetchHolidaysSuccess(holidays));
}

export const holidaySagas = [takeLatest([FETCH_HOLIDAYS], _fetchHoliday)];
