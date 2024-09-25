import { configureStore } from "@reduxjs/toolkit";
import userRegisterReducer from "../features/user/userRegisterSlice";
import userLoginReducer from "../features/user/userLoginSlice";
import productReducer from "../features/products/productSlice";

// Retrieve user info from local storage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const store = configureStore({
  reducer: {
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    products: productReducer,
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
