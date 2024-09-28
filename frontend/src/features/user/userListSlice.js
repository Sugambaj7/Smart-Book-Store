import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserList = createAsyncThunk(
  "user/fetchUserList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5001/user/fetchuserlist"
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (user_id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5001/user/delete/${user_id}`
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const userListSlice = createSlice({
  name: "userlist",
  initialState: {
    loading: false,
    myerror: null,
    success: false,
    userlist: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserList.pending, (state) => {
      state.loading = true;
      state.myerror = null;
      state.success = false;
    });
    builder.addCase(fetchUserList.fulfilled, (state, action) => {
      state.loading = false;
      state.myerror = null;
      state.userlist = action.payload;
    });
    builder.addCase(fetchUserList.rejected, (state, action) => {
      state.loading = false;
      state.myerror = action.payload;
      state.success = false;
    });
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
      state.myerror = null;
      state.success = false;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.myerror = null;
      state.success = true;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.myerror = action.payload;
      state.success = false;
    });
  },
});

export default userListSlice.reducer;
