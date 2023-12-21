// store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import authSlice from './authSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    auth:authSlice
  },
});
export default store