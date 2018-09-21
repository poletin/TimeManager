import enthusiasm, { EnthusiasmState } from "./enthusiasm";
import { combineReducers } from 'redux';
import user, { UserState } from "./user";

export interface StoreState {
    enthusiasm: EnthusiasmState;
    user: UserState;
}

export default combineReducers<StoreState>({
    enthusiasm: enthusiasm,
    user: user
});