import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existingitem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (existingitem) {
        existingitem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
    },
    increaseItemQty: (state, action) => {
      const currentItem = state.cartItems.find(
        (item) => item._id === action.payload
      );

      currentItem.quantity += 1;
    },
    decreaseItemQty: (state, action) => {
      const currentItem = state.cartItems.find(
        (item) => item._id === action.payload
      );

      if (currentItem.quantity === 1) return;
      currentItem.quantity -= 1;
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
