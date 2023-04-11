import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryService from "./categoryService";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  blogCategories: [],
};

export const getCategories = createAsyncThunk(
  "/category/get-all-category",
  async (thunkAPI) => {
    try {
      return await categoryService.getCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createCat = createAsyncThunk(
  "/category/create",
  async (cat, thunkAPI) => {
    try {
      return await categoryService.createCat(cat);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getACategory = createAsyncThunk(
  "/category/get-category",
  async (id, thunkAPI) => {
    try {
      return await categoryService.getACat(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCat = createAsyncThunk(
  "/category/delete",
  async (id, thunkAPI) => {
    try {
      return await categoryService.deleteCat(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");
export const updateBlogCat = createAsyncThunk(
  "/category/update",
  async (data, thunkAPI) => {
    try {
      return await categoryService.updateBlogCat(data.title, data.id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const categorySlice = createSlice({
  name: "blogCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.categories = action.payload.category;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message;
      })
      .addCase(createCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCat.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = "Create a new blog category success.";
      })
      .addCase(createCat.rejected, (state, action) => {
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
      .addCase(getACategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getACategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.catName = action.payload.title;
        state.parentId = action.payload.parentId;
      })
      .addCase(getACategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Delete Blog category success...";
      })
      .addCase(deleteCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default categorySlice.reducer;
