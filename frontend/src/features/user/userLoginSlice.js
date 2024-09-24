import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  myerror: null,
  success: false,
  userInfo: null,
};

export const userLogin = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/user/login",
        userData
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const userLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    clearError: (state) => {
      state.myerror = null;
    },
    logout: (state) => {
      state.loading = false;
      state.myerror = null;
      state.success = false;
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.myerror = null;
      state.success = false;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.myerror = null;
      state.success = true;
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.myerror = action.payload;
      state.success = false;
    });
  },
});

export const { clearError, logout } = userLoginSlice.actions;
export default userLoginSlice.reducer;
