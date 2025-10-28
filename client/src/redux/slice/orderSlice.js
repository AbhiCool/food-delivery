import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverUrls } from "../../constants";
import axios from "axios";

export const fetchOrders = createAsyncThunk("order/fetchOrders", async () => {
  const res = await axios.get(serverUrls.getOrders, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  return res.data.orders;
});
const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    isLoading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
