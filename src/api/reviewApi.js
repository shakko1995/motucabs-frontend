// src/api/reviewApi.js

export async function getReviews() {
  try {
    const res = await fetch("http://localhost:5000/api/reviews");
    if (!res.ok) {
      throw new Error("Failed to fetch reviews");
    }
    const data = await res.json();
    return data.reviews || []; 
  } catch (err) {
    console.error("Error fetching reviews:", err);
    return [];
  }
}
