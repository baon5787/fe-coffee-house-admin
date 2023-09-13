import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
    sizeReducer, statusReducer, productReducer,
    authReducer, categoryReducer, warehouseReducer,
    filtersReducer, dimensionsReducer, couponReducer,
    couponStatusReducer, orderReducer, orderStatusReducer,
    deliveryOrderReducer, userReducer, genderReducer,
    provinceReducer
} from './slice';

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

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: [
        "warehouse", "product", "category", "dimensions",
        "size", "coupon", "order", "deliveryOrder", "user"
    ]
};


const rootReducer = combineReducers({
    auth: authReducer,
    filter: filtersReducer,
    gender: genderReducer,
    status: statusReducer,
    couponStatus: couponStatusReducer,
    orderStatus: orderStatusReducer,
    dimensions: dimensionsReducer,
    province: provinceReducer,
    user: userReducer,
    product: productReducer,
    category: categoryReducer,
    warehouse: warehouseReducer,
    size: sizeReducer,
    coupon: couponReducer,
    order: orderReducer,
    deliveryOrder: deliveryOrderReducer,
})

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