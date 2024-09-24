import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  myerror: null,
  success: false,
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
      console.log(userData);
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
    clearSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.myerror = null;
      state.success = false;
    });
    builder.addCase(userLogin.fulfilled, (state) => {
      state.loading = false;
      state.myerror = null;
      state.success = true;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.myerror = action.payload;
      state.success = false;
    });
  },
});

export const { clearError, clearSuccess } = userLoginSlice.actions;
export default userLoginSlice.reducer;
