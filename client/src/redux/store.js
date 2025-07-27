import { configureStore } from "@reduxjs/toolkit";
import pizzaReducer from "./slice/pizzaSlice";
import cartReducer from "./slice/cartSlice";
import orderReducer from "./slice/orderSlice";

export const store = configureStore({
  reducer: {
    pizza: pizzaReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});
