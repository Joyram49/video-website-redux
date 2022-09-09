import React from "react";
import Tags from "../components/tags/Tags";
import VideoGrid from "../components/videoGrid/VideoGrid";
import Pagination from "../components/pagination/Pagination";
import FilterCategories from "../components/filterCategories/FilterCategories";

const Home = () => {
  return (
    <div>
      <Tags />
      <FilterCategories />
      <VideoGrid />
      <Pagination />
    </div>
  );
};

export default Home;
