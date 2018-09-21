import {
    UserAction, USER_SIGNOUT,USER_SIGNIN_SUCCESS, USER_SIGNIN_ANON
} from '../actions';

export interface UserState {
    loggedIn: boolean
}

const defaultValue: UserState = {
    loggedIn: false
};

export default function user(
    state: UserState = defaultValue,
    action: UserAction
): UserState {
    switch (action.type) {
        case USER_SIGNIN_ANON: 
            return {...state};
        case USER_SIGNIN_SUCCESS:
            return { ...state, loggedIn: true};
        case USER_SIGNOUT:
            return { ...state, loggedIn: false};
        default:
            return state;
    }
}