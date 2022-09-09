import { configureStore } from "@reduxjs/toolkit";
import videosReducer from "../features/videos/videosSlice";
import TagsReducer from "../features/tags/tagsSlice";
import videoReducer from "../features/video/videoSlice";
import relatedVideosReducer from "../features/realtedVideos/relatedVideosSlice";
import filterReducer from "../features/filter/filterSlicer";

export const store = configureStore({
  reducer: {
    videos: videosReducer,
    tags: TagsReducer,
    video: videoReducer,
    relatedVideos: relatedVideosReducer,
    filter: filterReducer,
  },
});
