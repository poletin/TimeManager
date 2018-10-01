import {
  CategoryAction,
  FETCH_CATEGORY_DATA_SUCCESS,
  CATEGORY_START_RECORDING,
  CATEGORY_PAUSE_RECORDING,
  CATEGORY_RECORDINGS_SENT,
  SELECT_CATEGORY,
  CHANGE_CATEGORY_SETTINGS,
  CATEGORY_FETCH_TIMES_SUCCESS
} from "../actions";
import moment from "moment";
import { calculateIntervalls } from "../utils/IntervallCalculations";

export interface CategoryState {
  categories: { [key: string]: categories.Single };
  unsentRecordings: categories.Recording[];
  categorySettings: categories.SettingsView;
}

const defaultValue: CategoryState = {
  categories: {},
  unsentRecordings: [],
  categorySettings: {
    selectedCategory: ""
  }
};

export default function category(
  state: CategoryState = defaultValue,
  action: CategoryAction
): CategoryState {
  switch (action.type) {
    case FETCH_CATEGORY_DATA_SUCCESS:
      const categories = calculateIntervalls(action.categoryData);
      return {
        ...state,
        categories: categories,
        categorySettings: {
          selectedCategory: Object.keys(categories)[0]
        }
      };
    case CATEGORY_START_RECORDING:
      const updatedCategory: categories.Single = {
        ...state.categories[action.categoryId],
        recordingData: {
          recordingRunning: true,
          started: new Date()
        }
      };
      return {
        ...state,
        categories: {
          ...state.categories,
          [action.categoryId]: updatedCategory
        }
      };
    case CATEGORY_PAUSE_RECORDING:
      const prevCategory = state.categories[action.categoryId];
      const startTime = moment(prevCategory.recordingData.started!);
      const currentTime = new Date();
      const stopTime = moment(currentTime);
      const duration = moment.duration(stopTime.diff(startTime));
      const minutes = duration.asMinutes();
      const updatedCategory2: categories.Single = {
        ...prevCategory,
        recordingData: {
          recordingRunning: false,
          started: null
        },
        total: prevCategory.total + minutes,
        times: prevCategory.times
          ? [
              ...prevCategory.times,
              {
                minutes: minutes,
                started: prevCategory.recordingData.started!,
                stopped: currentTime
              }
            ]
          : undefined
      };
      return {
        ...state,
        categories: {
          ...state.categories,
          [action.categoryId]: updatedCategory2
        },
        unsentRecordings: [
          ...state.unsentRecordings,
          {
            categoryId: action.categoryId,
            minutes: minutes,
            started: prevCategory.recordingData.started!,
            stopped: currentTime
          }
        ]
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
    case CATEGORY_FETCH_TIMES_SUCCESS:
      console.log("reducer");

      const updatedCategor4: categories.Single = {
        ...state.categories[action.categoryId],
        times: action.times
      };

      return {
        ...state,
        categories: {
          ...state.categories,
          [action.categoryId]: updatedCategor4
        }
      };
    default:
      return state;
  }
}
