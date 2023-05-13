import {
    compose,
    combineReducers,
    applyMiddleware,
    legacy_createStore,
} from "redux";
import thunk from "redux-thunk";
import { eventReducer } from "./events/events.reducers";
import { authenticationReducer } from "./auth/auth.reducer";

const rootReducer = combineReducers({
    masterEvents: eventReducer,
    masterAuthentication:authenticationReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = legacy_createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunk))
);