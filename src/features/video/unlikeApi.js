import axios from "../../utilities/axios";

export const setUnLikes = async ({ unlikes, videoId }) => {
  const response = await axios(`/videos/${videoId}`, {
    method: "PATCH",
    data: {
      unlikes: unlikes + 1,
    },
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return response.data;
};
