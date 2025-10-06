// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { AdminContext } from "../context/AdminContext";
// import { Edit, Trash2, PlusCircle, XCircle, Save } from "lucide-react";

// const ManagePackages = () => {
//   const { adminToken } = useContext(AdminContext);
//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editMode, setEditMode] = useState(null);

//   const initialFormData = {
//     title: "",
//     description: "",
//     fromState: "",
//     fromCity: "",
//     nights: "",
//     days: "",
//     price: "",
//     discountPrice: "",
//     category: "",
//     images: [],
//     itinerary: [],
//     metaTitle: "",
//     metaDescription: "",
//     metaKeywords: [],
//     isActive: true,
//     isFeatured: false,
//   };

//   const [formData, setFormData] = useState(initialFormData);

//   // --------------------------
//   // Fetch Packages
//   // --------------------------
//   const fetchPackages = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/packages/all");
//       setPackages(res.data.data || []);
//     } catch (err) {
//       setError("Failed to fetch packages.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPackages();
//   }, []);

//   // --------------------------
//   // Handle Form Input Change
//   // --------------------------
//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (["images", "metaKeywords"].includes(name)) {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value.split(",").map((item) => item.trim()),
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: type === "checkbox" ? checked : value,
//       }));
//     }
//   };

//   // --------------------------
//   // Handle Itinerary Fields
//   // --------------------------
//   const handleItineraryChange = (index, e) => {
//     const { name, value } = e.target;
//     const newItinerary = [...formData.itinerary];
//     newItinerary[index][name] = value;
//     setFormData((prev) => ({ ...prev, itinerary: newItinerary }));
//   };

//   const addItineraryItem = () => {
//     setFormData((prev) => ({
//       ...prev,
//       itinerary: [
//         ...prev.itinerary,
//         { day: prev.itinerary.length + 1, title: "", description: "" },
//       ],
//     }));
//   };

//   const removeItineraryItem = (index) => {
//     setFormData((prev) => ({
//       ...prev,
//       itinerary: prev.itinerary.filter((_, i) => i !== index),
//     }));
//   };

//   // --------------------------
//   // Form Submit
//   // --------------------------
//   const resetForm = () => {
//     setEditMode(null);
//     setFormData(initialFormData);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const url = editMode
//       ? `http://localhost:5000/api/packages/update/${editMode}`
//       : "http://localhost:5000/api/packages/create";
//     const method = editMode ? "put" : "post";

//     try {
//       await axios[method](url, formData, {
//         headers: { Authorization: `Bearer ${adminToken}` },
//       });
//       alert(`Package ${editMode ? "updated" : "created"} successfully!`);
//       resetForm();
//       fetchPackages();
//     } catch (err) {
//       setError(err.response?.data?.message || "An error occurred.");
//     }
//   };

//   // --------------------------
//   // Edit / Delete Handlers
//   // --------------------------
//   const handleEdit = (pkg) => {
//     setEditMode(pkg._id);
//     setFormData({ ...initialFormData, ...pkg });
//     window.scrollTo(0, 0);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure?")) {
//       try {
//         await axios.delete(`http://localhost:5000/api/packages/delete/${id}`, {
//           headers: { Authorization: `Bearer ${adminToken}` },
//         });
//         alert("Package deleted successfully!");
//         fetchPackages();
//       } catch (err) {
//         setError("Failed to delete package.");
//       }
//     }
//   };

//   // --------------------------
//   // JSX Return
//   // --------------------------
//   return (
//     <div className="p-6 bg-slate-50 min-h-screen">
//       <h1 className="text-3xl font-bold text-slate-800 mb-6">
//         Manage Tour Packages
//       </h1>

//       {/* =================== ADD/EDIT FORM =================== */}
//       <div className="bg-white p-8 rounded-xl shadow-md mb-10 border border-gray-100">
//         <h2 className="text-2xl font-semibold mb-6 text-slate-700 flex items-center gap-2">
//           {editMode ? "Edit Package" : "Add New Package"}
//         </h2>

//         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             name="title"
//             value={formData.title}
//             onChange={handleInputChange}
//             placeholder="Package Title"
//             className="border p-2 rounded-md"
//             required
//           />
//           <input
//             name="category"
//             value={formData.category}
//             onChange={handleInputChange}
//             placeholder="Category"
//             className="border p-2 rounded-md"
//           />
//           <input
//             name="fromState"
//             value={formData.fromState}
//             onChange={handleInputChange}
//             placeholder="From State"
//             className="border p-2 rounded-md"
//             required
//           />
//           <input
//             name="fromCity"
//             value={formData.fromCity}
//             onChange={handleInputChange}
//             placeholder="From City"
//             className="border p-2 rounded-md"
//             required
//           />
//           <input
//             name="days"
//             type="number"
//             value={formData.days}
//             onChange={handleInputChange}
//             placeholder="Days"
//             className="border p-2 rounded-md"
//             required
//           />
//           <input
//             name="nights"
//             type="number"
//             value={formData.nights}
//             onChange={handleInputChange}
//             placeholder="Nights"
//             className="border p-2 rounded-md"
//             required
//           />
//           <input
//             name="price"
//             type="number"
//             value={formData.price}
//             onChange={handleInputChange}
//             placeholder="Price"
//             className="border p-2 rounded-md"
//             required
//           />
//           <input
//             name="discountPrice"
//             type="number"
//             value={formData.discountPrice}
//             onChange={handleInputChange}
//             placeholder="Discount Price (optional)"
//             className="border p-2 rounded-md"
//           />

//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleInputChange}
//             placeholder="Package Description"
//             rows="3"
//             className="border p-2 rounded-md col-span-2"
//           />

//           <input
//             name="images"
//             value={formData.images.join(", ")}
//             onChange={handleInputChange}
//             placeholder="Image URLs (comma separated)"
//             className="border p-2 rounded-md col-span-2"
//           />

//           {/* SEO */}
//           <input
//             name="metaTitle"
//             value={formData.metaTitle}
//             onChange={handleInputChange}
//             placeholder="Meta Title"
//             className="border p-2 rounded-md"
//           />
//           <input
//             name="metaKeywords"
//             value={formData.metaKeywords.join(", ")}
//             onChange={handleInputChange}
//             placeholder="Meta Keywords (comma separated)"
//             className="border p-2 rounded-md"
//           />
//           <textarea
//             name="metaDescription"
//             value={formData.metaDescription}
//             onChange={handleInputChange}
//             placeholder="Meta Description"
//             rows="2"
//             className="border p-2 rounded-md col-span-2"
//           />

//           {/* Flags */}
//           <div className="flex gap-4 col-span-2">
//             <label className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 name="isActive"
//                 checked={formData.isActive}
//                 onChange={handleInputChange}
//               />
//               Active
//             </label>
//             <label className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 name="isFeatured"
//                 checked={formData.isFeatured}
//                 onChange={handleInputChange}
//               />
//               Featured
//             </label>
//           </div>

//           {/* Itinerary Section */}
//           <fieldset className="border p-4 rounded-md col-span-2">
//             <legend className="px-2 font-semibold text-slate-700">
//               Itinerary
//             </legend>
//             {formData.itinerary.map((item, index) => (
//               <div key={index} className="space-y-2 border-b pb-3 mb-3">
//                 <input
//                   name="title"
//                   value={item.title}
//                   onChange={(e) => handleItineraryChange(index, e)}
//                   placeholder={`Day ${item.day} Title`}
//                   className="border p-2 rounded-md w-full"
//                 />
//                 <textarea
//                   name="description"
//                   value={item.description}
//                   onChange={(e) => handleItineraryChange(index, e)}
//                   placeholder={`Day ${item.day} Description`}
//                   rows="2"
//                   className="border p-2 rounded-md w-full"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => removeItineraryItem(index)}
//                   className="text-red-600 flex items-center gap-1 text-sm"
//                 >
//                   <XCircle size={16} /> Remove Day
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={addItineraryItem}
//               className="text-blue-600 flex items-center gap-1"
//             >
//               <PlusCircle size={18} /> Add Day
//             </button>
//           </fieldset>

//           <div className="col-span-2 flex gap-3">
//             <button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
//             >
//               <Save size={18} /> {editMode ? "Update Package" : "Save Package"}
//             </button>
//             {editMode && (
//               <button
//                 type="button"
//                 onClick={resetForm}
//                 className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg"
//               >
//                 Cancel Edit
//               </button>
//             )}
//           </div>
//         </form>
//       </div>

//       {/* =================== PACKAGE LIST =================== */}
//       <div className="bg-white p-6 rounded-xl shadow-md">
//         <h2 className="text-2xl font-semibold mb-4 text-slate-700">
//           Existing Packages
//         </h2>
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead className="bg-gray-100 uppercase text-xs text-gray-600">
//                 <tr>
//                   <th className="p-3 text-left">Title</th>
//                   <th className="p-3 text-left">Price</th>
//                   <th className="p-3 text-left">Duration</th>
//                   <th className="p-3 text-left">From</th>
//                   <th className="p-3 text-left">Status</th>
//                   <th className="p-3 text-left">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {packages.map((pkg) => (
//                   <tr
//                     key={pkg._id}
//                     className="border-b hover:bg-slate-50 transition"
//                   >
//                     <td className="p-3 font-medium">{pkg.title}</td>
//                     <td className="p-3 text-green-600 font-semibold">
//                       ₹{pkg.price}
//                     </td>
//                     <td className="p-3">
//                       {pkg.days}D / {pkg.nights}N
//                     </td>
//                     <td className="p-3">
//                       {pkg.fromCity}, {pkg.fromState}
//                     </td>
//                     <td className="p-3">
//                       {pkg.isActive ? "Active" : "Inactive"}
//                     </td>
//                     <td className="p-3 flex gap-3">
//                       <button
//                         onClick={() => handleEdit(pkg)}
//                         className="text-blue-600 hover:text-blue-800"
//                       >
//                         <Edit size={18} />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(pkg._id)}
//                         className="text-red-600 hover:text-red-800"
//                       >
//                         <Trash2 size={18} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ManagePackages;







import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AdminContext } from "../context/AdminContext";
import { Edit, Trash2, PlusCircle, XCircle, Save, AlertCircle } from "lucide-react";

const ManagePackages = () => {
  const { adminToken } = useContext(AdminContext);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  const initialFormData = {
    title: "",
    description: "",
    fromState: "",
    fromCity: "",
    nights: "",
    days: "",
    price: "",
    discountPrice: 0,
    category: "",
    images: [],
    itinerary: [],
    inclusions: [],
    exclusions: [],
    notes: [],
    destinations: [],
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
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/packages/all", {
        //params: { isActive: undefined } // Get all packages including inactive
      });
      setPackages(res.data.data || []);
      setError(null);
    } catch (err) {
      setError("Failed to fetch packages. Please try again.");
      console.error(err);
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

    if (["images", "metaKeywords", "inclusions", "exclusions", "notes"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        [name]: value.split(",").map((item) => item.trim()).filter(item => item !== ""),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // --------------------------
  // Itinerary Handlers
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
    const newItinerary = formData.itinerary.filter((_, i) => i !== index);
    // Renumber days
    const renumbered = newItinerary.map((item, i) => ({ ...item, day: i + 1 }));
    setFormData((prev) => ({ ...prev, itinerary: renumbered }));
  };

  // --------------------------
  // Destination Handlers
  // --------------------------
  const handleDestinationChange = (index, e) => {
    const { name, value } = e.target;
    const newDestinations = [...formData.destinations];
    newDestinations[index][name] = value;
    setFormData((prev) => ({ ...prev, destinations: newDestinations }));
  };

  const addDestination = () => {
    setFormData((prev) => ({
      ...prev,
      destinations: [...prev.destinations, { name: "", description: "" }],
    }));
  };

  const removeDestination = (index) => {
    setFormData((prev) => ({
      ...prev,
      destinations: prev.destinations.filter((_, i) => i !== index),
    }));
  };

  // --------------------------
  // Form Submit
  // --------------------------
  const resetForm = () => {
    setEditMode(null);
    setFormData(initialFormData);
    setError(null);
    setSuccessMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg("");

    // Validation
    if (!formData.title || !formData.fromState || !formData.fromCity) {
      setError("Please fill in all required fields (Title, State, City)");
      return;
    }

    const url = editMode
      ? `http://localhost:5000/api/packages/update/${editMode}`
      : "http://localhost:5000/api/packages/create";
    const method = editMode ? "put" : "post";

    try {
      const response = await axios[method](url, formData, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      setSuccessMsg(`Package ${editMode ? "updated" : "created"} successfully!`);

      // Reset form and refresh list
      setTimeout(() => {
        resetForm();
        fetchPackages();
      }, 1500);

    } catch (err) {
      const errorMsg = err.response?.data?.message || "An error occurred. Please try again.";
      setError(errorMsg);
      console.error(err);
    }
  };

  // --------------------------
  // Edit / Delete Handlers
  // --------------------------
  const handleEdit = (pkg) => {
    setEditMode(pkg._id);
    setFormData({
      title: pkg.title || "",
      description: pkg.description || "",
      fromState: pkg.fromState || "",
      fromCity: pkg.fromCity || "",
      nights: pkg.nights || "",
      days: pkg.days || "",
      price: pkg.price || "",
      discountPrice: pkg.discountPrice || "",
      category: pkg.category || "",
      images: pkg.images || [],
      itinerary: pkg.itinerary || [],
      inclusions: pkg.inclusions || [],
      exclusions: pkg.exclusions || [],
      notes: pkg.notes || [],
      destinations: pkg.destinations || [],
      metaTitle: pkg.metaTitle || "",
      metaDescription: pkg.metaDescription || "",
      metaKeywords: pkg.metaKeywords || [],
      isActive: pkg.isActive ?? true,
      isFeatured: pkg.isFeatured ?? false,
    });
    setError(null);
    setSuccessMsg("");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package? This action cannot be undone.")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/packages/delete/${id}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      setSuccessMsg("Package deleted successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
      fetchPackages();
    } catch (err) {
      setError("Failed to delete package. Please try again.");
      console.error(err);
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

      {/* Success/Error Messages */}
      {successMsg && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-2">
          <AlertCircle size={20} />
          {successMsg}
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center gap-2">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {/* =================== ADD/EDIT FORM =================== */}
      <div className="bg-white p-8 rounded-xl shadow-md mb-10 border border-gray-100">
        <h2 className="text-2xl font-semibold mb-6 text-slate-700 flex items-center gap-2">
          {editMode ? (
            <>
              <Edit size={24} /> Edit Package
            </>
          ) : (
            <>
              <PlusCircle size={24} /> Add New Package
            </>
          )}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold text-slate-700 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Package Title <span className="text-red-500">*</span>
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Delhi Himachal 8 Days Package"
                  className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="e.g., Adventure, Pilgrimage, Beach"
                  className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From State <span className="text-red-500">*</span>
                </label>
                <input
                  name="fromState"
                  value={formData.fromState}
                  onChange={handleInputChange}
                  placeholder="e.g., Delhi"
                  className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From City <span className="text-red-500">*</span>
                </label>
                <input
                  name="fromCity"
                  value={formData.fromCity}
                  onChange={handleInputChange}
                  placeholder="e.g., New Delhi"
                  className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Days <span className="text-red-500">*</span>
                </label>
                <input
                  name="days"
                  type="number"
                  value={formData.days}
                  onChange={handleInputChange}
                  placeholder="8"
                  min="1"
                  className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nights <span className="text-red-500">*</span>
                </label>
                <input
                  name="nights"
                  type="number"
                  value={formData.nights}
                  onChange={handleInputChange}
                  placeholder="7"
                  min="0"
                  className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="25000"
                  min="0"
                  className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div> */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  name="price"
                  type="text" 
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="25000" 
                  className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount Price (₹)
                </label>
                <input
                  name="discountPrice"
                  type="number"
                  value={formData.discountPrice}
                  onChange={handleInputChange}
                  placeholder="22000"
                  min="0"
                  className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Package Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Brief overview of the package..."
                rows="3"
                className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URLs (comma separated)
              </label>
              <input
                name="images"
                value={formData.images.join(", ")}
                onChange={handleInputChange}
                placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Enter full image URLs separated by commas</p>
            </div>
          </div>

          {/* Destination Details */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold text-slate-700 mb-4">Destination Details</h3>
            <fieldset className="border border-gray-300 p-4 rounded-md">
              <legend className="px-2 font-medium text-slate-700">
                Add information about each destination
              </legend>
              {formData.destinations.length === 0 ? (
                <p className="text-gray-500 text-sm mb-3">No destinations added yet</p>
              ) : (
                formData.destinations.map((dest, index) => (
                  <div key={index} className="space-y-2 border-b border-gray-200 pb-3 mb-3 last:border-b-0">
                    <input
                      name="name"
                      value={dest.name}
                      onChange={(e) => handleDestinationChange(index, e)}
                      placeholder="Destination Name (e.g., Delhi, Shimla, Manali)"
                      className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      name="description"
                      value={dest.description}
                      onChange={(e) => handleDestinationChange(index, e)}
                      placeholder="Describe this destination..."
                      rows="3"
                      className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeDestination(index)}
                      className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm"
                    >
                      <XCircle size={16} /> Remove Destination
                    </button>
                  </div>
                ))
              )}
              <button
                type="button"
                onClick={addDestination}
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-2"
              >
                <PlusCircle size={18} /> Add Destination
              </button>
            </fieldset>
          </div>

          {/* Itinerary Section */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold text-slate-700 mb-4">Day-wise Itinerary</h3>
            <fieldset className="border border-gray-300 p-4 rounded-md">
              <legend className="px-2 font-medium text-slate-700">
                Add daily itinerary details
              </legend>
              {formData.itinerary.length === 0 ? (
                <p className="text-gray-500 text-sm mb-3">No itinerary added yet</p>
              ) : (
                formData.itinerary.map((item, index) => (
                  <div key={index} className="space-y-2 border-b border-gray-200 pb-3 mb-3 last:border-b-0">
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                        Day {item.day}
                      </span>
                    </div>
                    <input
                      name="title"
                      value={item.title}
                      onChange={(e) => handleItineraryChange(index, e)}
                      placeholder={`Day ${item.day} Title (e.g., Delhi To Chandigarh)`}
                      className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      name="description"
                      value={item.description}
                      onChange={(e) => handleItineraryChange(index, e)}
                      placeholder={`Day ${item.day} Description (activities, places to visit, etc.)`}
                      rows="3"
                      className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeItineraryItem(index)}
                      className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm"
                    >
                      <XCircle size={16} /> Remove Day
                    </button>
                  </div>
                ))
              )}
              <button
                type="button"
                onClick={addItineraryItem}
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-2"
              >
                <PlusCircle size={18} /> Add Day
              </button>
            </fieldset>
          </div>

          {/* Inclusions, Exclusions, Notes */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold text-slate-700 mb-4">Package Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Inclusions (comma separated)
                </label>
                <textarea
                  name="inclusions"
                  value={formData.inclusions.join(", ")}
                  onChange={handleInputChange}
                  placeholder="Fuel Charges, A/c Vehicle for your personal use, State/Permit and Toll Tax charges, Driver's allowances"
                  rows="3"
                  className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">What's included in the package</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exclusions (comma separated)
                </label>
                <textarea
                  name="exclusions"
                  value={formData.exclusions.join(", ")}
                  onChange={handleInputChange}
                  placeholder="Guide and Entrance Fee, Other personal expenses, Any additional activities, Airport Entry/Parking Charges, Any Meals/services expenses"
                  rows="3"
                  className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">What's not included in the package</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes & Disclaimers (comma separated)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes.join(", ")}
                  onChange={handleInputChange}
                  placeholder="Driver's night allowance applicable if driving between 10 pm & 6 am, If Cab runs more than estimated KMs then per KMs charges will be applicable, A/C will be switched off in hilly areas"
                  rows="3"
                  className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">Important notes and disclaimers</p>
              </div>
            </div>
          </div>

          {/* SEO Section */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold text-slate-700 mb-4">SEO Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Title
                </label>
                <input
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleInputChange}
                  placeholder="SEO-friendly title"
                  className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Keywords (comma separated)
                </label>
                <input
                  name="metaKeywords"
                  value={formData.metaKeywords.join(", ")}
                  onChange={handleInputChange}
                  placeholder="tour, package, travel, himachal"
                  className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Description
              </label>
              <textarea
                name="metaDescription"
                value={formData.metaDescription}
                onChange={handleInputChange}
                placeholder="Brief description for search engines (150-160 characters)"
                rows="2"
                className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Flags */}
          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-3">Package Status</h3>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Active (visible to users)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Featured (show on homepage)</span>
              </label>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium transition-colors"
            >
              <Save size={18} /> {editMode ? "Update Package" : "Save Package"}
            </button>

            {editMode && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors"
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
          Existing Packages ({packages.length})
        </h2>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 animate-pulse">Loading packages...</p>
          </div>
        ) : packages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No packages found. Create your first package above.</p>
          </div>
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
                  <th className="p-3 text-left">Featured</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {packages.map((pkg) => (
                  <tr
                    key={pkg._id}
                    className="border-b hover:bg-slate-50 transition"
                  >
                    <td className="p-3 font-medium max-w-xs truncate">{pkg.title}</td>
                    <td className="p-3 text-green-600 font-semibold">
                      ₹{pkg.price?.toLocaleString()}
                    </td>
                    <td className="p-3">
                      {pkg.days}D / {pkg.nights}N
                    </td>
                    <td className="p-3">
                      {pkg.fromCity}, {pkg.fromState}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${pkg.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                        }`}>
                        {pkg.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="p-3">
                      {pkg.isFeatured && (
                        <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                          Featured
                        </span>
                      )}
                    </td>
                    <td className="p-3 flex gap-3">
                      <button
                        onClick={() => handleEdit(pkg)}
                        className="text-blue-600 hover:text-blue-800 transition"
                        title="Edit package"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(pkg._id)}
                        className="text-red-600 hover:text-red-800 transition"
                        title="Delete package"
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
