// import { toast } from "react-toastify";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

// const paymentMethodFromStorage = localStorage.getItem("Payment Method");

const initialState = {
  cartItems: cartItemsFromStorage,
  shippingAddress: shippingAddressFromStorage,
  paymentMethod: "",
  loading: false,
  error: null,
  success: false,
};

export const addToCart = createAsyncThunk(
  "product/addToCart",
  async ({ product_id, qty }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/product/${product_id}`
      );
      return { ...response?.data, qty };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    deleteFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearMyCart: (state) => {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem(
        "shippingAddress",
        JSON.stringify(state.shippingAddress)
      );
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      // localStorage.setItem(
      //   "Payment Method",
      //   JSON.stringify(state.paymentMethod)
      // );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.success = false;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.success = true;

        console.log(action.payload, "k xa yesmmma");

        const itemIndex = state.cartItems.findIndex(
          (item) => item._id === action.payload._id
        );

        if (itemIndex >= 0) {
          // If item already exists in the cart, update its quantity
          state.cartItems[itemIndex].qty += action.payload.qty;
        } else {
          // If item does not exist in the cart, add it
          state.cartItems.push(action.payload);
        }

        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const {
  deleteFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearMyCart,
} = cartSlice.actions;
export default cartSlice.reducer;
