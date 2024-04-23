// authSlice.js

import { createSlice } from "@reduxjs/toolkit";

let profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    loading: true,
    error: null,
    profiles: [],
  },
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
    },
    setProfiles(state, action) {
      state.profiles = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export let profileReducer = profileSlice.reducer;
export let profileActions = profileSlice.actions;
