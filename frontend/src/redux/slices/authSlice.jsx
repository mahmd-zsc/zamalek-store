// authSlice.js

import { createSlice } from "@reduxjs/toolkit";

let authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
    loginError: null,
    registerError: null,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
    },
    logout(state, action) {
      state.user = null;
    },
    setUsername(state, action) {
      state.user.username = action.payload;
    },
    makeLoginError(state, action) {
      state.loginError = action.payload;
    },
    makeRegisterError(state, action) {
      state.registerError = action.payload;
    },
    clearErrors(state, action) {
      state.loginError = null;
      state.registerError = null;
    },
  },
});

export let authReducer = authSlice.reducer;
export let authActions = authSlice.actions;
