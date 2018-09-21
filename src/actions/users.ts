export const USER_SIGNIN_ANON = 'USER_SIGNIN_ANON';
export type USER_SIGNIN_ANON = typeof USER_SIGNIN_ANON;
export interface UserSignInAnon {
    type: USER_SIGNIN_ANON;
}
export function userSignInAnon(): UserSignInAnon {
    return {
        type: USER_SIGNIN_ANON
    };
}

export const USER_SIGNIN_SUCCESS = 'USER_SIGNIN_SUCCESS';
export type USER_SIGNIN_SUCCESS = typeof USER_SIGNIN_SUCCESS;
export interface UserSignInSuccess {
    type: USER_SIGNIN_SUCCESS,
    data: String
}
export function userSignInSuccess(data:String): UserSignInSuccess {
    return {
        type: USER_SIGNIN_SUCCESS,
        data: data
    };
}

export const USER_SIGNOUT = 'USER_SIGNOUT';
export type USER_SIGNOUT = typeof USER_SIGNOUT;
export interface UserSignOut {
    type: USER_SIGNOUT;
}
export function userSignOut(): UserSignOut {
    return {
        type: USER_SIGNOUT
    };
}

export type UserAction = UserSignInAnon | UserSignInSuccess | UserSignOut;