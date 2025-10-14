import axios from "axios";

const API_URL = "http://localhost:5000/api/destinations";

// ✅ Get all destinations
export const getAllDestinations = async () => {
  return await axios.get(API_URL);
};

// ✅ Get one
export const getDestinationById = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

// ✅ Create new destination
export const createDestination = async (data) => {
  return await axios.post(API_URL, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// ✅ Update destination
export const updateDestination = async (id, data) => {
  return await axios.patch(`${API_URL}/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// ✅ Delete destination
export const deleteDestination = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
