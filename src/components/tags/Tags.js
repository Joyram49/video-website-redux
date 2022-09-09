import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tag from "./Tag";

import { fetchTags } from "../../features/tags/tagsSlice";
import { resetFilter } from "../../features/filter/filterSlicer";

const Tags = () => {
  const dispatch = useDispatch();
  const { tags } = useSelector((state) => state.tags);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  const handleReset = (e) => {
    e.preventDefault();
    dispatch(resetFilter());
  };

  return tags.length > 0 ? (
    <section>
      <div className='max-w-7xl mx-auto px-5 py-6 lg:px-0 flex flex-wrap gap-2 border-b overflow-y-auto'>
        {tags.map((tag) => (
          <Tag key={tag.id} tag={tag} />
        ))}
        <button
          className='bg-indigo-800 text-white ml-auto mr-6 my-4 px-5 py-2 rounded cursor-pointer '
          onClick={(e) => handleReset(e)}
        >
          Reset
        </button>
      </div>
    </section>
  ) : null;
};

export default Tags;
