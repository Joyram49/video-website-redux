import axios from "../../utilities/axios";

export const getVideos = async (tags, search, author, currentPage, limit) => {
  let queryString = "";
  if (tags?.length > 0) {
    queryString += tags.map((tag) => `&tags_like=${tag}`).join("&");
  }
  if (search !== "") {
    queryString += `&q=${search}`;
  }
  if (author !== "") {
    queryString += `&author_like=${author}`;
  }
  if (limit && currentPage) {
    queryString += `&_page=${currentPage}&_limit=${limit}`;
  }
  const response = await axios.get(`/videos?${queryString}`);
  return {
    data: response.data,
    total: response.headers["x-total-count"],
  };
};
