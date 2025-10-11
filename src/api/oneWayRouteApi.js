// Example: src/services/oneWayRouteApi.js

// Use your environment variable for the base URL
// const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/one-way-routes`;

const API_URL= "http://localhost:5000/api/one-way-routes"

/**
 * ✅ Get all one-way routes, grouped by city (for the accordion view)
 */
export async function getGroupedOneWayRoutes() {
  try {
    const res = await fetch(`${API_URL}/grouped`);
    if (!res.ok) throw new Error("Failed to fetch grouped one-way routes");
    const data = await res.json();
    return data || [];
  } catch (err) {
    console.error("Error fetching grouped one-way routes:", err);
    return [];
  }
}

/**
 * ✅ Get all one-way routes in a simple list (for the admin panel)
 */
export async function getAllOneWayRoutes() {
    try {
      // Assuming your admin routes require a token
      const token = localStorage.getItem('adminToken');
      const res = await fetch(API_URL, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to fetch all one-way routes");
      const data = await res.json();
      return data || [];
    } catch (err) {
      console.error("Error fetching all one-way routes:", err);
      return [];
    }
}

/**
 * ✅ Get a single one-way route by its slug
 */
export async function getOneWayRouteBySlug(slug) {
  try {
    const res = await fetch(`${API_URL}/slug/${slug}`);
    if (!res.ok) throw new Error(`Failed to fetch route with slug: ${slug}`);
    const data = await res.json();
    return data || null;
  } catch (err) {
    console.error(`Error fetching one-way route ${slug}:`, err);
    return null;
  }
}

/**
 * ✅ Add a new one-way route (for admin)
 */
export async function addOneWayRoute(routeData, files) {
  try {
    const token = localStorage.getItem('adminToken');
    const formData = new FormData();

    // Append text fields
    for (const key in routeData) {
        formData.append(key, JSON.stringify(routeData[key]));
    }
    // Append files
    if (files && files.length > 0) {
        files.forEach(file => formData.append('sectionImages', file));
    }

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to add route");
    }
    return await res.json();
  } catch (err) {
    console.error("Error adding one-way route:", err);
    throw err;
  }
}

/**
 * ✅ Update an existing one-way route by ID (for admin)
 */
export async function updateOneWayRoute(id, routeData, files) {
  try {
    const token = localStorage.getItem('adminToken');
    const formData = new FormData();
    
    for (const key in routeData) {
        formData.append(key, JSON.stringify(routeData[key]));
    }
    if (files && files.length > 0) {
        files.forEach(file => formData.append('sectionImages', file));
    }
    
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to update route");
    }
    return await res.json();
  } catch (err) {
    console.error(`Error updating one-way route ${id}:`, err);
    throw err;
  }
}

/**
 * ✅ Delete a one-way route by ID (for admin)
 */
export async function deleteOneWayRoute(id) {
  try {
    const token = localStorage.getItem('adminToken');
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { 'Authorization': `Bearer ${token}` },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to delete route");
    }
    return await res.json();
  } catch (err) {
    console.error(`Error deleting one-way route ${id}:`, err);
    throw err;
  }
}
// Add this helper function to the top of your API file
async function apiClient(endpoint, method = 'GET', body = null, isFormData = false) {
  const token = localStorage.getItem('adminToken');
  const headers = {};

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    if (isFormData) {
      // The browser sets the Content-Type header automatically for FormData
      config.body = body;
    } else {
      headers['Content-Type'] = 'application/json';
      config.body = JSON.stringify(body);
    }
  }

  try {
    const res = await fetch(endpoint, config);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `An error occurred: ${res.statusText}`);
    }

    return res.json();
  } catch (err) {
    console.error(`API call failed: ${err.message}`);
    throw err;
  }
}

/**
 * ✅ Upload an Excel sheet to bulk-create routes (for admin)
 */
export function uploadRoutesSheet(formData) {
  // The apiClient helper handles FormData and auth token automatically
  return apiClient(`${API_URL}/upload-sheet`, 'POST', formData, true);
}