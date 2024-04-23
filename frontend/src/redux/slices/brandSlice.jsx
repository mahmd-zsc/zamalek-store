// slices/productSlice.js

import { createSlice } from "@reduxjs/toolkit";

const brandSlice = createSlice({
  name: "brand",
  initialState: {
    brands: [],
    loading: true,
    error: null,
  },
  reducers: {
    setBrands(state, action) {
      state.brands = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export let brandReducer = brandSlice.reducer;
export let brandActions = brandSlice.actions;
