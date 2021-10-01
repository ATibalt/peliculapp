import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/Login/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer
  }
});

export default store;
