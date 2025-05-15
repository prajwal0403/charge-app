// src/store.js or src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage by default
import rootReducer from './rootReducers'; // Your root reducer

// Set up persist configuration
const persistConfig = {
  key: 'root', // Key for the persisted state
  storage, // Storage type (localStorage by default)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
