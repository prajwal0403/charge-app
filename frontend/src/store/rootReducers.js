// src/redux/reducers/rootReducer.js
import { combineReducers } from 'redux';
import authReducer from '../store/slices/authSlice'; // Import your individual reducers

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer, // Here 'auth' is the key to access the auth state
  // You can add other reducers here as your app grows
});

export default rootReducer;
