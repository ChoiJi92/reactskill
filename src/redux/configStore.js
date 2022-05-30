import {createStore, combineReducers, applyMiddleware, compose } from "redux"
import word from "./modules/word"
import thunk from 'redux-thunk'

import { persistReducer } from "redux-persist"; //redux-persist
import storage from "redux-persist/lib/storage"; //redux-persist
//redux-persist
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["word"]
};


const middlewares = [thunk];
const rootReducer = combineReducers({word});
const perReducer = persistReducer(persistConfig, rootReducer); //redux-persist

const enhancer = applyMiddleware(...middlewares)
// const store = createStore(rootReducer, enhancer)
const store = createStore(perReducer, enhancer)


export default store