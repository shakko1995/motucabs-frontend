


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

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AdminContext } from "../context/AdminContext";
import { ArrowRight, X, Plus, Edit, Trash2 } from "lucide-react";

const statusOptions = ["Upcoming", "Confirmed", "Cancelled", "Completed"];
const tripTypeOptions = ["Outstation", "Rental", "Airport", "Multi-City"];

const AllBookingsTable = () => {
  const { adminToken } = useContext(AdminContext);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    travellerDetails: { fullName: "" },
    tripDetails: { from: "", to: "", pickupDate: "" },
    packageDetails: { vehicleType: "" },
    paymentDetails: { amountPaid: 0, paymentOption: "advance" },
    type: "Outstation",
    status: "Upcoming",
  });

  const statusColors = {
    Upcoming: "bg-yellow-200 text-yellow-800",
    Confirmed: "bg-green-200 text-green-800",
    Cancelled: "bg-red-200 text-red-800",
    Completed: "bg-blue-200 text-blue-800",
  };

  const typeColors = {
    Outstation: "bg-purple-100 text-purple-700",
    Rental: "bg-blue-100 text-blue-700",
    Airport: "bg-green-100 text-green-700",
    "Multi-City": "bg-pink-100 text-pink-700",
  };

  // Fetch bookings
  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/bookings", {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.data.success) setBookings(res.data.bookings);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  // Fetch users for dropdown
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      setUsers(res.data.users || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchUsers();
  }, []);

  // Form input handler
  const handleInputChange = (e, section, field) => {
    if (section) {
      setFormData((prev) => ({
        ...prev,
        [section]: { ...prev[section], [field]: e.target.value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    }
  };

  // Create booking
  const handleCreateBooking = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/bookings",
        formData,
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      if (res.data.success) {
        setBookings((prev) => [res.data.booking, ...prev]);
        setShowForm(false);
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create booking");
    }
  };

  // Update booking
  const handleEditBooking = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/admin/bookings/${formData._id}`,
        formData,
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      if (res.data.success) {
        setBookings((prev) =>
          prev.map((b) => (b._id === formData._id ? res.data.booking : b))
        );
        setShowForm(false);
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update booking");
    }
  };

  // Delete booking
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/admin/bookings/${id}`,
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      if (res.data.success) {
        setBookings((prev) => prev.filter((b) => b._id !== id));
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete booking");
    }
  };

  // Status update
  const handleStatusChange = async (bookingId, status) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/admin/bookings/${bookingId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      if (res.data.success) {
        setBookings((prev) =>
          prev.map((b) => (b._id === bookingId ? { ...b, status } : b))
        );
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  const openAddForm = () => {
    setFormData({
      userId: "",
      travellerDetails: { fullName: "" },
      tripDetails: { from: "", to: "", pickupDate: "" },
      packageDetails: { vehicleType: "" },
      paymentDetails: { amountPaid: 0, paymentOption: "advance" },
      type: "Outstation",
      status: "Upcoming",
    });
    setShowForm(true);
  };

  const openEditForm = (booking) => {
    setFormData({
      ...booking,
      type: booking.type || "Outstation" // Default if missing
    });
    setShowForm(true);
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-2xl p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">All Bookings</h2>
        <button
          onClick={openAddForm}
          className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
        >
          <Plus size={18} /> Add Booking
        </button>
      </div>

      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border">Booking ID</th>
            <th className="p-3 border">User</th>
            <th className="p-3 border">Traveller</th>
            <th className="p-3 border">Trip Type</th>
            <th className="p-3 border">Route</th>
            <th className="p-3 border">Pickup Date</th>
            <th className="p-3 border">Vehicle</th>
            <th className="p-3 border">Amount Paid</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id} className="hover:bg-gray-50">
              <td className="p-3 border font-mono text-xs">{b._id.slice(-8)}</td>
              <td className="p-3 border text-sm">{b.userId?.email || b.userId}</td>
              <td className="p-3 border">{b.travellerDetails?.fullName}</td>
              <td className="p-3 border">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${typeColors[b.type] || "bg-gray-100 text-gray-700"}`}>
                  {b.type || "N/A"}
                </span>
              </td>
              <td className="p-3 border text-sm">
                {b.tripDetails?.from} → {b.tripDetails?.to}
              </td>
              <td className="p-3 border text-sm">{b.tripDetails?.pickupDate}</td>
              <td className="p-3 border">{b.packageDetails?.vehicleType || b.packageDetails?.car}</td>
              <td className="p-3 border font-semibold">₹{b.paymentDetails?.amountPaid}</td>
              <td className="p-3 border">
                <select
                  value={b.status}
                  onChange={(e) => handleStatusChange(b._id, e.target.value)}
                  className={`border rounded px-2 py-1 font-semibold text-xs ${statusColors[b.status]}`}
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </td>
              <td className="p-3 border">
                <div className="flex gap-1">
                  <button
                    onClick={() => setSelectedBooking(b)}
                    className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 text-xs flex items-center gap-1"
                  >
                    <ArrowRight size={12} /> View
                  </button>
                  <button
                    onClick={() => openEditForm(b)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 text-xs flex items-center gap-1"
                  >
                    <Edit size={12} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(b._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-xs flex items-center gap-1"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              <X size={24} />
            </button>
            <h2 className="text-lg font-bold mb-4">
              {formData._id ? "Edit Booking" : "Add New Booking"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* User Dropdown */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-1">Select User</label>
                <select
                  value={formData.userId}
                  onChange={(e) => handleInputChange(e, null, "userId")}
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select User</option>
                  {users.map((u) => (
                    <option key={u._id} value={u._id}>
                      {u.fullName || u.name} ({u.email})
                    </option>
                  ))}
                </select>
              </div>

              {/* Trip Type */}
              <div>
                <label className="block text-sm font-semibold mb-1">Trip Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange(e, null, "type")}
                  className="w-full border p-2 rounded"
                >
                  {tripTypeOptions.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange(e, null, "status")}
                  className="w-full border p-2 rounded"
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Traveller Details */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-1">Traveller Full Name</label>
                <input
                  type="text"
                  placeholder="Traveller Full Name"
                  value={formData.travellerDetails.fullName}
                  onChange={(e) =>
                    handleInputChange(e, "travellerDetails", "fullName")
                  }
                  className="w-full border p-2 rounded"
                />
              </div>

              {/* Trip Details */}
              <div>
                <label className="block text-sm font-semibold mb-1">From</label>
                <input
                  type="text"
                  placeholder="Pickup Location"
                  value={formData.tripDetails.from}
                  onChange={(e) => handleInputChange(e, "tripDetails", "from")}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">To</label>
                <input
                  type="text"
                  placeholder="Drop Location"
                  value={formData.tripDetails.to}
                  onChange={(e) => handleInputChange(e, "tripDetails", "to")}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Pickup Date</label>
                <input
                  type="date"
                  value={formData.tripDetails.pickupDate}
                  onChange={(e) =>
                    handleInputChange(e, "tripDetails", "pickupDate")
                  }
                  className="w-full border p-2 rounded"
                />
              </div>

              {/* Package Details */}
              <div>
                <label className="block text-sm font-semibold mb-1">Vehicle Type</label>
                <input
                  type="text"
                  placeholder="e.g., Sedan, SUV, Mini"
                  value={formData.packageDetails.vehicleType}
                  onChange={(e) =>
                    handleInputChange(e, "packageDetails", "vehicleType")
                  }
                  className="w-full border p-2 rounded"
                />
              </div>

              {/* Payment Details */}
              <div>
                <label className="block text-sm font-semibold mb-1">Amount Paid (₹)</label>
                <input
                  type="number"
                  placeholder="Amount Paid"
                  value={formData.paymentDetails.amountPaid}
                  onChange={(e) =>
                    handleInputChange(e, "paymentDetails", "amountPaid")
                  }
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Payment Option</label>
                <select
                  value={formData.paymentDetails.paymentOption || "advance"}
                  onChange={(e) =>
                    handleInputChange(e, "paymentDetails", "paymentOption")
                  }
                  className="w-full border p-2 rounded"
                >
                  <option value="advance">Advance</option>
                  <option value="full">Full</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <button
                  onClick={formData._id ? handleEditBooking : handleCreateBooking}
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold"
                >
                  {formData._id ? "Update Booking" : "Create Booking"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedBooking(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold mb-4">Booking Details</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Booking ID</p>
                  <p className="font-semibold">{selectedBooking._id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Trip Type</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${typeColors[selectedBooking.type]}`}>
                    {selectedBooking.type || "N/A"}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusColors[selectedBooking.status]}`}>
                    {selectedBooking.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Traveller Name</p>
                  <p className="font-semibold">{selectedBooking.travellerDetails?.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">From</p>
                  <p className="font-semibold">{selectedBooking.tripDetails?.from}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">To</p>
                  <p className="font-semibold">{selectedBooking.tripDetails?.to}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pickup Date</p>
                  <p className="font-semibold">{selectedBooking.tripDetails?.pickupDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Vehicle Type</p>
                  <p className="font-semibold">{selectedBooking.packageDetails?.vehicleType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Amount Paid</p>
                  <p className="font-semibold text-green-600">₹{selectedBooking.paymentDetails?.amountPaid}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Option</p>
                  <p className="font-semibold capitalize">{selectedBooking.paymentDetails?.paymentOption}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBookingsTable;

