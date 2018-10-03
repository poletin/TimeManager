import {
  FETCH_HOLIDAYS,
  fetchHolidaysSuccess,
  FetchHolidays,
  saveHolidaySuccess,
  SAVE_HOLIDAY,
  SaveHoliday,
  FETCH_PUBLIC_HOLIDAYS,
  FetchPublicHolidays,
  fetchHolidays as fetchHolidaysAction
} from "../actions";

import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import {
  saveHoliday,
  fetchHolidays,
  fetchPublicHolidays,
  batchSaveHolidays
} from "../api";

import NavigationService from "../utils/NavigationService";
function* _fetchHoliday(action: FetchHolidays) {
  const holidays: holidays.HolidayMap = yield call(fetchHolidays);
  yield put(fetchHolidaysSuccess(holidays));
}

function* _saveHoliday(action: SaveHoliday) {
  const holidayId: string = yield call(saveHoliday, action.holiday);
  yield put(saveHolidaySuccess(action.holiday, holidayId));
  yield NavigationService.navigate("Holidays");
}

function* _fetchPublicHoliday(action: FetchPublicHolidays) {
  const holidays: holidays.Holiday[] = yield call(
    fetchPublicHolidays,
    action.state,
    action.year
  );
  yield call(batchSaveHolidays, holidays);
  yield put(fetchHolidaysAction()); // Fetch all holidays again instead of merging the new ones
}

export const holidaySagas = [
  takeLatest([FETCH_HOLIDAYS], _fetchHoliday),
  takeEvery([SAVE_HOLIDAY], _saveHoliday),
  takeLatest([FETCH_PUBLIC_HOLIDAYS], _fetchPublicHoliday)
];
