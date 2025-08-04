import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../../config";

const initialState = {
  isLoading: false,
  recommendations: [],
  error: null,
};

export const fetchProductRecommendations = createAsyncThunk(
  "/recommendations/fetchRecommendations",
  async ({ category, limit = 6 }) => {
    const query = new URLSearchParams({
      limit,
      ...(category && { category }),
    });

    const result = await axios.get(
      `${API_BASE_URL}/api/shop/products/recommendations?${query}`
    );

    return result?.data;
  }
);

const recommendationsSlice = createSlice({
  name: "recommendations",
  initialState,
  reducers: {
    clearRecommendations: (state) => {
      state.recommendations = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductRecommendations.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductRecommendations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recommendations = action.payload.data;
        state.error = null;
      })
      .addCase(fetchProductRecommendations.rejected, (state, action) => {
        state.isLoading = false;
        state.recommendations = [];
        state.error = action.error.message;
      });
  },
});

export const { clearRecommendations } = recommendationsSlice.actions;

export default recommendationsSlice.reducer; 