import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: [],
  error: null
};

export const addReview = createAsyncThunk(
  "/order/addReview",
  async (formdata) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/shop/review/add`,
        formdata
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to add review" };
    }
  }
);

export const getReviews = createAsyncThunk("/order/getReviews", async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/shop/review/${id}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch reviews" };
  }
});

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Add Review
      .addCase(addReview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Get Reviews
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
        state.error = null;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.reviews = [];
        state.error = action.error.message;
      });
  },
});

export const { clearError } = reviewSlice.actions;
export default reviewSlice.reducer;
