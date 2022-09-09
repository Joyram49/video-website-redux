import { createSlice } from "@reduxjs/toolkit";

// initialize primary state
const initialState = {
  tags: [],
  search: "",
  author: "",
  pagination: {
    currentPage: 1,
    limit: 5,
  },
  filterBy: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    tagSelected: (state, action) => {
      state.tags.push(action.payload);
    },
    tagRemoved: (state, action) => {
      const indexOfRemovedItem = state.tags.indexOf(action.payload);

      if (indexOfRemovedItem !== -1) {
        state.tags.splice(indexOfRemovedItem, 1);
      }
    },
    searched: (state, action) => {
      state.search = action.payload;
    },
    filterByAuthor: (state, action) => {
      state.author = action.payload;
    },
    gotoNextPage: (state) => {
      state.pagination.currentPage += 1;
    },
    gotoPrevPage: (state) => {
      state.pagination.currentPage -= 1;
    },
    changePage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    resetFilter: (state) => {
      state.tags = [];
      state.author = "";
      state.search = "";
      state.filterBy = [];
    },
    resetCurrentPage: (state) => {
      state.pagination.currentPage = 1;
    },
    filterCategory: (state, action) => {
      state.filterBy.push(action.payload);
    },
    clearSingleFilter: (state, action) => {
      if (state.filterBy.includes(action.payload)) {
        if (action.payload === "tags") {
          state.tags = [];
        } else if (action.payload === "author") {
          state.author = "";
        } else {
          state.search = "";
        }
      }
      const index = state.filterBy.indexOf(action.payload);
      state.filterBy.splice(index, 1);
      state.pagination.currentPage = 1;
    },
  },
});

export default filterSlice.reducer;

export const {
  tagRemoved,
  tagSelected,
  searched,
  filterByAuthor,
  gotoNextPage,
  gotoPrevPage,
  changePage,
  resetFilter,
  resetCurrentPage,
  filterCategory,
  clearSingleFilter,
} = filterSlice.actions;
