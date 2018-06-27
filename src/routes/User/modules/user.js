export const SET_USER_TOKEN = 'SET_USER_TOKEN';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_USER_TOKEN_INFO = 'SET_USER_TOKEN_INFO';
export const SET_USER_INFO_FAIL = 'SET_USER_INFO_FAIL';
export const SET_USER_LOADING = 'SET_USER_LOADING';
export const SET_PHONE_CONFIRMED = 'SET_PHONE_CONFIRMED';

// ------------------------------------
// Actions
// ------------------------------------
export const setUserToken = (token) => {
    localStorage.setItem('token', token);
    return {
        type: SET_USER_TOKEN,
        token: token
    }
};

export const updatePhoneConfirm = (phoneConfirmed) => {
    return {
        type: SET_PHONE_CONFIRMED,
        phoneConfirmed
    }
};


export const loadUserPrepare = () => {
    return {
        type: SET_USER_LOADING,
    }
};
export const loadUser = (user) => {
    localStorage.setItem('token', user.token);
    return {
        type: SET_USER_TOKEN_INFO,
        info: user
    }
};

export const loadFullUser = (user) => {
    return {
        type: SET_USER_INFO,
        info: user
    }
};


export const loadUserFAIL = () => {
    return {
        type: SET_USER_INFO_FAIL
    }
};


export const logoutUser = () => {
    localStorage.removeItem('token');
    return {
        type: LOGOUT_USER,
        token: ''
    };
};

export const actions = {
    setUserToken,
    loadUser,
    loadFullUser,
    loadUserFAIL,
    logoutUser,
    loadUserPrepare,
    updatePhoneConfirm
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [SET_USER_TOKEN]: (state, action) => {
        return {
            ...initialState,
            loading: true,
            token: action.token,
        };
    },
    [SET_USER_LOADING]: (state, action) => {
        return {
            ...initialState,
            loading: true,
        };
    },
    [SET_USER_INFO]: (state, action) => {
        return {
            ...state,
            loading: false,
            info: action.info,
        };
    },
    [SET_USER_TOKEN_INFO]: (state, action) => {
        return {
            ...state,
            loading: false,
            info: action.info,
            token: action.info.token,
        };
    },
    [SET_PHONE_CONFIRMED]: (state, action) => {
        return { ...state, info: {...state.info, phoneConfirmed: action.phoneConfirmed }};

    },
    [SET_USER_INFO_FAIL]: (state, action) => {
        return {
            ...state,
            loading: false,
        };
    },
    [LOGOUT_USER]: (state, action) => {
        return {
            ...state,
            successMessage: action.message,
            loading: false,
            token: ''
        };
    },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    token: '',//localStorage.getItem('token'),
    info: '',//localStorage.getItem('token')
    loading: true,
};
export default function userReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    //action.payload = {};
    return handler ? handler(state, action) : state
}
