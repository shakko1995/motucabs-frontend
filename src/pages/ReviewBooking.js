

// import React, { useState, useEffect, useContext } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext'; 
// import axios from 'axios';
// import { Car, Users, Snowflake, Check, Clock, Gauge, Moon, ArrowLeft, Droplets } from 'lucide-react';

// const vehicleData = {
//   Mini: { name: "Indica, Swift", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Hatchback_2x.png" },
//   Sedan: { name: "Dzire, Etios", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png" },
//   SUV: { name: "Ertiga, Xylo", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" },
//   "SUV+": { name: "Innova Crysta", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" },
// };

// const ReviewBooking = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { user, token } = useContext(AuthContext);
//     const { packageDetails, tripDetails } = location.state || {};
    
//     const [travellerDetails, setTravellerDetails] = useState({ fullName: '', gender: '', mobile: '', email: '' });
//     const [tripDuration, setTripDuration] = useState({ days: 0, hours: 0, minutes: 0 });
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [paymentOption, setPaymentOption] = useState('advance');

//     useEffect(() => {
//         if (user) {
//             setTravellerDetails({
//                 fullName: user.name || '',
//                 mobile: user.phone ? user.phone.replace('+91', '') : '',
//                 email: user.email || '',
//                 gender: ''
//             });
//         }
        
//         if (tripDetails?.pickupDate && tripDetails?.pickupTime && tripDetails?.dropDate && tripDetails?.dropTime) {
//             const startDate = new Date(`${tripDetails.pickupDate}T${tripDetails.pickupTime}`);
//             const endDate = new Date(`${tripDetails.dropDate}T${tripDetails.dropTime}`);
//             if (endDate > startDate) {
//                 let diffMs = endDate - startDate;
//                 const days = Math.floor(diffMs / 86400000);
//                 diffMs -= days * 86400000;
//                 const hours = Math.floor(diffMs / 3600000);
//                 diffMs -= hours * 3600000;
//                 const minutes = Math.floor(diffMs / 60000);
//                 setTripDuration({ days, hours, minutes });
//             }
//         }
//     }, [user, tripDetails]);

//     const handleTravellerChange = (e) => {
//         const { name, value } = e.target;
//         setTravellerDetails(prev => ({ ...prev, [name]: value }));
//     };

//     const handleBookingSubmit = async () => {
//         if (!travellerDetails.fullName || !travellerDetails.mobile || !travellerDetails.email) {
//             return alert("Please fill all traveller details.");
//         }
//         setIsSubmitting(true);
//         const bookingData = {
//             userId: user?._id,
//             tripDetails,
//             packageDetails,
//             travellerDetails,
//             paymentDetails: {
//                 totalFare: packageDetails.fare || packageDetails.packageRate,
//                 advanceAmount: packageDetails.advanceAmount || packageDetails.advance,
//                 paymentOption: paymentOption,
//                 amountPaid: paymentOption === 'advance' ? (packageDetails.advanceAmount || packageDetails.advance) : (packageDetails.fare || packageDetails.packageRate)
//             }
//         };

//         try {
//             const res = await axios.post('http://localhost:5000/api/bookings', bookingData, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             if (res.data.success) {
//                 alert(res.data.message);
//                 navigate('/');
//             }
//         } catch (err) {
//             alert(err.response?.data?.message || "Booking failed.");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     if (!packageDetails || !tripDetails) {
//         return (
//             <div className="text-center p-10">
//                 <h2 className="text-2xl font-bold">Oops! Something went wrong.</h2>
//                 <button onClick={() => navigate(-1)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Go Back</button>
//             </div>
//         );
//     }
    
//     const carType = packageDetails.car || packageDetails.fleet || packageDetails.vehicleType;
//     const carInfo = vehicleData[carType] || vehicleData.Mini;
//     const totalFare = packageDetails.fare || packageDetails.packageCost || packageDetails.packageRate;
//     const advanceAmount = packageDetails.advanceAmount || packageDetails.advance;
//     const extraKmRate = packageDetails.rates?.extraKmRate || packageDetails.extraKmRate;
//     const extraHourRate = packageDetails.rates?.extraHourRate || packageDetails.extraHourRate;
//     const nightAllowance = packageDetails.rates?.nightDrivingAllowance || packageDetails.nightDrivingAllowance;

//     return (
//         <div className="bg-slate-100 min-h-screen">
//             <div className="max-w-6xl mx-auto p-4 sm:p-8">
//                 <button onClick={() => navigate(-1)} className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors mb-4">
//                     <ArrowLeft size={16} className="mr-2"/>
//                     Back to Results
//                 </button>
//                 <h1 className="text-3xl font-bold text-slate-800 mb-6">Review Your Booking</h1>
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
//                     {/* Left Side */}
//                     <div className="lg:col-span-2 space-y-6">
//                         <div className="bg-white p-6 rounded-xl shadow-md">
//                            <p className="font-semibold text-lg text-blue-600">{tripDetails.tripType}</p>
//                            <h2 className="text-2xl font-bold text-slate-800">{tripDetails.from} → {tripDetails.to}</h2>
//                            <div className="mt-2 pt-2 border-t text-sm text-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-2">
//                                 <span><span className="font-semibold">Pickup:</span> {tripDetails.pickupDate} at {tripDetails.pickupTime}</span>
//                                 {tripDetails.dropDate && <span><span className="font-semibold">Return:</span> {tripDetails.dropDate} at {tripDetails.dropTime}</span>}
//                            </div>
//                            {(tripDuration.days > 0 || tripDuration.hours > 0) &&
//                             <div className="mt-2 pt-2 border-t flex items-center text-blue-600 font-bold">
//                                 <Clock size={18} className="mr-2"/>
//                                 <span>Total Trip Duration: {tripDuration.days} Day(s), {tripDuration.hours} Hour(s)</span>
//                             </div>
//                            }
//                         </div>

//                         <div className="bg-white p-6 rounded-xl shadow-md">
//                             <div className="flex items-center gap-4">
//                                 <img src={carInfo.image} alt={carInfo.name} className="h-24"/>
//                                 <div>
//                                     <h3 className="font-bold text-xl">{carInfo.name} <span className="text-sm text-gray-500">or similar</span></h3>
//                                     <div className="flex items-center flex-wrap gap-4 text-sm mt-2">
//                                         <span className="flex items-center"><Car size={16} className="mr-1.5"/>{carType}</span>
//                                         <span className="flex items-center"><Users size={16} className="mr-1.5"/>{packageDetails.seater} Seater</span>
//                                         {packageDetails.ac && <span className="flex items-center"><Snowflake size={16} className="mr-1.5"/>AC</span>}
//                                         {packageDetails.fuelType && <span className="flex items-center"><Droplets size={16} className="mr-1.5"/>{packageDetails.fuelType}</span>}
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="mt-4 pt-4 border-t">
//                                 <h4 className="font-bold text-lg mb-2">Inclusions & Extra Charges</h4>
//                                 <ul className="space-y-2 text-sm text-gray-700">
//                                     <li className="flex items-start"><Check size={18} className="text-green-500 mr-2 mt-0.5"/> <span>Driver Allowance, Tolls, and State Tax are included.</span></li>
                                    
//                                     {tripDetails.tripType === 'Rental' ? (
//                                         <li className="flex items-start"><Check size={18} className="text-green-500 mr-2 mt-0.5"/> <span>Package for {packageDetails.uptoHour} Hours with {packageDetails.uptoKm} km.</span></li>
//                                     ) : (
//                                         <li className="flex items-start"><Check size={18} className="text-green-500 mr-2 mt-0.5"/> <span>{packageDetails.includingKm} km included for {packageDetails.noOfDays} Day(s).</span></li>
//                                     )}
                                    
//                                     <li className="mt-4 pt-4 border-t border-dashed">
//                                         <h5 className="font-semibold text-gray-600 mb-2">Extra Charges (if applicable):</h5>
//                                         <ul className="list-disc list-inside text-xs text-slate-500 pl-2">
//                                             <li>Extra Distance: ₹{extraKmRate}/km</li>
//                                             <li>Extra Time: ₹{extraHourRate}/hr</li>
//                                             {nightAllowance > 0 && <li>Night Allowance: ₹{nightAllowance} (for driving between 11 PM - 6 AM)</li>}
//                                         </ul>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
                        
//                         <div className="bg-white p-6 rounded-xl shadow-md">
//                            <h3 className="font-bold text-lg mb-4">Traveller Details</h3>
//                              <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                 <input name="fullName" value={travellerDetails.fullName} onChange={handleTravellerChange} placeholder="Full Name" className="p-3 border rounded-md"/>
//                                 <select name="gender" value={travellerDetails.gender} onChange={handleTravellerChange} className="p-3 border rounded-md bg-white">
//                                     <option value="">Select Gender</option><option value="Male">Male</option><option value="Female">Female</option>
//                                 </select>
//                                 <input name="mobile" value={travellerDetails.mobile} onChange={handleTravellerChange} placeholder="Mobile No." className="p-3 border rounded-md"/>
//                                 <input name="email" type="email" value={travellerDetails.email} onChange={handleTravellerChange} placeholder="Email ID" className="p-3 border rounded-md"/>
//                              </form>
//                         </div>
//                     </div>

//                     {/* Right Side */}
//                     <div className="lg:col-span-1 space-y-6 sticky top-8">
//                          <div className="bg-white p-6 rounded-xl shadow-lg">
//                             <h3 className="font-bold text-xl mb-4">Payment Options</h3>
//                             <div className="space-y-3">
//                                <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentOption === 'advance' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}>
//                                   <div className="flex justify-between items-center">
//                                     <span className="font-semibold text-slate-800">Pay Advance</span>
//                                     <span className="font-bold text-lg text-slate-900">₹{advanceAmount}</span>
//                                   </div>
//                                   <p className="text-xs text-gray-500 mt-1">Pay the rest to the driver</p>
//                                   <input type="radio" name="payment" value="advance" checked={paymentOption === 'advance'} onChange={(e) => setPaymentOption(e.target.value)} className="hidden"/>
//                                </label>
//                                <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentOption === 'full' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}>
//                                   <div className="flex justify-between items-center">
//                                     <span className="font-semibold text-slate-800">Pay Full Amount</span>
//                                     <span className="font-bold text-lg text-slate-900">₹{totalFare}</span>
//                                   </div>
//                                   <input type="radio" name="payment" value="full" checked={paymentOption === 'full'} onChange={(e) => setPaymentOption(e.target.value)} className="hidden"/>
//                                </label>
//                             </div>
//                             <div className="mt-6">
//                                 <button onClick={handleBookingSubmit} disabled={isSubmitting} className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 disabled:bg-gray-400 text-lg">
//                                     {isSubmitting ? 'Processing...' : `PAY NOW (₹${paymentOption === 'advance' ? advanceAmount : totalFare})`}
//                                 </button>
//                             </div>
//                          </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default ReviewBooking;




// import React, { useState, useEffect, useContext } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext'; 
// import axios from 'axios';
// import { Car, Users, Snowflake, Check, Clock, Gauge, Moon, ArrowLeft, Droplets } from 'lucide-react';

// const vehicleData = {
//   Mini: { name: "Indica, Swift", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Hatchback_2x.png" },
//   Sedan: { name: "Dzire, Etios", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png" },
//   SUV: { name: "Ertiga, Xylo", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" },
//   "SUV+": { name: "Innova Crysta", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" },
// };

// const ReviewBooking = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { user, token } = useContext(AuthContext);
//     const { packageDetails, tripDetails } = location.state || {};
    
//     const [travellerDetails, setTravellerDetails] = useState({ fullName: '', gender: '', mobile: '', email: '' });
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [paymentOption, setPaymentOption] = useState('advance');

//     useEffect(() => {
//         if (user) {
//             setTravellerDetails({
//                 fullName: user.name || '',
//                 mobile: user.phone ? user.phone.replace('+91', '') : '',
//                 email: user.email || '',
//                 gender: ''
//             });
//         }
//     }, [user]);

//     const handleTravellerChange = (e) => {
//         const { name, value } = e.target;
//         setTravellerDetails(prev => ({ ...prev, [name]: value }));
//     };

//     const handleBookingSubmit = async () => {
//         if (!travellerDetails.fullName || !travellerDetails.mobile || !travellerDetails.email) {
//             return alert("Please fill all traveller details.");
//         }
//         setIsSubmitting(true);
//         const bookingData = {
//             userId: user?._id,
//             tripDetails,
//             packageDetails,
//             travellerDetails,
//             paymentDetails: {
//                 totalFare: packageDetails.fare || packageDetails.packageCost,
//                 advanceAmount: packageDetails.advanceAmount || packageDetails.advance,
//             }
//         };

//         try {
//             const res = await axios.post('http://localhost:5000/api/bookings', bookingData, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             if (res.data.success) {
//                 alert(res.data.message);
//                 navigate('/');
//             }
//         } catch (err) {
//             alert(err.response?.data?.message || "Booking failed.");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     if (!packageDetails || !tripDetails) {
//         return (
//             <div className="text-center p-10">
//                 <h2 className="text-2xl font-bold">Oops! Something went wrong.</h2>
//                 <button onClick={() => navigate(-1)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Go Back</button>
//             </div>
//         );
//     }
    
//     const carType = packageDetails.car || packageDetails.fleet || packageDetails.vehicleType;
//     const carInfo = vehicleData[carType] || vehicleData.Mini;
//     const totalFare = packageDetails.fare || packageDetails.packageCost || packageDetails.packageRate;
//     const advanceAmount = packageDetails.advanceAmount || packageDetails.advance;
    
//     // Safely get extra charge details for ANY package type
//     const extraKmRate = packageDetails.rates?.extraKmRate || packageDetails.extraKmRate || packageDetails.extraKmCharge;
//     const extraHourRate = packageDetails.rates?.extraHourRate || packageDetails.extraHourRate || packageDetails.waitingTimeCharge;
//     const nightAllowance = packageDetails.rates?.nightDrivingAllowance || packageDetails.nightDrivingAllowance || packageDetails.nightDrivingCharge;

//     return (
//         <div className="bg-slate-100 min-h-screen">
//             <div className="max-w-6xl mx-auto p-4 sm:p-8">
//                 <button onClick={() => navigate(-1)} className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors mb-4">
//                     <ArrowLeft size={16} className="mr-2"/>
//                     Back to Results
//                 </button>
//                 <h1 className="text-3xl font-bold text-slate-800 mb-6">Review Your Booking</h1>
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
//                     {/* Left Side */}
//                     <div className="lg:col-span-2 space-y-6">
//                         {/* Trip Details Card */}
//                         <div className="bg-white p-6 rounded-xl shadow-md">
//                            <p className="font-semibold text-lg text-blue-600">{tripDetails.tripType}</p>
//                            <h2 className="text-2xl font-bold text-slate-800">{tripDetails.from} → {tripDetails.to}</h2>
//                            <div className="mt-2 pt-2 border-t text-sm text-slate-700">
//                                 <span className="font-semibold">Pickup:</span> {tripDetails.pickupDate} at {tripDetails.pickupTime}
//                            </div>
//                         </div>

//                         {/* Car & Package Details Card */}
//                         <div className="bg-white p-6 rounded-xl shadow-md">
//                             <div className="flex items-center gap-4">
//                                 <img src={carInfo.image} alt={carInfo.name} className="h-24"/>
//                                 <div>
//                                     <h3 className="font-bold text-xl">{carInfo.name} <span className="text-sm text-gray-500">or similar</span></h3>
//                                     <div className="flex items-center flex-wrap gap-4 text-sm mt-2">
//                                         <span className="flex items-center"><Car size={16} className="mr-1.5"/>{carType}</span>
//                                         <span className="flex items-center"><Users size={16} className="mr-1.5"/>{packageDetails.seater} Seater</span>
//                                         {packageDetails.ac && <span className="flex items-center"><Snowflake size={16} className="mr-1.5"/>AC</span>}
//                                         {packageDetails.fuelType && <span className="flex items-center"><Droplets size={16} className="mr-1.5"/>{packageDetails.fuelType}</span>}
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="mt-4 pt-4 border-t">
//                                 <h4 className="font-bold text-lg mb-2">Inclusions & Extra Charges</h4>
//                                 <ul className="space-y-2 text-sm text-gray-700">
//                                     <li className="flex items-start"><Check size={18} className="text-green-500 mr-2 mt-0.5"/> <span>Driver Allowance, Tolls, and State Tax are included.</span></li>
                                    
//                                     {packageDetails.includingKm && <li className="flex items-start"><Check size={18} className="text-green-500 mr-2 mt-0.5"/> <span>{packageDetails.includingKm} km included.</span></li>}
//                                     {packageDetails.uptoHour && <li className="flex items-start"><Check size={18} className="text-green-500 mr-2 mt-0.5"/> <span>Package for {packageDetails.uptoHour} Hours with {packageDetails.uptoKm} km.</span></li>}
//                                     {packageDetails.packageKm && <li className="flex items-start"><Check size={18} className="text-green-500 mr-2 mt-0.5"/> <span>Airport package includes {packageDetails.packageKm} km.</span></li>}
                                    
//                                     <li className="mt-4 pt-4 border-t border-dashed">
//                                         <h5 className="font-semibold text-gray-600 mb-2">Extra Charges (if applicable):</h5>
//                                         <ul className="list-disc list-inside text-xs text-slate-500 pl-2">
//                                             {extraKmRate && <li>Extra Distance: ₹{extraKmRate}/km</li>}
//                                             {extraHourRate && <li>Extra Time / Waiting: ₹{extraHourRate}/hr</li>}
//                                             {nightAllowance > 0 && <li>Night Allowance: ₹{nightAllowance} (for driving between 11 PM - 6 AM)</li>}
//                                         </ul>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
                        
//                         {/* Traveller Details Card */}
//                         <div className="bg-white p-6 rounded-xl shadow-md">
//                            <h3 className="font-bold text-lg mb-4">Traveller Details</h3>
//                              <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                 <input name="fullName" value={travellerDetails.fullName} onChange={handleTravellerChange} placeholder="Full Name" className="p-3 border rounded-md"/>
//                                 <select name="gender" value={travellerDetails.gender} onChange={handleTravellerChange} className="p-3 border rounded-md bg-white">
//                                     <option value="">Select Gender</option><option value="Male">Male</option><option value="Female">Female</option>
//                                 </select>
//                                 <input name="mobile" value={travellerDetails.mobile} onChange={handleTravellerChange} placeholder="Mobile No." className="p-3 border rounded-md"/>
//                                 <input name="email" type="email" value={travellerDetails.email} onChange={handleTravellerChange} placeholder="Email ID" className="p-3 border rounded-md"/>
//                              </form>
//                         </div>
//                     </div>

//                     {/* Right Side */}
//                     <div className="lg:col-span-1 space-y-6 sticky top-8">
//                          <div className="bg-white p-6 rounded-xl shadow-lg">
//                             <h3 className="font-bold text-xl mb-4">Payment Options</h3>
//                             <div className="space-y-3">
//                                <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentOption === 'advance' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}>
//                                   <div className="flex justify-between items-center">
//                                     <span className="font-semibold text-slate-800">Pay Advance</span>
//                                     <span className="font-bold text-lg text-slate-900">₹{advanceAmount}</span>
//                                   </div>
//                                   <p className="text-xs text-gray-500 mt-1">Pay the rest to the driver</p>
//                                   <input type="radio" name="payment" value="advance" checked={paymentOption === 'advance'} onChange={(e) => setPaymentOption(e.target.value)} className="hidden"/>
//                                </label>
//                                <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentOption === 'full' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}>
//                                   <div className="flex justify-between items-center">
//                                     <span className="font-semibold text-slate-800">Pay Full Amount</span>
//                                     <span className="font-bold text-lg text-slate-900">₹{totalFare}</span>
//                                   </div>
//                                   <input type="radio" name="payment" value="full" checked={paymentOption === 'full'} onChange={(e) => setPaymentOption(e.target.value)} className="hidden"/>
//                                </label>
//                             </div>
//                             <div className="mt-6">
//                                 <button onClick={handleBookingSubmit} disabled={isSubmitting} className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 disabled:bg-gray-400 text-lg">
//                                     {isSubmitting ? 'Processing...' : `PAY NOW (₹${paymentOption === 'advance' ? advanceAmount : totalFare})`}
//                                 </button>
//                             </div>
//                          </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default ReviewBooking;

// import React, { useState, useEffect, useContext } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext'; 
// import axios from 'axios';
// import { Car, Users, Snowflake, Check, Clock, Gauge, Moon, ArrowLeft, Droplets } from 'lucide-react';

// const vehicleData = {
//   Mini: { name: "Indica, Swift", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Hatchback_2x.png" },
//   Sedan: { name: "Dzire, Etios", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png" },
//   SUV: { name: "Ertiga, Xylo", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" },
//   "SUV+": { name: "Innova Crysta", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" },
// };

// const ReviewBooking = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { user, token } = useContext(AuthContext);
//     const { packageDetails, tripDetails } = location.state || {};
    
//     const [travellerDetails, setTravellerDetails] = useState({ fullName: '', gender: '', mobile: '', email: '' });
//     const [tripDuration, setTripDuration] = useState({ days: 0, hours: 0, minutes: 0 });
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [paymentOption, setPaymentOption] = useState('advance');

//     useEffect(() => {
//         if (user) {
//             setTravellerDetails({
//                 fullName: user.name || '',
//                 mobile: user.phone ? user.phone.replace('+91', '') : '',
//                 email: user.email || '',
//                 gender: ''
//             });
//         }
        
//         if (tripDetails?.pickupDate && tripDetails?.pickupTime && tripDetails?.dropDate && tripDetails?.dropTime) {
//             const startDate = new Date(`${tripDetails.pickupDate}T${tripDetails.pickupTime}`);
//             const endDate = new Date(`${tripDetails.dropDate}T${tripDetails.dropTime}`);
//             if (endDate > startDate) {
//                 let diffMs = endDate - startDate;
//                 const days = Math.floor(diffMs / 86400000);
//                 diffMs -= days * 86400000;
//                 const hours = Math.floor(diffMs / 3600000);
//                 diffMs -= hours * 3600000;
//                 const minutes = Math.floor(diffMs / 60000);
//                 setTripDuration({ days, hours, minutes });
//             }
//         }
//     }, [user, tripDetails]);

//     const handleTravellerChange = (e) => {
//         const { name, value } = e.target;
//         setTravellerDetails(prev => ({ ...prev, [name]: value }));
//     };

//     const handleBookingSubmit = async () => {
//         if (!travellerDetails.fullName || !travellerDetails.mobile || !travellerDetails.email) {
//             return alert("Please fill all traveller details.");
//         }
//         setIsSubmitting(true);
//         const bookingData = {
//             userId: user?._id,
//             tripDetails,
//             packageDetails,
//             travellerDetails,
//             paymentDetails: {
//                 totalFare: packageDetails.fare || packageDetails.packageCost || packageDetails.packageRate,
//                 advanceAmount: packageDetails.advanceAmount || packageDetails.advance,
//                 paymentOption: paymentOption,
//                 amountPaid: paymentOption === 'advance' ? (packageDetails.advanceAmount || packageDetails.advance) : (packageDetails.fare || packageDetails.packageRate)
//             }
//         };

//         try {
//             const res = await axios.post('http://localhost:5000/api/bookings', bookingData, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             if (res.data.success) {
//                 alert(res.data.message);
//                 navigate('/');
//             }
//         } catch (err) {
//             alert(err.response?.data?.message || "Booking failed.");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     if (!packageDetails || !tripDetails) {
//         return (
//             <div className="text-center p-10">
//                 <h2 className="text-2xl font-bold">Oops! Something went wrong.</h2>
//                 <button onClick={() => navigate(-1)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Go Back</button>
//             </div>
//         );
//     }
    
//     const carType = packageDetails.car || packageDetails.fleet || packageDetails.vehicleType;
//     const carInfo = vehicleData[carType] || vehicleData.Mini;
//     const totalFare = packageDetails.fare || packageDetails.packageCost || packageDetails.packageRate;
//     const advanceAmount = packageDetails.advanceAmount || packageDetails.advance;
//     const extraKmRate = packageDetails.rates?.extraKmRate || packageDetails.extraKmRate || packageDetails.extraKmCharge;
//     const extraHourRate = packageDetails.rates?.extraHourRate || packageDetails.extraHourRate || packageDetails.waitingTimeCharge;
//     const nightAllowance = packageDetails.rates?.nightDrivingAllowance || packageDetails.nightDrivingAllowance || packageDetails.nightDrivingCharge;

//     return (
//         <div className="bg-slate-100 min-h-screen">
//             <div className="max-w-6xl mx-auto p-4 sm:p-8">
//                 <button onClick={() => navigate(-1)} className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors mb-4">
//                     <ArrowLeft size={16} className="mr-2"/>
//                     Back to Results
//                 </button>
//                 <h1 className="text-3xl font-bold text-slate-800 mb-6">Review Your Booking</h1>
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
//                     <div className="lg:col-span-2 space-y-6">
//                         <div className="bg-white p-6 rounded-xl shadow-md">
//                            <p className="font-semibold text-lg text-blue-600">{tripDetails.tripType}</p>
//                            <h2 className="text-2xl font-bold text-slate-800">{tripDetails.from} → {tripDetails.to}</h2>
//                            <div className="mt-2 pt-2 border-t text-sm text-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-2">
//                                 <span><span className="font-semibold">Pickup:</span> {tripDetails.pickupDate} at {tripDetails.pickupTime}</span>
//                                 {tripDetails.dropDate && <span><span className="font-semibold">Return:</span> {tripDetails.dropDate} at {tripDetails.dropTime}</span>}
//                            </div>
//                            {(tripDuration.days > 0 || tripDuration.hours > 0) && (
//                             <div className="mt-2 pt-2 border-t flex items-center text-blue-600 font-bold">
//                                 <Clock size={18} className="mr-2"/>
//                                 <span>Total Trip Duration: {tripDuration.days} Day(s), {tripDuration.hours} Hour(s)</span>
//                             </div>
//                            )}
//                         </div>

//                         <div className="bg-white p-6 rounded-xl shadow-md">
//                             <div className="flex items-center gap-4">
//                                 <img src={carInfo.image} alt={carInfo.name} className="h-24"/>
//                                 <div>
//                                     <h3 className="font-bold text-xl">{carInfo.name} <span className="text-sm text-gray-500">or similar</span></h3>
//                                     <div className="flex items-center flex-wrap gap-4 text-sm mt-2">
//                                         <span className="flex items-center"><Car size={16} className="mr-1.5"/>{carType}</span>
//                                         <span className="flex items-center"><Users size={16} className="mr-1.5"/>{packageDetails.seater} Seater</span>
//                                         {packageDetails.ac && <span className="flex items-center"><Snowflake size={16} className="mr-1.5"/>AC</span>}
//                                         {packageDetails.fuelType && <span className="flex items-center"><Droplets size={16} className="mr-1.5"/>{packageDetails.fuelType}</span>}
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="mt-4 pt-4 border-t">
//                                 <h4 className="font-bold text-lg mb-2">Inclusions & Extra Charges</h4>
//                                 <ul className="space-y-2 text-sm text-gray-700">
//                                     <li className="flex items-start"><Check size={18} className="text-green-500 mr-2 mt-0.5"/> <span>Driver Allowance, Tolls, and State Tax are included.</span></li>
                                    
//                                     {tripDetails.tripType === 'Rental' && packageDetails.uptoHour &&
//                                         <li className="flex items-start"><Check size={18} className="text-green-500 mr-2 mt-0.5"/> <span>Package for **{packageDetails.uptoHour} Hours** with **{packageDetails.uptoKm} km**.</span></li>
//                                     }
//                                     {tripDetails.tripType !== 'Rental' && packageDetails.includingKm &&
//                                         <li className="flex items-start"><Check size={18} className="text-green-500 mr-2 mt-0.5"/> <span>**{packageDetails.includingKm} km** included.</span></li>
//                                     }
                                    
//                                     <li className="mt-4 pt-4 border-t border-dashed">
//                                         <h5 className="font-semibold text-gray-600 mb-2">Extra Charges (if applicable):</h5>
//                                         <ul className="list-disc list-inside text-xs text-slate-500 pl-2">
//                                             {extraKmRate && <li>Extra Distance: ₹{extraKmRate}/km</li>}
//                                             {extraHourRate && <li>Extra Time / Waiting: ₹{extraHourRate}/hr</li>}
//                                             {nightAllowance > 0 && <li>Night Allowance: ₹{nightAllowance} (11 PM - 6 AM)</li>}
//                                         </ul>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
                        
//                         <div className="bg-white p-6 rounded-xl shadow-md">
//                            <h3 className="font-bold text-lg mb-4">Traveller Details</h3>
//                              <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                 <input name="fullName" value={travellerDetails.fullName} onChange={handleTravellerChange} placeholder="Full Name" className="p-3 border rounded-md"/>
//                                 <select name="gender" value={travellerDetails.gender} onChange={handleTravellerChange} className="p-3 border rounded-md bg-white">
//                                     <option value="">Select Gender</option><option value="Male">Male</option><option value="Female">Female</option>
//                                 </select>
//                                 <input name="mobile" value={travellerDetails.mobile} onChange={handleTravellerChange} placeholder="Mobile No." className="p-3 border rounded-md"/>
//                                 <input name="email" type="email" value={travellerDetails.email} onChange={handleTravellerChange} placeholder="Email ID" className="p-3 border rounded-md"/>
//                              </form>
//                         </div>
//                     </div>

//                     <div className="lg:col-span-1 space-y-6 sticky top-8">
//                          <div className="bg-white p-6 rounded-xl shadow-lg">
//                             <h3 className="font-bold text-xl mb-4">Payment Options</h3>
//                             <div className="space-y-3">
//                                <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentOption === 'advance' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}>
//                                   <div className="flex justify-between items-center">
//                                     <span className="font-semibold text-slate-800">Pay Advance</span>
//                                     <span className="font-bold text-lg text-slate-900">₹{advanceAmount}</span>
//                                   </div>
//                                   <p className="text-xs text-gray-500 mt-1">Pay the rest to the driver</p>
//                                   <input type="radio" name="payment" value="advance" checked={paymentOption === 'advance'} onChange={(e) => setPaymentOption(e.target.value)} className="hidden"/>
//                                </label>
//                                <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentOption === 'full' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}>
//                                   <div className="flex justify-between items-center">
//                                     <span className="font-semibold text-slate-800">Pay Full Amount</span>
//                                     <span className="font-bold text-lg text-slate-900">₹{totalFare}</span>
//                                   </div>
//                                   <input type="radio" name="payment" value="full" checked={paymentOption === 'full'} onChange={(e) => setPaymentOption(e.target.value)} className="hidden"/>
//                                </label>
//                             </div>
//                             <div className="mt-6">
//                                 <button onClick={handleBookingSubmit} disabled={isSubmitting} className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 disabled:bg-gray-400 text-lg">
//                                     {isSubmitting ? 'Processing...' : `PAY NOW (₹${paymentOption === 'advance' ? advanceAmount : totalFare})`}
//                                 </button>
//                             </div>
//                          </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default ReviewBooking;


// import React, { useState, useEffect, useContext } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext'; 
// import axios from 'axios';
// import { Car, Users, Snowflake, Check, Clock, Gauge, Moon, ArrowLeft, Droplets } from 'lucide-react';

// const vehicleData = {
//   Mini: { name: "Indica, Swift", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Hatchback_2x.png" },
//   Sedan: { name: "Dzire, Etios", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png" },
//   SUV: { name: "Ertiga, Xylo", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" },
//   "SUV+": { name: "Innova Crysta", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" },
// };

// const ReviewBooking = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { user, token } = useContext(AuthContext);
//     const { packageDetails, tripDetails } = location.state || {};
    
//     const [travellerDetails, setTravellerDetails] = useState({ fullName: '', gender: '', mobile: '', email: '' });
//     const [tripDuration, setTripDuration] = useState({ days: 0, hours: 0, minutes: 0 });
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [paymentOption, setPaymentOption] = useState('advance');

//     useEffect(() => {
//         if (user) {
//             setTravellerDetails({
//                 fullName: user.name || '',
//                 mobile: user.phone ? user.phone.replace('+91', '') : '',
//                 email: user.email || '',
//                 gender: ''
//             });
//         }
        
//         if (tripDetails?.pickupDate && tripDetails?.pickupTime && tripDetails?.dropDate && tripDetails?.dropTime) {
//             const startDate = new Date(`${tripDetails.pickupDate}T${tripDetails.pickupTime}`);
//             const endDate = new Date(`${tripDetails.dropDate}T${tripDetails.dropTime}`);
//             if (endDate > startDate) {
//                 let diffMs = endDate - startDate;
//                 const days = Math.floor(diffMs / 86400000);
//                 diffMs -= days * 86400000;
//                 const hours = Math.floor(diffMs / 3600000);
//                 diffMs -= hours * 3600000;
//                 const minutes = Math.floor(diffMs / 60000);
//                 setTripDuration({ days, hours, minutes });
//             }
//         }
//     }, [user, tripDetails]);

//     const handleTravellerChange = (e) => {
//         const { name, value } = e.target;
//         setTravellerDetails(prev => ({ ...prev, [name]: value }));
//     };

//     const handleBookingSubmit = async () => {
//         if (!travellerDetails.fullName || !travellerDetails.mobile || !travellerDetails.email) {
//             return alert("Please fill all traveller details.");
//         }
//         setIsSubmitting(true);
//         const bookingData = {
//             userId: user?._id,
//             tripDetails,
//             packageDetails,
//             travellerDetails,
//             paymentDetails: {
//                 totalFare: packageDetails.fare || packageDetails.packageCost || packageDetails.packageRate,
//                 advanceAmount: packageDetails.advanceAmount || packageDetails.advance,
//                 paymentOption: paymentOption,
//                 amountPaid: paymentOption === 'advance' ? (packageDetails.advanceAmount || packageDetails.advance) : (packageDetails.fare || packageDetails.packageCost || packageDetails.packageRate)
//             }
//         };

//         try {
//             const res = await axios.post('http://localhost:5000/api/bookings', bookingData, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             if (res.data.success) {
//                 alert(res.data.message);
//                 navigate('/');
//             }
//         } catch (err) {
//             alert(err.response?.data?.message || "Booking failed.");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     if (!packageDetails || !tripDetails) {
//         return (
//             <div className="text-center p-10">
//                 <h2 className="text-2xl font-bold">Oops! Something went wrong.</h2>
//                 <button onClick={() => navigate(-1)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Go Back</button>
//             </div>
//         );
//     }
    
//     // Smartly get data regardless of package type
//     const carType = packageDetails.car || packageDetails.fleet || packageDetails.vehicleType;
//     const carInfo = vehicleData[carType] || vehicleData.Mini;
//     const totalFare = packageDetails.fare || packageDetails.packageCost || packageDetails.packageRate;
//     const advanceAmount = packageDetails.advanceAmount || packageDetails.advance;
//     const extraKmRate = packageDetails.rates?.extraKmRate || packageDetails.extraKmRate || packageDetails.extraKmCharge;
//     const extraHourRate = packageDetails.rates?.extraHourRate || packageDetails.extraHourRate || packageDetails.waitingTimeCharge;
//     const nightAllowance = packageDetails.rates?.nightDrivingAllowance || packageDetails.nightDrivingAllowance || packageDetails.nightDrivingCharge;
//     const paymentType = packageDetails.paymentOptions || 'Both'; 

//     return (
//         <div className="bg-slate-100 min-h-screen">
//             <div className="max-w-6xl mx-auto p-4 sm:p-8">
//                 <button onClick={() => navigate(-1)} className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors mb-4">
//                     <ArrowLeft size={16} className="mr-2"/>
//                     Back to Results
//                 </button>
//                 <h1 className="text-3xl font-bold text-slate-800 mb-6">Review Your Booking</h1>
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
//                     <div className="lg:col-span-2 space-y-6">
//                         <div className="bg-white p-6 rounded-xl shadow-md">
//                            <p className="font-semibold text-lg text-blue-600">{tripDetails.tripType}</p>
//                            <h2 className="text-2xl font-bold text-slate-800">{tripDetails.from} → {tripDetails.to}</h2>
//                            <div className="mt-2 pt-2 border-t text-sm text-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-2">
//                                 <span><span className="font-semibold">Pickup:</span> {tripDetails.pickupDate} at {tripDetails.pickupTime}</span>
//                                 {tripDetails.dropDate && <span><span className="font-semibold">Return:</span> {tripDetails.dropDate} at {tripDetails.dropTime}</span>}
//                            </div>
//                            {(tripDuration.days > 0 || tripDuration.hours > 0) && (
//                             <div className="mt-2 pt-2 border-t flex items-center text-blue-600 font-bold">
//                                 <Clock size={18} className="mr-2"/>
//                                 <span>Total Trip Duration: {tripDuration.days} Day(s), {tripDuration.hours} Hour(s)</span>
//                             </div>
//                            )}
//                         </div>

//                         <div className="bg-white p-6 rounded-xl shadow-md">
//                             <div className="flex items-center gap-4">
//                                 <img src={carInfo.image} alt={carInfo.name} className="h-24"/>
//                                 <div>
//                                     <h3 className="font-bold text-xl">{carInfo.name} <span className="text-sm text-gray-500">or similar</span></h3>
//                                     <div className="flex items-center flex-wrap gap-4 text-sm mt-2">
//                                         <span className="flex items-center"><Car size={16} className="mr-1.5"/>{carType}</span>
//                                         <span className="flex items-center"><Users size={16} className="mr-1.5"/>{packageDetails.seater} Seater</span>
//                                         {packageDetails.ac && <span className="flex items-center"><Snowflake size={16} className="mr-1.5"/>AC</span>}
//                                         {packageDetails.fuelType && <span className="flex items-center"><Droplets size={16} className="mr-1.5"/>{packageDetails.fuelType}</span>}
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="mt-4 pt-4 border-t">
//                                 <h4 className="font-bold text-lg mb-2">Inclusions & Extra Charges</h4>
//                                 <ul className="space-y-2 text-sm text-gray-700">
//                                     <li className="flex items-start"><Check size={18} className="text-green-500 mr-2 mt-0.5"/> <span>Driver Allowance, Tolls, and State Tax are included.</span></li>
                                    
//                                     {tripDetails.tripType === 'Rental' && packageDetails.uptoHour &&
//                                         <li className="flex items-start"><Check size={18} className="text-green-500 mr-2 mt-0.5"/> <span>Package for **{packageDetails.uptoHour} Hours** with **{packageDetails.uptoKm} km**.</span></li>
//                                     }
//                                     {(tripDetails.tripType.includes('Outstation') || tripDetails.tripType.includes('Airport')) && (packageDetails.includingKm || packageDetails.packageKm) &&
//                                         <li className="flex items-start"><Check size={18} className="text-green-500 mr-2 mt-0.5"/> <span>**{packageDetails.includingKm || packageDetails.packageKm} km** included.</span></li>
//                                     }
                                    
//                                     <li className="mt-4 pt-4 border-t border-dashed">
//                                         <h5 className="font-semibold text-gray-600 mb-2">Extra Charges (if applicable):</h5>
//                                         <ul className="list-disc list-inside text-xs text-slate-500 pl-2">
//                                             {extraKmRate && <li>Extra Distance: ₹{extraKmRate}/km</li>}
//                                             {extraHourRate && <li>Extra Time / Waiting: ₹{extraHourRate}/hr</li>}
//                                             {nightAllowance > 0 && <li>Night Allowance: ₹{nightAllowance} (11 PM - 6 AM)</li>}
//                                         </ul>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
                        
//                         <div className="bg-white p-6 rounded-xl shadow-md">
//                            <h3 className="font-bold text-lg mb-4">Traveller Details</h3>
//                              <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                 <input name="fullName" value={travellerDetails.fullName} onChange={handleTravellerChange} placeholder="Full Name" className="p-3 border rounded-md"/>
//                                 <select name="gender" value={travellerDetails.gender} onChange={handleTravellerChange} className="p-3 border rounded-md bg-white">
//                                     <option value="">Select Gender</option><option value="Male">Male</option><option value="Female">Female</option>
//                                 </select>
//                                 <input name="mobile" value={travellerDetails.mobile} onChange={handleTravellerChange} placeholder="Mobile No." className="p-3 border rounded-md"/>
//                                 <input name="email" type="email" value={travellerDetails.email} onChange={handleTravellerChange} placeholder="Email ID" className="p-3 border rounded-md"/>
//                              </form>
//                         </div>
//                     </div>

//                     <div className="lg:col-span-1 space-y-6 sticky top-8">
//                          <div className="bg-white p-6 rounded-xl shadow-lg">
//                             <h3 className="font-bold text-xl mb-4">Payment Options</h3>
//                             <div className="space-y-3">
//                                {(paymentType === 'Both' || paymentType === 'AdvanceOnly') && (
//                                    <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentOption === 'advance' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}>
//                                       <div className="flex justify-between items-center">
//                                         <span className="font-semibold text-slate-800">Pay Advance</span>
//                                         <span className="font-bold text-lg text-slate-900">₹{advanceAmount}</span>
//                                       </div>
//                                       <p className="text-xs text-gray-500 mt-1">Pay the rest to the driver</p>
//                                       <input type="radio" name="payment" value="advance" checked={paymentOption === 'advance'} onChange={(e) => setPaymentOption(e.target.value)} className="hidden"/>
//                                    </label>
//                                )}
//                                {(paymentType === 'Both' || paymentType === 'FullOnly') && (
//                                    <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentOption === 'full' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}>
//                                       <div className="flex justify-between items-center">
//                                         <span className="font-semibold text-slate-800">Pay Full Amount</span>
//                                         <span className="font-bold text-lg text-slate-900">₹{totalFare}</span>
//                                       </div>
//                                       <input type="radio" name="payment" value="full" checked={paymentOption === 'full'} onChange={(e) => setPaymentOption(e.target.value)} className="hidden"/>
//                                    </label>
//                                )}
//                             </div>
//                             <div className="mt-6">
//                                 <button onClick={handleBookingSubmit} disabled={isSubmitting} className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 disabled:bg-gray-400 text-lg">
//                                     {isSubmitting ? 'Processing...' : `PAY NOW (₹${paymentOption === 'advance' ? advanceAmount : totalFare})`}
//                                 </button>
//                             </div>
//                          </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default ReviewBooking;




// import React, { useState, useEffect, useContext } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext'; 
// import axios from 'axios';
// import { Car, Users, Snowflake, Check, Clock, Gauge, Moon, ArrowLeft, Droplets } from 'lucide-react';

// const vehicleData = {
//   Mini: { name: "Indica, Swift", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Hatchback_2x.png" },
//   Sedan: { name: "Dzire, Etios", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png" },
//   SUV: { name: "Ertiga, Xylo", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" },
//   "SUV+": { name: "Innova Crysta", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" },
// };

// const ReviewBooking = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { user, token } = useContext(AuthContext);
//     const { packageDetails, tripDetails } = location.state || {};
    
//     const [travellerDetails, setTravellerDetails] = useState({ fullName: '', gender: '', mobile: '', email: '' });
//     const [tripDuration, setTripDuration] = useState({ days: 0, hours: 0, minutes: 0 });
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [paymentOption, setPaymentOption] = useState('advance');

//     useEffect(() => {
//         if (user) {
//             setTravellerDetails({
//                 fullName: user.name || '',
//                 mobile: user.phone ? user.phone.replace('+91', '') : '',
//                 email: user.email || '',
//                 gender: ''
//             });
//         }
        
//         if (tripDetails?.pickupDate && tripDetails?.pickupTime && tripDetails?.dropDate && tripDetails?.dropTime) {
//             const startDate = new Date(`${tripDetails.pickupDate}T${tripDetails.pickupTime}`);
//             const endDate = new Date(`${tripDetails.dropDate}T${tripDetails.dropTime}`);
//             if (endDate > startDate) {
//                 let diffMs = endDate - startDate;
//                 const days = Math.floor(diffMs / 86400000);
//                 diffMs -= days * 86400000;
//                 const hours = Math.floor(diffMs / 3600000);
//                 setTripDuration({ days, hours, minutes: 0 });
                

//             }
//         }
//     }, [user, tripDetails]);

//     const handleTravellerChange = (e) => {
//         const { name, value } = e.target;
//         setTravellerDetails(prev => ({ ...prev, [name]: value }));
//     };

//     const handleBookingSubmit = async () => {
//         if (!travellerDetails.fullName || !travellerDetails.mobile || !travellerDetails.email) {
//             return alert("Please fill all traveller details.");
//         }
//         setIsSubmitting(true);
//         const bookingData = {
//             userId: user?._id,
//             tripDetails,
//             packageDetails,
//             travellerDetails,
//             paymentDetails: {
//                 totalFare: packageDetails.fare || packageDetails.packageRate,
//                 advanceAmount: packageDetails.advanceAmount || packageDetails.advance,
//                 paymentOption: paymentOption,
//                 amountPaid: paymentOption === 'advance' ? (packageDetails.advanceAmount || packageDetails.advance) : (packageDetails.fare || packageDetails.packageRate)
//             }
//         };

//         try {
//             const res = await axios.post('http://localhost:5000/api/bookings', bookingData, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             if (res.data.success) {
//                 alert(res.data.message);
//                 navigate('/');
//             }
//         } catch (err) {
//             alert(err.response?.data?.message || "Booking failed.");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     if (!packageDetails || !tripDetails) {
//         return (
//             <div className="text-center p-10">
//                 <h2 className="text-2xl font-bold">Oops! Something went wrong.</h2>
//                 <button onClick={() => navigate(-1)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Go Back</button>
//             </div>
//         );
//     }
    
//     const carType = packageDetails.car || packageDetails.fleet || packageDetails.vehicleType;
//     const carInfo = vehicleData[carType] || vehicleData.Mini;
//     const totalFare = packageDetails.fare || packageDetails.packageCost || packageDetails.packageRate;
//     const advanceAmount = packageDetails.advanceAmount || packageDetails.advance;
//     const extraKmRate = packageDetails.rates?.extraKmRate || packageDetails.extraKmRate || packageDetails.extraKmCharge;
//     const extraHourRate = packageDetails.rates?.extraHourRate || packageDetails.extraHourRate || packageDetails.waitingTimeCharge;
//     const nightAllowance = packageDetails.rates?.nightDrivingAllowance || packageDetails.nightDrivingAllowance || packageDetails.nightDrivingCharge;

//     return (
//         <div className="bg-slate-100 min-h-screen">
//             <div className="max-w-6xl mx-auto p-4 sm:p-8">
//                 <button onClick={() => navigate(-1)} className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors mb-4">
//                     <ArrowLeft size={16} className="mr-2"/>
//                     Back to Results
//                 </button>
//                 <h1 className="text-3xl font-bold text-slate-800 mb-6">Review Your Booking</h1>
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
//                     <div className="lg:col-span-2 space-y-6">
//                         <div className="bg-white p-6 rounded-xl shadow-md">
//                            <p className="font-semibold text-lg text-blue-600">{tripDetails.tripType}</p>
//                            <h2 className="text-2xl font-bold text-slate-800">{tripDetails.from} → {tripDetails.to}</h2>
//                            <div className="mt-2 pt-2 border-t text-sm text-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-2">
//                                 <span><span className="font-semibold">Pickup:</span> {tripDetails.pickupDate} at {tripDetails.pickupTime}</span>
//                                 {tripDetails.dropDate && <span><span className="font-semibold">Return:</span> {tripDetails.dropDate} at {tripDetails.dropTime}</span>}
//                            </div>
//                            {(tripDetails.tripType !== 'Rental' && (tripDuration.days > 0 || tripDuration.hours > 0)) && (
//                             <div className="mt-2 pt-2 border-t flex items-center text-blue-600 font-bold">
//                                 <Clock size={18} className="mr-2"/>
//                                 <span>Total Trip Duration: {tripDuration.days} Day(s), {tripDuration.hours} Hour(s)</span>
//                             </div>
//                            )}
//                         </div>

//                         <div className="bg-white p-6 rounded-xl shadow-md">
//                             <div className="flex items-center gap-4">
//                                 <img src={carInfo.image} alt={carInfo.name} className="h-24"/>
//                                 <div>
//                                     <h3 className="font-bold text-xl">{carInfo.name} <span className="text-sm text-gray-500">or similar</span></h3>
//                                     <div className="flex items-center flex-wrap gap-4 text-sm mt-2">
//                                         <span className="flex items-center"><Car size={16} className="mr-1.5"/>{carType}</span>
//                                         <span className="flex items-center"><Users size={16} className="mr-1.5"/>{packageDetails.seater} Seater</span>
//                                         {packageDetails.ac && <span className="flex items-center"><Snowflake size={16} className="mr-1.5"/>AC</span>}
//                                         {packageDetails.fuelType && <span className="flex items-center"><Droplets size={16} className="mr-1.5"/>{packageDetails.fuelType}</span>}
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="mt-4 pt-4 border-t">
//                                 <h4 className="font-bold text-lg mb-2">Inclusions & Extra Charges</h4>
//                                 <ul className="space-y-2 text-sm text-gray-700">
//                                     <li className="flex items-start"><Check size={18} className="text-green-500 mr-2 mt-0.5"/> <span>Driver Allowance, Tolls, and State Tax are included.</span></li>
                                    
//                                     {tripDetails.tripType === 'Rental' && packageDetails.uptoHour &&
//                                         <li className="flex items-start"><Check size={18} className="text-green-500 mr-2 mt-0.5"/> <span>Package for **{packageDetails.uptoHour} Hours** with **{packageDetails.uptoKm} km**.</span></li>
//                                     }
//                                     {(tripDetails.tripType.includes('Outstation') || tripDetails.tripType.includes('Airport')) && (packageDetails.includingKm || packageDetails.packageKm) &&
//                                         <li className="flex items-start"><Check size={18} className="text-green-500 mr-2 mt-0.5"/> <span>**{packageDetails.includingKm || packageDetails.packageKm} km** included.</span></li>
//                                     }
                                    
//                                     <li className="mt-4 pt-4 border-t border-dashed">
//                                         <h5 className="font-semibold text-gray-600 mb-2">Extra Charges (if applicable):</h5>
//                                         <ul className="list-disc list-inside text-xs text-slate-500 pl-2">
//                                             {extraKmRate && <li>Extra Distance: ₹{extraKmRate}/km</li>}
//                                             {extraHourRate && <li>Extra Time / Waiting: ₹{extraHourRate}/hr</li>}
//                                             {nightAllowance > 0 && <li>Night Allowance: ₹{nightAllowance} (11 PM - 6 AM)</li>}
//                                         </ul>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
                        
//                         <div className="bg-white p-6 rounded-xl shadow-md">
//                            <h3 className="font-bold text-lg mb-4">Traveller Details</h3>
//                              <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                 <input name="fullName" value={travellerDetails.fullName} onChange={handleTravellerChange} placeholder="Full Name" className="p-3 border rounded-md"/>
//                                 <select name="gender" value={travellerDetails.gender} onChange={handleTravellerChange} className="p-3 border rounded-md bg-white">
//                                     <option value="">Select Gender</option><option value="Male">Male</option><option value="Female">Female</option>
//                                 </select>
//                                 <input name="mobile" value={travellerDetails.mobile} onChange={handleTravellerChange} placeholder="Mobile No." className="p-3 border rounded-md"/>
//                                 <input name="email" type="email" value={travellerDetails.email} onChange={handleTravellerChange} placeholder="Email ID" className="p-3 border rounded-md"/>
//                              </form>
//                         </div>
//                     </div>

//                     <div className="lg:col-span-1 space-y-6 sticky top-8">
//                          <div className="bg-white p-6 rounded-xl shadow-lg">
//                             <h3 className="font-bold text-xl mb-4">Payment Options</h3>
//                             <div className="space-y-3">
//                                <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentOption === 'advance' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}>
//                                   <div className="flex justify-between items-center">
//                                     <span className="font-semibold text-slate-800">Pay Advance</span>
//                                     <span className="font-bold text-lg text-slate-900">₹{advanceAmount}</span>
//                                   </div>
//                                   <p className="text-xs text-gray-500 mt-1">Pay the rest to the driver</p>
//                                   <input type="radio" name="payment" value="advance" checked={paymentOption === 'advance'} onChange={(e) => setPaymentOption(e.target.value)} className="hidden"/>
//                                </label>
//                                <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentOption === 'full' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}>
//                                   <div className="flex justify-between items-center">
//                                     <span className="font-semibold text-slate-800">Pay Full Amount</span>
//                                     <span className="font-bold text-lg text-slate-900">₹{totalFare}</span>
//                                   </div>
//                                   <input type="radio" name="payment" value="full" checked={paymentOption === 'full'} onChange={(e) => setPaymentOption(e.target.value)} className="hidden"/>
//                                </label>
//                             </div>
//                             <div className="mt-6">
//                                 <button onClick={handleBookingSubmit} disabled={isSubmitting} className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 disabled:bg-gray-400 text-lg">
//                                     {isSubmitting ? 'Processing...' : `PAY NOW (₹${paymentOption === 'advance' ? advanceAmount : totalFare})`}
//                                 </button>
//                             </div>
//                          </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default ReviewBooking;


// import React, { useState, useEffect, useContext } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext'; 
// import axios from 'axios';
// import { Car, Users, Snowflake, Check, Clock, ArrowLeft, Droplets } from 'lucide-react';

// const vehicleData = {
//   Mini: { name: "Indica, Swift", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Hatchback_2x.png" },
//   Sedan: { name: "Dzire, Etios", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png" },
//   SUV: { name: "Ertiga, Xylo", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" },
//   "SUV+": { name: "Innova Crysta", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" },
// };

// const ReviewBooking = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { user, token } = useContext(AuthContext);
//     const { packageDetails, tripDetails } = location.state || {};
    
//     const [travellerDetails, setTravellerDetails] = useState({ fullName: '', gender: '', mobile: '', email: '' });
//     const [tripDuration, setTripDuration] = useState({ days: 0, hours: 0, minutes: 0 });
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [paymentOption, setPaymentOption] = useState('advance');

//     // Fill user details and calculate trip duration
//     useEffect(() => {
//         if (user) {
//             setTravellerDetails({
//                 fullName: user.name || '',
//                 mobile: user.phone ? user.phone.replace('+91', '') : '',
//                 email: user.email || '',
//                 gender: user.gender || ''
//             });
//         }

//         if (tripDetails?.pickupDate && tripDetails?.pickupTime && tripDetails?.dropDate && tripDetails?.dropTime) {
//             const startDate = new Date(`${tripDetails.pickupDate}T${tripDetails.pickupTime}`);
//             const endDate = new Date(`${tripDetails.dropDate}T${tripDetails.dropTime}`);
//             if (endDate > startDate) {
//                 let diffMs = endDate - startDate;
//                 const days = Math.floor(diffMs / 86400000);
//                 diffMs -= days * 86400000;
//                 const hours = Math.floor(diffMs / 3600000);
//                 diffMs -= hours * 3600000;
//                 const minutes = Math.floor(diffMs / 60000);
//                 setTripDuration({ days, hours, minutes });
//             }
//         }
//     }, [user, tripDetails]);

//     const handleTravellerChange = (e) => {
//         const { name, value } = e.target;
//         setTravellerDetails(prev => ({ ...prev, [name]: value }));
//     };

//     const handleBookingSubmit = async () => {
//         if (!travellerDetails.fullName || !travellerDetails.mobile || !travellerDetails.email) {
//             return alert("Please fill all traveller details.");
//         }
//         setIsSubmitting(true);
//         const bookingData = {
//             userId: user?._id,
//             tripDetails,
//             packageDetails,
//             travellerDetails,
//             paymentDetails: {
//                 totalFare: packageDetails.fare || packageDetails.packageRate || 0,
//                 advanceAmount: packageDetails.advanceAmount || packageDetails.advance || 0,
//                 paymentOption,
//                 amountPaid: paymentOption === 'advance' ? (packageDetails.advanceAmount || packageDetails.advance || 0) : (packageDetails.fare || packageDetails.packageRate || 0)
//             }
//         };

//         try {
//             const res = await axios.post('http://localhost:5000/api/bookings', bookingData, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             if (res.data.success) {
//                 alert(res.data.message);
//                 navigate('/');
//             }
//         } catch (err) {
//             alert(err.response?.data?.message || "Booking failed.");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     if (!packageDetails || !tripDetails) {
//         return (
//             <div className="text-center p-10">
//                 <h2 className="text-2xl font-bold">Oops! Something went wrong.</h2>
//                 <button onClick={() => navigate(-1)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Go Back</button>
//             </div>
//         );
//     }

//     const carType = packageDetails.car || packageDetails.fleet || packageDetails.vehicleType;
//     const carInfo = vehicleData[carType] || vehicleData.Mini;
//     const totalFare = packageDetails.fare || packageDetails.packageCost || packageDetails.packageRate || 0;
//     const advanceAmount = packageDetails.advanceAmount || packageDetails.advance || 0;
//     const extraKmRate = packageDetails?.rates?.extraKmRate || packageDetails?.extraKmRate || packageDetails?.extraKmCharge || 0;
//     const extraHourRate = packageDetails?.rates?.extraHourRate || packageDetails?.extraHourRate || packageDetails?.waitingTimeCharge || 0;
//     const nightAllowance = packageDetails?.rates?.nightDrivingAllowance || packageDetails?.nightDrivingAllowance || packageDetails?.nightDrivingCharge || 0;

//     return (
//         <div className="bg-slate-100 min-h-screen">
//             <div className="max-w-6xl mx-auto p-4 sm:p-8">
//                 <button onClick={() => navigate(-1)} className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors mb-4">
//                     <ArrowLeft size={16} className="mr-2"/>
//                     Back to Results
//                 </button>
//                 <h1 className="text-3xl font-bold text-slate-800 mb-6">Review Your Booking</h1>
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
//                     {/* Left Section */}
//                     <div className="lg:col-span-2 space-y-6">
//                         <div className="bg-white p-6 rounded-xl shadow-md">
//                            <p className="font-semibold text-lg text-blue-600">{tripDetails.tripType}</p>
//                            <h2 className="text-2xl font-bold text-slate-800">{tripDetails.from} → {tripDetails.to}</h2>
//                            <div className="mt-2 pt-2 border-t text-sm text-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-2">
//                                 <span><span className="font-semibold">Pickup:</span> {tripDetails.pickupDate} at {tripDetails.pickupTime}</span>
//                                 {tripDetails.dropDate && <span><span className="font-semibold">Return:</span> {tripDetails.dropDate} at {tripDetails.dropTime}</span>}
//                            </div>
//                            {(tripDetails.tripType !== 'Rental' && (tripDuration.days > 0 || tripDuration.hours > 0 || tripDuration.minutes > 0)) && (
//                             <div className="mt-2 pt-2 border-t flex items-center text-blue-600 font-bold">
//                                 <Clock size={18} className="mr-2"/>
//                                 <span>Total Trip Duration: {tripDuration.days} Day(s), {tripDuration.hours} Hour(s), {tripDuration.minutes} Min(s)</span>
//                             </div>
//                            )}
//                         </div>

//                         {/* Vehicle Info */}
//                         <div className="bg-white p-6 rounded-xl shadow-md">
//                             <div className="flex items-center gap-4">
//                                 <img src={carInfo.image} alt={carInfo.name} className="h-24"/>
//                                 <div>
//                                     <h3 className="font-bold text-xl">{carInfo.name} <span className="text-sm text-gray-500">or similar</span></h3>
//                                     <div className="flex items-center flex-wrap gap-4 text-sm mt-2">
//                                         <span className="flex items-center"><Car size={16} className="mr-1.5"/>{carType}</span>
//                                         <span className="flex items-center"><Users size={16} className="mr-1.5"/>{packageDetails.seater} Seater</span>
//                                         {packageDetails.ac && <span className="flex items-center"><Snowflake size={16} className="mr-1.5"/>AC</span>}
//                                         {packageDetails.fuelType && <span className="flex items-center"><Droplets size={16} className="mr-1.5"/>{packageDetails.fuelType}</span>}
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="mt-4 pt-4 border-t">
//                                 <h4 className="font-bold text-lg mb-2">Inclusions & Extra Charges</h4>
//                                 <ul className="space-y-2 text-sm text-gray-700">
//                                     <li className="flex items-start"><Check size={18} className="text-green-500 mr-2 mt-0.5"/>Driver Allowance, Tolls, and State Tax are included.</li>
                                    
//                                     {tripDetails.tripType === 'Rental' && packageDetails.uptoHour &&
//                                         <li className="flex items-start"><Check size={18} className="text-green-500 mr-2 mt-0.5"/>Package for {packageDetails.uptoHour} Hours with {packageDetails.uptoKm} km.</li>
//                                     }
//                                     {(tripDetails.tripType.includes('Outstation') || tripDetails.tripType.includes('Airport')) && (packageDetails.includingKm || packageDetails.packageKm) &&
//                                         <li className="flex items-start"><Check size={18} className="text-green-500 mr-2 mt-0.5"/>{packageDetails.includingKm || packageDetails.packageKm} km included.</li>
//                                     }
                                    
//                                     <li className="mt-4 pt-4 border-t border-dashed">
//                                         <h5 className="font-semibold text-gray-600 mb-2">Extra Charges (if applicable):</h5>
//                                         <ul className="list-disc list-inside text-xs text-slate-500 pl-2">
//                                             {extraKmRate > 0 && <li>Extra Distance: ₹{extraKmRate}/km</li>}
//                                             {extraHourRate > 0 && <li>Extra Time / Waiting: ₹{extraHourRate}/hr</li>}
//                                             {nightAllowance > 0 && <li>Night Allowance: ₹{nightAllowance} (11 PM - 6 AM)</li>}
//                                         </ul>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
                        
//                         {/* Traveller Details */}
//                         <div className="bg-white p-6 rounded-xl shadow-md">
//                            <h3 className="font-bold text-lg mb-4">Traveller Details</h3>
//                              <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                 <input name="fullName" value={travellerDetails.fullName} onChange={handleTravellerChange} placeholder="Full Name" className="p-3 border rounded-md"/>
//                                 <select name="gender" value={travellerDetails.gender} onChange={handleTravellerChange} className="p-3 border rounded-md bg-white">
//                                     <option value="">Select Gender</option>
//                                     <option value="Male">Male</option>
//                                     <option value="Female">Female</option>
//                                 </select>
//                                 <input name="mobile" value={travellerDetails.mobile} onChange={handleTravellerChange} placeholder="Mobile No." className="p-3 border rounded-md"/>
//                                 <input name="email" type="email" value={travellerDetails.email} onChange={handleTravellerChange} placeholder="Email ID" className="p-3 border rounded-md"/>
//                              </form>
//                         </div>
//                     </div>

//                     {/* Right Section: Payment */}
//                     <div className="lg:col-span-1 space-y-6 sticky top-8">
//                          <div className="bg-white p-6 rounded-xl shadow-lg">
//                             <h3 className="font-bold text-xl mb-4">Payment Options</h3>
//                             <div className="space-y-3">
//                                {packageDetails.allowAdvance !== false && (
//                                 <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentOption === 'advance' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}>
//                                   <div className="flex justify-between items-center">
//                                     <span className="font-semibold text-slate-800">Pay Advance</span>
//                                     <span className="font-bold text-lg text-slate-900">₹{advanceAmount}</span>
//                                   </div>
//                                   <p className="text-xs text-gray-500 mt-1">Pay the rest to the driver</p>
//                                   <input type="radio" name="payment" value="advance" checked={paymentOption === 'advance'} onChange={(e) => setPaymentOption(e.target.value)} className="hidden"/>
//                                </label>
//                                )}
//                                {packageDetails.allowFull !== false && (
//                                 <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentOption === 'full' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}>
//                                   <div className="flex justify-between items-center">
//                                     <span className="font-semibold text-slate-800">Pay Full Amount</span>
//                                     <span className="font-bold text-lg text-slate-900">₹{totalFare}</span>
//                                   </div>
//                                   <input type="radio" name="payment" value="full" checked={paymentOption === 'full'} onChange={(e) => setPaymentOption(e.target.value)} className="hidden"/>
//                                </label>
//                                )}
//                             </div>
//                             <div className="mt-6">
//                                 <button onClick={handleBookingSubmit} disabled={isSubmitting} className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 disabled:bg-gray-400 text-lg">
//                                     {isSubmitting ? 'Processing...' : `PAY NOW (₹${paymentOption === 'advance' ? advanceAmount : totalFare})`}
//                                 </button>
//                             </div>
//                          </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ReviewBooking;



// import React, { useState, useEffect, useContext } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext'; 
// import axios from 'axios';
// import { Car, Users, Snowflake, Check, Clock, Gauge, Moon, ArrowLeft, Droplets } from 'lucide-react';

// const vehicleData = {
//   Mini: { name: "Indica, Swift", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Hatchback_2x.png" },
//   Sedan: { name: "Dzire, Etios", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png" },
//   SUV: { name: "Ertiga, Xylo", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" },
//   "SUV+": { name: "Innova Crysta", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" },
// };

// const ReviewBooking = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { user, token } = useContext(AuthContext);
//     const { packageDetails, tripDetails } = location.state || {};
    
//     const [travellerDetails, setTravellerDetails] = useState({ fullName: '', gender: '', mobile: '', email: '' });
//     const [tripDuration, setTripDuration] = useState({ days: 0, hours: 0, minutes: 0 });
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [paymentOption, setPaymentOption] = useState('advance');
//     const [availablePaymentOptions, setAvailablePaymentOptions] = useState({ advance: true, full: true });

    

//     useEffect(() => {
//     // Default payment options
//     let available = { advance: true, full: true };

//     // Set based on packageDetails.paymentOptions if available
//     if (packageDetails?.paymentOptions) {
//         const options = packageDetails.paymentOptions;
//         available = {
//             advance: options === 'Both' || options === 'AdvanceOnly',
//             full: options === 'Both' || options === 'FullOnly'
//         };
//     }

//     // Restrict for Outstation One-Way trips
//     if (tripDetails?.tripType === 'Outstation One-Way') {
//         available.full = false;   // Only advance allowed
//         available.advance = true; // Ensure advance is available
//         setPaymentOption('advance'); // Force default to advance
//     } else {
//         // Otherwise, set default payment option based on availability
//         if (available.advance) setPaymentOption('advance');
//         else if (available.full) setPaymentOption('full');
//     }

//     // Update state
//     setAvailablePaymentOptions(available);

//     // Fill user details if logged in
//     if (user) {
//         setTravellerDetails({
//             fullName: user.name || '',
//             mobile: user.phone ? user.phone.replace('+91', '') : '',
//             email: user.email || '',
//             gender: ''
//         });
//     }

//     // Calculate trip duration if pickup and drop are available
//     if (tripDetails?.pickupDate && tripDetails?.pickupTime && tripDetails?.dropDate && tripDetails?.dropTime) {
//         const startDate = new Date(`${tripDetails.pickupDate}T${tripDetails.pickupTime}`);
//         const endDate = new Date(`${tripDetails.dropDate}T${tripDetails.dropTime}`);
//         if (endDate > startDate) {
//             let diffMs = endDate - startDate;
//             const days = Math.floor(diffMs / 86400000);
//             diffMs -= days * 86400000;
//             const hours = Math.floor(diffMs / 3600000);
//             const minutes = Math.floor((diffMs % 3600000) / 60000);
//             setTripDuration({ days, hours, minutes });
//         }
//     }
// }, [user, tripDetails, packageDetails]);


//     const handleTravellerChange = (e) => {
//         const { name, value } = e.target;
//         setTravellerDetails(prev => ({ ...prev, [name]: value }));
//     };

//     const handleBookingSubmit = async () => {
//         if (!travellerDetails.fullName || !travellerDetails.mobile || !travellerDetails.email) {
//             return alert("Please fill all traveller details.");
//         }
//         setIsSubmitting(true);
//         const bookingData = {
//             userId: user?._id,
//             tripDetails,
//             packageDetails,
//             travellerDetails,
//             paymentDetails: {
//                 totalFare: packageDetails.fare || packageDetails.packageRate,
//                 advanceAmount: packageDetails.advanceAmount || packageDetails.advance,
//                 paymentOption: paymentOption,
//                 amountPaid: paymentOption === 'advance' ? (packageDetails.advanceAmount || packageDetails.advance) : (packageDetails.fare || packageDetails.packageRate)
//             }
//         };

//         try {
//             const res = await axios.post('http://localhost:5000/api/bookings', bookingData, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             if (res.data.success) {
//                 alert(res.data.message);
//                 navigate('/');
//             }
//         } catch (err) {
//             alert(err.response?.data?.message || "Booking failed.");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     if (!packageDetails || !tripDetails) {
//         return (
//             <div className="text-center p-10">
//                 <h2 className="text-2xl font-bold">Oops! Something went wrong.</h2>
//                 <button onClick={() => navigate(-1)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Go Back</button>
//             </div>
//         );
//     }
    
//     const carType = packageDetails.car || packageDetails.fleet || packageDetails.vehicleType;
//     const carInfo = vehicleData[carType] || vehicleData.Mini;
//     const totalFare = packageDetails.fare || packageDetails.packageCost || packageDetails.packageRate;
//     const advanceAmount = packageDetails.advanceAmount || packageDetails.advance;
//     const extraKmRate = packageDetails.rates?.extraKmRate || packageDetails.extraKmRate || packageDetails.extraKmCharge;
//     const extraHourRate = packageDetails.rates?.extraHourRate || packageDetails.extraHourRate || packageDetails.waitingTimeCharge;
//     const nightAllowance = packageDetails.rates?.nightDrivingAllowance || packageDetails.nightDrivingAllowance || packageDetails.nightDrivingCharge;

//     return (
//         <div className="bg-slate-100 min-h-screen">
//             <div className="max-w-6xl mx-auto p-4 sm:p-8">
//                 <button onClick={() => navigate(-1)} className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors mb-4">
//                     <ArrowLeft size={16} className="mr-2"/>
//                     Back to Results
//                 </button>
//                 <h1 className="text-3xl font-bold text-slate-800 mb-6">Review Your Booking</h1>
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
//                     <div className="lg:col-span-2 space-y-6">
//                         <div className="bg-white p-6 rounded-xl shadow-md">
//                            <p className="font-semibold text-lg text-blue-600">{tripDetails.tripType}</p>
//                            <h2 className="text-2xl font-bold text-slate-800">{tripDetails.from} → {tripDetails.to}</h2>
//                            <div className="mt-2 pt-2 border-t text-sm text-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-2">
//                                 <span><span className="font-semibold">Pickup:</span> {tripDetails.pickupDate} at {tripDetails.pickupTime}</span>
//                                 {tripDetails.dropDate && <span><span className="font-semibold">Return:</span> {tripDetails.dropDate} at {tripDetails.dropTime}</span>}
//                            </div>
//                            {(tripDetails.tripType !== 'Rental' && (tripDuration.days > 0 || tripDuration.hours > 0)) && (
//                             <div className="mt-2 pt-2 border-t flex items-center text-blue-600 font-bold">
//                                 <Clock size={18} className="mr-2"/>
//                                 <span>Total Trip Duration: {tripDuration.days} Day(s), {tripDuration.hours} Hour(s)</span>
//                             </div>
//                            )}
//                         </div>

//                         <div className="bg-white p-6 rounded-xl shadow-md">
//                             <div className="flex items-center gap-4">
//                                 <img src={carInfo.image} alt={carInfo.name} className="h-24"/>
//                                 <div>
//                                     <h3 className="font-bold text-xl">{carInfo.name} <span className="text-sm text-gray-500">or similar</span></h3>
//                                     <div className="flex items-center flex-wrap gap-4 text-sm mt-2">
//                                         <span className="flex items-center"><Car size={16} className="mr-1.5"/>{carType}</span>
//                                         <span className="flex items-center"><Users size={16} className="mr-1.5"/>{packageDetails.seater} Seater</span>
//                                         {packageDetails.ac && <span className="flex items-center"><Snowflake size={16} className="mr-1.5"/>AC</span>}
//                                         {packageDetails.fuelType && <span className="flex items-center"><Droplets size={16} className="mr-1.5"/>{packageDetails.fuelType}</span>}
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="mt-4 pt-4 border-t">
//                                 <h4 className="font-bold text-lg mb-2">Inclusions & Extra Charges</h4>
//                                 <ul className="space-y-2 text-sm text-gray-700">
//                                     <li className="flex items-start"><Check size={18} className="text-green-500 mr-2 mt-0.5"/> <span>Driver Allowance, Tolls, and State Tax are included.</span></li>
                                    
//                                     {tripDetails.tripType === 'Rental' && packageDetails.uptoHour &&
//                                         <li className="flex items-start"><Check size={18} className="text-green-500 mr-2 mt-0.5"/> <span>Package for **{packageDetails.uptoHour} Hours** with **{packageDetails.uptoKm} km**.</span></li>
//                                     }
//                                     {(tripDetails.tripType.includes('Outstation') || tripDetails.tripType.includes('Airport')) && (packageDetails.includingKm || packageDetails.packageKm) &&
//                                         <li className="flex items-start"><Check size={18} className="text-green-500 mr-2 mt-0.5"/> <span>**{packageDetails.includingKm || packageDetails.packageKm} km** included.</span></li>
//                                     }
                                    
//                                     <li className="mt-4 pt-4 border-t border-dashed">
//                                         <h5 className="font-semibold text-gray-600 mb-2">Extra Charges (if applicable):</h5>
//                                         <ul className="list-disc list-inside text-xs text-slate-500 pl-2">
//                                             {extraKmRate && <li>Extra Distance: ₹{extraKmRate}/km</li>}
//                                             {extraHourRate && <li>Extra Time / Waiting: ₹{extraHourRate}/hr</li>}
//                                             {nightAllowance > 0 && <li>Night Allowance: ₹{nightAllowance} (11 PM - 6 AM)</li>}
//                                         </ul>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
                        
//                         <div className="bg-white p-6 rounded-xl shadow-md">
//                            <h3 className="font-bold text-lg mb-4">Traveller Details</h3>
//                              <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                 <input name="fullName" value={travellerDetails.fullName} onChange={handleTravellerChange} placeholder="Full Name" className="p-3 border rounded-md"/>
//                                 <select name="gender" value={travellerDetails.gender} onChange={handleTravellerChange} className="p-3 border rounded-md bg-white">
//                                     <option value="">Select Gender</option><option value="Male">Male</option><option value="Female">Female</option>
//                                 </select>
//                                 <input name="mobile" value={travellerDetails.mobile} onChange={handleTravellerChange} placeholder="Mobile No." className="p-3 border rounded-md"/>
//                                 <input name="email" type="email" value={travellerDetails.email} onChange={handleTravellerChange} placeholder="Email ID" className="p-3 border rounded-md"/>
//                              </form>
//                         </div>
//                     </div>

//                     <div className="lg:col-span-1 space-y-6 sticky top-8">
//                          <div className="bg-white p-6 rounded-xl shadow-lg">
//                             <h3 className="font-bold text-xl mb-4">Payment Options</h3>
//                             <div className="space-y-3">
//                                {availablePaymentOptions.advance && (
//                                <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentOption === 'advance' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}>
//                                   <div className="flex justify-between items-center">
//                                     <span className="font-semibold text-slate-800">Pay Advance</span>
//                                     <span className="font-bold text-lg text-slate-900">₹{advanceAmount}</span>
//                                   </div>
//                                   <p className="text-xs text-gray-500 mt-1">Pay the rest to the driver</p>
//                                   <input type="radio" name="payment" value="advance" checked={paymentOption === 'advance'} onChange={(e) => setPaymentOption(e.target.value)} className="hidden"/>
//                                </label>
//                                )}
//                                {availablePaymentOptions.full && (
//                                <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentOption === 'full' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}>
//                                   <div className="flex justify-between items-center">
//                                     <span className="font-semibold text-slate-800">Pay Full Amount</span>
//                                     <span className="font-bold text-lg text-slate-900">₹{totalFare}</span>
//                                   </div>
//                                   <input type="radio" name="payment" value="full" checked={paymentOption === 'full'} onChange={(e) => setPaymentOption(e.target.value)} className="hidden"/>
//                                </label>
//                                )}
//                             </div>
//                             <div className="mt-6">
//                                 <button onClick={handleBookingSubmit} disabled={isSubmitting} className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 disabled:bg-gray-400 text-lg">
//                                     {isSubmitting ? 'Processing...' : `PAY NOW (₹${paymentOption === 'advance' ? advanceAmount : totalFare})`}
//                                 </button>
//                             </div>
//                          </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default ReviewBooking;



// import React, { useState, useEffect, useContext } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import axios from 'axios';
// import { Car, Users, Snowflake, Check, Clock, ArrowLeft, Droplets } from 'lucide-react';

// const vehicleData = {
//   Mini: { name: "Indica, Swift", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Hatchback_2x.png" },
//   Sedan: { name: "Dzire, Etios", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png" },
//   SUV: { name: "Ertiga, Xylo", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" },
//   "SUV+": { name: "Innova Crysta", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" },
// };

// const ReviewBooking = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user, token } = useContext(AuthContext);
//   const { packageDetails, tripDetails } = location.state || {};

//   const [travellerDetails, setTravellerDetails] = useState({ fullName: '', gender: '', mobile: '', email: '' });
//   const [tripDuration, setTripDuration] = useState({ days: 0, hours: 0, minutes: 0 });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [paymentOption, setPaymentOption] = useState('advance');
//   const [availablePaymentOptions, setAvailablePaymentOptions] = useState({ advance: true, full: true });

//   // Fill default values and calculate duration
//   useEffect(() => {
//     if (!packageDetails || !tripDetails) return;

//     // Payment options
//     let available = { advance: true, full: true };
//     if (packageDetails.paymentOptions) {
//       const options = packageDetails.paymentOptions;
//       available = {
//         advance: options === 'Both' || options === 'AdvanceOnly',
//         full: options === 'Both' || options === 'FullOnly'
//       };
//     }

//     if (tripDetails.tripType === 'Outstation One-Way') {
//       available = { advance: true, full: false };
//       setPaymentOption('advance');
//     } else {
//       setPaymentOption(available.advance ? 'advance' : 'full');
//     }

//     setAvailablePaymentOptions(available);

//     // Fill traveller details from user
//     if (user) {
//       setTravellerDetails({
//         fullName: user.name || '',
//         mobile: user.phone ? user.phone.replace('+91', '') : '',
//         email: user.email || '',
//         gender: ''
//       });
//     }

//     // Calculate trip duration
//     if (tripDetails.pickupDate && tripDetails.pickupTime && tripDetails.dropDate && tripDetails.dropTime) {
//       const start = new Date(`${tripDetails.pickupDate}T${tripDetails.pickupTime}`);
//       const end = new Date(`${tripDetails.dropDate}T${tripDetails.dropTime}`);
//       if (end > start) {
//         let diff = end - start;
//         const days = Math.floor(diff / 86400000);
//         diff -= days * 86400000;
//         const hours = Math.floor(diff / 3600000);
//         const minutes = Math.floor((diff % 3600000) / 60000);
//         setTripDuration({ days, hours, minutes });
//       }
//     }
//   }, [user, tripDetails, packageDetails]);

//   const handleTravellerChange = (e) => {
//     const { name, value } = e.target;
//     setTravellerDetails(prev => ({ ...prev, [name]: value }));
//   };

//   const handleBookingSubmit = async () => {
//     if (!travellerDetails.fullName || !travellerDetails.mobile || !travellerDetails.email) {
//       return alert("Please fill all traveller details.");
//     }

//     setIsSubmitting(true);
//     const bookingData = {
//       userId: user?._id,
//       tripDetails,
//       packageDetails,
//       travellerDetails,
//       paymentDetails: {
//         totalFare: packageDetails.fare || packageDetails.packageRate,
//         advanceAmount: packageDetails.advanceAmount || packageDetails.advance,
//         paymentOption: paymentOption,
//         amountPaid: paymentOption === 'advance'
//           ? (packageDetails.advanceAmount || packageDetails.advance)
//           : (packageDetails.fare || packageDetails.packageRate)
//       }
//     };

//     try {
//       const res = await axios.post('http://localhost:5000/api/bookings', bookingData, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (res.data.success) {
//         navigate('/thank-you', { state: { booking: res.data.booking } });
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Booking failed.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (!packageDetails || !tripDetails) {
//     return (
//       <div className="text-center p-10">
//         <h2 className="text-2xl font-bold">Oops! Something went wrong.</h2>
//         <button onClick={() => navigate(-1)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Go Back</button>
//       </div>
//     );
//   }

//   const carType = packageDetails.car || packageDetails.fleet || packageDetails.vehicleType;
//   const carInfo = vehicleData[carType] || vehicleData.Mini;
//   const totalFare = packageDetails.fare || packageDetails.packageCost || packageDetails.packageRate;
//   const advanceAmount = packageDetails.advanceAmount || packageDetails.advance;
//   const extraKmRate = packageDetails.rates?.extraKmRate || packageDetails.extraKmRate || packageDetails.extraKmCharge;
//   const extraHourRate = packageDetails.rates?.extraHourRate || packageDetails.extraHourRate || packageDetails.waitingTimeCharge;
//   const nightAllowance = packageDetails.rates?.nightDrivingAllowance || packageDetails.nightDrivingAllowance || packageDetails.nightDrivingCharge;

//   return (
//     <div className="bg-slate-100 min-h-screen">
//       <div className="max-w-6xl mx-auto p-4 sm:p-8">
//         <button onClick={() => navigate(-1)} className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors mb-4">
//           <ArrowLeft size={16} className="mr-2"/>
//           Back to Results
//         </button>

//         <h1 className="text-3xl font-bold text-slate-800 mb-6">Review Your Booking</h1>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
//           {/* Left Section */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Trip Info */}
//             <div className="bg-white p-6 rounded-xl shadow-md">
//               <p className="font-semibold text-lg text-blue-600">{tripDetails.tripType}</p>
//               <h2 className="text-2xl font-bold text-slate-800">{tripDetails.from} → {tripDetails.to}</h2>
//               <div className="mt-2 pt-2 border-t text-sm text-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-2">
//                 <span><span className="font-semibold">Pickup:</span> {tripDetails.pickupDate} at {tripDetails.pickupTime}</span>
//                 {tripDetails.dropDate && <span><span className="font-semibold">Return:</span> {tripDetails.dropDate} at {tripDetails.dropTime}</span>}
//               </div>
//               {(tripDetails.tripType !== 'Rental' && (tripDuration.days > 0 || tripDuration.hours > 0)) && (
//                 <div className="mt-2 pt-2 border-t flex items-center text-blue-600 font-bold">
//                   <Clock size={18} className="mr-2"/>
//                   <span>Total Trip Duration: {tripDuration.days} Day(s), {tripDuration.hours} Hour(s)</span>
//                 </div>
//               )}
//             </div>

//             {/* Vehicle Info */}
//             <div className="bg-white p-6 rounded-xl shadow-md">
//               <div className="flex items-center gap-4">
//                 <img src={carInfo.image} alt={carInfo.name} className="h-24"/>
//                 <div>
//                   <h3 className="font-bold text-xl">{carInfo.name} <span className="text-sm text-gray-500">or similar</span></h3>
//                   <div className="flex items-center flex-wrap gap-4 text-sm mt-2">
//                     <span className="flex items-center"><Car size={16} className="mr-1.5"/>{carType}</span>
//                     <span className="flex items-center"><Users size={16} className="mr-1.5"/>{packageDetails.seater} Seater</span>
//                     {packageDetails.ac && <span className="flex items-center"><Snowflake size={16} className="mr-1.5"/>AC</span>}
//                     {packageDetails.fuelType && <span className="flex items-center"><Droplets size={16} className="mr-1.5"/>{packageDetails.fuelType}</span>}
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-4 pt-4 border-t">
//                 <h4 className="font-bold text-lg mb-2">Inclusions & Extra Charges</h4>
//                 <ul className="space-y-2 text-sm text-gray-700">
//                   <li className="flex items-start"><Check size={18} className="text-green-500 mr-2 mt-0.5"/> Driver Allowance, Tolls, and State Tax are included.</li>
//                   {tripDetails.tripType === 'Rental' && packageDetails.uptoHour &&
//                     <li className="flex items-start"><Check size={18} className="text-green-500 mr-2 mt-0.5"/> Package for {packageDetails.uptoHour} Hours with {packageDetails.uptoKm} km.</li>
//                   }
//                   {(tripDetails.tripType.includes('Outstation') || tripDetails.tripType.includes('Airport')) && (packageDetails.includingKm || packageDetails.packageKm) &&
//                     <li className="flex items-start"><Check size={18} className="text-green-500 mr-2 mt-0.5"/> {packageDetails.includingKm || packageDetails.packageKm} km included.</li>
//                   }
//                   <li className="mt-4 pt-4 border-t border-dashed">
//                     <h5 className="font-semibold text-gray-600 mb-2">Extra Charges (if applicable):</h5>
//                     <ul className="list-disc list-inside text-xs text-slate-500 pl-2">
//                       {extraKmRate && <li>Extra Distance: ₹{extraKmRate}/km</li>}
//                       {extraHourRate && <li>Extra Time / Waiting: ₹{extraHourRate}/hr</li>}
//                       {nightAllowance > 0 && <li>Night Allowance: ₹{nightAllowance} (11 PM - 6 AM)</li>}
//                     </ul>
//                   </li>
//                 </ul>
//               </div>
//             </div>

//             {/* Traveller Details */}
//             <div className="bg-white p-6 rounded-xl shadow-md">
//               <h3 className="font-bold text-lg mb-4">Traveller Details</h3>
//               <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <input name="fullName" value={travellerDetails.fullName} onChange={handleTravellerChange} placeholder="Full Name" className="p-3 border rounded-md"/>
//                 <select name="gender" value={travellerDetails.gender} onChange={handleTravellerChange} className="p-3 border rounded-md bg-white">
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                 </select>
//                 <input name="mobile" value={travellerDetails.mobile} onChange={handleTravellerChange} placeholder="Mobile No." className="p-3 border rounded-md"/>
//                 <input name="email" type="email" value={travellerDetails.email} onChange={handleTravellerChange} placeholder="Email ID" className="p-3 border rounded-md"/>
//               </form>
//             </div>
//           </div>

//           {/* Right Section - Payment */}
//           <div className="lg:col-span-1 space-y-6 sticky top-8">
//             <div className="bg-white p-6 rounded-xl shadow-lg">
//               <h3 className="font-bold text-xl mb-4">Payment Options</h3>
//               <div className="space-y-3">
//                 {availablePaymentOptions.advance && (
//                   <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentOption === 'advance' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}>
//                     <div className="flex justify-between items-center">
//                       <span className="font-semibold text-slate-800">Pay Advance</span>
//                       <span className="font-bold text-lg text-slate-900">₹{advanceAmount}</span>
//                     </div>
//                     <p className="text-xs text-gray-500 mt-1">Pay the rest to the driver</p>
//                     <input type="radio" name="payment" value="advance" checked={paymentOption === 'advance'} onChange={(e) => setPaymentOption(e.target.value)} className="hidden"/>
//                   </label>
//                 )}
//                 {availablePaymentOptions.full && (
//                   <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentOption === 'full' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}>
//                     <div className="flex justify-between items-center">
//                       <span className="font-semibold text-slate-800">Pay Full Amount</span>
//                       <span className="font-bold text-lg text-slate-900">₹{totalFare}</span>
//                     </div>
//                     <input type="radio" name="payment" value="full" checked={paymentOption === 'full'} onChange={(e) => setPaymentOption(e.target.value)} className="hidden"/>
//                   </label>
//                 )}
//               </div>
//               <div className="mt-6">
//                 <button onClick={handleBookingSubmit} disabled={isSubmitting} className={`w-full font-bold py-3 rounded-lg text-lg transition-colors ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'}`}>
//                   {isSubmitting ? 'Processing...' : `PAY NOW (₹${paymentOption === 'advance' ? advanceAmount : totalFare})`}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewBooking;









// import React, { useState, useEffect, useContext } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import axios from 'axios';
// import { Car, Users, Snowflake, Check, Clock, ArrowLeft, Droplets } from 'lucide-react';

// const vehicleData = {
//   Mini: { name: "Indica, Swift", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Hatchback_2x.png" },
//   Sedan: { name: "Dzire, Etios", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png" },
//   SUV: { name: "Ertiga, Xylo", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" },
//   "SUV+": { name: "Innova Crysta", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" },
// };

// // Helper function to convert tripType to backend enum format
// const getBookingType = (tripType) => {
//   if (!tripType) return "Outstation";
  
//   const lowerType = tripType.toLowerCase();
//   if (lowerType.includes('rental')) return "Rental";
//   if (lowerType.includes('airport')) return "Airport";
//   if (lowerType.includes('multi')) return "Multi-City";
//   return "Outstation"; // Default for One-Way and Round-Trip
// };

// const ReviewBooking = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user, token } = useContext(AuthContext);
//   const { packageDetails, tripDetails } = location.state || {};

//   const [travellerDetails, setTravellerDetails] = useState({ fullName: '', gender: '', mobile: '', email: '' });
//   const [tripDuration, setTripDuration] = useState({ days: 0, hours: 0, minutes: 0 });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [paymentOption, setPaymentOption] = useState('advance');
//   const [availablePaymentOptions, setAvailablePaymentOptions] = useState({ advance: true, full: true });

//   // Fill default values and calculate duration
//   useEffect(() => {
//     if (!packageDetails || !tripDetails) return;

//     // Payment options
//     let available = { advance: true, full: true };
//     if (packageDetails.paymentOptions) {
//       const options = packageDetails.paymentOptions;
//       available = {
//         advance: options === 'Both' || options === 'AdvanceOnly',
//         full: options === 'Both' || options === 'FullOnly'
//       };
//     }

//     if (tripDetails.tripType === 'Outstation One-Way') {
//       available = { advance: true, full: false };
//       setPaymentOption('advance');
//     } else {
//       setPaymentOption(available.advance ? 'advance' : 'full');
//     }

//     setAvailablePaymentOptions(available);

//     // Fill traveller details from user
//     if (user) {
//       setTravellerDetails({
//         fullName: user.name || '',
//         mobile: user.phone ? user.phone.replace('+91', '') : '',
//         email: user.email || '',
//         gender: ''
//       });
//     }

//     // Calculate trip duration
//     if (tripDetails.pickupDate && tripDetails.pickupTime && tripDetails.dropDate && tripDetails.dropTime) {
//       const start = new Date(`${tripDetails.pickupDate}T${tripDetails.pickupTime}`);
//       const end = new Date(`${tripDetails.dropDate}T${tripDetails.dropTime}`);
//       if (end > start) {
//         let diff = end - start;
//         const days = Math.floor(diff / 86400000);
//         diff -= days * 86400000;
//         const hours = Math.floor(diff / 3600000);
//         const minutes = Math.floor((diff % 3600000) / 60000);
//         setTripDuration({ days, hours, minutes });
//       }
//     }
//   }, [user, tripDetails, packageDetails]);

//   const handleTravellerChange = (e) => {
//     const { name, value } = e.target;
//     setTravellerDetails(prev => ({ ...prev, [name]: value }));
//   };

//   const handleBookingSubmit = async () => {
//     if (!travellerDetails.fullName || !travellerDetails.mobile || !travellerDetails.email) {
//       return alert("Please fill all traveller details.");
//     }

//     setIsSubmitting(true);
    
//     // ✅ Convert tripType to backend enum format
//     const bookingType = getBookingType(tripDetails.tripType);
    
//     const bookingData = {
//       userId: user?._id,
//       tripDetails,
//       packageDetails,
//       travellerDetails,
//       type: bookingType, // ✅ ADD THIS FIELD
//       paymentDetails: {
//         totalFare: packageDetails.fare || packageDetails.packageRate,
//         advanceAmount: packageDetails.advanceAmount || packageDetails.advance,
//         paymentOption: paymentOption,
//         amountPaid: paymentOption === 'advance'
//           ? (packageDetails.advanceAmount || packageDetails.advance)
//           : (packageDetails.fare || packageDetails.packageRate)
//       }
//     };

//     try {
//       const res = await axios.post('http://localhost:5000/api/bookings', bookingData, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (res.data.success) {
//         navigate('/thank-you', { state: { booking: res.data.booking } });
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Booking failed.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (!packageDetails || !tripDetails) {
//     return (
//       <div className="text-center p-10">
//         <h2 className="text-2xl font-bold">Oops! Something went wrong.</h2>
//         <button onClick={() => navigate(-1)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Go Back</button>
//       </div>
//     );
//   }

//   const carType = packageDetails.car || packageDetails.fleet || packageDetails.vehicleType;
//   const carInfo = vehicleData[carType] || vehicleData.Mini;
//   const totalFare = packageDetails.fare || packageDetails.packageCost || packageDetails.packageRate;
//   const advanceAmount = packageDetails.advanceAmount || packageDetails.advance;
//   const extraKmRate = packageDetails.rates?.extraKmRate || packageDetails.extraKmRate || packageDetails.extraKmCharge;
//   const extraHourRate = packageDetails.rates?.extraHourRate || packageDetails.extraHourRate || packageDetails.waitingTimeCharge;
//   const nightAllowance = packageDetails.rates?.nightDrivingAllowance || packageDetails.nightDrivingAllowance || packageDetails.nightDrivingCharge;

//   return (
//     <div className="bg-slate-100 min-h-screen">
//       <div className="max-w-6xl mx-auto p-4 sm:p-8">
//         <button onClick={() => navigate(-1)} className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors mb-4">
//           <ArrowLeft size={16} className="mr-2"/>
//           Back to Results
//         </button>

//         <h1 className="text-3xl font-bold text-slate-800 mb-6">Review Your Booking</h1>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
//           {/* Left Section */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Trip Info */}
//             <div className="bg-white p-6 rounded-xl shadow-md">
//               <p className="font-semibold text-lg text-blue-600">{tripDetails.tripType}</p>
//               <h2 className="text-2xl font-bold text-slate-800">{tripDetails.from} → {tripDetails.to}</h2>
//               <div className="mt-2 pt-2 border-t text-sm text-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-2">
//                 <span><span className="font-semibold">Pickup:</span> {tripDetails.pickupDate} at {tripDetails.pickupTime}</span>
//                 {tripDetails.dropDate && <span><span className="font-semibold">Return:</span> {tripDetails.dropDate} at {tripDetails.dropTime}</span>}
//               </div>
//               {(tripDetails.tripType !== 'Rental' && (tripDuration.days > 0 || tripDuration.hours > 0)) && (
//                 <div className="mt-2 pt-2 border-t flex items-center text-blue-600 font-bold">
//                   <Clock size={18} className="mr-2"/>
//                   <span>Total Trip Duration: {tripDuration.days} Day(s), {tripDuration.hours} Hour(s)</span>
//                 </div>
//               )}
//             </div>

//             {/* Vehicle Info */}
//             <div className="bg-white p-6 rounded-xl shadow-md">
//               <div className="flex items-center gap-4">
//                 <img src={carInfo.image} alt={carInfo.name} className="h-24"/>
//                 <div>
//                   <h3 className="font-bold text-xl">{carInfo.name} <span className="text-sm text-gray-500">or similar</span></h3>
//                   <div className="flex items-center flex-wrap gap-4 text-sm mt-2">
//                     <span className="flex items-center"><Car size={16} className="mr-1.5"/>{carType}</span>
//                     <span className="flex items-center"><Users size={16} className="mr-1.5"/>{packageDetails.seater} Seater</span>
//                     {packageDetails.ac && <span className="flex items-center"><Snowflake size={16} className="mr-1.5"/>AC</span>}
//                     {packageDetails.fuelType && <span className="flex items-center"><Droplets size={16} className="mr-1.5"/>{packageDetails.fuelType}</span>}
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-4 pt-4 border-t">
//                 <h4 className="font-bold text-lg mb-2">Inclusions & Extra Charges</h4>
//                 <ul className="space-y-2 text-sm text-gray-700">
//                   <li className="flex items-start"><Check size={18} className="text-green-500 mr-2 mt-0.5"/> Driver Allowance, Tolls, and State Tax are included.</li>
//                   {tripDetails.tripType === 'Rental' && packageDetails.uptoHour &&
//                     <li className="flex items-start"><Check size={18} className="text-green-500 mr-2 mt-0.5"/> Package for {packageDetails.uptoHour} Hours with {packageDetails.uptoKm} km.</li>
//                   }
//                   {(tripDetails.tripType.includes('Outstation') || tripDetails.tripType.includes('Airport')) && (packageDetails.includingKm || packageDetails.packageKm) &&
//                     <li className="flex items-start"><Check size={18} className="text-green-500 mr-2 mt-0.5"/> {packageDetails.includingKm || packageDetails.packageKm} km included.</li>
//                   }
//                   <li className="mt-4 pt-4 border-t border-dashed">
//                     <h5 className="font-semibold text-gray-600 mb-2">Extra Charges (if applicable):</h5>
//                     <ul className="list-disc list-inside text-xs text-slate-500 pl-2">
//                       {extraKmRate && <li>Extra Distance: ₹{extraKmRate}/km</li>}
//                       {extraHourRate && <li>Extra Time / Waiting: ₹{extraHourRate}/hr</li>}
//                       {nightAllowance > 0 && <li>Night Allowance: ₹{nightAllowance} (11 PM - 6 AM)</li>}
//                     </ul>
//                   </li>
//                 </ul>
//               </div>
//             </div>

//             {/* Traveller Details */}
//             <div className="bg-white p-6 rounded-xl shadow-md">
//               <h3 className="font-bold text-lg mb-4">Traveller Details</h3>
//               <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <input name="fullName" value={travellerDetails.fullName} onChange={handleTravellerChange} placeholder="Full Name" className="p-3 border rounded-md"/>
//                 <select name="gender" value={travellerDetails.gender} onChange={handleTravellerChange} className="p-3 border rounded-md bg-white">
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                 </select>
//                 <input name="mobile" value={travellerDetails.mobile} onChange={handleTravellerChange} placeholder="Mobile No." className="p-3 border rounded-md"/>
//                 <input name="email" type="email" value={travellerDetails.email} onChange={handleTravellerChange} placeholder="Email ID" className="p-3 border rounded-md"/>
//               </form>
//             </div>
//           </div>

//           {/* Right Section - Payment */}
//           <div className="lg:col-span-1 space-y-6 sticky top-8">
//             <div className="bg-white p-6 rounded-xl shadow-lg">
//               <h3 className="font-bold text-xl mb-4">Payment Options</h3>
//               <div className="space-y-3">
//                 {availablePaymentOptions.advance && (
//                   <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentOption === 'advance' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}>
//                     <div className="flex justify-between items-center">
//                       <span className="font-semibold text-slate-800">Pay Advance</span>
//                       <span className="font-bold text-lg text-slate-900">₹{advanceAmount}</span>
//                     </div>
//                     <p className="text-xs text-gray-500 mt-1">Pay the rest to the driver</p>
//                     <input type="radio" name="payment" value="advance" checked={paymentOption === 'advance'} onChange={(e) => setPaymentOption(e.target.value)} className="hidden"/>
//                   </label>
//                 )}
//                 {availablePaymentOptions.full && (
//                   <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentOption === 'full' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}>
//                     <div className="flex justify-between items-center">
//                       <span className="font-semibold text-slate-800">Pay Full Amount</span>
//                       <span className="font-bold text-lg text-slate-900">₹{totalFare}</span>
//                     </div>
//                     <input type="radio" name="payment" value="full" checked={paymentOption === 'full'} onChange={(e) => setPaymentOption(e.target.value)} className="hidden"/>
//                   </label>
//                 )}
//               </div>
//               <div className="mt-6">
//                 <button onClick={handleBookingSubmit} disabled={isSubmitting} className={`w-full font-bold py-3 rounded-lg text-lg transition-colors ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'}`}>
//                   {isSubmitting ? 'Processing...' : `PAY NOW (₹${paymentOption === 'advance' ? advanceAmount : totalFare})`}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewBooking;



import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Car, Users, Snowflake, Check, ArrowLeft } from 'lucide-react';

const vehicleImages = {
    "Compact Sedan": "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png",
    "Small SUV": "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png",
    "Large SUV": "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png",
    "Ertiga, Xylo": "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png",
    "SUV": "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png",
    "Premium Business Sedan": "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png",
    "Traveller / Minivan": "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png",
    "Default": "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Hatchback_2x.png"
};

const getBookingType = (tripType) => {
    if (!tripType) return "Outstation";
    const lowerType = tripType.toLowerCase();
    if (lowerType.includes('one-way') || lowerType.includes('one way')) return "One way";
    if (lowerType.includes('rental')) return "Rental";
    if (lowerType.includes('airport')) return "Airport";
    if (lowerType.includes('multi')) return "Multi-City";
    return "Outstation";
};

const ReviewBooking = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, token } = useContext(AuthContext);
    const { packageDetails, tripDetails } = location.state || {};

    const [travellerInfo, setTravellerInfo] = useState({ fullName: '', gender: '', mobile: '', email: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [paymentOption, setPaymentOption] = useState('advance');

    useEffect(() => {
        if (user) {
            setTravellerInfo({
                fullName: user.name || '',
                mobile: user.mobile || '',
                email: user.email || '',
                gender: '',
            });
        }
    }, [user]);

    const handleTravellerChange = (e) => {
        const { name, value } = e.target;
        setTravellerInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleBookingSubmit = async () => {
        if (!travellerInfo.fullName || !travellerInfo.mobile || !travellerInfo.email) {
            return alert("Please fill all traveller details.");
        }
        setIsSubmitting(true);

        // ✅ CRITICAL UPDATE: Mapping data to the new FLAT schema
        const bookingData = {
            userName: travellerInfo.fullName,
            mobileNumber: travellerInfo.mobile,
            bookingType: getBookingType(tripDetails.tripType),
            pickupLocation: tripDetails.from,
            dropLocation: tripDetails.to,
            pickupDate: tripDetails.pickupDate,
            pickupTime: tripDetails.pickupTime,
            distance: tripDetails.distance,
            vehicleType: packageDetails.car || packageDetails.fleet || packageDetails.vehicleType,
            seater: packageDetails.seater,
            ac: packageDetails.ac ? 'AC' : 'Non-AC',
            driverNightAllowance: packageDetails.rates?.nightDrivingAllowance || packageDetails.nightDrivingCharge || 0,
            tollCharges: 'Included',
            extraKm: packageDetails.rates?.extraKmRate || packageDetails.extraKmCharge,
            extraHour: packageDetails.rates?.extraHourRate || packageDetails.waitingTimeCharge,
            totalFare: packageDetails.fare || packageDetails.packageRate,
            advanceAmount: packageDetails.advanceAmount || packageDetails.advance || 0,
            paymentMethod: paymentOption,
        };
        
        try {
            const res = await axios.post('http://localhost:5000/api/bookings', bookingData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.success) {
                navigate('/thank-you', { state: { booking: res.data.booking } });
            }
        } catch (err) {
            alert(err.response?.data?.message || "Booking failed. Please check details and try again.");
            console.error(err.response?.data || err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!packageDetails || !tripDetails) {
        return (
            <div className="text-center p-10"><h2 className="text-2xl font-bold">Oops! No booking data.</h2><button onClick={() => navigate('/')} className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg">Go Home</button></div>
        );
    }

    const vehicleTypeDisplay = packageDetails.car || packageDetails.fleet || packageDetails.vehicleType;
    const vehicleImage = vehicleImages[vehicleTypeDisplay] || vehicleImages.Default;
    const totalFare = packageDetails.fare || packageDetails.packageRate;
    const advanceAmount = packageDetails.advanceAmount || packageDetails.advance;
    const extraKmRate = packageDetails.rates?.extraKmRate || packageDetails.extraKmCharge;
    const extraHourRate = packageDetails.rates?.extraHourRate || packageDetails.waitingTimeCharge;
    const nightAllowance = packageDetails.rates?.nightDrivingAllowance || packageDetails.nightDrivingCharge;
    const includedKm = packageDetails.includingKm || packageDetails.packageKm;

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto p-4 sm:p-6">
                <button onClick={() => navigate(-1)} className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-semibold mb-4"><ArrowLeft size={16} className="mr-2"/> Back to Results</button>
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Review Your Booking</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <p className="font-semibold text-blue-600">{tripDetails.tripType}</p>
                            <h2 className="text-2xl font-bold text-gray-800 mt-1">{tripDetails.from} → {tripDetails.to}</h2>
                            <p className="text-sm text-gray-500 mt-2">Pickup: {tripDetails.pickupDate} at {tripDetails.pickupTime}</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <div className="flex items-center gap-5"><img src={vehicleImage} alt={vehicleTypeDisplay} className="h-20 w-auto object-contain"/><div><h3 className="font-bold text-xl">{vehicleTypeDisplay} <span className="text-sm text-gray-500">or similar</span></h3><div className="flex items-center flex-wrap gap-4 text-sm mt-2"><span className="flex items-center gap-1.5"><Users size={16}/>{packageDetails.seater} Seater</span>{packageDetails.ac && <span className="flex items-center gap-1.5"><Snowflake size={16}/>AC</span>}</div></div></div>
                            <div className="mt-4 pt-4 border-t"><h4 className="font-bold text-lg mb-2">Inclusions & Extra Charges</h4><ul className="space-y-1 text-sm text-gray-700"><li className="flex items-center gap-2"><Check size={16} className="text-green-500"/> Driver Allowance, Tolls, State Tax included.</li>{includedKm && <li className="flex items-center gap-2"><Check size={16} className="text-green-500"/> {includedKm} km included.</li>}</ul><div className="mt-3 pt-3 border-t border-dashed"><h5 className="font-semibold text-gray-600 mb-1">Extra Charges (if applicable):</h5><ul className="list-disc list-inside text-xs text-gray-500 pl-2">{extraKmRate > 0 && <li>Extra Distance: ₹{extraKmRate}/km</li>}{extraHourRate > 0 && <li>Extra Time/Waiting: ₹{extraHourRate}/hr</li>}{nightAllowance > 0 && <li>Night Allowance: ₹{nightAllowance} (11 PM - 6 AM)</li>}</ul></div></div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md"><h3 className="font-bold text-lg mb-4">Traveller Details</h3><div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><input name="fullName" value={travellerInfo.fullName} onChange={handleTravellerChange} placeholder="Full Name" className="p-3 border rounded-md" required/><select name="gender" value={travellerInfo.gender} onChange={handleTravellerChange} className="p-3 border rounded-md bg-white"><option value="">Select Gender</option><option value="Male">Male</option><option value="Female">Female</option></select><input name="mobile" value={travellerInfo.mobile} onChange={handleTravellerChange} placeholder="Mobile No." className="p-3 border rounded-md" required/><input name="email" type="email" value={travellerInfo.email} onChange={handleTravellerChange} placeholder="Email ID" className="p-3 border rounded-md" required/></div></div>
                    </div>
                    <div className="lg:col-span-1 space-y-6 sticky top-6">
                        <div className="bg-white p-6 rounded-xl shadow-lg"><h3 className="font-bold text-xl mb-4">Payment Options</h3><div className="space-y-3"><label className={`block p-4 border-2 rounded-lg cursor-pointer ${paymentOption === 'advance' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}><div className="flex justify-between items-center"><span className="font-semibold">Pay Advance</span><span className="font-bold text-lg">₹{advanceAmount}</span></div><p className="text-xs text-gray-500 mt-1">Pay the rest to the driver</p><input type="radio" name="payment" value="advance" checked={paymentOption === 'advance'} onChange={(e) => setPaymentOption(e.target.value)} className="hidden"/></label><label className={`block p-4 border-2 rounded-lg cursor-pointer ${paymentOption === 'full' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}><div className="flex justify-between items-center"><span className="font-semibold">Pay Full Amount</span><span className="font-bold text-lg">₹{totalFare}</span></div><input type="radio" name="payment" value="full" checked={paymentOption === 'full'} onChange={(e) => setPaymentOption(e.target.value)} className="hidden"/></label></div><div className="mt-6"><button onClick={handleBookingSubmit} disabled={isSubmitting} className="w-full font-bold py-3 rounded-lg text-lg bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-400">{isSubmitting ? 'Processing...' : `PAY NOW (₹${paymentOption === 'advance' ? advanceAmount : totalFare})`}</button></div></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewBooking;