import axios from "../../utilities/axios";

export const setLikes = async ({ likes, videoId }) => {
  const response = await axios(`/videos/${videoId}`, {
    method: "PATCH",
    data: {
      likes: likes + 1,
    },
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return response.data;
};
