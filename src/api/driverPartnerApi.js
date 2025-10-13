const API_URL = "http://localhost:5000/api/driver-partner";

/**
 * Get all driver partners (admin)
 */
export async function getAllDriverPartners() {
  try {
    const token = localStorage.getItem("adminToken");
    const res = await fetch(API_URL, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) throw new Error("Failed to fetch driver partners");
    return await res.json();
  } catch (err) {
    console.error("Error fetching driver partners:", err);
    return [];
  }
}

/**
 * Get driver partner by slug
 */
export async function getDriverPartnerBySlug(slug) {
  try {
    const res = await fetch(`${API_URL}/${slug}`);
    if (!res.ok) throw new Error(`Failed to fetch driver partner: ${slug}`);
    return await res.json();
  } catch (err) {
    console.error(`Error fetching driver partner ${slug}:`, err);
    return null;
  }
}

/**
 * Create driver partner
 */
export async function addDriverPartner(data, files) {
  try {
    const token = localStorage.getItem("adminToken");
    const formData = new FormData();

    for (const key in data) formData.append(key, JSON.stringify(data[key]));
    if (files) files.forEach(f => formData.append("sectionImages", f));

    const res = await fetch(API_URL, { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: formData });
    if (!res.ok) throw new Error((await res.json()).message || "Failed to add driver partner");
    return await res.json();
  } catch (err) {
    console.error("Error adding driver partner:", err);
    throw err;
  }
}

/**
 * Update driver partner
 */
export async function updateDriverPartner(id, data, files) {
  try {
    const token = localStorage.getItem("adminToken");
    const formData = new FormData();
    for (const key in data) formData.append(key, JSON.stringify(data[key]));
    if (files) files.forEach(f => formData.append("sectionImages", f));

    const res = await fetch(`${API_URL}/${id}`, { method: "PUT", headers: { Authorization: `Bearer ${token}` }, body: formData });
    if (!res.ok) throw new Error((await res.json()).message || "Failed to update driver partner");
    return await res.json();
  } catch (err) {
    console.error(`Error updating driver partner ${id}:`, err);
    throw err;
  }
}

/**
 * Delete driver partner
 */
export async function deleteDriverPartner(id) {
  try {
    const token = localStorage.getItem("adminToken");
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) throw new Error((await res.json()).message || "Failed to delete driver partner");
    return await res.json();
  } catch (err) {
    console.error(`Error deleting driver partner ${id}:`, err);
    throw err;
  }
}

/**
 * Upload Excel sheet
 */
export async function uploadDriverPartnersSheet(formData) {
  const token = localStorage.getItem("adminToken");
  const res = await fetch(`${API_URL}/upload-sheet`, { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: formData });
  if (!res.ok) throw new Error((await res.json()).message || "Failed to upload driver partners sheet");
  return await res.json();
}
