// store.js
import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "./rootReducer";
// import { thunk } from "redux-thunk";
import { productReducer } from "./slices/productSlice";
import { authReducer } from "./slices/authSlice";
import { profileReducer } from "./slices/profileSlice ";
import { categoryReducer } from "./slices/categorySlice";
import { brandReducer } from "./slices/brandSlice";
import { sizeReducer } from "./slices/sizeSlice";
import { colorReducer } from "./slices/colorSlice";
import { searchReducer } from "./slices/searchSlice";
import { cartReducer } from "./slices/cartSlice";
import { dashboardReducer } from "./slices/dashboardSlice";

// const store = createStore(rootReducer, applyMiddleware(thunk));
const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    product: productReducer,
    category: categoryReducer,
    brand: brandReducer,
    size: sizeReducer,
    color: colorReducer,
    search: searchReducer,
    cart: cartReducer,
    dashboard: dashboardReducer,
  },
});

export default store;
