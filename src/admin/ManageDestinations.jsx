import React, { useState, useEffect } from "react";
import { Edit, Trash2, Upload, Link as LinkIcon } from "lucide-react"; // LinkIcon added
// AdminContext import can be removed if adminToken is not used for auth headers yet
// import { AdminContext } from "../context/AdminContext"; 
import {
  getAllDestinations,
  createDestination,
  updateDestination,
  deleteDestination,
} from "../api/destinationApi";

const ManageDestinations = () => {
  // const { adminToken } = useContext(AdminContext); // Uncomment if needed for API calls
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(null);

  // ✅ 1. Updated initial form data to include 'link'
  const initialFormData = {
    heading: "",
    description: "",
    link: "", // Added link field
    image: null,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [previewImage, setPreviewImage] = useState(null);

  const fetchDestinations = async () => {
    try {
      const res = await getAllDestinations();
      setDestinations(res.data.data.destinations || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch destinations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setPreviewImage(null);
    setEditMode(null);
  };

  // ✅ 2. Updated handleSubmit to send 'link' data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("heading", formData.heading);
    form.append("description", formData.description);
    form.append("link", formData.link); // Added link field
    if (formData.image) form.append("image", formData.image);

    try {
      if (editMode) {
        await updateDestination(editMode, form);
        alert("Destination updated successfully!");
      } else {
        await createDestination(form);
        alert("Destination created successfully!");
      }
      resetForm();
      fetchDestinations();
    } catch (err) {
      console.error(err);
      setError("Failed to save destination.");
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  // ✅ 3. Updated handleEdit to populate the 'link' field
  const handleEdit = (destination) => {
    setEditMode(destination._id);
    setFormData({
      heading: destination.heading,
      description: destination.description,
      link: destination.link, // Added link field
      image: null,
    });
    setPreviewImage(destination.image.url);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this destination?")) {
      try {
        await deleteDestination(id);
        alert("Destination deleted successfully!");
        fetchDestinations();
      } catch (err) {
        console.error(err);
        setError("Failed to delete destination.");
      }
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">
        Manage Destinations
      </h1>

      <div className="bg-white p-8 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-6">
          {editMode ? "Edit Destination" : "Add New Destination"}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="heading"
            value={formData.heading}
            onChange={handleInputChange}
            placeholder="Destination Heading"
            className="w-full p-3 border rounded-md"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Destination Description..."
            rows="4"
            className="w-full p-3 border rounded-md"
            required
          />

          {/* ✅ 4. Added input field for the link */}
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            placeholder="https://example.com/redirect-url"
            className="w-full p-3 border rounded-md"
            required
          />

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">
              <Upload size={18} />
              <span>Upload Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                // Only require image on create, not on update
                required={!editMode} 
              />
            </label>
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="h-24 w-24 object-cover rounded-md border"
              />
            )}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              {editMode ? "Update Destination" : "Save Destination"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Existing Destinations</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : destinations.length === 0 ? (
          <p>No destinations found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 uppercase text-xs">
                <tr>
                  <th className="p-3 text-left">Image</th>
                  <th className="p-3 text-left">Heading</th>
                  <th className="p-3 text-left">Description</th>
                  {/* ✅ 5. Added Link column to the table */}
                  <th className="p-3 text-left">Link</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {destinations.map((d) => (
                  <tr key={d._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <img
                        src={d.image.url}
                        alt={d.heading}
                        className="h-16 w-16 object-cover rounded-md border"
                      />
                    </td>
                    <td className="p-3 font-medium">{d.heading}</td>
                    <td className="p-3 truncate max-w-xs">{d.description}</td>
                    <td className="p-3 truncate max-w-xs">
                      <a href={d.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                        <LinkIcon size={14}/>
                        <span>View Link</span>
                      </a>
                    </td>
                    <td className="p-3 flex gap-3">
                      <button
                        onClick={() => handleEdit(d)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(d._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageDestinations;