// // src/api/airportApi.js
// const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api";

// /**
//  * ✅ Get All Airports
//  */
// export async function getAirports() {
//   try {
//     const res = await fetch(`${API_URL}/airports`);
//     if (!res.ok) {
//       throw new Error("Failed to fetch airports");
//     }
//     const data = await res.json();
//     return data.airports || [];
//   } catch (err) {
//     console.error("Error fetching airports:", err);
//     return [];
//   }
// }

// /**
//  * ✅ Get Single Airport by Slug
//  */
// export async function getAirportBySlug(slug) {
//   try {
//     const res = await fetch(`${API_URL}/airports/${slug}`);
//     if (!res.ok) {
//       throw new Error("Failed to fetch airport");
//     }
//     const data = await res.json();
//     return data.airport || null;
//   } catch (err) {
//     console.error("Error fetching airport:", err);
//     return null;
//   }
// }



const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api";

/**
 * ✅ Get All Airports
 */
export async function getAirports() {
  try {
    const res = await fetch(`${API_URL}/airports`);
    if (!res.ok) {
      throw new Error("Failed to fetch airports");
    }
    const data = await res.json();
    // Corrected: The backend sends a direct array of airports
    return data || [];
  } catch (err) {
    console.error("Error fetching airports:", err);
    return [];
  }
}

/**
 * ✅ Get Single Airport by Slug
 */
export async function getAirportBySlug(slug) {
  try {
    const res = await fetch(`${API_URL}/airports/${slug}`);
    if (!res.ok) {
      throw new Error("Failed to fetch airport");
    }
    const data = await res.json();
    // Corrected: The backend sends the airport object directly
    return data || null;
  } catch (err) {
    console.error("Error fetching airport:", err);
    return null;
  }
}