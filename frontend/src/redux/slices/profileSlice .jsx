// authSlice.js

import { createSlice } from "@reduxjs/toolkit";

let profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    loading: true,
    error: null,
  },
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export let profileReducer = profileSlice.reducer;
export let profileActions = profileSlice.actions;
