import {
  FETCH_HOLIDAYS,
  fetchHolidaysSuccess,
  FetchHolidays,
  saveHolidaySuccess,
  SAVE_HOLIDAY,
  SaveHoliday
} from "../actions";

import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import { saveHoliday, fetchHolidays } from "../api";

import NavigationService from "../utils/NavigationService";
function* _fetchHoliday(action: FetchHolidays) {
  console.log("SagaBeforeFetch");
  const holidays: holidays.HolidayMap = yield call(fetchHolidays);

  console.log("SagaAfterFetch");
  yield put(fetchHolidaysSuccess(holidays));
}

function* _saveHoliday(action: SaveHoliday) {
  console.log("SubmitSagaBefore", action.holiday.name);
  const holidayId: string = yield call(saveHoliday, action.holiday);
  console.log("SagaAfter", holidayId, action.holiday);
  yield put(saveHolidaySuccess(action.holiday, holidayId));
  yield NavigationService.navigate("Holidays");
}

export const holidaySagas = [
  takeLatest([FETCH_HOLIDAYS], _fetchHoliday),
  takeEvery([SAVE_HOLIDAY], _saveHoliday)
];