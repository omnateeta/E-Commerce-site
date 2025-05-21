import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const initialState = {
  isLoading: false,
  searchResults: [],
};

export const searchProducts = createAsyncThunk(
  "/search/searchProducts",
  async (keyword) => {
    const response = await axios.get(
      `${API_BASE_URL}/api/shop/search/${keyword}`
    );

    return response.data;
  }
);

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    resetSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload.data;
      })
      .addCase(searchProducts.rejected, (state) => {
        state.isLoading = false;
        state.searchResults = [];
      });
  },
});

const { resetSearchResults } = searchSlice.actions;
const searchReducer = searchSlice.reducer;

export { resetSearchResults, searchReducer as default };
