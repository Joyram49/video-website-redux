import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import VideoGridItem from "./VideoGridItem";
import { fetchVideos } from "../../features/videos/videosSlice";

import Loading from "../../utilities/Loading";

const VideoGrid = () => {
  const { videos, loading, isError, error } = useSelector(
    (state) => state.videos
  );
  const {
    tags,
    search,
    author,
    pagination: { currentPage, limit },
  } = useSelector((state) => state.filter);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVideos({ tags, search, author, currentPage, limit }));
  }, [dispatch, tags, search, author, currentPage, limit]);

  let content;

  if (loading) content = <Loading />;
  if (!loading && isError) content = <div className='col-span-12'>{error}</div>;
  if (!loading && !isError && videos?.length === 0) {
    content = <div className='col-span-12'>No Data Found</div>;
  }
  if (!loading && !isError && videos?.length > 0) {
    content = videos.map((video) => (
      <VideoGridItem key={video.id} video={video} />
    ));
  }

  return (
    <section className='pt-12'>
      <section className='pt-12'>
        <div className='grid grid-cols-12 gap-4 max-w-7xl mx-auto px-5 lg:px-0 min-h-[300px]'>
          {content}
        </div>
      </section>
    </section>
  );
};

export default VideoGrid;
