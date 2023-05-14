import { EVENT_ERROR, EVENT_LOADING, EVENT_OPTIONS_SUCCESS, EVENT_SUCCESS } from "./event.types"

let initialState = {
    loading: false,
    error: false,
    events: [],
    options: {}
}

export const eventReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case EVENT_LOADING:
            {
                return { ...state, loading: true }
            }
        case EVENT_ERROR:
            {
                return { ...state, loading: false, error: true }
            }
        case EVENT_SUCCESS:
            {
                return { ...state, loading: false, error: false, events: payload }
            }
        case EVENT_OPTIONS_SUCCESS:
            {
                return { ...state, loading: false, error: false, options: payload }
            }
        default:
            {
                return state
            }
    }
}