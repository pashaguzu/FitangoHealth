/**
 * Created by Pavel on 27.11.2017.
 */

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';

// ------------------------------------
// Actions
// ------------------------------------
export const registerUserRequest = ({ email }) => ({
    type: REGISTER_USER_REQUEST,
    email,
});

export const registerUserSuccess = () => ({
    type: REGISTER_USER_SUCCESS,
    message: 'User logged in successfully!',
});

export const registerUserError = ({ error }) => ({
    type: REGISTER_USER_ERROR,
    message: error.message,
});

export const actions = {
    registerUserRequest,
    registerUserSuccess,
    registerUserError
}
;// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [REGISTER_USER_REQUEST]    : (state, { type, ...payload }) => {

        return {
            ...initialState,
            loading: true,
            email: payload.email,
        };},
    [REGISTER_USER_SUCCESS] : (state, { type, ...payload }) => {return {
        ...state,
        successMessage: payload.message,
        loading: false,
    };},
    [REGISTER_USER_ERROR] : (state, { type, ...payload }) => {return {
        ...state,
        loading: false,
        errorMessage: payload.message,
    };}
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    token: null,
    loading: false,
    username: null,
    errorMessage: null,
    alertMessage: null,
};
export default function loginReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    //action.payload = {};
    return handler ? handler(state, action) : state
}
