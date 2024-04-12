// store.js

import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    // Add other reducers if needed
  },
});

export default store;
