import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import enqService from "./enqService";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  enquiries: [],
  message: "",
};

export const getEnquiries = createAsyncThunk(
  "/enq/get-all-enq",
  async (thunkAPI) => {
    try {
      return await enqService.getEnquiries();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const enqSlice = createSlice({
  name: "enq",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEnquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.enquiries = action.payload;
      })
      .addCase(getEnquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default enqSlice.reducer;
