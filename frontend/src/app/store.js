import { configureStore } from "@reduxjs/toolkit";
import userRegisterReducer from "../features/user/userRegisterSlice";
import userLoginReducer from "../features/user/userLoginSlice";
import productReducer from "../features/products/productSlice";
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/order/orderSlice";
import userlistReducer from "../features/user/userListSlice";
import userUpdateSliceReducer from "../features/user/userUpdateSlice";

// Retrieve user info from local storage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const store = configureStore({
  reducer: {
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    userUpdate: userUpdateSliceReducer,
    products: productReducer,
    cart: cartReducer,
    order: orderReducer,
    userlist: userlistReducer,
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
