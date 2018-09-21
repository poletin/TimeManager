export const USER_SIGNIN_ANON = "USER_SIGNIN_ANON";
export type USER_SIGNIN_ANON = typeof USER_SIGNIN_ANON;
export interface UserSignInAnon {
  type: USER_SIGNIN_ANON;
}
export function userSignInAnon(): UserSignInAnon {
  return {
    type: USER_SIGNIN_ANON
  };
}

export const USER_SIGNIN_SUCCESS = "USER_SIGNIN_SUCCESS";
export type USER_SIGNIN_SUCCESS = typeof USER_SIGNIN_SUCCESS;
export interface UserSignInSuccess {
  type: USER_SIGNIN_SUCCESS;
  uid: string;
}
export function userSignInSuccess(uid: string): UserSignInSuccess {
  return {
    type: USER_SIGNIN_SUCCESS,
    uid: uid
  };
}

export const USER_SIGNOUT = "USER_SIGNOUT";
export type USER_SIGNOUT = typeof USER_SIGNOUT;
export interface UserSignOut {
  type: USER_SIGNOUT;
}
export function userSignOut(): UserSignOut {
  return {
    type: USER_SIGNOUT
  };
}

export const USER_SIGNOUT_SUCCESS = "USER_SIGNOUT_SUCCESS";
export type USER_SIGNOUT_SUCCESS = typeof USER_SIGNOUT_SUCCESS;
export interface UserSignOutSuccess {
  type: USER_SIGNOUT_SUCCESS;
}
export function userSignOutSuccess(): UserSignOutSuccess {
  return {
    type: USER_SIGNOUT_SUCCESS
  };
}

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
  | UserSignInAnon
  | UserSignInSuccess
  | UserSignOut
  | UserSignOutSuccess
  | FetchUserDataSuccess
  | UserSettingChanged
  | SaveUserSettings;
