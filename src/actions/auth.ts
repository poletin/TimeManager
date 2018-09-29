import { RNFirebase } from "react-native-firebase";

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

export const USER_SIGNIN_EMAIL = "USER_SIGNIN_EMAIL";
export type USER_SIGNIN_EMAIL = typeof USER_SIGNIN_EMAIL;
export interface UserSignInEmail {
  type: USER_SIGNIN_EMAIL;
  credentials: auth.LoginFormData;
}
export function userSignInEmail(
  credentials: auth.LoginFormData
): UserSignInEmail {
  return {
    type: USER_SIGNIN_EMAIL,
    credentials: credentials
  };
}

export const USER_SINGUP_EMAIL = "USER_SINGUP_EMAIL";
export type USER_SINGUP_EMAIL = typeof USER_SINGUP_EMAIL;
export interface UserSignUpEmail {
  type: USER_SINGUP_EMAIL;
  credentials: auth.LoginFormData;
}
export function userSignUpEmail(
  credentials: auth.LoginFormData
): UserSignUpEmail {
  return {
    type: USER_SINGUP_EMAIL,
    credentials: credentials
  };
}

export const USER_SIGNIN_SUCCESS = "USER_SIGNIN_SUCCESS";
export type USER_SIGNIN_SUCCESS = typeof USER_SIGNIN_SUCCESS;
export interface UserSignInSuccess {
  type: USER_SIGNIN_SUCCESS;
  user: RNFirebase.User;
}
export function userSignInSuccess(user: RNFirebase.User): UserSignInSuccess {
  return {
    type: USER_SIGNIN_SUCCESS,
    user: user
  };
}

export const USER_SIGNIN_FAILED = "USER_SIGNIN_FAILED";
export type USER_SIGNIN_FAILED = typeof USER_SIGNIN_FAILED;
export interface UserSignInFailed {
  type: USER_SIGNIN_FAILED;
}
export function userSignInFailed(): UserSignInFailed {
  return {
    type: USER_SIGNIN_FAILED
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

export type AuthAction =
  | UserSignInAnon
  | UserSignInEmail
  | UserSignUpEmail
  | UserSignInSuccess
  | UserSignInFailed
  | UserSignOut
  | UserSignOutSuccess;
