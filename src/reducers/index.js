import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

const LOGIN_PAGE_REDUCER_ERROR = (state = {}, action) => {
    switch (action.type) {
        case "LOGIN_PAGE_ACTION_ERROR":
            return (state = action.payload);
        default:
            return state;
    }
};

const NOTES_FETCH_REDUCER = (state = [], action) => {
    switch (action.type) {
        case "NOTES_FETCH_ACTION":
            return (state = action.payload);
        default:
            return state;
    }
};
const NOTE_FETCH_REDUCER = (state = [], action) => {
    switch (action.type) {
        case "NOTE_FETCH_ACTION":
            return (state = action.payload);
        default:
            return state;
    }
};

const USER_STATUS_REDUCER = (state = null, action) => {
    switch (action.type) {
        case "USER_STATUS_ACTION":
            return (state = action.payload);
        default:
            return state;
    }
};
const DELETE_BANNER_REDUCER = (state = false, action) => {
    switch (action.type) {
        case "DELETE_BANNER_ACTION":
            return (state = action.payload);
        case "DELETE_BANNER_CLOSE_ACTION":
            return (state = action.payload);
        default:
            return state;
    }
};

export default combineReducers({
    form: formReducer,
    LOGIN_PAGE_REDUCER_ERROR,
    NOTES_FETCH_REDUCER,
    NOTE_FETCH_REDUCER,
    USER_STATUS_REDUCER,
    DELETE_BANNER_REDUCER,
});
