// slices/productSlice.js

import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    products: [],
    loading: true,
    error: null,
  },
  reducers: {
    setProducts(state, action) {
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

export let searchReducer = searchSlice.reducer;
export let searchActions = searchSlice.actions;
