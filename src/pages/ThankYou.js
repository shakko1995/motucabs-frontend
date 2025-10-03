import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Confetti from 'react-confetti';

const ThankYou = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking } = location.state || {};
  const [showContent, setShowContent] = useState(false);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    setShowContent(true);
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!booking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <h2 className="text-2xl font-bold text-red-600 mb-4 animate-pulse">Booking not found!</h2>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-md transform hover:scale-105"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 p-4 sm:p-8 text-center relative overflow-hidden">
      
      {/* Confetti */}
      {showContent && <Confetti width={dimensions.width} height={dimensions.height} recycle={false} numberOfPieces={200} gravity={0.2} />}

      {/* Confirmation Icon */}
      <div
        className={`bg-green-100 p-8 rounded-full shadow-lg mb-6 transform transition-transform duration-700 ${
          showContent ? 'scale-100 rotate-0' : 'scale-0 rotate-45'
        }`}
      >
        <CheckCircle size={80} className="text-green-600 animate-pulse" />
      </div>

      {/* Header */}
      <h1
        className={`text-3xl sm:text-4xl font-bold text-gray-900 mb-2 transition-opacity duration-1000 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Booking Confirmed!
      </h1>
      <p
        className={`text-gray-700 text-base sm:text-lg mb-8 transition-opacity delay-200 duration-1000 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Your ride has been successfully booked.
      </p>

      {/* Action Buttons */}
      <div
        className={`flex flex-col sm:flex-row gap-4 w-full max-w-xs transition-transform delay-400 duration-700 ${
          showContent ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
        }`}
      >
        <button
          onClick={() => navigate('/my-bookings')}
          className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 shadow-lg transition-all transform hover:scale-105"
        >
          My Bookings
        </button>
        <button
          onClick={() => navigate('/')}
          className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-300 shadow-md transition-all transform hover:scale-105"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default ThankYou;





// Booking Card 

//   <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg p-6 space-y-6 border border-gray-200">

//                 {/* Trip Summary */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-700">
//                     <div className="flex flex-col gap-1">
//                         <span className="font-semibold text-slate-800 flex items-center gap-2"><Car size={16} className="text-blue-500" /> Trip</span>
//                         <span className="text-lg font-medium">{booking.tripDetails.from} → {booking.tripDetails.to}</span>
//                     </div>
//                     <div className="flex flex-col gap-1">
//                         <span className="font-semibold text-slate-800 flex items-center gap-2"><CalendarDays size={16} className="text-orange-500" /> Dates</span>
//                         <span>{booking.tripDetails.pickupDate} {booking.tripDetails.pickupTime}</span>
//                         {booking.tripDetails.dropDate && <span>{booking.tripDetails.dropDate} {booking.tripDetails.dropTime}</span>}
//                     </div>
//                 </div>

//                 {/* Vehicle Info */}
//                 <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow-inner">
//                     <img src={carInfo.image} alt={carInfo.name} className="h-24 w-24 object-contain rounded-xl" />
//                     <div>
//                         <h2 className="text-lg font-bold text-slate-800">{carInfo.name} <span className="text-gray-500 text-sm">or similar</span></h2>
//                         <p className="text-slate-600 text-sm">{carType} • {booking.packageDetails.seater} Seater</p>
//                     </div>
//                 </div>

//                 {/* Traveller Info */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-700">
//                     <div className="bg-gray-50 p-3 rounded-xl shadow-sm">
//                         <span className="font-semibold text-slate-800 flex items-center gap-2"><Users size={16} className="text-green-500" /> Traveller</span>
//                         <p className="mt-1 font-medium">{booking.travellerDetails.fullName}</p>
//                     </div>
//                     <div className="bg-gray-50 p-3 rounded-xl shadow-sm">
//                         <span className="font-semibold text-slate-800 flex items-center gap-2"><CreditCard size={16} className="text-purple-500" /> Payment</span>
//                         <p className="mt-1 font-medium">{booking.paymentDetails.paymentOption} • ₹{totalFare}</p>
//                     </div>
//                 </div>

//                 {/* Fare Breakdown */}
//                 <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl shadow-md flex flex-col gap-2">
//                     <div className="flex justify-between items-center">
//                         <span className="text-slate-800 font-medium">Total Fare</span>
//                         <span className="font-bold text-purple-700 text-xl">₹{totalFare}</span>
//                     </div>
//                     {booking.packageDetails.advanceAmount && (
//                         <div className="flex justify-between text-sm text-slate-600">
//                             <span>Advance Paid</span>
//                             <span>₹{booking.packageDetails.advanceAmount}</span>
//                         </div>
//                     )}
//                 </div>

//             </div>
