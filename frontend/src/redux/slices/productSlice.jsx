// slices/productSlice.js

import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    saleProducts: [],
    loading: true,
    error: null,
    productCreatedMessage: null,
    product: null,
    filter: false,
    setting: false,
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setSaleProduct(state, action) {
      state.saleProducts = action.payload;
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
    setFilter(state, action) {
      state.filter = action.payload;
    },
    setProductCreatedMessage(state, action) {
      state.productCreatedMessage = action.payload;
    },
    SetSetting(state, action) {
      state.setting = action.payload;
    },
  },
});

export let productReducer = productSlice.reducer;
export let productActions = productSlice.actions;
