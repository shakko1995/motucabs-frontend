//const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api/book-taxi";


const API_URL= "http://localhost:5000/api/book-taxi"
/**
 * ✅ Get all popular routes
 */
export async function getPopularRoutes() {
  try {
    const res = await fetch(`${API_URL}`);
    if (!res.ok) throw new Error("Failed to fetch popular routes");
    const data = await res.json();
    return data || [];
  } catch (err) {
    console.error("Error fetching popular routes:", err);
    return [];
  }
}

/**
 * ✅ Get a single popular route by slug
 */
export async function getPopularRouteBySlug(slug) {
  try {
    const res = await fetch(`${API_URL}/${slug}`);
    if (!res.ok) throw new Error(`Failed to fetch route with slug: ${slug}`);
    const data = await res.json();
    return data || null;
  } catch (err) {
    console.error(`Error fetching popular route ${slug}:`, err);
    return null;
  }
}

/**
 * ✅ Add a new popular route
 */
export async function addPopularRoute(routeData) {
  try {
    const res = await fetch(`${API_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(routeData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to add route");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error adding popular route:", err);
    return null;
  }
}

/**
 * ✅ Update an existing popular route by ID
 */
export async function updatePopularRoute(id, routeData) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(routeData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to update route");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(`Error updating popular route ${id}:`, err);
    return null;
  }
}

/**
 * ✅ Delete a popular route by ID
 */
export async function deletePopularRoute(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to delete route");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(`Error deleting popular route ${id}:`, err);
    return null;
  }
}
