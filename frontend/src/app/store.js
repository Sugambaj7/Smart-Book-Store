import { configureStore } from "@reduxjs/toolkit";
import userRegisterReducer from "../features/user/userRegisterSlice";
import userLoginReducer from "../features/user/userLoginSlice";
import productReducer from "../features/products/productSlice";
import cartReducer from "../features/cart/cartSlice";

// Retrieve user info from local storage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const store = configureStore({
  reducer: {
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    products: productReducer,
    cart: cartReducer,
  },
  preloadedState: {
    userLogin: {
      loading: false,
      myerror: null,
      success: false,
      userInfo: null,
      userInfo: userInfoFromStorage,
    },
  },
});

export default store;
