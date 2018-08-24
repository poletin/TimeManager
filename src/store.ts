import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from "redux-saga";

import reducers, { StoreState } from './reducers/index';
import { ALL_ACTIONS } from './actions';
import sagas from "./sagas";



const sagaMiddleware = createSagaMiddleware();

const store = createStore<StoreState, ALL_ACTIONS, any, any>(
  reducers,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(sagas);

export default store;