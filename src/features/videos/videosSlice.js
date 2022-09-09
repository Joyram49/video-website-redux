import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getVideos } from "./videosApi";

// initialize primary state
const initialState = {
  videos: [],
  loading: false,
  isError: false,
  error: "",
  totalVideos: 1,
};

// create async thunk
export const fetchVideos = createAsyncThunk(
  "videos/fetchVideos",
  async ({ tags, search, author, currentPage, limit }) => {
    const videos = await getVideos(tags, search, author, currentPage, limit);
    return videos;
  }
);

const fetchVideosSlice = createSlice({
  name: "videos",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.isError = false;
        state.loading = true;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload.data;
        state.totalVideos = action.payload.total;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.error.message;
        state.videos = [];
      });
  },
});

export default fetchVideosSlice.reducer;
