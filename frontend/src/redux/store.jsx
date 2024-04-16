// store.js
import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "./rootReducer";
// import { thunk } from "redux-thunk";
import { productReducer } from "./slices/productSlice";
import { authReducer } from "./slices/authSlice";
import { profileReducer } from "./slices/profileSlice ";

// const store = createStore(rootReducer, applyMiddleware(thunk));
const store = configureStore({
  reducer: { auth: authReducer, profile: profileReducer },
});

export default store;
