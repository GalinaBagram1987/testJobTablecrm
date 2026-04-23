import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchClient } from "@/lib/api/apiMethods";

// Асинхронный thunk для поиска клиента по телефону
export const searchClientsByPhone = createAsyncThunk(
  'client/searchByPhone',
  async (phone, { rejectWithValue }) => {
    try {
      const data = await searchClient(phone);
      return data; // массив контрагентов
    } catch (error) {
      return rejectWithValue(error.message); // rejectWithValue - отклон со значением
    }
  }
);

const initialState = {
  searchPhone: '',         // введённый телефон
  searchResults: [],       // массив найденных клиентов
  selectedClient: null,    // выбранный клиент (объект)
  isLoading: false,
  error: null,
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setSearchPhone(state, action) {
      state.searchPhone = action.payload;
    },
    selectClient(state, action) {
      state.selectedClient = action.payload;
    },
    clearSearchResults(state) {
      state.searchResults = [];
      state.selectedClient = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchClientsByPhone.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.searchResults = []; // очищаем старые результаты
        state.selectedClient = null; // 👈 важно!
      })
      .addCase(searchClientsByPhone.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload;
        // Если в ответе ровно один клиент, автоматически выбираем его
        if (action.payload.length === 1) {
          state.selectedClient = action.payload[0];
        } else {
          state.selectedClient = null; // если 0 или >1, сбрасываем выбор
        }
      })
      .addCase(searchClientsByPhone.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.searchResults = [];
        state.selectedClient = null;
      });
  },
});

export const { setSearchPhone, selectClient, clearSearchResults } = clientSlice.actions;
export default clientSlice.reducer;