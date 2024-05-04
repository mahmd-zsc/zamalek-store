import { cartActions } from "../slices/cartSlice";

// Asynchronous action creator for adding an item to the cart
export const addToCart = (newItem) => async (dispatch, getState) => {
  dispatch(cartActions.setLoading(true)); // Set loading to true
  // dispatch(cartActions.setMakeChange(true));
  try {
    const state = getState();
    const existingItemIndex = state.cart.cartItems.findIndex(
      (item) => item.id === newItem.id && item.size === newItem.size
    );
    let updatedCartItems;
    if (existingItemIndex !== -1) {
      // If item already exists in cart, increase quantity
      updatedCartItems = state.cart.cartItems.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: item.quantity + 1 } // Update quantity for existing item
          : item
      );
    } else {
      // If item is new, add it to the cart
      updatedCartItems = [...state.cart.cartItems, newItem];
    }

    // Dispatch action to update cart items
    dispatch(cartActions.setCartItems(updatedCartItems));

    // Save updated cart items to localStorage
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  } catch (error) {
    dispatch(cartActions.setError(error.message)); // Set error message if an error occurs
  }

  dispatch(cartActions.setLoading(false)); // Set loading back to false
};
export const plusCart = (itemId) => async (dispatch, getState) => {
  dispatch(cartActions.setLoading(true)); // Set loading to true
  try {
    const state = getState();
    const updatedCartItems = state.cart.cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );

    // Dispatch action to update cart items
    dispatch(cartActions.setCartItems(updatedCartItems));

    // Save updated cart items to localStorage
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  } catch (error) {
    dispatch(cartActions.setError(error.message)); // Set error message if an error occurs
  }

  dispatch(cartActions.setLoading(false)); // Set loading back to false
};

export const minusCart = (itemId) => async (dispatch, getState) => {
  dispatch(cartActions.setLoading(true)); // Set loading to true
  try {
    const state = getState();
    const updatedCartItems = state.cart.cartItems.map((item) =>
      item.id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    // Dispatch action to update cart items if the quantity is greater than 1
    if (
      JSON.stringify(state.cart.cartItems) !== JSON.stringify(updatedCartItems)
    ) {
      dispatch(cartActions.setCartItems(updatedCartItems));

      // Save updated cart items to localStorage
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
  } catch (error) {
    dispatch(cartActions.setError(error.message)); // Set error message if an error occurs
  }

  dispatch(cartActions.setLoading(false)); // Set loading back to false
};

export const removeCart = (itemId, itemSize) => async (dispatch, getState) => {
  dispatch(cartActions.setLoading(true)); // Set loading to true
  try {
    const state = getState();
    const updatedCartItems = state.cart.cartItems.filter(
      (item) => item.id !== itemId || item.size !== itemSize
    );

    // Dispatch action to update cart items
    dispatch(cartActions.setCartItems(updatedCartItems));

    // Save updated cart items to localStorage
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  } catch (error) {
    dispatch(cartActions.setError(error.message)); // Set error message if an error occurs
  }

  dispatch(cartActions.setLoading(false)); // Set loading back to false
};
