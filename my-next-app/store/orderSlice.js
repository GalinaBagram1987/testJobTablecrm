import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_ENDPOINTS } from "@/lib/routes";

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

export const submitOrder = createAsyncThunk(
  'order/submitOrder',
  async (conduct, { getState, rejectWithValue }) => {
    const state = getState();
    const { token } = state.cashier;
    const { cart, selectedOrganization, selectedWarehouse, selectedPaybox, selectedPriceType, comment } = state.order;
    const { selectedClient } = state.client;

    const payload = {
      priority: 0,
      dated: Math.floor(Date.now() / 1000),
      operation: "Заказ",
      tax_included: true,
      tax_active: true,
      goods: cart.map(item => ({
        price: item.price,
        quantity: item.quantity,
        unit: item.unit,
        discount: item.discount || 0,
        sum_discounted: (item.discount || 0) * item.quantity,
        nomenclature: item.id,
      })),
      settings: {},
      warehouse: selectedWarehouse,
      contragent: selectedClient?.id,
      paybox: selectedPaybox,
      organization: selectedOrganization,
      status: conduct, // true или false
      paid_rubles: state.order.totalSum,
      paid_lt: 0,
    };
    // добавить token в params через интерсептор – он добавится сам

    try {
      const response = await apiWithInterceptors.post(API_ENDPOINTS.CREATE_SALE, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
      const existing = state.cart.find(item => item.id === id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.cart.push({ ...rest, id, quantity });
      }
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
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.isSubmitting = true;
        state.submitError = null;
      })
      .addCase(submitOrder.fulfilled, (state) => {
        state.isSubmitting = false;
        // очистка корзины
        state.cart = [];
        state.totalSum = 0;
        state.comment = '';
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.isSubmitting = false;
        state.submitError = action.payload;
      });
  },
});

export const {
  setOrganization, setWarehouse, setPaybox, setPriceType,
  setComment, addItem, removeItem, clearCart,
  setSubmitting, setSubmitError,
} = orderSlice.actions;
export default orderSlice.reducer;