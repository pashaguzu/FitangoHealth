
export const LOAD_NETWORK_DETAILS = 'LOAD_NETWORK_DETAILS';
export const SET_CURRENT_ROLE = 'SET_CURRENT_ROLE';
// ------------------------------------
// Actions
// ------------------------------------
export const loadNetwork = (network) => {
    return {
        type: LOAD_NETWORK_DETAILS,
        network
    }
};



export const actions = {
    loadNetwork,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [LOAD_NETWORK_DETAILS]    : (state, {network}) => {
        // load network with apollo

        return {
        ...initialState,
            id:network.id,
            name:network.name,
            logo:network.logo,
            modules:network.modules,
            labels:network.labels,
            allowSignUp:network.allowSignUp,
            colors:network.colors,
            loading:false,
        };

    },
    [SET_CURRENT_ROLE]    : (state, {role}) => {
        // load network with apollo

        return {
            ...state,
            current_role:role,
        };
    },

}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    loading: true,
    //info: {id:null},
    id: null,
    name: null,
    logo: null,
    //roles: null,
    modules: null,
    //errorMessage: null,
    //alertMessage: null,
    allowSignUp: false,
    colors: [],
};
export default function networkReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    //action.payload = {};

    return handler ? handler(state, action) : state
}
