// slices/productSlice.js

import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: null,
    categories: [],
    loading: true,
    error: null,
  },
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export let categoryReducer = categorySlice.reducer;
export let categoryActions = categorySlice.actions;
