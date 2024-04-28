import { createSlice } from "@reduxjs/toolkit";

const colorSlice = createSlice({
  name: "color",
  initialState: {
    colors: [], // List of all colors
    loading: true,
    error: null,
  },
  reducers: {
    setColors(state, action) {
      state.colors = action.payload; // Set the list of colors
    },
    setError(state, action) {
      state.error = action.payload; // Set error
    },
    setLoading(state, action) {
      state.loading = action.payload; // Set loading state
    },
  },
});

export let colorReducer = colorSlice.reducer; // Reducer function
export let colorActions = colorSlice.actions; // Action creators
