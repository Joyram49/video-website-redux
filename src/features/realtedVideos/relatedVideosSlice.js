import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getrelatedVideos } from "./relatedVideosApi";

// initialize primary state
const initialState = {
  relatedVideos: [],
  loading: false,
  isError: false,
  error: "",
};

// create async thunk
export const fetchRelatedVideos = createAsyncThunk(
  "relatedVideos/fetchRelatedVideos",
  async ({ id, tags }) => {
    const videos = await getrelatedVideos({ id, tags });
    return videos;
  }
);

const fetchRelatedVideosSlice = createSlice({
  name: "relatedVideos",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchRelatedVideos.pending, (state) => {
        state.isError = false;
        state.loading = true;
      })
      .addCase(fetchRelatedVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedVideos = action.payload;
      })
      .addCase(fetchRelatedVideos.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.error.message;
        state.relatedVideos = [];
      });
  },
});

export default fetchRelatedVideosSlice.reducer;
