import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  myerror: null,
  success: false,
};

export const userRegister = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      console.log(userData);
      const response = await axios.post(
        "http://localhost:5001/user/register",
        userData
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const userRegisterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.myerror = null;
    },
    updateSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userRegister.pending, (state) => {
      state.loading = true;
      state.myerror = null;
      state.success = false;
    });
    builder.addCase(userRegister.fulfilled, (state) => {
      state.loading = false;
      state.myerror = null;
      state.success = true;
    });
    builder.addCase(userRegister.rejected, (state, action) => {
      state.loading = false;
      state.myerror = action.payload;
      state.success = false;
    });
  },
});

export const { clearError, updateSuccess } = userRegisterSlice.actions;
export default userRegisterSlice.reducer;
