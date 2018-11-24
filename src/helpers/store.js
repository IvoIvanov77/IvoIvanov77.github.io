import {createStore, applyMiddleware, combineReducers} from "redux";
import {rootReducer} from "../reducers/rootReducer";
import thunk from "redux-thunk";

export const store = createStore(combineReducers(rootReducer), applyMiddleware(thunk));