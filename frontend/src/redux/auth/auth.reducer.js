import { AUTH_ERROR, AUTH_LOADING, AUTH_SIGNUP_SUCCESS, AUTH_SUCCESS } from "./auth.types"

let initialState = {
    loading: false,
    error: false,
    user:{}
}

export const authenticationReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case AUTH_LOADING:
            {
                return { ...state, loading: true }
            }
        case AUTH_ERROR:
            {
                return { ...state, loading: false, error: true }
            }
        case AUTH_SUCCESS:
            {
                return { ...state, loading: false, error: false, user: payload }
            }
        case AUTH_SIGNUP_SUCCESS:
            {
                return {...state,loading:false,error:false}
            }
        default:
            {
                return state
            }
    }
}