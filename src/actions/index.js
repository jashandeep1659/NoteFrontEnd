import NotesApi from "../api/NotesApi";

export const USER_LOGIN_ACTION = (formvalues) => {
    return async (dispatch) => {
        const response = await NotesApi.post("/api/token/", {
            ...formvalues,
        }).catch(function (error) {
            console.log(error);
            return Promise.reject(error);
        });
        console.log(response);
        if (response && response.status == 200) {
            localStorage.setItem("AuthTokens", JSON.stringify(response.data));
            // window.location = "/notes";
        }
    };
};

export const CREATE_NOTE_ACTION = (formvalues) => {
    return async (dispatch) => {
        const response = await NotesApi.post("/", {
            ...formvalues,
        }).catch(function (error) {
            return error;
        });
        console.log(response);
        dispatch({ type: "CREATE_NOTE_ACTION", payload: response.data });
    };
};

export const USER_REFRESH_TOKEN = () => {
    let AuthTokens = localStorage.getItem("AuthTokens")
        ? JSON.parse(localStorage.getItem("AuthTokens"))
        : null;
    return async (dispatch) => {
        const response = await NotesApi.post("/api/token/refresh/", {
            refresh: AuthTokens.refresh,
        }).catch(function (error) {
            localStorage.removeItem("AuthTokens");
        });
        if (response && response.status == 200) {
            localStorage.setItem("AuthTokens", JSON.stringify(response.data));
        }
    };
};

export const LOGIN_PAGE_ACTION_ERROR = (error) => {
    return {
        type: "LOGIN_PAGE_ACTION_ERROR",
        payload: error,
    };
};

/*const checkFunction = async () => {
    const response = await NotesApi.get("/").catch((err) =>
        Promise.reject(err)
    );
    console.log(response);
};
*/
export const NOTES_FETCH_ACTION = () => {
    return async (dispatch) => {
        const response = await NotesApi.get("/");
        dispatch({ type: "NOTES_FETCH_ACTION", payload: response.data });
    };
};
export const NOTE_FETCH_ACTION = (id) => {
    return async (dispatch) => {
        const response = await NotesApi.get(`/note/${id}/`).catch(function (
            error
        ) {
            return error;
        });
        if (response && response.status === 200) {
            dispatch({ type: "NOTE_FETCH_ACTION", payload: response.data });
        }
    };
};

export const UPDATE_NOTE_ACTION = (formvalues, id) => {
    return async (dispatch, getState) => {
        const response = await NotesApi.patch(`/note/${id}/`, {
            ...formvalues,
        }).catch(function (error) {
            return error;
        });
        dispatch({ type: "UPDATE_NOTE_ACTION", payload: response.data });
    };
};

export const DELETE_NOTE_ACTION = (id) => {
    return async (dispatch) => {
        let response = await NotesApi.delete(`/note/${id}/`, {}).catch(
            function (error) {
                return error;
            }
        );
        response = await NotesApi.get("/");
        dispatch({ type: "NOTES_FETCH_ACTION", payload: response.data });
    };
};

export const DELETE_BANNER_ACTION = (status, id) => {
    let response = { status: status, id: id };
    if (response.status == true && response.id) {
        if (response.id) {
            return { type: "DELETE_BANNER_ACTION", payload: response };
        }
    } else {
        return { type: "DELETE_BANNER_CLOSE_ACTION", payload: response };
    }
};

export const USER_STATUS_ACTION = (status) => {
    return {
        type: "USER_STATUS_ACTION",
        payload: status,
    };
};
