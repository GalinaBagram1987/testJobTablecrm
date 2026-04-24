import { createSlice } from "@reduxjs/toolkit";
import { submitOrder } from "@/lib/api/apiMethods";

const initialState = {
  selectedOrganization: null,
  selectedWarehouse: null,
  selectedPaybox: null,
  selectedPriceType: null,
  // ... корзина, комментарий и т.д.
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrganization(state, action) { state.selectedOrganization = action.payload; },
    setWarehouse(state, action) { state.selectedWarehouse = action.payload; },
    setPaybox(state, action) { state.selectedPaybox = action.payload; },
    setPriceType(state, action) { state.selectedPriceType = action.payload; },
  },
});

export const { setOrganization, setWarehouse, setPaybox, setPriceType } = orderSlice.actions;
export default orderSlice.reducer;