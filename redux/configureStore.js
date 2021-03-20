import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { campsites } from './campsites';
import { comments } from './comments';
import { promotions } from './promotions';
import { partners } from './partners';
import { favorites } from './favorites';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';

const config = {
    key: 'root',
    storage,
    debug: true
}


    export const ConfigureStore = () => {
        const store = createStore(
            persistCombineReducers(config, {
                campsites,
                comments,
                partners,
                promotions,
                favorites
            }),
            applyMiddleware(thunk, logger)
        );

        const persistor = persistStore(store);

        return { persistor, store };
}

//Here we're importing createStore, combineReducers and applyMiddleware as well as the thunk and logger libraries. Then the campsites, comments, promotions and partners

//Then we're exporting a ConfigureStore function that returns the result of calling the redux function createStore() with a combined reducers argument that combines all the reducers into a single root reducer along with a call to applyMiddleware to enable redux thunk and redux logger to work.