import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";

import appReducer from "./app/appReducers";


const reducers = {
  appReducer,
 
};

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default store;
