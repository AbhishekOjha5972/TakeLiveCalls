import { EVENT_ERROR, EVENT_LOADING, EVENT_OPTIONS_SUCCESS, EVENT_OWNER_SUCCESS, EVENT_PENDING_SUCCESS, EVENT_SPECIFIC_SUCCESS, EVENT_SUCCESS } from "./event.types"

let initialState = {
    loading: false,
    error: false,
    events: [],
    options: {},
    specificEvent:{},
    ownerOfEvents:[],
    pendingEvents:[]
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
        case EVENT_SPECIFIC_SUCCESS:
            {
                return { ...state, loading: false, error: false, specificEvent: payload }
            }
        case EVENT_OWNER_SUCCESS:
            {
                return { ...state, loading: false, error: false, ownerOfEvents: payload }
            }
        case EVENT_PENDING_SUCCESS:
            {
                return { ...state, loading: false, error: false, pendingEvents: payload }
            }
        default:
            {
                return state
            }
    }
}