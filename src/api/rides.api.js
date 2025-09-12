import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const bookAirportRide = async (data) => {
  return await axios.post(`${API_URL}/rides/airport`, data);
};

export const bookOutstationRide = async (data) => {
  return await axios.post(`${API_URL}/rides/outstation`, data);
};

export const bookDayTripRide = async (data) => {
  return await axios.post(`${API_URL}/rides/daytrip`, data);
};
