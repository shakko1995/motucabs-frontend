import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const searchLocation = async (query) => {
  if (!query) return [];
  const res = await axios.get(`${API_URL}/locations/search?query=${query}`);
  return res.data.results;
};
