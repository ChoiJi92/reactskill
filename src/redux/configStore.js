import {createStore, combineReducers, applyMiddleware, compose } from "redux"
import word from "./modules/word"
import thunk from 'redux-thunk'

const middlewares = [thunk];
const rootReducer = combineReducers({word});
const enhancer = applyMiddleware(...middlewares)
const store = createStore(rootReducer, enhancer)

export default store