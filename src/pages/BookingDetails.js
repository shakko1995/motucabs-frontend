// import React, { useEffect, useState, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { AuthContext } from '../context/AuthContext';
// import { Car, Users, CalendarDays, CreditCard, ArrowLeft } from 'lucide-react';

// const vehicleData = {
//   Mini: { name: "Indica, Swift", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Hatchback_2x.png" },
//   Sedan: { name: "Dzire, Etios", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png" },
//   SUV: { name: "Ertiga, Xylo", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" },
//   "SUV+": { name: "Innova Crysta", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" },
// };

// const BookingDetails = () => {
//   const { token } = useContext(AuthContext);
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [booking, setBooking] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBooking = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/bookings/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (res.data.success) setBooking(res.data.booking);
//       } catch (err) {
//         alert(err.response?.data?.message || "Failed to fetch booking details");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBooking();
//   }, [id, token]);

//   if (loading) return <div className="p-10 text-center text-gray-600">Loading...</div>;
//   if (!booking) return <div className="p-10 text-center text-red-600">Booking not found</div>;

//   const carType = booking.packageDetails.car || booking.packageDetails.fleet || booking.packageDetails.vehicleType;
//   const carInfo = vehicleData[carType] || vehicleData.Mini;

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case 'Confirmed': return 'bg-green-100 text-green-800';
//       case 'Cancelled': return 'bg-gray-100 text-gray-600';
//       case 'Completed': return 'bg-blue-100 text-blue-800';
//       default: return 'bg-yellow-100 text-yellow-800';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
//       {/* Header */}
//       <button
//         onClick={() => navigate(-1)}
//         className="flex items-center gap-2 text-blue-600 font-semibold mb-6 hover:text-blue-800 transition-colors"
//       >
//         <ArrowLeft size={20} /> Back
//       </button>

//       <h1 className="text-3xl font-bold text-gray-800 mb-4">Booking Details</h1>
//       <span className={`inline-block px-4 py-1 rounded-full font-medium ${getStatusBadge(booking.status)}`}>{booking.status}</span>

//       {/* Trip Summary */}
//       <div className="bg-white rounded-2xl shadow-lg p-6 mt-6 space-y-4">
//         <h2 className="text-xl font-semibold text-gray-800 mb-2">Trip Summary</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
//           <div className="flex items-center gap-2"><Car size={16} className="text-blue-500"/> {carType}</div>
//           <div className="flex items-center gap-2"><Users size={16} className="text-green-500"/> {booking.travellerDetails.fullName}</div>
//           <div className="flex items-center gap-2"><CalendarDays size={16} className="text-orange-500"/> Pickup: {booking.tripDetails.pickupDate} {booking.tripDetails.pickupTime}</div>
//           {booking.tripDetails.dropDate && (
//             <div className="flex items-center gap-2"><CalendarDays size={16} className="text-orange-500"/> Drop: {booking.tripDetails.dropDate} {booking.tripDetails.dropTime}</div>
//           )}
//           <div className="flex items-center gap-2"><CreditCard size={16} className="text-purple-500"/> Payment: ₹{booking.paymentDetails.amountPaid} ({booking.paymentDetails.paymentOption})</div>
//         </div>
//       </div>

//       {/* Vehicle Info */}
//       <div className="bg-white rounded-2xl shadow-lg p-6 mt-6 flex items-center gap-4">
//         <img src={carInfo.image} alt={carInfo.name} className="h-24 w-24 object-contain"/>
//         <div>
//           <h3 className="text-lg font-bold text-gray-800">{carInfo.name} <span className="text-gray-500 text-sm">or similar</span></h3>
//           <p className="text-gray-600 text-sm">{carType} • {booking.packageDetails.seater} Seater</p>
//           {booking.packageDetails.ac && <p className="text-gray-600 text-sm">AC Available</p>}
//         </div>
//       </div>

//       {/* Traveller Details */}
//       <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
//         <h2 className="text-xl font-semibold text-gray-800 mb-2">Traveller Details</h2>
//         <p><span className="font-medium">Name:</span> {booking.travellerDetails.fullName}</p>
//         <p><span className="font-medium">Gender:</span> {booking.travellerDetails.gender || 'N/A'}</p>
//         <p><span className="font-medium">Email:</span> {booking.travellerDetails.email}</p>
//         <p><span className="font-medium">Mobile:</span> {booking.travellerDetails.mobile}</p>
//       </div>

//       {/* Fare Breakdown */}
//       <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
//         <h2 className="text-xl font-semibold text-gray-800 mb-2">Fare Details</h2>
//         <div className="grid grid-cols-1 gap-2 text-gray-700">
//           <div className="flex justify-between"><span>Total Fare:</span> <span>₹{booking.paymentDetails.amountPaid}</span></div>
//           {booking.packageDetails.advanceAmount && <div className="flex justify-between"><span>Advance Paid:</span> <span>₹{booking.packageDetails.advanceAmount}</span></div>}
//           {booking.packageDetails.extraKmRate && <div className="flex justify-between"><span>Extra Km Rate:</span> <span>₹{booking.packageDetails.extraKmRate}/km</span></div>}
//           {booking.packageDetails.extraHourRate && <div className="flex justify-between"><span>Extra Hour Rate:</span> <span>₹{booking.packageDetails.extraHourRate}/hr</span></div>}
//           {booking.packageDetails.nightAllowance && <div className="flex justify-between"><span>Night Allowance:</span> <span>₹{booking.packageDetails.nightAllowance}</span></div>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingDetails;

// import React, { useEffect, useState, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { AuthContext } from '../context/AuthContext';
// import { ArrowLeft, Car, Users, CalendarDays, CreditCard, MapPin, Clock } from 'lucide-react';

// const vehicleData = {
//   Mini: { name: "Indica, Swift", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Hatchback_2x.png" },
//   Sedan: { name: "Dzire, Etios", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png" },
//   SUV: { name: "Ertiga, Xylo", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" },
//   "SUV+": { name: "Innova Crysta", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" },
// };

// const BookingDetails = () => {
//   const { token } = useContext(AuthContext);
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [booking, setBooking] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBooking = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/bookings/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (res.data.success) setBooking(res.data.booking);
//       } catch (err) {
//         alert(err.response?.data?.message || "Failed to fetch booking details");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBooking();
//   }, [id, token]);

//   if (loading) return <div className="p-10 text-center text-gray-600">Loading...</div>;
//   if (!booking) return <div className="p-10 text-center text-red-600">Booking not found</div>;

//   const carType = booking.packageDetails.car || booking.packageDetails.fleet || booking.packageDetails.vehicleType;
//   const carInfo = vehicleData[carType] || vehicleData.Mini;

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case 'Confirmed': return 'bg-green-100 text-green-800';
//       case 'Cancelled': return 'bg-red-100 text-red-800';
//       case 'Completed': return 'bg-blue-100 text-blue-800';
//       default: return 'bg-yellow-100 text-yellow-800';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex flex-col items-center">
//       {/* Back Button */}
//       <button
//         onClick={() => navigate(-1)}
//         className="flex items-center gap-2 text-blue-600 font-semibold mb-4 hover:text-blue-800 transition-colors"
//       >
//         <ArrowLeft size={20} /> Back
//       </button>

//       {/* Header */}
//       <div className="flex flex-col items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">Booking Details</h1>
//         <span className={`px-4 py-1 rounded-full font-medium ${getStatusBadge(booking.status)}`}>
//           {booking.status}
//         </span>
//       </div>

//       {/* Vehicle & Trip Info Card */}
//       <div className="bg-white shadow-lg rounded-3xl w-full max-w-4xl p-6 mb-6">
//         <div className="flex items-center gap-4">
//           <img src={carInfo.image} alt={carInfo.name} className="h-28 w-28 object-contain rounded-xl border"/>
//           <div className="flex-1">
//             <h2 className="text-xl font-bold text-gray-800">{carInfo.name} <span className="text-gray-500 text-sm">or similar</span></h2>
//             <p className="text-gray-600 mt-1">{carType} • {booking.packageDetails.seater} Seater {booking.packageDetails.ac ? '• AC Available' : ''}</p>
//             <p className="text-gray-600 mt-1"><MapPin size={16} className="inline"/> {booking.tripDetails.from} → {booking.tripDetails.to}</p>
//             <p className="text-gray-600 mt-1"><Clock size={16} className="inline"/> Pickup: {booking.tripDetails.pickupDate} {booking.tripDetails.pickupTime}</p>
//             {booking.tripDetails.dropDate && <p className="text-gray-600 mt-1"><Clock size={16} className="inline"/> Drop: {booking.tripDetails.dropDate} {booking.tripDetails.dropTime}</p>}
//           </div>
//         </div>
//       </div>

//       {/* Table-style Booking Details */}
//       <div className="bg-white shadow-lg rounded-3xl w-full max-w-4xl overflow-hidden">
//         <table className="w-full text-left border-collapse">
//           <tbody>
//             <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
//               <td className="p-4 font-medium">Traveller Name</td>
//               <td className="p-4">{booking.travellerDetails.fullName}</td>
//             </tr>
//             <tr className="hover:bg-gray-100 transition-colors">
//               <td className="p-4 font-medium">Gender</td>
//               <td className="p-4">{booking.travellerDetails.gender || 'N/A'}</td>
//             </tr>
//             <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
//               <td className="p-4 font-medium">Email</td>
//               <td className="p-4">{booking.travellerDetails.email}</td>
//             </tr>
//             <tr className="hover:bg-gray-100 transition-colors">
//               <td className="p-4 font-medium">Mobile</td>
//               <td className="p-4">{booking.travellerDetails.mobile}</td>
//             </tr>
//             <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
//               <td className="p-4 font-medium">Payment Option</td>
//               <td className="p-4">{booking.paymentDetails.paymentOption}</td>
//             </tr>
//             <tr className="hover:bg-gray-100 transition-colors">
//               <td className="p-4 font-medium">Amount Paid</td>
//               <td className="p-4">₹{booking.paymentDetails.amountPaid}</td>
//             </tr>
//             {booking.packageDetails.advanceAmount && (
//               <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
//                 <td className="p-4 font-medium">Advance Paid</td>
//                 <td className="p-4">₹{booking.packageDetails.advanceAmount}</td>
//               </tr>
//             )}
//             {booking.packageDetails.extraKmRate && (
//               <tr className="hover:bg-gray-100 transition-colors">
//                 <td className="p-4 font-medium">Extra Km Rate</td>
//                 <td className="p-4">₹{booking.packageDetails.extraKmRate}/km</td>
//               </tr>
//             )}
//             {booking.packageDetails.extraHourRate && (
//               <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
//                 <td className="p-4 font-medium">Extra Hour Rate</td>
//                 <td className="p-4">₹{booking.packageDetails.extraHourRate}/hr</td>
//               </tr>
//             )}
//             {booking.packageDetails.nightAllowance && (
//               <tr className="hover:bg-gray-100 transition-colors">
//                 <td className="p-4 font-medium">Night Allowance</td>
//                 <td className="p-4">₹{booking.packageDetails.nightAllowance}</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full max-w-4xl">
//         <button
//           onClick={() => navigate('/my-bookings')}
//           className="flex-1 bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
//         >
//           Back to My Bookings
//         </button>
//         {booking.status === "Confirmed" && (
//           <button
//             className="flex-1 bg-red-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-red-600 transition-colors"
//           >
//             Cancel Booking
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookingDetails;





import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { ArrowLeft, Car, Users, Calendar, Clock, MapPin, CreditCard, Shield, Percent, IndianRupee } from 'lucide-react';

// Vehicle images for display
const vehicleImages = {
    "Compact Sedan": "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png",
    "Small SUV": "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png",
    "Large SUV": "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png",
    "Premium Business Sedan": "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png",
    "Traveller / Minivan": "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png", // Replace with a more suitable image if available
    "Default": "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Hatchback_2x.png"
};

const BookingDetails = () => {
    const { token } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isCancelling, setIsCancelling] = useState(false);

    useEffect(() => {
        if (!token) return;
        const fetchBooking = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/bookings/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.data.success) setBooking(res.data.booking);
            } catch (err) {
                alert(err.response?.data?.message || "Failed to fetch booking details");
            } finally {
                setLoading(false);
            }
        };
        fetchBooking();
    }, [id, token]);

    const handleCancel = async () => {
        if (!window.confirm("Are you sure you want to cancel this booking?")) return;
        setIsCancelling(true);
        try {
            const res = await axios.patch(`http://localhost:5000/api/bookings/${id}/cancel`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.success) {
                alert('Booking successfully cancelled!');
                setBooking(res.data.booking); // Update the booking state with the new status
            }
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to cancel booking.');
        } finally {
            setIsCancelling(false);
        }
    };

    if (loading) return <div className="p-10 text-center">Loading booking details...</div>;
    if (!booking) return <div className="p-10 text-center text-red-600">Booking not found.</div>;

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Confirmed': return 'bg-green-100 text-green-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            case 'Completed': return 'bg-blue-100 text-blue-800';
            case 'Assigned': return 'bg-indigo-100 text-indigo-800';
            default: return 'bg-yellow-100 text-yellow-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <div className="max-w-4xl mx-auto">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-blue-600 font-semibold mb-6 hover:text-blue-800">
                    <ArrowLeft size={20} /> Back to My Bookings
                </button>

                {/* Main Header */}
                <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">{booking.pickupLocation} to {booking.dropLocation || 'N/A'}</h1>
                            <p className="text-gray-500 mt-1">Booking ID: {booking._id}</p>
                        </div>
                        <span className={`px-4 py-1.5 rounded-full font-semibold text-sm ${getStatusBadge(booking.status)}`}>
                            {booking.status}
                        </span>
                    </div>
                </div>

                {/* Grid Layout for Details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Trip & Vehicle */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white shadow-lg rounded-2xl p-6">
                            <h2 className="text-xl font-bold mb-4">Trip & Vehicle Details</h2>
                            <div className="flex items-center gap-6">
                                <img src={vehicleImages[booking.vehicleType] || vehicleImages.Default} alt={booking.vehicleType} className="h-24 w-24 object-contain rounded-lg"/>
                                <div className="space-y-2 text-gray-700">
                                    <p className="flex items-center gap-2"><Car size={16} className="text-blue-500"/> <span className="font-semibold">{booking.vehicleType}</span> ({booking.seater} Seater, {booking.ac})</p>
                                    <p className="flex items-center gap-2"><MapPin size={16} className="text-red-500"/> From <span className="font-semibold">{booking.pickupLocation}</span></p>
                                    <p className="flex items-center gap-2"><MapPin size={16} className="text-green-500"/> To <span className="font-semibold">{booking.dropLocation || 'Not applicable'}</span></p>
                                    <p className="flex items-center gap-2"><Calendar size={16} className="text-orange-500"/> Pickup on <span className="font-semibold">{new Date(booking.pickupDate).toLocaleDateString()}</span> at <span className="font-semibold">{booking.pickupTime}</span></p>
                                </div>
                            </div>
                        </div>

                        {/* Add-ons Section */}
                        <div className="bg-white shadow-lg rounded-2xl p-6">
                             <h2 className="text-xl font-bold mb-4">Included Add-ons</h2>
                             <div className="grid grid-cols-2 gap-4 text-gray-700">
                                {booking.assuredLuggage?.selected && <p className="flex items-center gap-2"><Shield size={16} className="text-green-500"/> Assured Luggage Space</p>}
                                {booking.confirmCarModel?.selected && <p className="flex items-center gap-2"><Shield size={16} className="text-green-500"/> Confirmed Car Model</p>}
                                {booking.petAllowance?.selected && <p className="flex items-center gap-2"><Shield size={16} className="text-green-500"/> Pet Allowance</p>}
                                {booking.refundableBooking?.selected && <p className="flex items-center gap-2"><Shield size={16} className="text-green-500"/> Refundable Booking</p>}
                             </div>
                        </div>
                    </div>
                    
                    {/* Right Column - Passenger & Fare */}
                    <div className="space-y-6">
                        <div className="bg-white shadow-lg rounded-2xl p-6">
                            <h2 className="text-xl font-bold mb-4">Passenger Details</h2>
                            <div className="space-y-2 text-gray-700">
                                <p className="flex items-center gap-2"><Users size={16} /> <span className="font-semibold">{booking.userName}</span></p>
                                <p className="flex items-center gap-2"><Clock size={16} /> <span className="font-semibold">{booking.mobileNumber}</span></p>
                            </div>
                        </div>
                        <div className="bg-white shadow-lg rounded-2xl p-6">
                            <h2 className="text-xl font-bold mb-4">Fare Details</h2>
                            <div className="space-y-3 text-gray-700">
                                <div className="flex justify-between items-center"><span className="text-gray-500">Total Fare</span><span className="font-bold text-xl text-green-600">₹{booking.totalFare}</span></div>
                                <div className="flex justify-between items-center border-t pt-2"><span className="text-gray-500">Advance Paid</span><span className="font-semibold">₹{booking.advanceAmount}</span></div>
                                <div className="flex justify-between items-center"><span className="text-gray-500">Payment Method</span><span className="font-semibold">{booking.paymentMethod}</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8">
                    {(booking.status === 'Upcoming' || booking.status === 'Confirmed' || booking.status === 'Assigned') && (
                        <button
                            onClick={handleCancel}
                            disabled={isCancelling}
                            className="w-full bg-red-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-red-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isCancelling ? 'Cancelling...' : 'Cancel This Booking'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingDetails;


// import React, { useEffect, useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { AuthContext } from '../context/AuthContext';
// import { ArrowLeft, Car, Users, CalendarDays, CreditCard, MapPin, Clock } from 'lucide-react';

// const vehicleData = {
//   Mini: { name: "Indica, Swift", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Hatchback_2x.png" },
//   Sedan: { name: "Dzire, Etios", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png" },
//   SUV: { name: "Ertiga, Xylo", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" },
//   "SUV+": { name: "Innova Crysta", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" },
// };

// const BookingDetails = () => {
//   const { token } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/bookings?status=Confirmed`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (res.data.success) setBookings(res.data.bookings);
//       } catch (err) {
//         alert(err.response?.data?.message || "Failed to fetch bookings");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBookings();
//   }, [token]);

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case 'Confirmed': return 'bg-green-100 text-green-800';
//       case 'Cancelled': return 'bg-red-100 text-red-800';
//       case 'Completed': return 'bg-blue-100 text-blue-800';
//       default: return 'bg-yellow-100 text-yellow-800';
//     }
//   };

//   if (loading) return <div className="p-10 text-center text-gray-600">Loading...</div>;
//   if (!bookings.length) return <div className="p-10 text-center text-red-600">No confirmed bookings found</div>;

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex flex-col items-center">
//       {/* Back Button */}
//       <button
//         onClick={() => navigate(-1)}
//         className="flex items-center gap-2 text-blue-600 font-semibold mb-4 hover:text-blue-800 transition-colors"
//       >
//         <ArrowLeft size={20} /> Back
//       </button>

//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Confirmed Bookings</h1>

//       {/* List of Bookings */}
//       {bookings.map((booking) => {
//         const carType = booking.packageDetails.car || booking.packageDetails.fleet || booking.packageDetails.vehicleType;
//         const carInfo = vehicleData[carType] || vehicleData.Mini;

//         return (
//           <div key={booking._id} className="bg-white shadow-lg rounded-3xl w-full max-w-4xl p-6 mb-6">
//             <div className="flex items-center gap-4 mb-4">
//               <img src={carInfo.image} alt={carInfo.name} className="h-28 w-28 object-contain rounded-xl border"/>
//               <div className="flex-1">
//                 <h2 className="text-xl font-bold text-gray-800">
//                   {carInfo.name} <span className="text-gray-500 text-sm">or similar</span>
//                 </h2>
//                 <p className="text-gray-600 mt-1">{carType} • {booking.packageDetails.seater} Seater {booking.packageDetails.ac ? '• AC Available' : ''}</p>
//                 <p className="text-gray-600 mt-1"><MapPin size={16} className="inline"/> {booking.tripDetails.from} → {booking.tripDetails.to}</p>
//                 <p className="text-gray-600 mt-1"><Clock size={16} className="inline"/> Pickup: {booking.tripDetails.pickupDate} {booking.tripDetails.pickupTime}</p>
//                 {booking.tripDetails.dropDate && <p className="text-gray-600 mt-1"><Clock size={16} className="inline"/> Drop: {booking.tripDetails.dropDate} {booking.tripDetails.dropTime}</p>}
//                 <span className={`px-4 py-1 rounded-full font-medium mt-2 inline-block ${getStatusBadge(booking.status)}`}>
//                   {booking.status}
//                 </span>
//               </div>
//             </div>

//             {/* Table-style Booking Details */}
//             <div className="overflow-x-auto">
//               <table className="w-full text-left border-collapse">
//                 <tbody>
//                   <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
//                     <td className="p-4 font-medium">Traveller Name</td>
//                     <td className="p-4">{booking.travellerDetails.fullName}</td>
//                   </tr>
//                   <tr className="hover:bg-gray-100 transition-colors">
//                     <td className="p-4 font-medium">Gender</td>
//                     <td className="p-4">{booking.travellerDetails.gender || 'N/A'}</td>
//                   </tr>
//                   <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
//                     <td className="p-4 font-medium">Email</td>
//                     <td className="p-4">{booking.travellerDetails.email}</td>
//                   </tr>
//                   <tr className="hover:bg-gray-100 transition-colors">
//                     <td className="p-4 font-medium">Mobile</td>
//                     <td className="p-4">{booking.travellerDetails.mobile}</td>
//                   </tr>
//                   <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
//                     <td className="p-4 font-medium">Payment Option</td>
//                     <td className="p-4">{booking.paymentDetails.paymentOption}</td>
//                   </tr>
//                   <tr className="hover:bg-gray-100 transition-colors">
//                     <td className="p-4 font-medium">Amount Paid</td>
//                     <td className="p-4">₹{booking.paymentDetails.amountPaid}</td>
//                   </tr>
//                   {booking.packageDetails.advanceAmount && (
//                     <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
//                       <td className="p-4 font-medium">Advance Paid</td>
//                       <td className="p-4">₹{booking.packageDetails.advanceAmount}</td>
//                     </tr>
//                   )}
//                   {booking.packageDetails.extraKmRate && (
//                     <tr className="hover:bg-gray-100 transition-colors">
//                       <td className="p-4 font-medium">Extra Km Rate</td>
//                       <td className="p-4">₹{booking.packageDetails.extraKmRate}/km</td>
//                     </tr>
//                   )}
//                   {booking.packageDetails.extraHourRate && (
//                     <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
//                       <td className="p-4 font-medium">Extra Hour Rate</td>
//                       <td className="p-4">₹{booking.packageDetails.extraHourRate}/hr</td>
//                     </tr>
//                   )}
//                   {booking.packageDetails.nightAllowance && (
//                     <tr className="hover:bg-gray-100 transition-colors">
//                       <td className="p-4 font-medium">Night Allowance</td>
//                       <td className="p-4">₹{booking.packageDetails.nightAllowance}</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full">
//               <button
//                 onClick={() => navigate('/my-bookings')}
//                 className="flex-1 bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
//               >
//                 Back to My Bookings
//               </button>
//               {booking.status === "Confirmed" && (
//                 <button
//                   className="flex-1 bg-red-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-red-600 transition-colors"
//                 >
//                   Cancel Booking
//                 </button>
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default BookingDetails;





