import { CategoryAction, FETCH_CATEGORY_DATA_SUCCESS } from "../actions";
import firebase, { RNFirebase } from "react-native-firebase";

export interface SingleCategory {
  name: string;
  total: number;
}

export interface CategoryState {
  categories: SingleCategory[];
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
      const categories: SingleCategory[] = action.categoryData.map(category => {
        const data = category.data() as { total: number };
        return { name: category.id || "", total: data.total };
      });

      return {
        ...state,
        categories: categories
      };
    default:
      return state;
  }
}
