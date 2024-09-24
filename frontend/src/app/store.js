import { configureStore } from "@reduxjs/toolkit";
import userRegisterReducer from "../features/user/userRegisterSlice";
import userLoginReducer from "../features/user/userLoginSlice";

// Retrieve user info from local storage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const store = configureStore({
  reducer: {
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
  },
  preloadedState: {
    userLogin: { userInfo: userInfoFromStorage },
  },
});

export default store;
