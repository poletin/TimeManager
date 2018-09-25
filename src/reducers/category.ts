import {
  CategoryAction,
  FETCH_CATEGORY_DATA_SUCCESS,
  CATEGORY_START_RECORDING,
  CATEGORY_PAUSE_RECORDING
} from "../actions";

export interface CategoryState {
  categories: categories.Single[];
}

const defaultValue: CategoryState = {
  categories: []
};

export default function category(
  state: CategoryState = defaultValue,
  action: CategoryAction
): CategoryState {
  let newState = { ...state };
  switch (action.type) {
    case FETCH_CATEGORY_DATA_SUCCESS:
      const categories: categories.Single[] = action.categoryData.map(
        category => {
          const data = category.data() as categories.Single;
          return {
            name: category.id || "",
            total: data.total,
            currentRecording: data.currentRecording,
            recordingRunning: data.recordingRunning
          };
        }
      );

      return {
        ...state,
        categories: categories
      };
    case CATEGORY_START_RECORDING:
      newState.categories = newState.categories.map(cat => {
        if (cat.name === action.categoryId) {
          cat.recordingRunning = true;
          cat.currentRecording = new Date();
        }
        return cat;
      });
      return newState;
    case CATEGORY_PAUSE_RECORDING:
      newState = { ...state };
      newState.categories = newState.categories.map(cat => {
        if (cat.name === action.categoryId) {
          cat.recordingRunning = false;
          cat.total += 3;
        }
        return cat;
      });
      return newState;
    default:
      return state;
  }
}
