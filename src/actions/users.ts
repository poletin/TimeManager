export const FETCH_USER_DATA_SUCCESS = "FETCH_USER_DATA_SUCCESS";
export type FETCH_USER_DATA_SUCCESS = typeof FETCH_USER_DATA_SUCCESS;
export interface FetchUserDataSuccess {
  type: FETCH_USER_DATA_SUCCESS;
  userData: UserData;
}
export function fetchUserDataSuccess(userData: UserData): FetchUserDataSuccess {
  return {
    type: FETCH_USER_DATA_SUCCESS,
    userData: userData
  };
}

// TODO: Move Type
type UserData = {
  name: string;
};

export const USER_SETTING_CHANGED = "USER_SETTING_CHANGED";
export type USER_SETTING_CHANGED = typeof USER_SETTING_CHANGED;
export interface UserSettingChanged {
  type: USER_SETTING_CHANGED;
  key: keyof UserData;
  value: any;
}
export function userSettingChanged(
  key: keyof UserData,
  value: any
): UserSettingChanged {
  return {
    type: USER_SETTING_CHANGED,
    key,
    value
  };
}

export const SAVE_USER_SETTINGS = "SAVE_USER_SETTINGS";
export type SAVE_USER_SETTINGS = typeof SAVE_USER_SETTINGS;
export interface SaveUserSettings {
  type: SAVE_USER_SETTINGS;
}
export function saveUserSettings(): SaveUserSettings {
  return {
    type: SAVE_USER_SETTINGS
  };
}

export type UserAction =
  | FetchUserDataSuccess
  | UserSettingChanged
  | SaveUserSettings;
