import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";
import {
  searched,
  resetCurrentPage,
  filterCategory,
} from "../../features/filter/filterSlicer";

const SearchBar = () => {
  const { search, filterBy } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const [input, setInput] = useState(search);

  const match = useMatch("/");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!filterBy.includes("search")) {
      dispatch(filterCategory("search"));
    }
    dispatch(resetCurrentPage());
    dispatch(searched(input));
    setInput("");

    if (!match) {
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className='outline-none border-none mr-2'
        type='search'
        name='search'
        placeholder='Search'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
