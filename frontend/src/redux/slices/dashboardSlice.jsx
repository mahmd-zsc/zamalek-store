import { createSlice } from "@reduxjs/toolkit";

let dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    fullSidebar: true,
    action: "",
    editProductId: "",
    editSizeId: "",
    editCategoryId: "",
    editBrandId: "",
  },
  reducers: {
    setFullSidebar(state, action) {
      state.fullSidebar = action.payload;
    },
    setAction(state, action) {
      state.action = action.payload;
    },
    setEditProductId(state, action) {
      state.editProductId = action.payload;
    },
    setEditSizeId(state, action) {
      state.editSizeId = action.payload;
    },
  },
});

export let dashboardReducer = dashboardSlice.reducer;
export let dashboardActions = dashboardSlice.actions;
