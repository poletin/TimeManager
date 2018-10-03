export const FETCH_HOLIDAYS = "FETCH_HOLIDAYS";
export type FETCH_HOLIDAYS = typeof FETCH_HOLIDAYS;
export interface FetchHolidays {
  type: FETCH_HOLIDAYS;
}
export function fetchHolidays(): FetchHolidays {
  return {
    type: FETCH_HOLIDAYS
  };
}

export const FETCH_HOLIDAYS_SUCCESS = "FETCH_HOLIDAYS_SUCCESS";
export type FETCH_HOLIDAYS_SUCCESS = typeof FETCH_HOLIDAYS_SUCCESS;
export interface FetchHolidaysSuccess {
  type: FETCH_HOLIDAYS_SUCCESS;
  holidays: holidays.HolidayMap;
}
export function fetchHolidaysSuccess(
  holidays: holidays.HolidayMap
): FetchHolidaysSuccess {
  return {
    type: FETCH_HOLIDAYS_SUCCESS,
    holidays
  };
}

export const SAVE_HOLIDAY = "SAVE_HOLIDAY";
export type SAVE_HOLIDAY = typeof SAVE_HOLIDAY;
export interface SaveHoliday {
  type: SAVE_HOLIDAY;
  holiday: holidays.Holiday;
}
export function saveHoliday(holiday: holidays.Holiday): SaveHoliday {
  console.log("SubmitAction", holiday.name);
  return {
    type: SAVE_HOLIDAY,
    holiday
  };
}

export const SAVE_HOLIDAY_SUCCESS = "SAVE_HOLIDAY_SUCCESS";
export type SAVE_HOLIDAY_SUCCESS = typeof SAVE_HOLIDAY_SUCCESS;
export interface SaveHolidaySuccess {
  type: SAVE_HOLIDAY_SUCCESS;
  holiday: holidays.Holiday;
  holidayId: string;
}
export function saveHolidaySuccess(
  holiday: holidays.Holiday,
  holidayId: string
): SaveHolidaySuccess {
  return {
    type: SAVE_HOLIDAY_SUCCESS,
    holiday,
    holidayId
  };
}

export type HolidayAction =
  | FetchHolidays
  | FetchHolidaysSuccess
  | SaveHoliday
  | SaveHolidaySuccess;
