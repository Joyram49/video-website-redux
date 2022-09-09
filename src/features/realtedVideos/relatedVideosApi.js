import axios from "../../utilities/axios";

// ?tags_&like=javascript&tags_like=react&id_ne=1&_limit=5

export const getrelatedVideos = async ({ id, tags }) => {
  const queryString =
    tags?.length > 0
      ? tags.map((tag) => `tags_like=${tag}`).join("&") +
        `&id_ne=${id}&_limit=5`
      : `&id_ne=${id}&_limit=5`;
  const response = await axios.get(`/videos?${queryString}`);
  return response.data;
};
