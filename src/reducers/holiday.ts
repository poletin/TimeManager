import { HolidayAction } from "../actions";
import ToastService from "../utils/ToastService";
import { FETCH_HOLIDAYS, FETCH_HOLIDAYS_SUCCESS } from "../actions/holiday";

export interface HolidayState {
  holidays: holidays.HolidayMap;
}

const defaultValue: HolidayState = {
  holidays: {}
};

export default function holiday(
  state: HolidayState = defaultValue,
  action: HolidayAction
): HolidayState {
  switch (action.type) {
    case FETCH_HOLIDAYS_SUCCESS:
      return {
        ...state,
        holidays: {
          ...state.holidays,
          ...action.holidays
        }
      };
    default:
      return state;
  }
}
