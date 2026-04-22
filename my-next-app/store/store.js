import { configureStore } from '@reduxjs/toolkit'
import cashierReducer from './cashierSlice';

export const store = configureStore({
  reducer: {
    cashier: cashierReducer,
  },
});