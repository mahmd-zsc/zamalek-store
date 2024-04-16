// slices/productSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Pass the URL as an argument to the createAsyncThunk
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (url) => {
    const response = await axios.get(url);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchProduct: (state, action) => {
      state.products = action.payload;
    },
  },
});

export let productReducer = productSlice.reducer;
export let productActions = productSlice.actions;
