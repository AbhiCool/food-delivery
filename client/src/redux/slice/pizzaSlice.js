import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrls } from "../../constants";

export const fetchPizzas = createAsyncThunk("pizza/fetchPizzas", async () => {
  const res = await axios.get(serverUrls.getPizzas);

  console.log(res);
  return res.data.pizzas;
});
const pizzaSlice = createSlice({
  name: "pizza",
  initialState: {
    pizzas: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.loading = false;
        state.pizzas = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const productActions = pizzaSlice.actions;
export default pizzaSlice.reducer;
