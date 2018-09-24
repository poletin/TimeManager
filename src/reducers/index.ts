import enthusiasm, { EnthusiasmState } from "./enthusiasm";
import { combineReducers } from "redux";
import user, { UserState } from "./user";
import auth, { AuthState } from "./auth";

export interface StoreState {
  enthusiasm: EnthusiasmState;
  user: UserState;
  auth: AuthState;
}

export default combineReducers<StoreState>({
  enthusiasm: enthusiasm,
  user: user,
  auth: auth
});
