import { fromJS } from 'immutable';

export const SET_DASH_PLANS = 'SET_DASH_PLANS';
export const SET_DASH_MEDICATIONS = 'SET_DASH_MEDICATIONS';
export const SET_DASH_TRACKERS = 'SET_DASH_TRACKERS';

// ------------------------------------
// Actions
// ------------------------------------
export const setDashPlans = ({ plans }) => ({
    type: SET_DASH_PLANS,
    plans,
});

export const setDashMedications = ({medications}) => ({
    type: SET_DASH_MEDICATIONS,
    medications
});

export const setDashTrackers = ({ trackers }) => ({
    type: SET_DASH_TRACKERS,
    trackers
});

export const actions = {
    setDashPlans,
    setDashMedications,
    setDashTrackers
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [SET_DASH_PLANS]    : (state, plans) => {
        const nextState = state.set('plans', fromJS(plans));
        return nextState;
    },
    [SET_DASH_MEDICATIONS] : (state, medications) => {
        const nextState = state.set('medications', fromJS(medications));
        return nextState;
    },
    [SET_DASH_TRACKERS] : (state, trackers) => {
        const nextState = state.set('trackers', fromJS(trackers));
        return nextState;
    },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    plans: null,
    medications: null,
    trackers: null,
};
export default (state = fromJS(initialState), action) => {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
};