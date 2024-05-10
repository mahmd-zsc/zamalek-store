// slices/productSlice.js

import { createSlice } from "@reduxjs/toolkit";

const sizeSlice = createSlice({
  name: "size",
  initialState: {
    sizes: [],
    loading: true,
    error: null,
    size: null,
  },
  reducers: {
    setSizes(state, action) {
      state.sizes = action.payload;
    },
    setSize(state, action) {
      state.size = action.payload;
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
