import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LikeImg from "../../assets/like.svg";
import UnLikeImg from "../../assets/unlike.svg";
import {
  updateLikes,
  updateUnLikes,
  localUpdateLikes,
  localUpdateunLikes,
} from "../../features/video/videoSlice";

const LikeUnlike = () => {
  const { video } = useSelector((state) => state.video);
  const { likes, unlikes } = video;

  const dispatch = useDispatch();

  const { videoId } = useParams();

  const handleLikes = () => {
    dispatch(localUpdateLikes());
    dispatch(updateLikes({ likes, videoId }));
  };

  const handleDislikes = () => {
    dispatch(localUpdateunLikes());
    dispatch(updateUnLikes({ unlikes, videoId }));
  };

  return (
    <div className='flex gap-10 w-48'>
      <div className='flex gap-1'>
        <div className='shrink-0'>
          <img
            className='w-5 block'
            src={LikeImg}
            alt='Like'
            onClick={handleLikes}
          />
        </div>
        <div className='text-sm leading-[1.7142857] text-slate-600'>
          {likes}
        </div>
      </div>
      <div className='flex gap-1'>
        <div className='shrink-0'>
          <img
            className='w-5 block'
            src={UnLikeImg}
            alt='Unlike'
            onClick={handleDislikes}
          />
        </div>
        <div className='text-sm leading-[1.7142857] text-slate-600'>
          {unlikes}
        </div>
      </div>
    </div>
  );
};

export default LikeUnlike;
