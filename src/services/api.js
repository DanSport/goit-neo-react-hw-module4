import axios from "axios";

const accessKey = "42VarMUy95zIhO1Jz-x9HX0NLHq491q3ijGGCZNhkmA";

export const fetchImages = async (query, page) => {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    params: {
      query,
      page,
      per_page: 12,
      client_id: accessKey,
    },
  });

  return response.data;
};
