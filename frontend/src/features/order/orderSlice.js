import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  myerror: null,
  success: false,
  createdOrder: null,
};

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (
    {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      user,
    },
    { rejectWithValue }
  ) => {
    // console.log("orderItemssssss", orderItems);
    // console.log("shippingAddresssss", shippingAddress);
    // console.log("paymentMethodss", paymentMethod);
    // console.log("itemsPricesss", itemsPrice);
    // console.log("shippingPricesss", shippingPrice);
    // console.log("taxPricesss", taxPrice);
    // console.log("totalPricesss", totalPrice);
    // console.log("userss", user);
    // console.log("yo sabai order slice bata hai");
    try {
      const response = await axios.post("http://localhost:5001/order/create", {
        user,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const listMyRecentOrders = createAsyncThunk(
  "order/listMyRecentOrders",
  async ({ user_id }, { rejectWithValue }) => {
    console.log(user_id, "user_id ma k aaako xa order slice");
    try {
      const response = await axios.get(
        `http://localhost:5001/order/${user_id}`
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    changePlaceOrderStatus: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.myerror = null;
        state.success = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.myerror = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.myerror = action.payload;
        state.success = true;
      })
      .addCase(listMyRecentOrders.pending, (state) => {
        state.loading = true;
        state.myerror = null;
      })
      .addCase(listMyRecentOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.createdOrder = action.payload;
        state.myerror = null;
        console.log("orderslice bata listrecent ma k xa", action.payload);
      })
      .addCase(listMyRecentOrders.rejected, (state, action) => {
        state.loading = false;
        state.myerror = action.payload;
      });
  },
});

export const { changePlaceOrderStatus } = orderSlice.actions;

export default orderSlice.reducer;
