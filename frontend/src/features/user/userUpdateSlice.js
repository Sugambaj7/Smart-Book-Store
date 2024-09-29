import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  myerrorUpdate: null,
  updateSuccess: false,
};

export const updateUserEmailAndPassword = createAsyncThunk(
  "user/updateEmailAndPassword",
  async ({ userId, email, password, confirmPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:5001/user/update/${userId}`,
        {
          email,
          password,
          confirmPassword
        }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const userUpdateSlice = createSlice({
  name: "userUpdateSlice",
  initialState,
  reducers: {
    clearError: (state) => {
      state.myerrorUpdate = null;
    },
    clearUpdateSuccess: (state) => {
      state.updateSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUserEmailAndPassword.pending, (state) => {
      state.loading = true;
      state.myerrorUpdate = null;
      state.updateSuccess = false;
    });
    builder.addCase(updateUserEmailAndPassword.fulfilled, (state) => {
      state.loading = false;
      state.myerrorUpdate = null;
      state.updateSuccess = true;
    });
    builder.addCase(updateUserEmailAndPassword.rejected, (state, action) => {
      state.loading = false;
      state.myerrorUpdate = action.payload;
      state.updateSuccess = false;
    });
  },
});

export const { clearError, clearUpdateSuccess } = userUpdateSlice.actions;
export default userUpdateSlice.reducer;
