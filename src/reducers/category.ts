import { CategoryAction, FETCH_CATEGORY_DATA_SUCCESS } from "../actions";
import firebase, { RNFirebase } from "react-native-firebase";

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
  switch (action.type) {
    case FETCH_CATEGORY_DATA_SUCCESS:
      const categories: categories.Single[] = action.categoryData.map(
        category => {
          const data = category.data() as { total: number };
          return { name: category.id || "", total: data.total };
        }
      );

      return {
        ...state,
        categories: categories
      };
    default:
      return state;
  }
}
