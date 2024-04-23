// slices/productSlice.js

import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
    productCreatedMessage: null,
    product: null,
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setProduct(state, action) {
      state.product = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setProductCreatedMessage(state, action) {
      state.productCreatedMessage = action.payload;
    },
  },
});

export let productReducer = productSlice.reducer;
export let productActions = productSlice.actions;
