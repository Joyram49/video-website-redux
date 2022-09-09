import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSingleFilter } from "../../features/filter/filterSlicer";

const FilterCategories = () => {
  const { filterBy } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const handleFilterClick = (filter) => {
    dispatch(clearSingleFilter(filter));
  };
  return (
    <div className='max-w-7xl mx-auto px-5 py-8 lg:px-0 flex flex-wrap gap-2   overflow-y-auto'>
      <h2>Filtered By : </h2>
      {filterBy.length > 0
        ? filterBy.map((filter, index) => (
            <div
              key={filter + index}
              className='bg-blue-600 text-white px-4 rounded  flex gap-2'
            >
              <p>{filter}</p>
              <button onClick={() => handleFilterClick(filter)}>X</button>
            </div>
          ))
        : null}
    </div>
  );
};

export default FilterCategories;
