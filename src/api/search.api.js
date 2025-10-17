// src/api/search.api.js (or wherever you keep your API calls)
import axios from 'axios';

const API_URL = "http://localhost:5000";

export const saveSearchToDb = async (searchData, token) => {
  try {
    await axios.post(`${API_URL}/api/search-history`, searchData, {
      headers: {
        // Send the token so the backend can identify the user
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    // It's okay if this fails, we don't want to block the user's main search
    console.error("Could not save search history:", error);
  }
};