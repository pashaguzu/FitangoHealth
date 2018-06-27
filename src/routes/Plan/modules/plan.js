import { fromJS } from 'immutable';

export const SET_PLAN_TAB = 'SET_PLAN_TAB';
export const SET_PLAN_LESSON = 'SET_PLAN_LESSON';
export const SET_PLAN_SECTION = 'SET_PLAN_SECTION';

// ------------------------------------
// Actions
// ------------------------------------
export const setPlanTab = ({tab}) => ({
    type: SET_PLAN_TAB,
    tab,
});

export const setPlanLesson = ({lesson}) => ({
    type: SET_PLAN_LESSON,
    lesson
});

export const setPlanSection = ({ section }) => ({
    type: SET_PLAN_SECTION,
    section
});

export const actions = {
    setPlanTab,
    setPlanLesson,
    setPlanSection
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [SET_PLAN_TAB]    : (state, {tab}) => {

        const nextState = state.set('tab', tab);
        return nextState;
    },
    [SET_PLAN_LESSON] : (state, lesson) => {
        const nextState = state.set('lesson', fromJS(lesson));
        return nextState;
    },
    [SET_PLAN_SECTION] : (state, trackers) => {
        const nextState = state.set('section', fromJS(trackers));
        return nextState;
    },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    tab: null,
    lesson: null,
    section: null,
};
export default (state = fromJS(initialState), action) => {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
};