import { RNFirebase } from "react-native-firebase";

export const FETCH_CATEGORY_DATA_SUCCESS = "FETCH_CATEGORY_DATA_SUCCESS";
export type FETCH_CATEGORY_DATA_SUCCESS = typeof FETCH_CATEGORY_DATA_SUCCESS;
export interface FetchCategorySuccess {
  type: FETCH_CATEGORY_DATA_SUCCESS;
  categoryData: RNFirebase.firestore.DocumentSnapshot[];
}
export function fetchCategorySuccess(
  categoryData: RNFirebase.firestore.DocumentSnapshot[]
): FetchCategorySuccess {
  return {
    type: FETCH_CATEGORY_DATA_SUCCESS,
    categoryData: categoryData
  };
}

export type CategoryAction = FetchCategorySuccess;
