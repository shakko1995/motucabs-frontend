// const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api/outstations";

const API_URL = "http://localhost:5000/api/outstations";

/**
 * ✅ Get All Outstations
 */
export async function getOutstations() {
  try {
    const res = await fetch(`${API_URL}`);
    if (!res.ok) {
      throw new Error("Failed to fetch outstations");
    }
    const data = await res.json();
    // Backend sends array of outstations
    return data || [];
  } catch (err) {
    console.error("Error fetching outstations:", err);
    return [];
  }
}

/**
 * ✅ Get Single Outstation by Slug
 */
export async function getOutstationBySlug(slug) {
  try {
    const res = await fetch(`${API_URL}/${slug}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch outstation with slug: ${slug}`);
    }
    const data = await res.json();
    return data || null;
  } catch (err) {
    console.error(`Error fetching outstation ${slug}:`, err);
    return null;
  }
}

/**
 * ✅ Add New Outstation
 */
export async function addOutstation(outstationData) {
  try {
    const res = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(outstationData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to add outstation");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error adding outstation:", err);
    return null;
  }
}

/**
 * ✅ Update Outstation
 */
export async function updateOutstation(slug, outstationData) {
  try {
    const res = await fetch(`${API_URL}/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(outstationData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to update outstation");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(`Error updating outstation ${slug}:`, err);
    return null;
  }
}

/**
 * ✅ Delete Outstation
 */
export async function deleteOutstation(slug) {
  try {
    const res = await fetch(`${API_URL}/${slug}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to delete outstation");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(`Error deleting outstation ${slug}:`, err);
    return null;
  }
}
