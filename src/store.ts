import { createStore, applyMiddleware, Store } from "redux";
import createSagaMiddleware from "redux-saga";

import reducers, { StoreState } from "./reducers/index";
import { ALL_ACTIONS } from "./actions";
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store: Store = createStore<StoreState, ALL_ACTIONS, any, any>(
  reducers,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(sagas);

export default store;
