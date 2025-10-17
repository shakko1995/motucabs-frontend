


// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { AdminContext } from "../context/AdminContext";
// import { ArrowRight, X, Plus, Edit, Trash2 } from "lucide-react";

// const statusOptions = ["Pending", "Confirmed", "Cancelled", "Completed"];

// const AllBookingsTable = () => {
//   const { adminToken } = useContext(AdminContext);
//   const [bookings, setBookings] = useState([]);
//   const [users, setUsers] = useState([]); // Dropdown users
//   const [loading, setLoading] = useState(true);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     userId: "",
//     travellerDetails: { fullName: "" },
//     tripDetails: { from: "", to: "", pickupDate: "" },
//     packageDetails: { vehicleType: "" },
//     paymentDetails: { amountPaid: 0, paymentOption: "advance" },
//     status: "Pending",
//   });

//   const statusColors = {
//     Pending: "bg-yellow-200 text-yellow-800",
//     Confirmed: "bg-green-200 text-green-800",
//     Cancelled: "bg-red-200 text-red-800",
//     Completed: "bg-blue-200 text-blue-800",
//   };

//   // Fetch bookings
//   const fetchBookings = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/admin/bookings", {
//         headers: { Authorization: `Bearer ${adminToken}` },
//       });
//       if (res.data.success) setBookings(res.data.bookings);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to fetch bookings");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch users for dropdown
//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/admin/users", {
//         headers: { Authorization: `Bearer ${adminToken}` },
//       });
//       // Backend returns { users: [...] }
//       setUsers(res.data.users || []);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to fetch users");
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//     fetchUsers();
//   }, []);

//   // Form input handler
//   const handleInputChange = (e, section, field) => {
//     if (section) {
//       setFormData((prev) => ({
//         ...prev,
//         [section]: { ...prev[section], [field]: e.target.value },
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [field]: e.target.value }));
//     }
//   };

//   // Create booking
//   const handleCreateBooking = async () => {
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/admin/bookings",
//         formData,
//         { headers: { Authorization: `Bearer ${adminToken}` } }
//       );
//       if (res.data.success) {
//         setBookings((prev) => [res.data.booking, ...prev]);
//         setShowForm(false);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Failed to create booking");
//     }
//   };

//   // Update booking
//   const handleEditBooking = async () => {
//     try {
//       const res = await axios.put(
//         `http://localhost:5000/api/admin/bookings/${formData._id}`,
//         formData,
//         { headers: { Authorization: `Bearer ${adminToken}` } }
//       );
//       if (res.data.success) {
//         setBookings((prev) =>
//           prev.map((b) => (b._id === formData._id ? res.data.booking : b))
//         );
//         setShowForm(false);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update booking");
//     }
//   };

//   // Delete booking
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this booking?")) return;
//     try {
//       const res = await axios.delete(
//         `http://localhost:5000/api/admin/bookings/${id}`,
//         { headers: { Authorization: `Bearer ${adminToken}` } }
//       );
//       if (res.data.success) {
//         setBookings((prev) => prev.filter((b) => b._id !== id));
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete booking");
//     }
//   };

//   // Status update
//   const handleStatusChange = async (bookingId, status) => {
//     try {
//       const res = await axios.patch(
//         `http://localhost:5000/api/admin/bookings/${bookingId}/status`,
//         { status },
//         { headers: { Authorization: `Bearer ${adminToken}` } }
//       );
//       if (res.data.success) {
//         setBookings((prev) =>
//           prev.map((b) => (b._id === bookingId ? { ...b, status } : b))
//         );
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update status");
//     }
//   };

//   const openAddForm = () => {
//     setFormData({
//       userId: "",
//       travellerDetails: { fullName: "" },
//       tripDetails: { from: "", to: "", pickupDate: "" },
//       packageDetails: { vehicleType: "" },
//       paymentDetails: { amountPaid: 0, paymentOption: "advance" },
//       status: "Pending",
//     });
//     setShowForm(true);
//   };

//   const openEditForm = (booking) => {
//     setFormData(booking);
//     setShowForm(true);
//   };

//   if (loading) return <div className="text-center p-10">Loading...</div>;

//   return (
//     <div className="overflow-x-auto bg-white shadow-lg rounded-2xl p-4">
//       <div className="flex justify-between mb-4">
//         <h2 className="text-xl font-bold">All Bookings</h2>
//         <button
//           onClick={openAddForm}
//           className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
//         >
//           <Plus size={18} /> Add Booking
//         </button>
//       </div>

//       <table className="min-w-full table-auto border-collapse">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-3 border">Booking ID</th>
//             <th className="p-3 border">User</th>
//             <th className="p-3 border">Traveller</th>
//             <th className="p-3 border">Trip</th>
//             <th className="p-3 border">Pickup Date</th>
//             <th className="p-3 border">Vehicle</th>
//             <th className="p-3 border">Amount Paid</th>
//             <th className="p-3 border">Status</th>
//             <th className="p-3 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bookings.map((b) => (
//             <tr key={b._id} className="hover:bg-gray-50">
//               <td className="p-3 border font-mono text-sm">{b._id}</td>
//               <td className="p-3 border">{b.userId}</td>
//               <td className="p-3 border">{b.travellerDetails?.fullName}</td>
//               <td className="p-3 border">{b.tripDetails?.from} → {b.tripDetails?.to}</td>
//               <td className="p-3 border">{b.tripDetails?.pickupDate}</td>
//               <td className="p-3 border">{b.packageDetails?.vehicleType}</td>
//               <td className="p-3 border">₹{b.paymentDetails?.amountPaid}</td>
//               <td className="p-3 border">
//                 <select
//                   value={b.status}
//                   onChange={(e) => handleStatusChange(b._id, e.target.value)}
//                   className={`border rounded px-2 py-1 font-semibold ${statusColors[b.status]}`}
//                 >
//                   {statusOptions.map((s) => (
//                     <option key={s} value={s}>{s}</option>
//                   ))}
//                 </select>
//               </td>
//               <td className="p-3 border flex gap-2">
//                 <button
//                   onClick={() => openEditForm(b)}
//                   className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 text-sm flex items-center gap-1"
//                 >
//                   <ArrowRight size={14} /> View
//                 </button>
//                 <button
//                   onClick={() => openEditForm(b)}
//                   className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 text-sm flex items-center gap-1"
//                 >
//                   <Edit size={14} /> Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(b._id)}
//                   className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-sm flex items-center gap-1"
//                 >
//                   <Trash2 size={14} /> Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Add/Edit Form Modal */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative">
//             <button
//               onClick={() => setShowForm(false)}
//               className="absolute top-3 right-3 text-gray-600 hover:text-black"
//             >
//               <X size={24} />
//             </button>
//             <h2 className="text-lg font-bold mb-4">
//               {formData._id ? "Edit Booking" : "Add New Booking"}
//             </h2>

//             <div className="space-y-3">
//               {/* User Dropdown */}
//               <select
//                 value={formData.userId}
//                 onChange={(e) => handleInputChange(e, null, "userId")}
//                 className="w-full border p-2 rounded"
//               >
//                 <option value="">Select User</option>
//                 {users.map((u) => (
//                   <option key={u._id} value={u._id}>
//                     {u.fullName} ({u.email})
//                   </option>
//                 ))}
//               </select>

//               <input
//                 type="text"
//                 placeholder="Traveller Full Name"
//                 value={formData.travellerDetails.fullName}
//                 onChange={(e) =>
//                   handleInputChange(e, "travellerDetails", "fullName")
//                 }
//                 className="w-full border p-2 rounded"
//               />

//               <input
//                 type="text"
//                 placeholder="From"
//                 value={formData.tripDetails.from}
//                 onChange={(e) => handleInputChange(e, "tripDetails", "from")}
//                 className="w-full border p-2 rounded"
//               />

//               <input
//                 type="text"
//                 placeholder="To"
//                 value={formData.tripDetails.to}
//                 onChange={(e) => handleInputChange(e, "tripDetails", "to")}
//                 className="w-full border p-2 rounded"
//               />

//               <input
//                 type="date"
//                 value={formData.tripDetails.pickupDate}
//                 onChange={(e) =>
//                   handleInputChange(e, "tripDetails", "pickupDate")
//                 }
//                 className="w-full border p-2 rounded"
//               />

//               <input
//                 type="text"
//                 placeholder="Vehicle Type"
//                 value={formData.packageDetails.vehicleType}
//                 onChange={(e) =>
//                   handleInputChange(e, "packageDetails", "vehicleType")
//                 }
//                 className="w-full border p-2 rounded"
//               />

//               <input
//                 type="number"
//                 placeholder="Amount Paid"
//                 value={formData.paymentDetails.amountPaid}
//                 onChange={(e) =>
//                   handleInputChange(e, "paymentDetails", "amountPaid")
//                 }
//                 className="w-full border p-2 rounded"
//               />

//               <select
//                 value={formData.paymentDetails.paymentOption || "advance"}
//                 onChange={(e) =>
//                   handleInputChange(e, "paymentDetails", "paymentOption")
//                 }
//                 className="w-full border p-2 rounded"
//               >
//                 <option value="advance">Advance</option>
//                 <option value="full">Full</option>
//               </select>

//               <select
//                 value={formData.status}
//                 onChange={(e) => handleInputChange(e, null, "status")}
//                 className="w-full border p-2 rounded"
//               >
//                 {statusOptions.map((s) => (
//                   <option key={s} value={s}>{s}</option>
//                 ))}
//               </select>

//               <button
//                 onClick={formData._id ? handleEditBooking : handleCreateBooking}
//                 className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//               >
//                 {formData._id ? "Update Booking" : "Create Booking"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllBookingsTable;

// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { AdminContext } from "../context/AdminContext";
// import { ArrowRight, X, Plus, Edit, Trash2 } from "lucide-react";

// const statusOptions = ["Upcoming", "Confirmed", "Cancelled", "Completed"];
// const tripTypeOptions = ["Outstation", "Rental", "Airport", "Multi-City"];

// const AllBookingsTable = () => {
//   const { adminToken } = useContext(AdminContext);
//   const [bookings, setBookings] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     userId: "",
//     travellerDetails: { fullName: "" },
//     tripDetails: { from: "", to: "", pickupDate: "" },
//     packageDetails: { vehicleType: "" },
//     paymentDetails: { amountPaid: 0, paymentOption: "advance" },
//     type: "Outstation",
//     status: "Upcoming",
//   });

//   const statusColors = {
//     Upcoming: "bg-yellow-200 text-yellow-800",
//     Confirmed: "bg-green-200 text-green-800",
//     Cancelled: "bg-red-200 text-red-800",
//     Completed: "bg-blue-200 text-blue-800",
//   };

//   const typeColors = {
//     Outstation: "bg-purple-100 text-purple-700",
//     Rental: "bg-blue-100 text-blue-700",
//     Airport: "bg-green-100 text-green-700",
//     "Multi-City": "bg-pink-100 text-pink-700",
//   };

//   // Fetch bookings
//   const fetchBookings = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/admin/bookings", {
//         headers: { Authorization: `Bearer ${adminToken}` },
//       });
//       if (res.data.success) setBookings(res.data.bookings);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to fetch bookings");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch users for dropdown
//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/admin/users", {
//         headers: { Authorization: `Bearer ${adminToken}` },
//       });
//       setUsers(res.data.users || []);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to fetch users");
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//     fetchUsers();
//   }, []);

//   // Form input handler
//   const handleInputChange = (e, section, field) => {
//     if (section) {
//       setFormData((prev) => ({
//         ...prev,
//         [section]: { ...prev[section], [field]: e.target.value },
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [field]: e.target.value }));
//     }
//   };

//   // Create booking
//   const handleCreateBooking = async () => {
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/admin/bookings",
//         formData,
//         { headers: { Authorization: `Bearer ${adminToken}` } }
//       );
//       if (res.data.success) {
//         setBookings((prev) => [res.data.booking, ...prev]);
//         setShowForm(false);
//       }
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Failed to create booking");
//     }
//   };

//   // Update booking
//   const handleEditBooking = async () => {
//     try {
//       const res = await axios.put(
//         `http://localhost:5000/api/admin/bookings/${formData._id}`,
//         formData,
//         { headers: { Authorization: `Bearer ${adminToken}` } }
//       );
//       if (res.data.success) {
//         setBookings((prev) =>
//           prev.map((b) => (b._id === formData._id ? res.data.booking : b))
//         );
//         setShowForm(false);
//       }
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Failed to update booking");
//     }
//   };

//   // Delete booking
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this booking?")) return;
//     try {
//       const res = await axios.delete(
//         `http://localhost:5000/api/admin/bookings/${id}`,
//         { headers: { Authorization: `Bearer ${adminToken}` } }
//       );
//       if (res.data.success) {
//         setBookings((prev) => prev.filter((b) => b._id !== id));
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete booking");
//     }
//   };

//   // Status update
//   const handleStatusChange = async (bookingId, status) => {
//     try {
//       const res = await axios.patch(
//         `http://localhost:5000/api/admin/bookings/${bookingId}/status`,
//         { status },
//         { headers: { Authorization: `Bearer ${adminToken}` } }
//       );
//       if (res.data.success) {
//         setBookings((prev) =>
//           prev.map((b) => (b._id === bookingId ? { ...b, status } : b))
//         );
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update status");
//     }
//   };

//   const openAddForm = () => {
//     setFormData({
//       userId: "",
//       travellerDetails: { fullName: "" },
//       tripDetails: { from: "", to: "", pickupDate: "" },
//       packageDetails: { vehicleType: "" },
//       paymentDetails: { amountPaid: 0, paymentOption: "advance" },
//       type: "Outstation",
//       status: "Upcoming",
//     });
//     setShowForm(true);
//   };

//   const openEditForm = (booking) => {
//     setFormData({
//       ...booking,
//       type: booking.type || "Outstation" // Default if missing
//     });
//     setShowForm(true);
//   };

//   if (loading) return <div className="text-center p-10">Loading...</div>;

//   return (
//     <div className="overflow-x-auto bg-white shadow-lg rounded-2xl p-4">
//       <div className="flex justify-between mb-4">
//         <h2 className="text-xl font-bold">All Bookings</h2>
//         <button
//           onClick={openAddForm}
//           className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
//         >
//           <Plus size={18} /> Add Booking
//         </button>
//       </div>

//       <table className="min-w-full table-auto border-collapse">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-3 border">Booking ID</th>
//             <th className="p-3 border">User</th>
//             <th className="p-3 border">Traveller</th>
//             <th className="p-3 border">Trip Type</th>
//             <th className="p-3 border">Route</th>
//             <th className="p-3 border">Pickup Date</th>
//             <th className="p-3 border">Vehicle</th>
//             <th className="p-3 border">Amount Paid</th>
//             <th className="p-3 border">Status</th>
//             <th className="p-3 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bookings.map((b) => (
//             <tr key={b._id} className="hover:bg-gray-50">
//               <td className="p-3 border font-mono text-xs">{b._id.slice(-8)}</td>
//               <td className="p-3 border text-sm">{b.userId?.email || b.userId}</td>
//               <td className="p-3 border">{b.travellerDetails?.fullName}</td>
//               <td className="p-3 border">
//                 <span className={`px-2 py-1 rounded-full text-xs font-semibold ${typeColors[b.type] || "bg-gray-100 text-gray-700"}`}>
//                   {b.type || "N/A"}
//                 </span>
//               </td>
//               <td className="p-3 border text-sm">
//                 {b.tripDetails?.from} → {b.tripDetails?.to}
//               </td>
//               <td className="p-3 border text-sm">{b.tripDetails?.pickupDate}</td>
//               <td className="p-3 border">{b.packageDetails?.vehicleType || b.packageDetails?.car}</td>
//               <td className="p-3 border font-semibold">₹{b.paymentDetails?.amountPaid}</td>
//               <td className="p-3 border">
//                 <select
//                   value={b.status}
//                   onChange={(e) => handleStatusChange(b._id, e.target.value)}
//                   className={`border rounded px-2 py-1 font-semibold text-xs ${statusColors[b.status]}`}
//                 >
//                   {statusOptions.map((s) => (
//                     <option key={s} value={s}>{s}</option>
//                   ))}
//                 </select>
//               </td>
//               <td className="p-3 border">
//                 <div className="flex gap-1">
//                   <button
//                     onClick={() => setSelectedBooking(b)}
//                     className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 text-xs flex items-center gap-1"
//                   >
//                     <ArrowRight size={12} /> View
//                   </button>
//                   <button
//                     onClick={() => openEditForm(b)}
//                     className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 text-xs flex items-center gap-1"
//                   >
//                     <Edit size={12} /> Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(b._id)}
//                     className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-xs flex items-center gap-1"
//                   >
//                     <Trash2 size={12} />
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Add/Edit Form Modal */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
//             <button
//               onClick={() => setShowForm(false)}
//               className="absolute top-3 right-3 text-gray-600 hover:text-black"
//             >
//               <X size={24} />
//             </button>
//             <h2 className="text-lg font-bold mb-4">
//               {formData._id ? "Edit Booking" : "Add New Booking"}
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* User Dropdown */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-semibold mb-1">Select User</label>
//                 <select
//                   value={formData.userId}
//                   onChange={(e) => handleInputChange(e, null, "userId")}
//                   className="w-full border p-2 rounded"
//                 >
//                   <option value="">Select User</option>
//                   {users.map((u) => (
//                     <option key={u._id} value={u._id}>
//                       {u.fullName || u.name} ({u.email})
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Trip Type */}
//               <div>
//                 <label className="block text-sm font-semibold mb-1">Trip Type</label>
//                 <select
//                   value={formData.type}
//                   onChange={(e) => handleInputChange(e, null, "type")}
//                   className="w-full border p-2 rounded"
//                 >
//                   {tripTypeOptions.map((t) => (
//                     <option key={t} value={t}>{t}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* Status */}
//               <div>
//                 <label className="block text-sm font-semibold mb-1">Status</label>
//                 <select
//                   value={formData.status}
//                   onChange={(e) => handleInputChange(e, null, "status")}
//                   className="w-full border p-2 rounded"
//                 >
//                   {statusOptions.map((s) => (
//                     <option key={s} value={s}>{s}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* Traveller Details */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-semibold mb-1">Traveller Full Name</label>
//                 <input
//                   type="text"
//                   placeholder="Traveller Full Name"
//                   value={formData.travellerDetails.fullName}
//                   onChange={(e) =>
//                     handleInputChange(e, "travellerDetails", "fullName")
//                   }
//                   className="w-full border p-2 rounded"
//                 />
//               </div>

//               {/* Trip Details */}
//               <div>
//                 <label className="block text-sm font-semibold mb-1">From</label>
//                 <input
//                   type="text"
//                   placeholder="Pickup Location"
//                   value={formData.tripDetails.from}
//                   onChange={(e) => handleInputChange(e, "tripDetails", "from")}
//                   className="w-full border p-2 rounded"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold mb-1">To</label>
//                 <input
//                   type="text"
//                   placeholder="Drop Location"
//                   value={formData.tripDetails.to}
//                   onChange={(e) => handleInputChange(e, "tripDetails", "to")}
//                   className="w-full border p-2 rounded"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold mb-1">Pickup Date</label>
//                 <input
//                   type="date"
//                   value={formData.tripDetails.pickupDate}
//                   onChange={(e) =>
//                     handleInputChange(e, "tripDetails", "pickupDate")
//                   }
//                   className="w-full border p-2 rounded"
//                 />
//               </div>

//               {/* Package Details */}
//               <div>
//                 <label className="block text-sm font-semibold mb-1">Vehicle Type</label>
//                 <input
//                   type="text"
//                   placeholder="e.g., Sedan, SUV, Mini"
//                   value={formData.packageDetails.vehicleType}
//                   onChange={(e) =>
//                     handleInputChange(e, "packageDetails", "vehicleType")
//                   }
//                   className="w-full border p-2 rounded"
//                 />
//               </div>

//               {/* Payment Details */}
//               <div>
//                 <label className="block text-sm font-semibold mb-1">Amount Paid (₹)</label>
//                 <input
//                   type="number"
//                   placeholder="Amount Paid"
//                   value={formData.paymentDetails.amountPaid}
//                   onChange={(e) =>
//                     handleInputChange(e, "paymentDetails", "amountPaid")
//                   }
//                   className="w-full border p-2 rounded"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold mb-1">Payment Option</label>
//                 <select
//                   value={formData.paymentDetails.paymentOption || "advance"}
//                   onChange={(e) =>
//                     handleInputChange(e, "paymentDetails", "paymentOption")
//                   }
//                   className="w-full border p-2 rounded"
//                 >
//                   <option value="advance">Advance</option>
//                   <option value="full">Full</option>
//                 </select>
//               </div>

//               <div className="md:col-span-2">
//                 <button
//                   onClick={formData._id ? handleEditBooking : handleCreateBooking}
//                   className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold"
//                 >
//                   {formData._id ? "Update Booking" : "Create Booking"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* View Details Modal */}
//       {selectedBooking && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
//             <button
//               onClick={() => setSelectedBooking(null)}
//               className="absolute top-3 right-3 text-gray-600 hover:text-black"
//             >
//               <X size={24} />
//             </button>
//             <h2 className="text-xl font-bold mb-4">Booking Details</h2>

//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm text-gray-600">Booking ID</p>
//                   <p className="font-semibold">{selectedBooking._id}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Trip Type</p>
//                   <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${typeColors[selectedBooking.type]}`}>
//                     {selectedBooking.type || "N/A"}
//                   </span>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Status</p>
//                   <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusColors[selectedBooking.status]}`}>
//                     {selectedBooking.status}
//                   </span>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Traveller Name</p>
//                   <p className="font-semibold">{selectedBooking.travellerDetails?.fullName}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">From</p>
//                   <p className="font-semibold">{selectedBooking.tripDetails?.from}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">To</p>
//                   <p className="font-semibold">{selectedBooking.tripDetails?.to}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Pickup Date</p>
//                   <p className="font-semibold">{selectedBooking.tripDetails?.pickupDate}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Vehicle Type</p>
//                   <p className="font-semibold">{selectedBooking.packageDetails?.vehicleType}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Amount Paid</p>
//                   <p className="font-semibold text-green-600">₹{selectedBooking.paymentDetails?.amountPaid}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Payment Option</p>
//                   <p className="font-semibold capitalize">{selectedBooking.paymentDetails?.paymentOption}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllBookingsTable;









// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { AdminContext } from "../context/AdminContext";
// import { ArrowRight, X, Plus, Edit, Trash2 } from "lucide-react";

// // Options for dropdowns, matching your schema
// const bookingTypeOptions = ["Outstation", "Rental", "Airport", "Multi-City", "One way"];
// const vehicleTypeOptions = ["Compact Sedan", "Small SUV", "Large SUV", "Premium Business Sedan", "Traveller / Minivan"];
// const acOptions = ["AC", "Non-AC"];
// const paymentMethodOptions = ["Cash", "Online", "Card"];
// const statusOptions = ['Upcoming', 'Confirmed', 'Cancelled', 'Completed', 'Assigned'];

// // Helper for date formatting
// const formatDateForInput = (dateStr) => {
//   if (!dateStr) return '';
//   const date = new Date(dateStr);
//   return date.toISOString().split('T')[0];
// };

// const AllBookingsTable = () => {
//   const { adminToken } = useContext(AdminContext);
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   // New, flat formData state that matches your new backend schema
//   const initialFormData = {
//     userName: "", mobileNumber: "", bookingType: "Outstation",
//     pickupLocation: "", dropLocation: "", pickupDate: "", pickupTime: "",
//     pincode: "", distance: 0, vehicleType: "Compact Sedan", seater: 4, ac: "AC",
//     pilotId: null, paymentMethod: "Cash", driverNightAllowance: 0, tollCharges: "Excluded",
//     extraKm: 0, extraHour: "", waitingCharge: 0,
//     assuredLuggage: { selected: false, price: 1001 },
//     confirmCarModel: { selected: false, price: 751 },
//     petAllowance: { selected: false, price: 1001 },
//     refundableBooking: { selected: false, price: 751 },
//     fare: 0, totalFare: 0, advanceAmount: 0, pilotShare: 0, companyShare: 0,
//     status: "Upcoming"
//   };
//   const [formData, setFormData] = useState(initialFormData);

//   const statusColors = {
//     Upcoming: "bg-yellow-100 text-yellow-800", Confirmed: "bg-green-100 text-green-800",
//     Cancelled: "bg-red-100 text-red-800", Completed: "bg-blue-100 text-blue-800",
//     Assigned: "bg-indigo-100 text-indigo-800",
//   };

//   // Fetch bookings
//   const fetchBookings = async () => {
//     // Make sure the token exists before making the call
//     if (!adminToken) {
//         setLoading(false);
//         return;
//     }

//     try {

//         const res = await axios.get("http://localhost:5000/api/bookings/admin", {
//             headers: { Authorization: `Bearer ${adminToken}` },
//         });

//         if (res.data.success) {
//             setBookings(res.data.bookings);
//         }
//     } catch (err) {
//         console.error("Failed to fetch bookings:", err.response?.data || err);
//         alert("Failed to fetch bookings");
//     } finally {
//         setLoading(false);
//     }
// };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   // Simplified input handler for flat state
//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
//   };

//   // Handler for nested checkbox add-ons
//   const handleCheckboxChange = (e) => {
//     const { name, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: { ...prev[name], selected: checked }
//     }));
//   };

//  const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//         ...formData,
//         fare: parseInt(formData.fare) || 0,
//         totalFare: parseInt(formData.totalFare) || 0,
//         advanceAmount: parseInt(formData.advanceAmount) || 0,
//         pilotShare: parseInt(formData.pilotShare) || 0,
//         companyShare: parseInt(formData.companyShare) || 0,
//         distance: parseInt(formData.distance) || 0,
//         seater: parseInt(formData.seater) || 4,
//     };

//     // ✅ FIX: Changed the URL from /api/admin/bookings to /api/bookings/admin
//     const url = payload._id 
//         ? `http://localhost:5000/api/bookings/admin/${payload._id}` 
//         : "http://localhost:5000/api/bookings/admin";

//     const method = payload._id ? 'put' : 'post';

//     try {
//         const res = await axios[method](url, payload, { 
//             headers: { Authorization: `Bearer ${adminToken}` } 
//         });

//         if (res.data.success) {
//             fetchBookings();
//             setShowForm(false);
//             alert(`Booking successfully ${payload._id ? 'updated' : 'created'}!`);
//         }
//     } catch (err) {
//         console.error("API Error:", err.response?.data || err);
//         alert(err.response?.data?.message || `Failed to ${payload._id ? 'update' : 'create'} booking`);
//     }
// };
//   // Delete booking
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this booking?")) return;

//     try {
//         // ✅ FIX: Changed the URL from /api/admin/bookings to /api/bookings/admin
//         const res = await axios.delete(`http://localhost:5000/api/bookings/admin/${id}`, {
//             headers: { Authorization: `Bearer ${adminToken}` }
//         });

//         if (res.data.success) {
//             setBookings((prev) => prev.filter((b) => b._id !== id));
//         }
//     } catch (err) {
//         console.error("Delete Error:", err.response?.data || err);
//         alert("Failed to delete booking");
//     }
// };

//   // Update status directly from the table
// const handleStatusChange = async (bookingId, status) => {
//     try {
//         // ✅ FIX: Changed the URL from /api/admin/bookings to /api/bookings/admin
//         const res = await axios.put(`http://localhost:5000/api/bookings/admin/${bookingId}`, { status }, {
//             headers: { Authorization: `Bearer ${adminToken}` }
//         });

//         if (res.data.success) {
//             setBookings((prev) => prev.map((b) => (b._id === bookingId ? res.data.booking : b)));
//         }
//     } catch (err) {
//         console.error("Status Update Error:", err.response?.data || err);
//         alert("Failed to update status");
//     }
// };

//   const openAddForm = () => {
//     setFormData(initialFormData);
//     setShowForm(true);
//   };

//   const openEditForm = (booking) => {
//     setFormData({ ...initialFormData, ...booking, pickupDate: formatDateForInput(booking.pickupDate) });
//     setShowForm(true);
//   };

//   if (loading) return <div className="text-center p-10">Loading...</div>;

//   return (
//     <div className="overflow-x-auto bg-white shadow-lg rounded-2xl p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold text-gray-800">All Bookings</h2>
//         <button onClick={openAddForm} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
//           <Plus size={18} /> Add Booking
//         </button>
//       </div>

//       <table className="min-w-full table-auto border-collapse text-sm">
//         <thead className="bg-gray-50">
//           <tr className="text-left text-gray-600">
//             {["User", "Route", "Pickup", "Vehicle", "Fare", "Status", "Actions"].map(h => <th key={h} className="p-3 border font-semibold">{h}</th>)}
//           </tr>
//         </thead>
//         <tbody className="divide-y">
//           {bookings.map((b) => (
//             <tr key={b._id} className="hover:bg-gray-50">
//               <td className="p-3 border">
//                 <p className="font-semibold">{b.userName}</p>
//                 <p className="text-gray-500">{b.mobileNumber}</p>
//               </td>
//               <td className="p-3 border">{b.pickupLocation} → {b.dropLocation || 'N/A'}</td>
//               <td className="p-3 border">{new Date(b.pickupDate).toLocaleDateString()} at {b.pickupTime}</td>
//               <td className="p-3 border">{b.vehicleType}</td>
//               <td className="p-3 border font-semibold">₹{b.totalFare}</td>
//               <td className="p-3 border">
//                 <select value={b.status} onChange={(e) => handleStatusChange(b._id, e.target.value)} className={`border-0 rounded px-2 py-1 font-semibold text-xs w-full ${statusColors[b.status]}`}>
//                   {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
//                 </select>
//               </td>
//               <td className="p-3 border">
//                 <div className="flex gap-1">
//                   <button onClick={() => setSelectedBooking(b)} className="bg-gray-200 text-gray-700 p-2 rounded hover:bg-gray-300"><ArrowRight size={14} /></button>
//                   <button onClick={() => openEditForm(b)} className="bg-yellow-400 text-white p-2 rounded hover:bg-yellow-500"><Edit size={14} /></button>
//                   <button onClick={() => handleDelete(b._id)} className="bg-red-500 text-white p-2 rounded hover:bg-red-600"><Trash2 size={14} /></button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Add/Edit Form Modal */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
//           <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg w-full max-w-4xl p-6 relative max-h-[90vh] overflow-y-auto">
//             <button type="button" onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-gray-600 hover:text-black"><X size={24} /></button>
//             <h2 className="text-2xl font-bold mb-6">{formData._id ? "Edit Booking" : "Create New Booking"}</h2>

//             {/* User and Trip Details */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-semibold mb-1">User Name</label>
//                 <input name="userName" value={formData.userName} onChange={handleInputChange} className="w-full border p-2 rounded" required />
//               </div>
//               <div>
//                 <label className="block text-sm font-semibold mb-1">Mobile Number</label>
//                 <input name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} className="w-full border p-2 rounded" required />
//               </div>
//               <div>
//                 <label className="block text-sm font-semibold mb-1">Booking Type</label>
//                 <select name="bookingType" value={formData.bookingType} onChange={handleInputChange} className="w-full border p-2 rounded">
//                   {bookingTypeOptions.map(t => <option key={t} value={t}>{t}</option>)}
//                 </select>
//               </div>
//             </div>

//             {/* Location and Time Details */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-semibold mb-1">Pickup Location</label>
//                 <input name="pickupLocation" value={formData.pickupLocation} onChange={handleInputChange} className="w-full border p-2 rounded" required />
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-semibold mb-1">Drop Location</label>
//                 <input name="dropLocation" value={formData.dropLocation} onChange={handleInputChange} className="w-full border p-2 rounded" />
//               </div>
//               <div>
//                 <label className="block text-sm font-semibold mb-1">Pickup Date</label>
//                 <input type="date" name="pickupDate" value={formData.pickupDate} onChange={handleInputChange} className="w-full border p-2 rounded" required />
//               </div>
//               <div>
//                 <label className="block text-sm font-semibold mb-1">Pickup Time</label>
//                 <input type="time" name="pickupTime" value={formData.pickupTime} onChange={handleInputChange} className="w-full border p-2 rounded" required />
//               </div>
//               <div>
//                 <label className="block text-sm font-semibold mb-1">Distance (km)</label>
//                 <input type="number" name="distance" value={formData.distance} onChange={handleInputChange} className="w-full border p-2 rounded" />
//               </div>
//             </div>

//             {/* Vehicle Details */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//               <div>
//                 <label className="block text-sm font-semibold mb-1">Vehicle Type</label>
//                 <select name="vehicleType" value={formData.vehicleType} onChange={handleInputChange} className="w-full border p-2 rounded">
//                   {vehicleTypeOptions.map(v => <option key={v} value={v}>{v}</option>)}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-semibold mb-1">Seater</label>
//                 <input type="number" name="seater" value={formData.seater} onChange={handleInputChange} className="w-full border p-2 rounded" />
//               </div>
//               <div>
//                 <label className="block text-sm font-semibold mb-1">AC / Non-AC</label>
//                 <select name="ac" value={formData.ac} onChange={handleInputChange} className="w-full border p-2 rounded">
//                   {acOptions.map(a => <option key={a} value={a}>{a}</option>)}
//                 </select>
//               </div>
//             </div>

//             {/* Fare Details */}
//             <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 bg-gray-50 p-4 rounded-lg">
//               <h3 className="md:col-span-5 text-lg font-bold text-gray-700">Fare Details</h3>
//               <div><label>Fare</label><input type="number" name="fare" value={formData.fare} onChange={handleInputChange} className="w-full border p-2 rounded mt-1" /></div>
//               <div><label>Total Fare</label><input type="number" name="totalFare" value={formData.totalFare} onChange={handleInputChange} className="w-full border p-2 rounded mt-1" /></div>
//               <div><label>Advance Amt</label><input type="number" name="advanceAmount" value={formData.advanceAmount} onChange={handleInputChange} className="w-full border p-2 rounded mt-1" /></div>
//               <div><label>Pilot Share</label><input type="number" name="pilotShare" value={formData.pilotShare} onChange={handleInputChange} className="w-full border p-2 rounded mt-1" /></div>
//               <div><label>Company Share</label><input type="number" name="companyShare" value={formData.companyShare} onChange={handleInputChange} className="w-full border p-2 rounded mt-1" /></div>
//             </div>

//             {/* Add-ons */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//               <label className="flex items-center gap-2"><input type="checkbox" name="assuredLuggage" checked={formData.assuredLuggage.selected} onChange={handleCheckboxChange} /> Assured Luggage</label>
//               <label className="flex items-center gap-2"><input type="checkbox" name="confirmCarModel" checked={formData.confirmCarModel.selected} onChange={handleCheckboxChange} /> Confirm Car Model</label>
//               <label className="flex items-center gap-2"><input type="checkbox" name="petAllowance" checked={formData.petAllowance.selected} onChange={handleCheckboxChange} /> Pet Allowance</label>
//               <label className="flex items-center gap-2"><input type="checkbox" name="refundableBooking" checked={formData.refundableBooking.selected} onChange={handleCheckboxChange} /> Refundable Booking</label>
//             </div>

//             <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold text-lg">
//               {formData._id ? "Update Booking" : "Save Booking"}
//             </button>
//           </form>
//         </div>
//       )}

//       {/* View Details Modal (simplified) */}
//       {selectedBooking && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6 relative">
//             <button onClick={() => setSelectedBooking(null)} className="absolute top-4 right-4"><X /></button>
//             <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
//             <div className="grid grid-cols-2 gap-x-8 gap-y-4">
//               <div><p className="text-sm text-gray-500">User</p><p className="font-semibold">{selectedBooking.userName} ({selectedBooking.mobileNumber})</p></div>
//               <div><p className="text-sm text-gray-500">Total Fare</p><p className="font-semibold text-green-600">₹{selectedBooking.totalFare}</p></div>
//               <div><p className="text-sm text-gray-500">Route</p><p className="font-semibold">{selectedBooking.pickupLocation} to {selectedBooking.dropLocation}</p></div>
//               <div><p className="text-sm text-gray-500">Pickup</p><p className="font-semibold">{new Date(selectedBooking.pickupDate).toLocaleDateString()} at {selectedBooking.pickupTime}</p></div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllBookingsTable;








import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AdminContext } from "../context/AdminContext";
import { ArrowRight, X, Plus, Edit, Trash2 } from "lucide-react";

// Options for dropdowns, matching your schema
const bookingTypeOptions = ["Outstation", "Rental", "Airport", "Multi-City", "One way"];
const vehicleTypeOptions = [ "SUV","mini","SUV+","Sedan", "Traveller / Minivan"];
const acOptions = ["AC", "Non-AC"];
const paymentMethodOptions = ["Cash", "Online", "Card"];
const statusOptions = ['Upcoming', 'Confirmed', 'Cancelled', 'Completed', 'Assigned'];

// Helper for date formatting
const formatDateForInput = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toISOString().split('T')[0];
};

const AllBookingsTable = () => {
    const { adminToken } = useContext(AdminContext);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const initialFormData = {
        userName: "", mobileNumber: "", bookingType: "Outstation",
        pickupLocation: "", dropLocation: "", pickupDate: "", pickupTime: "",
        pincode: "", distance: 0, vehicleType: "Compact Sedan", seater: 4, ac: "AC",
        pilotId: null, paymentMethod: "Cash", driverNightAllowance: 0, tollCharges: "Excluded",
        extraKm: 0, extraHour: "", waitingCharge: 0,
        assuredLuggage: { selected: false, price: 1001 },
        confirmCarModel: { selected: false, price: 751 },
        petAllowance: { selected: false, price: 1001 },
        refundableBooking: { selected: false, price: 751 },
        fare: 0, totalFare: 0, advanceAmount: 0, pilotShare: 0, companyShare: 0,
        status: "Upcoming"
    };
    const [formData, setFormData] = useState(initialFormData);

    const statusColors = {
        Upcoming: "bg-yellow-100 text-yellow-800", Confirmed: "bg-green-100 text-green-800",
        Cancelled: "bg-red-100 text-red-800", Completed: "bg-blue-100 text-blue-800",
        Assigned: "bg-indigo-100 text-indigo-800",
    };

    const fetchBookings = async () => {
        if (!adminToken) {
            setLoading(false);
            return;
        }
        try {
            // ✅ FIX: The URL is now correct
            const res = await axios.get("http://localhost:5000/api/admin/bookings", {
                headers: { Authorization: `Bearer ${adminToken}` },
            });

            if (res.data.success) {
                setBookings(res.data.bookings);
            }
        } catch (err) {
            console.error("Failed to fetch bookings:", err.response?.data || err);
            alert("Failed to fetch bookings. Check console for details.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, [adminToken]); 

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: { ...prev[name], selected: checked } }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            fare: parseInt(formData.fare) || 0,
            totalFare: parseInt(formData.totalFare) || 0,
            advanceAmount: parseInt(formData.advanceAmount) || 0,
            pilotShare: parseInt(formData.pilotShare) || 0,
            companyShare: parseInt(formData.companyShare) || 0,
            distance: parseInt(formData.distance) || 0,
            seater: parseInt(formData.seater) || 4,
        };

        // ✅ FIX: The URLs have been corrected to /api/bookings/admin
        const url = payload._id
            ? `http://localhost:5000/api/bookings/admin/${payload._id}`
            : "http://localhost:5000/api/bookings/admin";

        const method = payload._id ? 'put' : 'post';

        try {
            const res = await axios[method](url, payload, {
                headers: { Authorization: `Bearer ${adminToken}` }
            });

            if (res.data.success) {
                fetchBookings();
                setShowForm(false);
                alert(`Booking successfully ${payload._id ? 'updated' : 'created'}!`);
            }
        } catch (err) {
            console.error("API Error:", err.response?.data || err);
            alert(err.response?.data?.message || `Failed to ${payload._id ? 'update' : 'create'} booking`);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            // ✅ FIX: Corrected URL structure for DELETE
            const res = await axios.delete(`http://localhost:5000/api/bookings/admin/${id}`, {
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            if (res.data.success) {
                setBookings((prev) => prev.filter((b) => b._id !== id));
            }
        } catch (err) {
            alert("Failed to delete booking");
        }
    };

    const handleStatusChange = async (bookingId, status) => {
        try {
            // ✅ FIX: Corrected URL structure for status update
            const res = await axios.put(`http://localhost:5000/api/admin/bookings/${bookingId}`, { status }, {
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            if (res.data.success) {
                setBookings((prev) => prev.map((b) => (b._id === bookingId ? res.data.booking : b)));
            }
        } catch (err) {
            alert("Failed to update status");
        }
    };

    const openAddForm = () => {
        setFormData(initialFormData);
        setShowForm(true);
    };

    const openEditForm = (booking) => {
        setFormData({ ...initialFormData, ...booking, pickupDate: formatDateForInput(booking.pickupDate) });
        setShowForm(true);
    };

    if (loading) return <div className="text-center p-10">Loading...</div>;

    return (
        <div className="overflow-x-auto bg-white shadow-lg rounded-2xl p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">All Bookings</h2>
                <button onClick={openAddForm} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus size={18} /> Add Booking
                </button>
            </div>

            <table className="min-w-full table-auto border-collapse text-sm">
                <thead className="bg-gray-50">
                    <tr className="text-left text-gray-600">
                        {["User", "Route", "Pickup", "Vehicle", "Fare", "Status", "Actions"].map(h => <th key={h} className="p-3 border font-semibold">{h}</th>)}
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {bookings.map((b) => (
                        <tr key={b._id} className="hover:bg-gray-50">
                            <td className="p-3 border">
                                <p className="font-semibold">{b.userName}</p>
                                <p className="text-gray-500">{b.mobileNumber}</p>
                            </td>
                            <td className="p-3 border">{b.pickupLocation} → {b.dropLocation || 'N/A'}</td>
                            <td className="p-3 border">{new Date(b.pickupDate).toLocaleDateString()} at {b.pickupTime}</td>
                            <td className="p-3 border">{b.vehicleType}</td>
                            <td className="p-3 border font-semibold">₹{b.totalFare}</td>
                            <td className="p-3 border">
                                <select value={b.status} onChange={(e) => handleStatusChange(b._id, e.target.value)} className={`border-0 rounded px-2 py-1 font-semibold text-xs w-full ${statusColors[b.status]}`}>
                                    {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </td>
                            <td className="p-3 border">
                                <div className="flex gap-1">
                                    <button onClick={() => setSelectedBooking(b)} className="bg-gray-200 text-gray-700 p-2 rounded hover:bg-gray-300"><ArrowRight size={14} /></button>
                                    <button onClick={() => openEditForm(b)} className="bg-yellow-400 text-white p-2 rounded hover:bg-yellow-500"><Edit size={14} /></button>
                                    <button onClick={() => handleDelete(b._id)} className="bg-red-500 text-white p-2 rounded hover:bg-red-600"><Trash2 size={14} /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
                    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg w-full max-w-7xl p-6 relative max-h-[100vh] overflow-y-auto">
                        <button type="button" onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-gray-600 hover:text-black"><X size={24} /></button>
                        <h2 className="text-2xl font-bold mb-6">{formData._id ? "Edit Booking" : "Create New Booking"}</h2>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                            <div className="md:col-span-2"><label className="block text-sm font-semibold mb-1">User Name</label><input name="userName" value={formData.userName} onChange={handleInputChange} className="w-full border p-2 rounded" required /></div>
                            <div><label className="block text-sm font-semibold mb-1">Mobile Number</label><input name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} className="w-full border p-2 rounded" required /></div>
                            <div><label className="block text-sm font-semibold mb-1">Booking Type</label><select name="bookingType" value={formData.bookingType} onChange={handleInputChange} className="w-full border p-2 rounded">{bookingTypeOptions.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                            <div className="md:col-span-2"><label className="block text-sm font-semibold mb-1">Pickup Location</label><input name="pickupLocation" value={formData.pickupLocation} onChange={handleInputChange} className="w-full border p-2 rounded" required /></div>
                            <div className="md:col-span-2"><label className="block text-sm font-semibold mb-1">Drop Location</label><input name="dropLocation" value={formData.dropLocation} onChange={handleInputChange} className="w-full border p-2 rounded" /></div>
                            <div><label className="block text-sm font-semibold mb-1">Pickup Date</label><input type="date" name="pickupDate" value={formData.pickupDate} onChange={handleInputChange} className="w-full border p-2 rounded" required /></div>
                            <div><label className="block text-sm font-semibold mb-1">Pickup Time</label><input type="time" name="pickupTime" value={formData.pickupTime} onChange={handleInputChange} className="w-full border p-2 rounded" required /></div>
                            <div><label className="block text-sm font-semibold mb-1">Distance (km)</label><input type="number" name="distance" value={formData.distance} onChange={handleInputChange} className="w-full border p-2 rounded" /></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div><label className="block text-sm font-semibold mb-1">Vehicle Type</label><select name="vehicleType" value={formData.vehicleType} onChange={handleInputChange} className="w-full border p-2 rounded">{vehicleTypeOptions.map(v => <option key={v} value={v}>{v}</option>)}</select></div>
                            <div><label className="block text-sm font-semibold mb-1">Seater</label><input type="number" name="seater" value={formData.seater} onChange={handleInputChange} className="w-full border p-2 rounded" /></div>
                            <div><label className="block text-sm font-semibold mb-1">AC / Non-AC</label><select name="ac" value={formData.ac} onChange={handleInputChange} className="w-full border p-2 rounded">{acOptions.map(a => <option key={a} value={a}>{a}</option>)}</select></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 bg-gray-50 p-4 rounded-lg">
                            <h3 className="md:col-span-5 text-lg font-bold text-gray-700">Fare Details</h3>
                            <div><label>Fare</label><input type="number" name="fare" value={formData.fare} onChange={handleInputChange} className="w-full border p-2 rounded mt-1" /></div>
                            <div><label>Total Fare</label><input type="number" name="totalFare" value={formData.totalFare} onChange={handleInputChange} className="w-full border p-2 rounded mt-1" /></div>
                            <div><label>Advance Amt</label><input type="number" name="advanceAmount" value={formData.advanceAmount} onChange={handleInputChange} className="w-full border p-2 rounded mt-1" /></div>
                            <div><label>Pilot Share</label><input type="number" name="pilotShare" value={formData.pilotShare} onChange={handleInputChange} className="w-full border p-2 rounded mt-1" /></div>
                            <div><label>Company Share</label><input type="number" name="companyShare" value={formData.companyShare} onChange={handleInputChange} className="w-full border p-2 rounded mt-1" /></div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <label className="flex items-center gap-2"><input type="checkbox" name="assuredLuggage" checked={formData.assuredLuggage.selected} onChange={handleCheckboxChange} /> Assured Luggage</label>
                            <label className="flex items-center gap-2"><input type="checkbox" name="confirmCarModel" checked={formData.confirmCarModel.selected} onChange={handleCheckboxChange} /> Confirm Car Model</label>
                            <label className="flex items-center gap-2"><input type="checkbox" name="petAllowance" checked={formData.petAllowance.selected} onChange={handleCheckboxChange} /> Pet Allowance</label>
                            <label className="flex items-center gap-2"><input type="checkbox" name="refundableBooking" checked={formData.refundableBooking.selected} onChange={handleCheckboxChange} /> Refundable Booking</label>
                        </div>

                        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold text-lg">{formData._id ? "Update Booking" : "Save Booking"}</button>
                    </form>
                </div>
            )}

            {selectedBooking && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6 relative">
                        <button onClick={() => setSelectedBooking(null)} className="absolute top-4 right-4"><X /></button>
                        <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                            <div><p className="text-sm text-gray-500">User</p><p className="font-semibold">{selectedBooking.userName} ({selectedBooking.mobileNumber})</p></div>
                            <div><p className="text-sm text-gray-500">Total Fare</p><p className="font-semibold text-green-600">₹{selectedBooking.totalFare}</p></div>
                            <div><p className="text-sm text-gray-500">Route</p><p className="font-semibold">{selectedBooking.pickupLocation} to {selectedBooking.dropLocation}</p></div>
                            <div><p className="text-sm text-gray-500">Pickup</p><p className="font-semibold">{new Date(selectedBooking.pickupDate).toLocaleDateString()} at {selectedBooking.pickupTime}</p></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllBookingsTable;