import { createSlice } from '@reduxjs/toolkit'
import { storage } from '@/utils/localStorage';
import axios from 'axios';

const tokenFromStorage = storage.getToken();

const initialState = {
  token: tokenFromStorage,
  isConnected: false,
  isLoading: false,
  error: null,
}

const cashierSlice = createSlice({
  name: 'cashier',
  initialState,
  reducers: {
    connectStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    connectSuccess: (state, action) => {
      state.token = action.payload.token;
      state.isConnected = true;
      state.isLoading = false;
      storage.setToken(action.payload.token);
    },
    connectFailure: (state, action) => {
      state.isConnected = false;
      state.isLoading = false;
      state.error = action.payload.error;
      storage.removeToken();
    },
    disconnect: (state) => {
      state.token = null;
      state.isConnected = false;
      storage.removeToken();
    },
  },
});
export const { connectStart, connectSuccess, connectFailure, disconnect } = cashierSlice.actions;

// Асинхронный thunk для подключения кассы
export const connectCashier = (token) => async (dispatch) => {
  dispatch(connectStart());
  try {
    // Проверяем токен, делая запрос к API (например, список организаций)
    const response = await axios (`https://app.tablecrm.com/api/v1/organizations/?token=${token}`);
    if (!response.ok) {
      throw new Error('Неверный токен или ошибка сети');
    }
    // Если запрос успешен, сохраняем токен и считаем кассу подключённой
    dispatch(connectSuccess({ token }));
  } catch (error) {
    dispatch(connectFailure({ error: error.message }));
  }
};

export default cashierSlice.reducer;