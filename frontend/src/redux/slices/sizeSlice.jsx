// slices/productSlice.js

import { createSlice } from "@reduxjs/toolkit";

const sizeSlice = createSlice({
  name: "size",
  initialState: {
    sizes: [],
    loading: true,
    error: null,
  },
  reducers: {
    getSize(state, action) {
      state.sizes = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export let sizeReducer = sizeSlice.reducer;
export let sizeActions = sizeSlice.actions;
