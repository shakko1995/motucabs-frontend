const API_URL = "http://localhost:5000/api/car-attachment";

export async function getAllCarAttachments() {
  const token = localStorage.getItem("adminToken");
  const res = await fetch(API_URL, { headers: { Authorization: `Bearer ${token}` } });
  return res.ok ? await res.json() : [];
}

export async function getCarAttachmentBySlug(slug) {
  const res = await fetch(`${API_URL}/${slug}`);
  return res.ok ? await res.json() : null;
}

export async function addCarAttachment(data, files) {
  const token = localStorage.getItem("adminToken");
  const formData = new FormData();
  for (const key in data) formData.append(key, JSON.stringify(data[key]));
  if (files) files.forEach(f => formData.append("sectionImages", f));
  const res = await fetch(API_URL, { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: formData });
  if (!res.ok) throw new Error((await res.json()).message);
  return await res.json();
}

export async function updateCarAttachment(id, data, files) {
  const token = localStorage.getItem("adminToken");
  const formData = new FormData();
  for (const key in data) formData.append(key, JSON.stringify(data[key]));
  if (files) files.forEach(f => formData.append("sectionImages", f));
  const res = await fetch(`${API_URL}/${id}`, { method: "PUT", headers: { Authorization: `Bearer ${token}` }, body: formData });
  if (!res.ok) throw new Error((await res.json()).message);
  return await res.json();
}

export async function deleteCarAttachment(id) {
  const token = localStorage.getItem("adminToken");
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error((await res.json()).message);
  return await res.json();
}

export async function uploadCarAttachmentsSheet(formData) {
  const token = localStorage.getItem("adminToken");
  const res = await fetch(`${API_URL}/upload-sheet`, { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: formData });
  if (!res.ok) throw new Error((await res.json()).message);
  return await res.json();
}
