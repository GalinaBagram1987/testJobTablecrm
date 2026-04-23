import { configureStore } from '@reduxjs/toolkit'
import cashierReducer from './cashierSlice';
import clientSliceReducer from './clientSlice';

export const store = configureStore({
  reducer: {
    cashier: cashierReducer,
    client: clientSliceReducer,
  },
});