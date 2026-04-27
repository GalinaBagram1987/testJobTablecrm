import { createSlice } from '@reduxjs/toolkit';
import { loadDirectories } from "@/lib/apiMethods";

const initialState = {
  organizations: [],
  warehouses: [],
  payboxes: [],
  priceTypes: [],
  nomenclature: [],
  loading: false,
  error: null,
};

const directoriesSlice = createSlice({
  name: 'directories',
  initialState,
  reducers: {
    fetchStart(state) {
      state.loading = true;
      state.error = null;
      state.organizations = []; // очищаем старые результаты
      state.warehouses = [];
      state.payboxes = [];
      state.priceTypes = [];
      state.nomenclature = [];
    },
    fetchSuccess(state, action) {
      state.loading = false;
      const { organizations, warehouses, payboxes, priceTypes, nomenclature } = action.payload;
      state.organizations = organizations;
      state.warehouses = warehouses;
      state.payboxes = payboxes;
      state.priceTypes = priceTypes;
      state.nomenclature = nomenclature;
      state.error = null;
    },
    fetchFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.organizations = []; // ошибка. не пришли данные
      state.warehouses = [];
      state.payboxes = [];
      state.priceTypes = [];
      state.nomenclature = [];
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure } = directoriesSlice.actions;

// Thunk для загрузки справочников
export const loadDirector = () => async (dispatch) => {
  dispatch(fetchStart());
  try {
    const data = await loadDirectories(); // loadDirectories уже возвращает объект с данными
    dispatch(fetchSuccess(data));
  } catch (error) {
    dispatch(fetchFailure(error.message));
  }
};

export default directoriesSlice.reducer;
