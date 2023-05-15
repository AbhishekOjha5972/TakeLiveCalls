import { EVENT_ERROR, EVENT_LOADING, EVENT_OPTIONS_SUCCESS, EVENT_OWNER_SUCCESS, EVENT_PENDING_SUCCESS, EVENT_SPECIFIC_SUCCESS, EVENT_SUCCESS } from "./event.types"


export const getEventAction = (url="") => async (dispatch) => {
    let token = JSON.parse(localStorage.getItem('token'))
    // Dispatch the EVENT_LOADING action to indicate that event data is being loaded
    dispatch({ type: EVENT_LOADING });

    try {
        // Make a GET request to the backend API to fetch events
        let res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/events${url}`, {
            method: "GET",
            headers: {
                authorization: token, // Assuming 'token' is defined elsewhere
                "Content-Type": "application/json"
            }
        });

        // Parse the response body as JSON
        let data = await res.json();

        if (res.status === 401) {
            // Getting undefined in the alert for `navigate` function that's why giving "" using or operator
            dispatch({ type: EVENT_ERROR });
            alert(`Session Expired! \nPlease Login again... ${window.location.replace('/authentication') || ""}`);
            return;
        }

        // If the response status is 200 (OK), dispatch the EVENT_SUCCESS action with the fetched event data
        if (res.status == 200) {
            dispatch({ type: EVENT_SUCCESS, payload: data.data });
        } else {
            // If the response status is not 200, dispatch the EVENT_ERROR action and display an alert with the error message from the response
            dispatch({ type: EVENT_ERROR });
            alert(res.error);
        }
    } catch (err) {
        // If an error occurs during the request or parsing the response, dispatch the EVENT_ERROR action
        dispatch({ type: EVENT_ERROR });
    }
};

export const getSpecificEvent = (cred) => async (dispatch) => {
    let token = JSON.parse(localStorage.getItem('token'))
    dispatch({ type: EVENT_LOADING });
    try {
        let res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/events/${cred}`, {
            method: "GET",
            headers: {
                authorization: token, // Assuming 'token' is defined elsewhere
                "Content-Type": "application/json"
            }
        });
        let data = await res.json();
        if (res.status === 401) {
            dispatch({ type: EVENT_ERROR });
            alert(`Session Expired! \nPlease Login again.. ${window.location.replace('/authentication') || ""}`);
            return;
        }
        // If the response status is 200 (OK), dispatch the EVENT_SUCCESS action with the fetched event data
        if (res.status == 200) {
            dispatch({ type: EVENT_SPECIFIC_SUCCESS, payload: data.data });
        } else {
            // If the response status is not 200, dispatch the EVENT_ERROR action and display an alert with the error message from the response
            dispatch({ type: EVENT_ERROR });
        }
    } catch (err) {
        dispatch({ type: EVENT_ERROR });
    }
}

/**
 * GET OPTIONS DYNAMICALLY FOR FILTERING 
 * */
export const getOptionsAction = () => async (dispatch) => {
    let token = JSON.parse(localStorage.getItem('token'))
    dispatch({ type: EVENT_LOADING });
    try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/events/options`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            }
        })

        const data = await res.json();
        if (res.status === 401) {
            dispatch({ type: EVENT_ERROR });
            alert(`Session Expired! \nPlease Login again.. ${window.location.replace('/authentication') || ""}`);
            return;
        }
        if (res.ok) {
            dispatch({ type: EVENT_OPTIONS_SUCCESS, payload: data.data });
        } else {
            dispatch({ type: EVENT_ERROR });
        }

    } catch (error) {
        dispatch({ type: EVENT_ERROR });
    }
}

export const getUsersPersonalEventsAction = () => async (dispatch) => {
    let token = JSON.parse(localStorage.getItem('token'))
    dispatch({ type: EVENT_LOADING });
    try {
        let res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/events/created-by-user`, {
            method: "GET",
            headers: {
                authorization: token, // Assuming 'token' is defined elsewhere
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        if (res.status === 401) {
            dispatch({ type: EVENT_ERROR });
            alert(`Session Expired! \nPlease Login again.. ${window.location.replace('/authentication') || ""}`);
            return;
        }
        if (res.ok) {
            dispatch({ type: EVENT_OWNER_SUCCESS, payload: data.data });
        } else {
            dispatch({ type: EVENT_ERROR });
        }

    } catch (error) {
        console.log(error.message)
        dispatch({ type: EVENT_ERROR });
    }
}





export const getUsersAppliedEventsAction = () => async (dispatch) => {
    let token = JSON.parse(localStorage.getItem('token'))
    dispatch({ type: EVENT_LOADING });
    try {
        let res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/events/pending-events-of-loggedin-user`, {
            method: "GET",
            headers: {
                authorization: token, // Assuming 'token' is defined elsewhere
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        if (res.status === 401) {
            dispatch({ type: EVENT_ERROR });
            alert(`Session Expired! \nPlease Login again.. ${window.location.replace('/authentication') || ""}`);
            return;
        }
        if (res.ok) {
            dispatch({ type: EVENT_PENDING_SUCCESS, payload: data.data });
        } else {
            dispatch({ type: EVENT_ERROR });
        }

    } catch (error) {
        console.log(error.message)
        dispatch({ type: EVENT_ERROR });
    }
}


export const postEventAction = (cred) => async (dispatch) => {
    let token = JSON.parse(localStorage.getItem('token'))
    dispatch({ type: EVENT_LOADING });
    try {
        let res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/events`, {
            method: "POST",
            body:JSON.stringify(cred),
            headers: {
                authorization: token, // Assuming 'token' is defined elsewhere
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        if (res.status === 401) {
            dispatch({ type: EVENT_ERROR });
            alert(`Session Expired! \nPlease Login again.. ${window.location.replace('/authentication') || ""}`);
            return;
        }
        if (res.ok) {
           dispatch(getEventAction())
        } else {
            dispatch({ type: EVENT_ERROR });
        }

    } catch (error) {
        console.log(error.message)
        dispatch({ type: EVENT_ERROR });
    }
}

