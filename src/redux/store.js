import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { reducer } from "./reducer/reducer";
let middleware = [thunk]
let initialState = { routePath: 'home', isLogIn: false };

export let store = createStore(reducer, initialState, applyMiddleware(...middleware));