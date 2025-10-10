

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
//     // Corrected: The backend sends a direct array of airports
//     return data || [];
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
//     // Corrected: The backend sends the airport object directly
//     return data || null;
//   } catch (err) {
//     console.error("Error fetching airport:", err);
//     return null;
//   }
// }





const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api";

/**
 * ✅ Get All Airports
 * This function remains unchanged as it was already correct.
 */
export async function getAirports() {
  try {
    const res = await fetch(`${API_URL}/airports`);
    if (!res.ok) {
      throw new Error(`Failed to fetch airports. Status: ${res.status}`);
    }
    const data = await res.json();
    return data || [];
  } catch (err) {
    console.error("Error fetching airports:", err);
    return [];
  }
}

/**
 * ✅ Get Single Airport by Slug (Updated)
 * This function now fetches real data and then formats the name for the UI.
 */
export async function getAirportBySlug(slug) {
  if (!slug) {
    console.error("getAirportBySlug called with an invalid slug.");
    return null;
  }
  try {
    const res = await fetch(`${API_URL}/airports/${slug}`);
    
    if (!res.ok) {
      // Return null for 404 (Not Found) without logging an error
      if (res.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch airport. Status: ${res.status}`);
    }

    const data = await res.json();

    // If data is fetched successfully, format its name before returning it
    if (data) {
      // --- NEW LOGIC INTEGRATED HERE ---
      // 1. Create a clean, formatted name from the URL slug.
      const formattedName = slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      // 2. Overwrite the name property from the API with our clean version.
      data.name = formattedName;
      // --- END OF NEW LOGIC ---
    }
    
    return data || null;
  } catch (err) {
    console.error(`Error fetching airport with slug "${slug}":`, err);
    return null;
  }
}