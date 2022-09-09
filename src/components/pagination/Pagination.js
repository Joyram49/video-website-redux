import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  gotoNextPage,
  gotoPrevPage,
  changePage,
} from "../../features/filter/filterSlicer";

const Pagination = () => {
  const { totalVideos, videos } = useSelector((state) => state.videos);
  const [start, setStart] = useState(0);
  const dispatch = useDispatch();
  const {
    pagination: { currentPage, limit },
  } = useSelector((state) => state.filter);

  const pages = Math.ceil(totalVideos / limit);

  const loadedPages = pages > 5 ? 5 : pages;
  const paginationGroup = new Array(loadedPages)
    .fill()
    .map((_, index) => start + index + 1);

  const handleNextClick = () => {
    setStart((prev) => prev + 1);
    dispatch(gotoNextPage());
  };

  const handlePrevClick = () => {
    if (paginationGroup[0] !== 1) {
      setStart((prev) => prev - 1);
    }
    dispatch(gotoPrevPage());
  };

  const handleChangePage = (p) => {
    dispatch(changePage(p));
  };

  return (
    <section className={videos.length > 0 ? "pt-12" : "hidden"}>
      <div className='max-w-7xl mx-auto px-5 py-6 lg:px-0 flex gap-2 justify-end'>
        <button
          className={
            currentPage === 1
              ? "hidden"
              : "bg-slate-300 text-slate-900 px-4 py-1 rounded-full hover:bg-blue-600 hover:text-white"
          }
          onClick={handlePrevClick}
        >
          prev
        </button>
        {paginationGroup.map((p, index) => (
          <button
            className={
              currentPage === p
                ? "bg-blue-600 text-white px-4 py-1 rounded-full"
                : "bg-slate-300 text-slate-900 px-4 py-1 rounded-full hover:bg-blue-600 hover:text-white"
            }
            key={index}
            onClick={() => handleChangePage(p)}
          >
            {p}
          </button>
        ))}
        <button
          className={
            paginationGroup[paginationGroup.length - 1] === pages
              ? "hidden"
              : "bg-slate-300 text-slate-900 px-4 py-1 rounded-full hover:bg-blue-600 hover:text-white"
          }
          onClick={handleNextClick}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Pagination;
