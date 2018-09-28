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

export const CATEGORY_START_RECORDING = "CATEGORY_START_RECORDING";
export type CATEGORY_START_RECORDING = typeof CATEGORY_START_RECORDING;
export interface CategoryStartRecording {
  type: CATEGORY_START_RECORDING;
  categoryId: string;
}
export function categoryStartRecording(id: string): CategoryStartRecording {
  return {
    type: CATEGORY_START_RECORDING,
    categoryId: id
  };
}

export const CATEGORY_PAUSE_RECORDING = "CATEGORY_PAUSE_RECORDING";
export type CATEGORY_PAUSE_RECORDING = typeof CATEGORY_PAUSE_RECORDING;
export interface CategoryPauseRecording {
  type: CATEGORY_PAUSE_RECORDING;
  categoryId: string;
}
export function categoryPauseRecording(id: string): CategoryPauseRecording {
  return {
    type: CATEGORY_PAUSE_RECORDING,
    categoryId: id
  };
}

export const CATEGORY_RECORDINGS_SENT = "CATEGORY_RECORDINGS_SENT";
export type CATEGORY_RECORDINGS_SENT = typeof CATEGORY_RECORDINGS_SENT;
export interface CategoryRecordingsSent {
  type: CATEGORY_RECORDINGS_SENT;
}
export function categoryRecordingsSent(): CategoryRecordingsSent {
  return {
    type: CATEGORY_RECORDINGS_SENT
  };
}
export const SELECT_CATEGORY = "SELECT_CATEGORY";
export type SELECT_CATEGORY = typeof SELECT_CATEGORY;
export interface SelectCategory {
  type: SELECT_CATEGORY;
  selectedCategory: string;
}
export function selectCategory(id: string): SelectCategory {
  return {
    type: SELECT_CATEGORY,
    selectedCategory: id
  };
}

export const CHANGE_CATEGORY_SETTINGS = "CHANGE_CATEGORY_SETTINGS";
export type CHANGE_CATEGORY_SETTINGS = typeof CHANGE_CATEGORY_SETTINGS;
export interface ChangeCategorySettings {
  type: CHANGE_CATEGORY_SETTINGS;
  selectedCategory: string;
  updatedSettings: categories.SingleSettings;
}
export function changeCategorySettings(
  id: string,
  updatedSettings: categories.SingleSettings
): ChangeCategorySettings {
  return {
    type: CHANGE_CATEGORY_SETTINGS,
    selectedCategory: id,
    updatedSettings
  };
}

export type CategoryAction =
  | FetchCategorySuccess
  | CategoryStartRecording
  | CategoryPauseRecording
  | CategoryRecordingsSent
  | SelectCategory
  | ChangeCategorySettings;
