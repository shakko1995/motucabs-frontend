import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AdminContext } from "../context/AdminContext";
import { Edit, Trash2, PlusCircle, XCircle, Save } from "lucide-react";

const ManagePackages = () => {
  const { adminToken } = useContext(AdminContext);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(null);

  const initialFormData = {
    title: "",
    description: "",
    fromState: "",
    fromCity: "",
    nights: "",
    days: "",
    price: "",
    discountPrice: "",
    category: "",
    images: [],
    itinerary: [],
    metaTitle: "",
    metaDescription: "",
    metaKeywords: [],
    isActive: true,
    isFeatured: false,
  };

  const [formData, setFormData] = useState(initialFormData);

  // --------------------------
  // Fetch Packages
  // --------------------------
  const fetchPackages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/packages/all");
      setPackages(res.data.data || []);
    } catch (err) {
      setError("Failed to fetch packages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  // --------------------------
  // Handle Form Input Change
  // --------------------------
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (["images", "metaKeywords"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        [name]: value.split(",").map((item) => item.trim()),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // --------------------------
  // Handle Itinerary Fields
  // --------------------------
  const handleItineraryChange = (index, e) => {
    const { name, value } = e.target;
    const newItinerary = [...formData.itinerary];
    newItinerary[index][name] = value;
    setFormData((prev) => ({ ...prev, itinerary: newItinerary }));
  };

  const addItineraryItem = () => {
    setFormData((prev) => ({
      ...prev,
      itinerary: [
        ...prev.itinerary,
        { day: prev.itinerary.length + 1, title: "", description: "" },
      ],
    }));
  };

  const removeItineraryItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index),
    }));
  };

  // --------------------------
  // Form Submit
  // --------------------------
  const resetForm = () => {
    setEditMode(null);
    setFormData(initialFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editMode
      ? `http://localhost:5000/api/packages/update/${editMode}`
      : "http://localhost:5000/api/packages/create";
    const method = editMode ? "put" : "post";

    try {
      await axios[method](url, formData, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      alert(`Package ${editMode ? "updated" : "created"} successfully!`);
      resetForm();
      fetchPackages();
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  // --------------------------
  // Edit / Delete Handlers
  // --------------------------
  const handleEdit = (pkg) => {
    setEditMode(pkg._id);
    setFormData({ ...initialFormData, ...pkg });
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(`http://localhost:5000/api/packages/delete/${id}`, {
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        alert("Package deleted successfully!");
        fetchPackages();
      } catch (err) {
        setError("Failed to delete package.");
      }
    }
  };

  // --------------------------
  // JSX Return
  // --------------------------
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">
        Manage Tour Packages
      </h1>

      {/* =================== ADD/EDIT FORM =================== */}
      <div className="bg-white p-8 rounded-xl shadow-md mb-10 border border-gray-100">
        <h2 className="text-2xl font-semibold mb-6 text-slate-700 flex items-center gap-2">
          {editMode ? "Edit Package" : "Add New Package"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Package Title"
            className="border p-2 rounded-md"
            required
          />
          <input
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="Category"
            className="border p-2 rounded-md"
          />
          <input
            name="fromState"
            value={formData.fromState}
            onChange={handleInputChange}
            placeholder="From State"
            className="border p-2 rounded-md"
            required
          />
          <input
            name="fromCity"
            value={formData.fromCity}
            onChange={handleInputChange}
            placeholder="From City"
            className="border p-2 rounded-md"
            required
          />
          <input
            name="days"
            type="number"
            value={formData.days}
            onChange={handleInputChange}
            placeholder="Days"
            className="border p-2 rounded-md"
            required
          />
          <input
            name="nights"
            type="number"
            value={formData.nights}
            onChange={handleInputChange}
            placeholder="Nights"
            className="border p-2 rounded-md"
            required
          />
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="border p-2 rounded-md"
            required
          />
          <input
            name="discountPrice"
            type="number"
            value={formData.discountPrice}
            onChange={handleInputChange}
            placeholder="Discount Price (optional)"
            className="border p-2 rounded-md"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Package Description"
            rows="3"
            className="border p-2 rounded-md col-span-2"
          />

          <input
            name="images"
            value={formData.images.join(", ")}
            onChange={handleInputChange}
            placeholder="Image URLs (comma separated)"
            className="border p-2 rounded-md col-span-2"
          />

          {/* SEO */}
          <input
            name="metaTitle"
            value={formData.metaTitle}
            onChange={handleInputChange}
            placeholder="Meta Title"
            className="border p-2 rounded-md"
          />
          <input
            name="metaKeywords"
            value={formData.metaKeywords.join(", ")}
            onChange={handleInputChange}
            placeholder="Meta Keywords (comma separated)"
            className="border p-2 rounded-md"
          />
          <textarea
            name="metaDescription"
            value={formData.metaDescription}
            onChange={handleInputChange}
            placeholder="Meta Description"
            rows="2"
            className="border p-2 rounded-md col-span-2"
          />

          {/* Flags */}
          <div className="flex gap-4 col-span-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
              />
              Active
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleInputChange}
              />
              Featured
            </label>
          </div>

          {/* Itinerary Section */}
          <fieldset className="border p-4 rounded-md col-span-2">
            <legend className="px-2 font-semibold text-slate-700">
              Itinerary
            </legend>
            {formData.itinerary.map((item, index) => (
              <div key={index} className="space-y-2 border-b pb-3 mb-3">
                <input
                  name="title"
                  value={item.title}
                  onChange={(e) => handleItineraryChange(index, e)}
                  placeholder={`Day ${item.day} Title`}
                  className="border p-2 rounded-md w-full"
                />
                <textarea
                  name="description"
                  value={item.description}
                  onChange={(e) => handleItineraryChange(index, e)}
                  placeholder={`Day ${item.day} Description`}
                  rows="2"
                  className="border p-2 rounded-md w-full"
                />
                <button
                  type="button"
                  onClick={() => removeItineraryItem(index)}
                  className="text-red-600 flex items-center gap-1 text-sm"
                >
                  <XCircle size={16} /> Remove Day
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addItineraryItem}
              className="text-blue-600 flex items-center gap-1"
            >
              <PlusCircle size={18} /> Add Day
            </button>
          </fieldset>

          <div className="col-span-2 flex gap-3">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
            >
              <Save size={18} /> {editMode ? "Update Package" : "Save Package"}
            </button>
            {editMode && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* =================== PACKAGE LIST =================== */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-slate-700">
          Existing Packages
        </h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 uppercase text-xs text-gray-600">
                <tr>
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Duration</th>
                  <th className="p-3 text-left">From</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {packages.map((pkg) => (
                  <tr
                    key={pkg._id}
                    className="border-b hover:bg-slate-50 transition"
                  >
                    <td className="p-3 font-medium">{pkg.title}</td>
                    <td className="p-3 text-green-600 font-semibold">
                      ₹{pkg.price}
                    </td>
                    <td className="p-3">
                      {pkg.days}D / {pkg.nights}N
                    </td>
                    <td className="p-3">
                      {pkg.fromCity}, {pkg.fromState}
                    </td>
                    <td className="p-3">
                      {pkg.isActive ? "Active" : "Inactive"}
                    </td>
                    <td className="p-3 flex gap-3">
                      <button
                        onClick={() => handleEdit(pkg)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(pkg._id)}
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

export default ManagePackages;
