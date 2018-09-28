import {
  CategoryAction,
  FETCH_CATEGORY_DATA_SUCCESS,
  CATEGORY_START_RECORDING,
  CATEGORY_PAUSE_RECORDING,
  CATEGORY_RECORDINGS_SENT,
  SELECT_CATEGORY
} from "../actions";
import moment from "moment";

export interface CategoryState {
  categories: { [key: string]: categories.Single };
  unsentRecordings: categories.Recording[];
  categorySettings: categories.Settings;
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
      const categories = action.categoryData.reduce(
        (categoryMap: { [key: string]: categories.Single }, category) => {
          const data = category.data() as categories.Single;
          categoryMap[category.id || "none"] = {
            name: data.name || category.id || "",
            total: data.total,
            recordingData: data.recordingData || {
              started: null,
              recordingRunning: false
            }
          };
          return categoryMap;
        },
        {}
      );

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
      const startTime = moment(
        state.categories[action.categoryId].recordingData.started!
      );
      const currentTime = new Date();
      const stopTime = moment(currentTime);
      const duration = moment.duration(stopTime.diff(startTime));
      const minutes = duration.asMinutes();
      const updatedCategory2: categories.Single = {
        ...state.categories[action.categoryId],
        recordingData: {
          recordingRunning: false,
          started: null
        },
        total: state.categories[action.categoryId].total + minutes
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
            started: state.categories[action.categoryId].recordingData.started!,
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
    default:
      return state;
  }
}
