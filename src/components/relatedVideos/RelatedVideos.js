import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RelatedVideo from "./RelatedVideo";
import { fetchRelatedVideos } from "../../features/realtedVideos/relatedVideosSlice";
import Loading from "../../utilities/Loading";

const RelatedVideos = ({ id, tags }) => {
  const { relatedVideos, loading, isError, error } = useSelector(
    (state) => state.relatedVideos
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRelatedVideos({ id, tags }));
  }, [dispatch, id, tags]);

  let content;

  if (loading) content = <Loading />;
  if (!loading && isError) content = <div className='col-span-12'>{error}</div>;
  if (!loading && !isError && relatedVideos?.length === 0) {
    content = <div className='col-span-12'>No Data Found</div>;
  }
  if (!loading && !isError && relatedVideos?.length > 0) {
    content = relatedVideos.map((video) => (
      <RelatedVideo key={video.id} video={video} />
    ));
  }

  return (
    <div className='col-span-full lg:col-auto max-h-[570px] overflow-y-auto'>
      {content}
    </div>
  );
};

export default RelatedVideos;
