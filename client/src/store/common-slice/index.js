import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const initialState = {
  isLoading: false,
  featureImageList: [],
};

export const getFeatureImages = createAsyncThunk(
  "/order/getFeatureImages",
  async () => {
    console.log("Fetching feature images from API...");
    const response = await axios.get(
      `${API_BASE_URL}/api/common/feature/get`
    );
    console.log("API response:", response.data);
    return response.data;
  }
);

export const addFeatureImage = createAsyncThunk(
  "/order/addFeatureImage",
  async (image) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/common/feature/add`,
      { image }
    );

    return response.data;
  }
);

export const deleteFeatureImage = createAsyncThunk(
  "/order/deleteFeatureImage",
  async (id) => {
    const response = await axios.delete(
      `${API_BASE_URL}/api/common/feature/delete/${id}`
    );

    return response.data;
  }
);

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        console.log("Fetching feature images...");
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        console.log("Feature images fetched successfully:", action.payload);
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state, action) => {
        console.error("Error fetching feature images:", action.error);
        state.isLoading = false;
        state.featureImageList = [];
      })
      .addCase(deleteFeatureImage.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.featureImageList = state.featureImageList.filter(
            (image) => image._id !== action.payload.data._id
          );
        }
      });
  },
});

export default commonSlice.reducer;
