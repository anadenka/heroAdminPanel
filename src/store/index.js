// import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import filters from '../components/heroesFilters/filtersSlice';
import heroes from '../components/heroesList/heroesSlice';
// import ReduxThunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';

const stringMiddleware = (store) => (dispatch) => (action) => {
    if(typeof action === 'string') {
        return dispatch({
            type: action
        })
    }
    return dispatch(action)
}

const store = configureStore({
    reducer: {heroes, filters},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;

// const enhancer = (createStore) => (...args) => {
//     const store = createStore(...args);

//     const oldDispatch = store.dispatch;
//     store.dispatch = (action) => {
//         if(typeof action === 'string') {
//             return oldDispatch({
//                 type: action
//             })
//         }
//         return oldDispatch(action)
//     }
//     return store;
// }

// const store = createStore( 
//                         combineReducers({heroes, filters}), 
//                         compose(
//                                 applyMiddleware(ReduxThunk, stringMiddleware), 
//                                 window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
                        
//                         // compose (
//                         //     enhancer,
//                         //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
//                         );
