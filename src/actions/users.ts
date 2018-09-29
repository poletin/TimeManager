export const FETCH_USER_DATA_SUCCESS = "FETCH_USER_DATA_SUCCESS";
export type FETCH_USER_DATA_SUCCESS = typeof FETCH_USER_DATA_SUCCESS;
export interface FetchUserDataSuccess {
  type: FETCH_USER_DATA_SUCCESS;
  userData: user.User;
}
export function fetchUserDataSuccess(
  userData: user.User
): FetchUserDataSuccess {
  return {
    type: FETCH_USER_DATA_SUCCESS,
    userData: userData
  };
}

export const CHANGE_USER_SETTINGS = "CHANGE_USER_SETTINGS";
export type CHANGE_USER_SETTINGS = typeof CHANGE_USER_SETTINGS;
export interface ChangeUserSettings {
  type: CHANGE_USER_SETTINGS;
  newSettings: user.User;
}
export function changeUserSettings(newSettings: user.User): ChangeUserSettings {
  return {
    type: CHANGE_USER_SETTINGS,
    newSettings
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

export const SAVE_USER_SETTINGS_SUCCESS = "SAVE_USER_SETTINGS_SUCCESS";
export type SAVE_USER_SETTINGS_SUCCESS = typeof SAVE_USER_SETTINGS_SUCCESS;
export interface SaveUserSettingsSuccess {
  type: SAVE_USER_SETTINGS_SUCCESS;
}
export function saveUserSettingsSuccess(): SaveUserSettingsSuccess {
  return {
    type: SAVE_USER_SETTINGS_SUCCESS
  };
}

saveUserSettingsSuccess;

export type UserAction =
  | FetchUserDataSuccess
  | ChangeUserSettings
  | SaveUserSettings
  | SaveUserSettingsSuccess;
