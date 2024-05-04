import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: Array.isArray(JSON.parse(localStorage.getItem("cartItems")))
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    loading: false,
    error: null,
    makeChange: false,
  },
  reducers: {
    setCartItems(state, action) {
      state.cartItems = action.payload;
    },

    removeFromCart(state, action) {
      const itemId = action.payload;
      const itemIndex = state.cartItems.findIndex((item) => item.id === itemId);

      if (itemIndex !== -1) {
        // If item exists in cart, remove it
        state.cartItems.splice(itemIndex, 1);
      }
    },
    clearCart(state) {
      // Clear all items from the cart
      state.cartItems = [];
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setMakeChange(state, action) {
      state.makeChange = action.payload;
    },
    setToTotalPrice(state, action) {
      state.totalPrice = action.payload;
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
