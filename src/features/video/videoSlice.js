import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getVideo } from "./videoApi";
import { setLikes } from "./likesApi";
import { setUnLikes } from "./unlikeApi";

// initialize primary state
const initialState = {
  video: {},
  loading: false,
  isError: false,
  error: "",
};

// create video async thunk
export const fetchVideo = createAsyncThunk("video/fetchVideo", async (id) => {
  const video = await getVideo(id);
  return video;
});

// update likes async thunk
export const updateLikes = createAsyncThunk(
  "videos/updateLikes",
  async ({ likes, videoId }) => {
    const totalLike = await setLikes({ likes, videoId });
    return totalLike;
  }
);

// update unlikes async thunk
export const updateUnLikes = createAsyncThunk(
  "videos/updateUnLikes",
  async ({ unlikes, videoId }) => {
    const totalUnlike = await setUnLikes({ unlikes, videoId });
    return totalUnlike;
  }
);

const fetchVideoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    localUpdateLikes: (state) => {
      state.video.likes += 1;
    },
    localUpdateunLikes: (state) => {
      state.video.unlikes += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideo.pending, (state) => {
        state.isError = false;
        state.loading = true;
      })
      .addCase(fetchVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.video = action.payload;
      })
      .addCase(fetchVideo.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.error.message;
        state.video = [];
      });
  },
});

export default fetchVideoSlice.reducer;

export const { localUpdateLikes, localUpdateunLikes } = fetchVideoSlice.actions;
