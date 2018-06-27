import { fromJS } from 'immutable';

export const SET_FILTERS = 'SET_FILTERS';
export const CLEAR_FILTERS = 'CLEAR_FILTERS';
export const SET_SEARCH = 'SET_SEARCH';


export const setSearch = (search) => {
    return {
        type: SET_SEARCH,
        search
    }
};

export const setFilters = (filters) => {
    return {
        type: SET_FILTERS,
        filters
    }
};

export const clearFilters = (filters) => {
    return {
        type: CLEAR_FILTERS,
        filters
    }
};

export const actions = {
    setFilters,
    clearFilters,
    setSearch,
};

const ACTION_HANDLERS = {
    SET_FILTERS: (state, {filters}) => {

        return state.updateIn(['activeFilters'], function (value) {
            return value.merge(filters);
        });
    },
    SET_SEARCH: (state, {search}) => {
        return state.set('search', search);
    },
    CLEAR_FILTERS: (state) => {
        return state.set('activeFilters', fromJS({}));

    }
};

const initialState = fromJS({
    filters: {},
    plans: {},
    search: '',
    activeFilters: {},
    openFilterId: '',
    sort: 'popular',
    avatarSize:1,
    page:1
});

export default (state = fromJS(initialState), action) => {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
};

