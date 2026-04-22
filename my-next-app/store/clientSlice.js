import { createSlice } from "@reduxjs/toolkit";
import { searchClients } from "@/lib/api/apiMethods";

const initialState = {
  organizations: [],
  warehouses: [],
  payboxes: [],
  priceTypes: [],
  nomenclature: [],
  loading: false,
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
	reducers: {

	}
})
