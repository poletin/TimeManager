import {
  UserAction,
  FETCH_USER_DATA_SUCCESS,
  CHANGE_USER_SETTINGS,
  SAVE_USER_SETTINGS_SUCCESS
} from "../actions";
import ToastService from "../utils/ToastService";

export interface UserState extends user.User {}

const defaultValue: UserState = {
  name: ""
};

export default function user(
  state: UserState = defaultValue,
  action: UserAction
): UserState {
  switch (action.type) {
    case FETCH_USER_DATA_SUCCESS:
      return { ...state, ...action.userData };
    case CHANGE_USER_SETTINGS:
      return { ...state, ...action.newSettings };
    case SAVE_USER_SETTINGS_SUCCESS:
      ToastService.showSuccess("Benutzer gespeichert.");
      return state;
    default:
      return state;
  }
}
