// slices/productSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: true,
    error: null,
  },
  reducers: {
    getProduct(state, action) {
      state.products = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export let productReducer = productSlice.reducer;
export let productActions = productSlice.actions;
