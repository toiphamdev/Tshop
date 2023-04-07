import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogCatService from "./blogCatService";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  blogCategories: [],
};

export const getBlogCats = createAsyncThunk(
  "/blog-cat/get-all-category",
  async (thunkAPI) => {
    try {
      return await blogCatService.getBlogCats();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const blogCatSlice = createSlice({
  name: "blogCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogCats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogCats.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.blogCategories = action.payload;
      })
      .addCase(getBlogCats.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default blogCatSlice.reducer;
