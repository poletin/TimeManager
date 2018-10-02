import { combineReducers } from "redux";
import user, { UserState } from "./user";
import auth, { AuthState } from "./auth";
import holiday, { HolidayState } from "./holiday";
import category, { CategoryState } from "./category";
import { reducer as formReducer, FormStateMap } from "redux-form";

export interface StoreState {
  user: UserState;
  auth: AuthState;
  category: CategoryState;
  form: FormStateMap;
  holiday: HolidayState;
}

export default combineReducers<StoreState>({
  user: user,
  auth: auth,
  category: category,
  form: formReducer,
  holiday: holiday
});
