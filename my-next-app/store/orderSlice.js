import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedOrganization: null,
  selectedWarehouse: null,
  selectedPaybox: null,
  selectedPriceType: null,
  cart: [],
  totalSum: 0,
  comment: '',
  isSubmitting: false,
  submitError: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrganization(state, action) { state.selectedOrganization = action.payload; },
    setWarehouse(state, action) { state.selectedWarehouse = action.payload; },
    setPaybox(state, action) { state.selectedPaybox = action.payload; },
    setPriceType(state, action) { state.selectedPriceType = action.payload; },
    setComment(state, action) { state.comment = action.payload; },
    
    addItem(state, action) {
      const { id, quantity = 1, ...rest } = action.payload;
      const existing = state.cart.find(item => item.id === id); //существующий
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.cart.push({ ...rest, id, quantity });
      }
      // пересчёт суммы
      state.totalSum = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    removeItem(state, action) {
      state.cart = state.cart.filter(item => item.id !== action.payload);
      state.totalSum = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    clearCart(state) {
      state.cart = [];
      state.totalSum = 0;
      state.comment = '';
    },
    setSubmitting(state, action) { state.isSubmitting = action.payload; },
    setSubmitError(state, action) { state.submitError = action.payload; },
  },
});

export const {
  setOrganization, setWarehouse, setPaybox, setPriceType,
  setComment, addItem, removeItem, clearCart,
  setSubmitting, setSubmitError,
} = orderSlice.actions;
export default orderSlice.reducer;