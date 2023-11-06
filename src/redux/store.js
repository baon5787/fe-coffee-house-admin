import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {
    authReducer, categoryReducer, dimensionsReducer,
    filtersReducer, productReducer, sizeReducer,
    statusReducer
} from './slice';


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['dimensions', 'product', 'category', 'size']
};

const rootReducer = combineReducers({
    auth: authReducer,
    filter: filtersReducer,
    status: statusReducer,
    dimensions: dimensionsReducer,
    product: productReducer,
    category: categoryReducer,
    size: sizeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store)