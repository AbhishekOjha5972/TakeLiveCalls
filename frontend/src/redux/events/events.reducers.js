import { EVENT_ERROR, EVENT_LOADING, EVENT_SUCCESS } from "./event.types"

let initialState = {
    loading: false,
    error: false,
    events: []
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
        default:
            {
                return state
            }
    }
}