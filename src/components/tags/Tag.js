import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  tagRemoved,
  tagSelected,
  resetCurrentPage,
  filterCategory,
} from "../../features/filter/filterSlicer";

const Tag = ({ tag }) => {
  const { tags: selectedTags, filterBy } = useSelector((state) => state.filter);

  const dispatch = useDispatch();
  const isSelect = selectedTags.includes(tag.title) ? true : false;

  const style = isSelect
    ? "bg-blue-600 text-white px-4 py-1 rounded-full cursor-pointer"
    : "bg-blue-100 text-blue-600 px-4 py-1 rounded-full cursor-pointer";

  // if (isSelect) {
  //   dispatch(tagRemoved(tag.title))
  // } else {
  //   dispatch(tagRemoved(tag.title));
  // }

  const toggleTag = () => {
    if (!filterBy.includes("tags")) {
      dispatch(filterCategory("tags"));
    }
    dispatch(resetCurrentPage());
    isSelect
      ? dispatch(tagRemoved(tag.title))
      : dispatch(tagSelected(tag.title));
  };

  return (
    <div className={style} onClick={toggleTag}>
      {tag.title}
    </div>
  );
};

export default Tag;
