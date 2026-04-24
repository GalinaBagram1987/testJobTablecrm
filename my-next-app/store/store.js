import { configureStore } from '@reduxjs/toolkit'
import cashierReducer from './cashierSlice';
import clientSliceReducer from './clientSlice';
import directoriesReducer from './directoriesSlice';
import orderReducer from './orderSlice';

export const store = configureStore({
  reducer: {
    cashier: cashierReducer,
    client: clientSliceReducer,
    directories: directoriesReducer,
    order: orderReducer,
  },
});