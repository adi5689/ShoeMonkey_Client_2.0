import { configureStore, combineReducers, createSerializableStateInvariantMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import cartReducer from '../features/cart/cartSlice';
import productsReducer from '../features/products/productsSlice';
import userReducer from '../features/user/userSlice';
import orderReducer from '../features/order/orderSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
};

const rootReducer = combineReducers({
    cart: cartReducer,
    products: productsReducer,
    user: userReducer,
    order: orderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Customize the serializable state invariant middleware
const serializableStateInvariantMiddleware = createSerializableStateInvariantMiddleware({
 ignoredActions: ['persist/PERSIST'],
});

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(serializableStateInvariantMiddleware),
});

const persistor = persistStore(store);

export { store, persistor };
