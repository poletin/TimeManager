import {
  UserAction,
  FETCH_USER_DATA_SUCCESS,
  USER_SETTING_CHANGED
} from "../actions";
import { RNFirebase } from "react-native-firebase";

export interface UserState {
  name: string;
}

const defaultValue: UserState = {
  name: ""
};

export default function user(
  state: UserState = defaultValue,
  action: UserAction
): UserState {
  switch (action.type) {
    case FETCH_USER_DATA_SUCCESS:
      return { ...state, name: action.userData.name };
    case USER_SETTING_CHANGED:
      let newState = { ...state };
      newState[action.key] = action.value;
      return newState;
    default:
      return state;
  }
}
