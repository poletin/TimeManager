import {
  UserAction,
  FETCH_USER_DATA_SUCCESS,
  CHANGE_USER_SETTINGS
} from "../actions";
import { RNFirebase } from "react-native-firebase";

export interface UserState extends user.User {}

const defaultValue: UserState = {
  name: "",
  dualStudent: false
};

export default function user(
  state: UserState = defaultValue,
  action: UserAction
): UserState {
  switch (action.type) {
    case FETCH_USER_DATA_SUCCESS:
      return { ...state, ...action.userData };
    case CHANGE_USER_SETTINGS:
      let newState = { ...state, ...action.newSettings };
      return newState;
    default:
      return state;
  }
}
