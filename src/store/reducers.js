import { combineReducers } from 'redux'
import locationReducer from './location'
import userReducer from 'routes/User/modules/user';
import planstoreReducer from 'routes/Planstore/modules';
import networkReducer from 'routes/Network/modules/network';




export const makeRootReducer = (asyncReducers) => {

    var reducers = combineReducers({
        location: locationReducer,
        user: userReducer,
        network: networkReducer,
        planstore: planstoreReducer,
        ...asyncReducers
    })
    return reducers
}

export const injectReducer = (store, { key, reducer }) => {
    if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

    store.asyncReducers[key] = reducer

    store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
