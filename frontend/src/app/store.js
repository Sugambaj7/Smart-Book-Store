import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userRegisterSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
