

// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { Car, Users, CalendarDays, CreditCard, CheckCircle, XCircle, Clock, Check } from 'lucide-react';

// const statuses = [
//   { label: 'Upcoming', color: 'bg-yellow-50 text-yellow-700', icon: <Clock size={18} /> },
//   { label: 'Confirmed', color: 'bg-green-50 text-green-700', icon: <CheckCircle size={18} /> },
//   { label: 'Cancelled', color: 'bg-red-50 text-red-700', icon: <XCircle size={18} /> },
//   { label: 'Completed', color: 'bg-blue-50 text-blue-700', icon: <Check size={18} /> },
// ];

// const statusCardColors = {
//   'Upcoming': 'border-yellow-400 bg-yellow-50',
//   'Confirmed': 'border-green-400 bg-green-50',
//   'Cancelled': 'border-red-400 bg-red-50',
//   'Completed': 'border-blue-400 bg-blue-50',
// };

// const MyBookings = () => {
//   const { token } = useContext(AuthContext);
//   const [bookings, setBookings] = useState([]);
//   const [activeStatus, setActiveStatus] = useState('Upcoming');
//   const [statusCounts, setStatusCounts] = useState({});
//   const navigate = useNavigate();

//   const fetchBookings = async (status) => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/bookings/my-bookings?status=${status}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       if (res.data.success) setBookings(res.data.bookings);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchCounts = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/bookings/my-bookings/counts`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       if (res.data.success) setStatusCounts(res.data.counts);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchBookings(activeStatus);
//     fetchCounts();
//   }, [activeStatus]);

//   const handleCancel = async (bookingId) => {
//     if (!window.confirm("Are you sure you want to cancel this booking?")) return;

//     try {
//       const res = await axios.patch(
//         `http://localhost:5000/api/bookings/${bookingId}/status`,
//         { status: 'Cancelled' },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (res.data.success) {
//         fetchBookings(activeStatus);
//         fetchCounts();
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || 'Failed to cancel booking.');
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 p-4 md:p-6">
//       {/* Sidebar */}
//       <aside className="w-full md:w-64 mb-6 md:mb-0 sticky top-4">
//         <div className="bg-gradient-to-b from-gray-800 to-gray-900 text-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
//           <h2 className="text-2xl font-bold mb-4 text-yellow-400">My Bookings</h2>
//           {statuses.map((status) => (
//             <button
//               key={status.label}
//               onClick={() => setActiveStatus(status.label)}
//               className={`flex items-center justify-between px-5 py-3 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md ${
//                 activeStatus === status.label
//                   ? 'bg-yellow-500 text-white shadow-lg'
//                   : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
//               }`}
//             >
//               <div className="flex items-center gap-3">
//                 {status.icon}
//                 <span>{status.label}</span>
//               </div>
//               <span className="bg-white text-gray-900 text-xs font-bold px-2 py-1 rounded-full">
//                 {statusCounts[status.label] || 0}
//               </span>
//             </button>
//           ))}
//         </div>
//       </aside>

//       {/* Booking List */}
//       <main className="flex-1 md:ml-6 space-y-6">
//         <h1 className="text-3xl font-bold text-gray-800 mb-4">{activeStatus} Bookings</h1>

//         {bookings.length === 0 && (
//           <div className="flex justify-center items-center h-60 text-gray-500 text-lg">
//             No {activeStatus} bookings found.
//           </div>
//         )}

//         {bookings.map((b) => (
//           <div key={b._id} className={`rounded-2xl shadow-lg hover:shadow-2xl transition-shadow border-2 overflow-hidden ${statusCardColors[b.status] || 'border-gray-200 bg-white'}`}>
//             {/* Header Row */}
//             <div className="flex justify-between flex-col sm:flex-row items-start sm:items-center p-6 border-b border-gray-100 gap-3 sm:gap-0">
//               <div className="flex flex-col gap-1">
//                 <h2 className="text-lg font-bold text-gray-800">{b.tripDetails.from} → {b.tripDetails.to}</h2>
//                 <p className="text-gray-600 text-sm">{b.tripDetails.tripType}</p>
//                 <span className={`inline-block mt-1 px-3 py-1 text-sm rounded-full font-medium ${
//                   statuses.find(s => s.label === b.status)?.color || 'bg-yellow-50 text-yellow-800'
//                 }`}>
//                   {b.status}
//                 </span>
//               </div>
//               <span className="text-gray-500 text-sm mt-2 sm:mt-0">Booking ID: <span className="font-semibold text-gray-700">{b._id}</span></span>
//             </div>

//             {/* Details Table */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-6 text-gray-700">
//               <div className="flex items-center gap-2">
//                 <Car size={18} className="text-blue-600"/>
//                 <span className="font-medium">{b.packageDetails.car || b.packageDetails.fleet || b.packageDetails.vehicleType}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Users size={18} className="text-green-600"/>
//                 <span className="font-medium">{b.travellerDetails.fullName}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <CalendarDays size={18} className="text-orange-600"/>
//                 <span className="font-medium">{b.tripDetails.pickupDate} {b.tripDetails.pickupTime}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <CreditCard size={18} className="text-purple-600"/>
//                 <span className="font-medium">₹{b.paymentDetails.amountPaid} ({b.paymentDetails.paymentOption})</span>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-wrap gap-4 p-6">
//               <button
//                 onClick={() => handleCancel(b._id)}
//                 disabled={b.status === 'Cancelled'}
//                 className={`px-5 py-2 rounded-full font-semibold text-sm transition-all shadow-md ${
//                   b.status === 'Cancelled'
//                     ? 'bg-gray-300 cursor-not-allowed text-gray-600'
//                     : 'bg-red-600 text-white hover:bg-red-700'
//                 }`}
//               >
//                 {b.status === 'Cancelled' ? 'Cancelled' : 'Cancel Booking'}
//               </button>
//               <button
//                 onClick={() => navigate(`/booking-details/${b._id}`)}
//                 className="px-5 py-2 rounded-full font-semibold text-sm bg-blue-600 text-white hover:bg-blue-700 shadow-md transition-all"
//               >
//                 View Details
//               </button>
//             </div>
//           </div>
//         ))}
//       </main>
//     </div>
//   );
// };

// export default MyBookings;



// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { Car, Users, CalendarDays, CreditCard, CheckCircle, XCircle, Clock, Check } from 'lucide-react';

// const statuses = [
//   { label: 'Upcoming', color: 'bg-yellow-50 text-yellow-700', icon: <Clock size={18} /> },
//   { label: 'Confirmed', color: 'bg-green-50 text-green-700', icon: <CheckCircle size={18} /> },
//   { label: 'Cancelled', color: 'bg-red-50 text-red-700', icon: <XCircle size={18} /> },
//   { label: 'Completed', color: 'bg-blue-50 text-blue-700', icon: <Check size={18} /> },
// ];

// const statusCardColors = {
//   'Upcoming': 'border-yellow-400 bg-yellow-50',
//   'Confirmed': 'border-green-400 bg-green-50',
//   'Cancelled': 'border-red-400 bg-red-50',
//   'Completed': 'border-blue-400 bg-blue-50',
// };

// const packageTypeColors = {
//   'Outstation': 'bg-purple-50 text-purple-700',
//   'Rental': 'bg-blue-50 text-blue-700',
//   'Airport': 'bg-green-50 text-green-700',
//   'Multi-City': 'bg-pink-50 text-pink-700',
// };

// const MyBookings = () => {
//   const { token } = useContext(AuthContext);
//   const [bookings, setBookings] = useState([]);
//   const [activeStatus, setActiveStatus] = useState('Upcoming');
//   const [statusCounts, setStatusCounts] = useState({});
//   const navigate = useNavigate();

//   const fetchBookings = async (status) => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/bookings/my-bookings?status=${status}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       if (res.data.success) setBookings(res.data.bookings);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchCounts = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/bookings/my-bookings/counts`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       if (res.data.success) setStatusCounts(res.data.counts);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchBookings(activeStatus);
//     fetchCounts();
//   }, [activeStatus]);

//   const handleCancel = async (bookingId) => {
//     if (!window.confirm("Are you sure you want to cancel this booking?")) return;

//     try {
//       const res = await axios.patch(
//         `http://localhost:5000/api/bookings/${bookingId}/status`,
//         { status: 'Cancelled' },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (res.data.success) {
//         fetchBookings(activeStatus);
//         fetchCounts();
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || 'Failed to cancel booking.');
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 p-4 md:p-6">

//       {/* Sidebar */}
//       <aside className="w-full md:w-64 mb-6 md:mb-0 sticky top-4">
//         <div className="bg-gradient-to-b from-gray-800 to-gray-900 text-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
//           <h2 className="text-2xl font-bold mb-4 text-yellow-400">My Bookings</h2>
//           {statuses.map((status) => (
//             <button
//               key={status.label}
//               onClick={() => setActiveStatus(status.label)}
//               className={`flex items-center justify-between px-5 py-3 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md ${
//                 activeStatus === status.label
//                   ? 'bg-yellow-500 text-white shadow-lg'
//                   : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
//               }`}
//             >
//               <div className="flex items-center gap-3">
//                 {status.icon}
//                 <span>{status.label}</span>
//               </div>
//               <span className="bg-white text-gray-900 text-xs font-bold px-2 py-1 rounded-full">
//                 {statusCounts[status.label] || 0}
//               </span>
//             </button>
//           ))}
//         </div>
//       </aside>

//       {/* Booking List */}
//       <main className="flex-1 md:ml-6 space-y-6">
//         <h1 className="text-3xl font-bold text-gray-800 mb-4">{activeStatus} Bookings</h1>

//         {bookings.length === 0 && (
//           <div className="flex justify-center items-center h-60 text-gray-500 text-lg">
//             No {activeStatus} bookings found.
//           </div>
//         )}

//         {bookings.map((b) => (
//           <div key={b._id} className={`rounded-2xl shadow-lg hover:shadow-2xl transition-shadow border-2 overflow-hidden ${statusCardColors[b.status] || 'border-gray-200 bg-white'}`}>

//             {/* Header Row */}
//             <div className="flex justify-between flex-col sm:flex-row items-start sm:items-center p-6 border-b border-gray-100 gap-3 sm:gap-0">
//               <div className="flex flex-col gap-1">
//                 <h2 className="text-lg font-bold text-gray-800">{b.tripDetails.from} → {b.tripDetails.to}</h2>

//                 {/* Package Type Badge */}
//                 <span className={`inline-block mt-1 px-3 py-1 text-sm rounded-full font-medium ${packageTypeColors[b.type] || 'bg-gray-100 text-gray-700'}`}>
//                   {b.type}
//                 </span>

//                 {/* Status Badge */}
//                 <span className={`inline-block mt-1 px-3 py-1 text-sm rounded-full font-medium ${
//                   statuses.find(s => s.label === b.status)?.color || 'bg-yellow-50 text-yellow-800'
//                 }`}>
//                   {b.status}
//                 </span>
//               </div>
//               <span className="text-gray-500 text-sm mt-2 sm:mt-0">Booking ID: <span className="font-semibold text-gray-700">{b._id}</span></span>
//             </div>

//             {/* Details Table */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-6 text-gray-700">
//               <div className="flex items-center gap-2">
//                 <Car size={18} className="text-blue-600"/>
//                 <span className="font-medium">{b.packageDetails.car || b.packageDetails.fleet || b.packageDetails.vehicleType}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Users size={18} className="text-green-600"/>
//                 <span className="font-medium">{b.travellerDetails.fullName}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <CalendarDays size={18} className="text-orange-600"/>
//                 <span className="font-medium">{b.tripDetails.pickupDate} {b.tripDetails.pickupTime}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <CreditCard size={18} className="text-purple-600"/>
//                 <span className="font-medium">₹{b.paymentDetails.amountPaid} ({b.paymentDetails.paymentOption})</span>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-wrap gap-4 p-6">
//               <button
//                 onClick={() => handleCancel(b._id)}
//                 disabled={b.status === 'Cancelled'}
//                 className={`px-5 py-2 rounded-full font-semibold text-sm transition-all shadow-md ${
//                   b.status === 'Cancelled'
//                     ? 'bg-gray-300 cursor-not-allowed text-gray-600'
//                     : 'bg-red-600 text-white hover:bg-red-700'
//                 }`}
//               >
//                 {b.status === 'Cancelled' ? 'Cancelled' : 'Cancel Booking'}
//               </button>
//               <button
//                 onClick={() => navigate(`/booking-details/${b._id}`)}
//                 className="px-5 py-2 rounded-full font-semibold text-sm bg-blue-600 text-white hover:bg-blue-700 shadow-md transition-all"
//               >
//                 View Details
//               </button>
//             </div>

//           </div>
//         ))}
//       </main>
//     </div>
//   );
// };

// export default MyBookings;





import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Car, Users, CalendarDays, CreditCard, CheckCircle, XCircle, Clock, Check, ShieldCheck } from 'lucide-react';

// Sidebar status options - 'Assigned' added
const statuses = [
    { label: 'Upcoming', icon: <Clock size={18} /> },
    { label: 'Assigned', icon: <ShieldCheck size={18} /> },
    { label: 'Confirmed', icon: <CheckCircle size={18} /> },
    { label: 'Completed', icon: <Check size={18} /> },
    { label: 'Cancelled', icon: <XCircle size={18} /> },
];

// Card border and background colors based on status
const statusCardColors = {
    'Upcoming': 'border-yellow-400 bg-yellow-50',
    'Confirmed': 'border-green-400 bg-green-50',
    'Cancelled': 'border-red-400 bg-red-50',
    'Completed': 'border-blue-400 bg-blue-50',
    'Assigned': 'border-indigo-400 bg-indigo-50',
};

// Booking type badge colors
const bookingTypeColors = {
    'Outstation': 'bg-purple-100 text-purple-700',
    'Rental': 'bg-blue-100 text-blue-700',
    'Airport': 'bg-green-100 text-green-700',
    'Multi-City': 'bg-pink-100 text-pink-700',
    'One way': 'bg-teal-100 text-teal-700',
};

const MyBookings = () => {
    const { token } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [activeStatus, setActiveStatus] = useState('Upcoming');
    const [statusCounts, setStatusCounts] = useState({});
    const [isCancelling, setIsCancelling] = useState(null); // State for cancel loading
    const navigate = useNavigate();

    const fetchBookings = async (status) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/bookings/my-bookings?status=${status}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.success) setBookings(res.data.bookings);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchCounts = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/bookings/my-bookings/counts`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.success) setStatusCounts(res.data.counts);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (token) {
            fetchBookings(activeStatus);
            fetchCounts();
        }
    }, [activeStatus, token]);

    const handleCancel = async (bookingId) => {
        if (!window.confirm("Are you sure you want to cancel this booking?")) return;

        setIsCancelling(bookingId); // Start loading for this booking
        try {
            const res = await axios.patch(
                `http://localhost:5000/api/bookings/${bookingId}/cancel`,
                {}, 
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.data.success) {
                alert('Booking successfully cancelled!');
                fetchBookings(activeStatus);
                fetchCounts();
            }
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to cancel booking.');
        } finally {
            setIsCancelling(null); // Stop loading
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 p-4 md:p-6">
            {/* Sidebar */}
            <aside className="w-full md:w-72 mb-6 md:mb-0 md:sticky top-6 h-fit">
                <div className="bg-white text-gray-800 rounded-2xl shadow-md p-6 flex flex-col gap-3">
                    <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
                    {statuses.map((status) => (
                        <button
                            key={status.label}
                            onClick={() => setActiveStatus(status.label)}
                            className={`flex items-center justify-between px-4 py-3 rounded-lg font-semibold transition-all text-left ${
                                activeStatus === status.label
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                {status.icon}
                                <span>{status.label}</span>
                            </div>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                                activeStatus === status.label ? 'bg-white text-blue-600' : 'bg-gray-300 text-gray-800'
                            }`}>
                                {statusCounts[status.label] || 0}
                            </span>
                        </button>
                    ))}
                </div>
            </aside>

            {/* Booking List */}
            <main className="flex-1 md:ml-8 space-y-6">
                <h1 className="text-3xl font-bold text-gray-800">{activeStatus} Bookings</h1>

                {bookings.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-lg shadow">
                        <p className="text-gray-500">No {activeStatus.toLowerCase()} bookings found.</p>
                    </div>
                ) : (
                    bookings.map((b) => (
                        <div key={b._id} className={`rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 overflow-hidden ${statusCardColors[b.status] || 'border-gray-300 bg-white'}`}>
                            
                            <div className="flex justify-between items-start p-5 border-b">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">{b.pickupLocation} → {b.dropLocation || 'N/A'}</h2>
                                    <p className="text-sm text-gray-500 mt-1">Booking ID: {b._id}</p>
                                </div>
                                <span className={`px-3 py-1 text-xs rounded-full font-bold ${bookingTypeColors[b.bookingType] || 'bg-gray-100 text-gray-700'}`}>
                                    {b.bookingType}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 text-gray-700">
                                <div className="flex items-center gap-3"><Car size={18} className="text-blue-600"/><div><p className="text-xs">Vehicle</p><p className="font-semibold">{b.vehicleType}</p></div></div>
                                <div className="flex items-center gap-3"><Users size={18} className="text-green-600"/><div><p className="text-xs">Passenger</p><p className="font-semibold">{b.userName}</p></div></div>
                                <div className="flex items-center gap-3"><CalendarDays size={18} className="text-orange-600"/><div><p className="text-xs">Pickup</p><p className="font-semibold">{new Date(b.pickupDate).toLocaleDateString()} at {b.pickupTime}</p></div></div>
                                <div className="flex items-center gap-3"><CreditCard size={18} className="text-purple-600"/><div><p className="text-xs">Total Fare</p><p className="font-semibold">₹{b.totalFare}</p></div></div>
                            </div>
                            
                            <div className="bg-gray-50 px-5 py-4 flex flex-wrap gap-3 items-center">
                                {(b.status === 'Upcoming' || b.status === 'Confirmed' || b.status === 'Assigned') && (
                                    <button 
                                        onClick={() => handleCancel(b._id)} 
                                        disabled={isCancelling === b._id}
                                        className="px-4 py-2 rounded-lg font-semibold text-sm bg-red-100 text-red-700 hover:bg-red-200 transition-all disabled:opacity-50 disabled:cursor-wait"
                                    >
                                        {isCancelling === b._id ? 'Cancelling...' : 'Cancel Booking'}
                                    </button>
                                )}
                                <button onClick={() => navigate(`/booking-details/${b._id}`)} className="px-4 py-2 rounded-lg font-semibold text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 transition-all">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </main>
        </div>
    );
};

export default MyBookings;