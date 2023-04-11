import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
export const createBlogCat = createAsyncThunk(
  "/blog-cat/create",
  async (title, thunkAPI) => {
    try {
      return await blogCatService.createBlogCat(title);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getABlogCat = createAsyncThunk(
  "/blog-cat/get-category",
  async (id, thunkAPI) => {
    try {
      return await blogCatService.getABlogCat(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBlogCat = createAsyncThunk(
  "/blog-cat/delete",
  async (id, thunkAPI) => {
    try {
      return await blogCatService.deleteBlogCat(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");
export const updateBlogCat = createAsyncThunk(
  "/blog-cat/update",
  async (data, thunkAPI) => {
    try {
      return await blogCatService.updateBlogCat(data.title, data.id);
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
        state.message = action.error.message;
      })
      .addCase(createBlogCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlogCat.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = "Create a new blog category success.";
      })
      .addCase(createBlogCat.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = "Create a new blog category failed.";
      })
      .addCase(updateBlogCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlogCat.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = "Update blog category success.";
      })
      .addCase(updateBlogCat.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = "Update blog category failed.";
      })
      .addCase(getABlogCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getABlogCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogCatName = action.payload.title;
      })
      .addCase(getABlogCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteBlogCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlogCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Delete Blog category success...";
      })
      .addCase(deleteBlogCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default blogCatSlice.reducer;
