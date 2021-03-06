import {
  CategoryAction,
  FETCH_CATEGORY_DATA_SUCCESS,
  CATEGORY_START_RECORDING,
  CATEGORY_PAUSE_RECORDING,
  CATEGORY_RECORDINGS_SENT,
  SELECT_CATEGORY,
  CHANGE_CATEGORY_SETTINGS,
  CATEGORY_FETCH_TIMES_SUCCESS,
  ADD_CATEGORY_SUCCESS,
  CATEGORY_ADD_MANUAL_TIME,
  FETCH_CATEGORY_DATA,
  HolidayAction,
  FETCH_HOLIDAYS_SUCCESS,
  SAVE_HOLIDAY_SUCCESS,
  SAVE_HOLIDAY,
  ADD_CATEGORY,
  CATEGORY_FETCH_TIMES,
  CHANGE_CATEGORY_SETTINGS_SUCCESS
} from "../actions";
import moment from "moment";
import {
  calculateIntervalls,
  isInInterval
} from "../utils/IntervallCalculations";
import NotificationService from "../utils/NotificationService";
import { calculateFinishedTime } from "../utils/TimeFunctions";
import ToastService from "../utils/ToastService";

export interface CategoryState {
  categories: { [key: string]: categories.Single };
  unsentRecordings: categories.Recording[];
  categorySettings: categories.SettingsView;
  isLoading: boolean;
  holidays: holidays.HolidayMap;
}

const defaultValue: CategoryState = {
  categories: {},
  unsentRecordings: [],
  categorySettings: {
    selectedCategory: ""
  },
  isLoading: true,
  holidays: {}
};

export default function category(
  state: CategoryState = defaultValue,
  action: CategoryAction | HolidayAction
): CategoryState {
  switch (action.type) {
    case FETCH_CATEGORY_DATA:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_CATEGORY_DATA_SUCCESS:
      const categories = calculateIntervalls(
        action.categoryData,
        state.holidays
      );
      return {
        ...state,
        categories: categories,
        categorySettings: {
          selectedCategory: Object.keys(categories)[0]
        },
        isLoading: false
      };
    case ADD_CATEGORY:
      return {
        ...state,
        isLoading: true
      };
    case ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: {
          ...state.categories,
          [action.id]: action.category
        },
        isLoading: false
      };
    case CATEGORY_START_RECORDING:
      const updatedCategory: categories.Single = {
        ...state.categories[action.categoryId],
        recordingData: {
          recordingRunning: true,
          started: new Date()
        }
      };

      const requiredMinutes = updatedCategory.isIntervall
        ? parseFloat(updatedCategory.weeklyTarget) * 60 - updatedCategory.total
        : -updatedCategory.total;

      const finishedTime = calculateFinishedTime(requiredMinutes);
      if (moment().isBefore(finishedTime)) {
        NotificationService.scheduleCategoryDoneNotification(
          action.categoryId,
          updatedCategory.name,
          finishedTime
        );
      }
      return {
        ...state,
        categories: {
          ...state.categories,
          [action.categoryId]: updatedCategory
        }
      };
    case CATEGORY_PAUSE_RECORDING:
      const prevCategory = state.categories[action.categoryId];
      const stopTime = new Date();
      const results = updateCategoryTime(
        prevCategory.recordingData.started!,
        stopTime,
        prevCategory,
        action.categoryId
      );
      const newRecording = results.newRecording;
      const updatedCategory2 = results.updatedCategory;
      NotificationService.cancelNotificationIfExists(action.categoryId);
      return {
        ...state,
        categories: {
          ...state.categories,
          [action.categoryId]: updatedCategory2
        },
        unsentRecordings: [...state.unsentRecordings, newRecording]
      };
    case CATEGORY_ADD_MANUAL_TIME:
      const oldCategory = state.categories[action.categoryId];
      const addTimeResults = updateCategoryTime(
        action.started,
        action.stopped,
        oldCategory,
        action.categoryId
      );
      const newAddedRecording = addTimeResults.newRecording;
      const updatedCategory_Added = addTimeResults.updatedCategory;
      return {
        ...state,
        categories: {
          ...state.categories,
          [action.categoryId]: updatedCategory_Added
        },
        unsentRecordings: [...state.unsentRecordings, newAddedRecording]
      };
    case CATEGORY_RECORDINGS_SENT:
      return {
        ...state,
        unsentRecordings: []
      };
    case SELECT_CATEGORY:
      return {
        ...state,
        categorySettings: {
          selectedCategory: action.selectedCategory
        }
      };
    case CHANGE_CATEGORY_SETTINGS:
      const updatedCategory3: categories.Single = {
        ...state.categories[action.selectedCategory],
        ...action.updatedSettings
      };

      return {
        ...state,
        categories: {
          ...state.categories,
          [action.selectedCategory]: updatedCategory3
        }
      };
    case CHANGE_CATEGORY_SETTINGS_SUCCESS:
      ToastService.showSuccess("Kategorieeinstellungen gespeichert.");
      return state;
    case CATEGORY_FETCH_TIMES:
      return {
        ...state,
        isLoading: true
      };
    case CATEGORY_FETCH_TIMES_SUCCESS:
      const updatedCategor4: categories.Single = {
        ...state.categories[action.categoryId],
        times: action.times
      };

      return {
        ...state,
        categories: {
          ...state.categories,
          [action.categoryId]: updatedCategor4
        },
        isLoading: false
      };
    case FETCH_HOLIDAYS_SUCCESS:
      return {
        ...state,
        holidays: {
          ...state.holidays,
          ...action.holidays
        }
      };
    case SAVE_HOLIDAY:
      return {
        ...state,
        isLoading: true
      };
    case SAVE_HOLIDAY_SUCCESS:
      return {
        ...state,
        holidays: {
          ...state.holidays,
          [action.holidayId]: action.holiday
        },
        isLoading: false
      };

    default:
      return state;
  }
}
function updateCategoryTime(
  startTime: Date,
  stopTime: Date,
  prevCategory: categories.Single,
  categoryId: string
) {
  const stopMoment = moment(stopTime);
  const duration = moment.duration(stopMoment.diff(startTime));
  const minutes = duration.asMinutes();

  const timeData: times.Single = {
    minutes: minutes,
    started: startTime,
    stopped: stopTime
  };

  const updatedCategory: categories.Single = {
    ...prevCategory,
    recordingData: {
      recordingRunning: false,
      started: null
    },
    total: isInInterval(prevCategory, startTime)
      ? prevCategory.total + minutes
      : prevCategory.total,
    times: prevCategory.times ? [...prevCategory.times, timeData] : undefined
  };
  const newRecording: categories.Recording = {
    ...timeData,
    categoryId: categoryId
  };
  return { updatedCategory, newRecording };
}
