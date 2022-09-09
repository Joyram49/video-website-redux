import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTags } from "./tagsApi";

// initialize primary state
const initialState = {
  tags: [],
  loading: false,
  isError: false,
  error: "",
};

// create async thunk
export const fetchTags = createAsyncThunk("tags/fetchTags", async () => {
  const tags = await getTags();
  return tags;
});

const fetchTagsSlice = createSlice({
  name: "tags",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.isError = false;
        state.loading = true;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.loading = false;
        state.tags = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.error.message;
        state.tags = [];
      });
  },
});

export default fetchTagsSlice.reducer;
