import { createSlice } from '@reduxjs/toolkit';
import { loadDirectories } from '@/lib/api/apiMethods';

const initialState = {
  organizations: [],
  warehouses: [],
  payboxes: [],
  priceTypes: [],
  nomenclature: [],
  loading: false,
};

const directoriesSlice = createSlice({
  name: 'directories',
  initialState,
  reducers: {
    fetchStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess(state, action) {
      state.loading = false;
      const { organizations, warehouses, payboxes, priceTypes, nomenclature } = action.payload;
      state.organizations = organizations;
      state.warehouses = warehouses;
      state.payboxes = payboxes;
      state.priceTypes = priceTypes;
      state.nomenclature = nomenclature;
    },
    fetchFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
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
