import enthusiasm, { EnthusiasmState } from "./enthusiasm";
// import posts, { PostsState } from "./posts";
import { combineReducers } from 'redux';
// import { routerReducer, RouterState } from "react-router-redux";
// import { reducer as formReducer, FormState } from "redux-form";
// import {reducer as toastrReducer, ToastrState } from 'react-redux-toastr';


export interface StoreState {
    enthusiasm: EnthusiasmState;
}

export default combineReducers<StoreState>({
    enthusiasm: enthusiasm,
});