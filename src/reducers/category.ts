import {
  CategoryAction,
  FETCH_CATEGORY_DATA_SUCCESS,
  CATEGORY_START_RECORDING,
  CATEGORY_PAUSE_RECORDING
} from "../actions";

export interface CategoryState {
  categories: { [key: string]: categories.Single };
}

const defaultValue: CategoryState = {
  categories: {}
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
            currentRecording: data.currentRecording,
            recordingRunning: data.recordingRunning
          };
          return categoryMap;
        },
        {}
      );

      return {
        ...state,
        categories: categories
      };
    case CATEGORY_START_RECORDING:
      const updatedCategory = {
        ...state.categories[action.categoryId],
        recordingRunning: true,
        currentRecording: new Date()
      };
      return {
        ...state,
        categories: {
          ...state.categories,
          [action.categoryId]: updatedCategory
        }
      };
    case CATEGORY_PAUSE_RECORDING:
      const updatedCategory2 = {
        ...state.categories[action.categoryId],
        recordingRunning: false,
        currentRecording: null
      };
      return {
        ...state,
        categories: {
          ...state.categories,
          [action.categoryId]: updatedCategory2
        }
      };

    default:
      return state;
  }
}
