import React, { useEffect } from "react";
import VideoPlayer from "../components/videoInfo/VideoPlayer";
import VideoDesc from "../components/videoInfo/VideoDesc";
import RelatedVideos from "../components/relatedVideos/RelatedVideos";
import { useDispatch, useSelector } from "react-redux";

import { fetchVideo } from "../features/video/videoSlice";
import { useParams } from "react-router-dom";
import Loading from "../utilities/Loading";

const Video = () => {
  const { video, loading, isError, error } = useSelector(
    (state) => state.video
  );
  const dispatch = useDispatch();

  const { videoId } = useParams();

  useEffect(() => {
    dispatch(fetchVideo(videoId));
  }, [dispatch, videoId]);

  const { link, title, description, id, tags, date } = video;

  let content;

  if (loading) content = <Loading />;
  if (!loading && isError) content = <div className='col-span-12'>{error}</div>;
  if (!loading && !isError && !video?.id === 0) {
    content = <div className='col-span-12'>No video Found!!!!</div>;
  }
  if (!loading && !isError && video?.id > 0) {
    content = (
      <div className='grid grid-cols-3 gap-2 lg:gap-8'>
        <div className='col-span-full w-full space-y-8 lg:col-span-2'>
          <VideoPlayer link={link} title={title} />

          <VideoDesc title={title} desc={description} date={date} />
        </div>
        <RelatedVideos id={id} tags={tags} />
      </div>
    );
  }

  return (
    <section className='pt-6 pb-20'>
      <div className='mx-auto max-w-7xl px-2 pb-20 min-h-[400px]'>
        {/* <div className='grid grid-cols-3 gap-2 lg:gap-8'>
          <div className='col-span-full w-full space-y-8 lg:col-span-2'>
            <VideoPlayer />

            <VideoDesc />
          </div>
          <RelatedVideos />
        </div> */}
        {content}
      </div>
    </section>
  );
};

export default Video;
