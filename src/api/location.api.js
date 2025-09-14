import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;
// Search for locations
export const searchLocation = async (query) => {
  if (!query) return [];
  const res = await axios.get(`${API_URL}/locations/search?query=${query}`);
  return res.data.results;
};


// Search for airports
export const searchAirports = async (query) => {
  const res = await axios.get(`${API_URL}/location/search-airports?query=${query}`);
  return res.data;
};
