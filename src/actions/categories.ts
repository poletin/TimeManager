import { RNFirebase } from "react-native-firebase";

export const FETCH_CATEGORY_DATA_SUCCESS = "FETCH_CATEGORY_DATA_SUCCESS";
export type FETCH_CATEGORY_DATA_SUCCESS = typeof FETCH_CATEGORY_DATA_SUCCESS;
export interface FetchCategorySuccess {
  type: FETCH_CATEGORY_DATA_SUCCESS;
  categoryData: categories.CategoryMap;
}
export function fetchCategorySuccess(
  categoryData: categories.CategoryMap
): FetchCategorySuccess {
  return {
    type: FETCH_CATEGORY_DATA_SUCCESS,
    categoryData: categoryData
  };
}

export const FETCH_CATEGORY_DATA = "FETCH_CATEGORY_DATA";
export type FETCH_CATEGORY_DATA = typeof FETCH_CATEGORY_DATA;
export interface FetchCategoryData {
  type: FETCH_CATEGORY_DATA;
}
export function fetchCategoryData(): FetchCategoryData {
  return {
    type: FETCH_CATEGORY_DATA
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

export const ADD_CATEGORY = "ADD_CATEGORY";
export type ADD_CATEGORY = typeof ADD_CATEGORY;
export interface AddCategory {
  type: ADD_CATEGORY;
  settings: categories.SingleSettings;
}
export function addCategory(settings: categories.SingleSettings): AddCategory {
  return {
    type: ADD_CATEGORY,
    settings
  };
}

export const ADD_CATEGORY_SUCCESS = "ADD_CATEGORY_SUCCESS";
export type ADD_CATEGORY_SUCCESS = typeof ADD_CATEGORY_SUCCESS;
export interface AddCategorySuccess {
  type: ADD_CATEGORY_SUCCESS;
  category: categories.Single;
  id: string;
}
export function addCategorySuccess(
  category: categories.Single,
  id: string
): AddCategorySuccess {
  return {
    type: ADD_CATEGORY_SUCCESS,
    category,
    id
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

export const CATEGORY_FETCH_TIMES = "CATEGORY_FETCH_TIMES";
export type CATEGORY_FETCH_TIMES = typeof CATEGORY_FETCH_TIMES;
export interface CategoryFetchTimes {
  type: CATEGORY_FETCH_TIMES;
  categoryId: string;
}
export function categoryFetchTimes(id: string): CategoryFetchTimes {
  return {
    type: CATEGORY_FETCH_TIMES,
    categoryId: id
  };
}

export const CATEGORY_FETCH_TIMES_SUCCESS = "CATEGORY_FETCH_TIMES_SUCCESS";
export type CATEGORY_FETCH_TIMES_SUCCESS = typeof CATEGORY_FETCH_TIMES_SUCCESS;
export interface CategoryFetchTimesSuccess {
  type: CATEGORY_FETCH_TIMES_SUCCESS;
  categoryId: string;
  times: times.Single[];
}
export function categoryFetchTimesSuccess(
  id: string,
  times: times.Single[]
): CategoryFetchTimesSuccess {
  return {
    type: CATEGORY_FETCH_TIMES_SUCCESS,
    categoryId: id,
    times: times
  };
}

export const CATEGORY_ADD_MANUAL_TIME = "CATEGORY_ADD_MANUAL_TIME";
export type CATEGORY_ADD_MANUAL_TIME = typeof CATEGORY_ADD_MANUAL_TIME;
export interface CategoryAddManualTime {
  type: CATEGORY_ADD_MANUAL_TIME;
  categoryId: string;
  started: Date;
  stopped: Date;
}
export function categoryAddManualTime(
  categoryId: string,
  started: Date,
  stopped: Date
): CategoryAddManualTime {
  return {
    type: CATEGORY_ADD_MANUAL_TIME,
    categoryId,
    started,
    stopped
  };
}

export type CategoryAction =
  | FetchCategorySuccess
  | FetchCategoryData
  | CategoryStartRecording
  | CategoryPauseRecording
  | CategoryRecordingsSent
  | SelectCategory
  | ChangeCategorySettings
  | CategoryFetchTimes
  | CategoryFetchTimesSuccess
  | AddCategory
  | AddCategorySuccess
  | CategoryAddManualTime;
