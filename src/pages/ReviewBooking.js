

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




import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 
import axios from 'axios';
import { Car, Users, Snowflake, Check, Clock, Gauge, Moon, ArrowLeft, Droplets } from 'lucide-react';

const vehicleData = {
  Mini: { name: "Indica, Swift", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Hatchback_2x.png" },
  Sedan: { name: "Dzire, Etios", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png" },
  SUV: { name: "Ertiga, Xylo", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" },
  "SUV+": { name: "Innova Crysta", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" },
};

const ReviewBooking = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, token } = useContext(AuthContext);
    const { packageDetails, tripDetails } = location.state || {};
    
    const [travellerDetails, setTravellerDetails] = useState({ fullName: '', gender: '', mobile: '', email: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [paymentOption, setPaymentOption] = useState('advance');

    useEffect(() => {
        if (user) {
            setTravellerDetails({
                fullName: user.name || '',
                mobile: user.phone ? user.phone.replace('+91', '') : '',
                email: user.email || '',
                gender: ''
            });
        }
    }, [user]);

    const handleTravellerChange = (e) => {
        const { name, value } = e.target;
        setTravellerDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleBookingSubmit = async () => {
        if (!travellerDetails.fullName || !travellerDetails.mobile || !travellerDetails.email) {
            return alert("Please fill all traveller details.");
        }
        setIsSubmitting(true);
        const bookingData = {
            userId: user?._id,
            tripDetails,
            packageDetails,
            travellerDetails,
            paymentDetails: {
                totalFare: packageDetails.fare || packageDetails.packageCost,
                advanceAmount: packageDetails.advanceAmount || packageDetails.advance,
            }
        };

        try {
            const res = await axios.post('http://localhost:5000/api/bookings', bookingData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.success) {
                alert(res.data.message);
                navigate('/');
            }
        } catch (err) {
            alert(err.response?.data?.message || "Booking failed.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!packageDetails || !tripDetails) {
        return (
            <div className="text-center p-10">
                <h2 className="text-2xl font-bold">Oops! Something went wrong.</h2>
                <button onClick={() => navigate(-1)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Go Back</button>
            </div>
        );
    }
    
    const carType = packageDetails.car || packageDetails.fleet || packageDetails.vehicleType;
    const carInfo = vehicleData[carType] || vehicleData.Mini;
    const totalFare = packageDetails.fare || packageDetails.packageCost || packageDetails.packageRate;
    const advanceAmount = packageDetails.advanceAmount || packageDetails.advance;
    
    // Safely get extra charge details for ANY package type
    const extraKmRate = packageDetails.rates?.extraKmRate || packageDetails.extraKmRate || packageDetails.extraKmCharge;
    const extraHourRate = packageDetails.rates?.extraHourRate || packageDetails.extraHourRate || packageDetails.waitingTimeCharge;
    const nightAllowance = packageDetails.rates?.nightDrivingAllowance || packageDetails.nightDrivingAllowance || packageDetails.nightDrivingCharge;

    return (
        <div className="bg-slate-100 min-h-screen">
            <div className="max-w-6xl mx-auto p-4 sm:p-8">
                <button onClick={() => navigate(-1)} className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors mb-4">
                    <ArrowLeft size={16} className="mr-2"/>
                    Back to Results
                </button>
                <h1 className="text-3xl font-bold text-slate-800 mb-6">Review Your Booking</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Left Side */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Trip Details Card */}
                        <div className="bg-white p-6 rounded-xl shadow-md">
                           <p className="font-semibold text-lg text-blue-600">{tripDetails.tripType}</p>
                           <h2 className="text-2xl font-bold text-slate-800">{tripDetails.from} → {tripDetails.to}</h2>
                           <div className="mt-2 pt-2 border-t text-sm text-slate-700">
                                <span className="font-semibold">Pickup:</span> {tripDetails.pickupDate} at {tripDetails.pickupTime}
                           </div>
                        </div>

                        {/* Car & Package Details Card */}
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <div className="flex items-center gap-4">
                                <img src={carInfo.image} alt={carInfo.name} className="h-24"/>
                                <div>
                                    <h3 className="font-bold text-xl">{carInfo.name} <span className="text-sm text-gray-500">or similar</span></h3>
                                    <div className="flex items-center flex-wrap gap-4 text-sm mt-2">
                                        <span className="flex items-center"><Car size={16} className="mr-1.5"/>{carType}</span>
                                        <span className="flex items-center"><Users size={16} className="mr-1.5"/>{packageDetails.seater} Seater</span>
                                        {packageDetails.ac && <span className="flex items-center"><Snowflake size={16} className="mr-1.5"/>AC</span>}
                                        {packageDetails.fuelType && <span className="flex items-center"><Droplets size={16} className="mr-1.5"/>{packageDetails.fuelType}</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t">
                                <h4 className="font-bold text-lg mb-2">Inclusions & Extra Charges</h4>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    <li className="flex items-start"><Check size={18} className="text-green-500 mr-2 mt-0.5"/> <span>Driver Allowance, Tolls, and State Tax are included.</span></li>
                                    
                                    {packageDetails.includingKm && <li className="flex items-start"><Check size={18} className="text-green-500 mr-2 mt-0.5"/> <span>{packageDetails.includingKm} km included.</span></li>}
                                    {packageDetails.uptoHour && <li className="flex items-start"><Check size={18} className="text-green-500 mr-2 mt-0.5"/> <span>Package for {packageDetails.uptoHour} Hours with {packageDetails.uptoKm} km.</span></li>}
                                    {packageDetails.packageKm && <li className="flex items-start"><Check size={18} className="text-green-500 mr-2 mt-0.5"/> <span>Airport package includes {packageDetails.packageKm} km.</span></li>}
                                    
                                    <li className="mt-4 pt-4 border-t border-dashed">
                                        <h5 className="font-semibold text-gray-600 mb-2">Extra Charges (if applicable):</h5>
                                        <ul className="list-disc list-inside text-xs text-slate-500 pl-2">
                                            {extraKmRate && <li>Extra Distance: ₹{extraKmRate}/km</li>}
                                            {extraHourRate && <li>Extra Time / Waiting: ₹{extraHourRate}/hr</li>}
                                            {nightAllowance > 0 && <li>Night Allowance: ₹{nightAllowance} (for driving between 11 PM - 6 AM)</li>}
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        {/* Traveller Details Card */}
                        <div className="bg-white p-6 rounded-xl shadow-md">
                           <h3 className="font-bold text-lg mb-4">Traveller Details</h3>
                             <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input name="fullName" value={travellerDetails.fullName} onChange={handleTravellerChange} placeholder="Full Name" className="p-3 border rounded-md"/>
                                <select name="gender" value={travellerDetails.gender} onChange={handleTravellerChange} className="p-3 border rounded-md bg-white">
                                    <option value="">Select Gender</option><option value="Male">Male</option><option value="Female">Female</option>
                                </select>
                                <input name="mobile" value={travellerDetails.mobile} onChange={handleTravellerChange} placeholder="Mobile No." className="p-3 border rounded-md"/>
                                <input name="email" type="email" value={travellerDetails.email} onChange={handleTravellerChange} placeholder="Email ID" className="p-3 border rounded-md"/>
                             </form>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="lg:col-span-1 space-y-6 sticky top-8">
                         <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h3 className="font-bold text-xl mb-4">Payment Options</h3>
                            <div className="space-y-3">
                               <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentOption === 'advance' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                                  <div className="flex justify-between items-center">
                                    <span className="font-semibold text-slate-800">Pay Advance</span>
                                    <span className="font-bold text-lg text-slate-900">₹{advanceAmount}</span>
                                  </div>
                                  <p className="text-xs text-gray-500 mt-1">Pay the rest to the driver</p>
                                  <input type="radio" name="payment" value="advance" checked={paymentOption === 'advance'} onChange={(e) => setPaymentOption(e.target.value)} className="hidden"/>
                               </label>
                               <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentOption === 'full' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                                  <div className="flex justify-between items-center">
                                    <span className="font-semibold text-slate-800">Pay Full Amount</span>
                                    <span className="font-bold text-lg text-slate-900">₹{totalFare}</span>
                                  </div>
                                  <input type="radio" name="payment" value="full" checked={paymentOption === 'full'} onChange={(e) => setPaymentOption(e.target.value)} className="hidden"/>
                               </label>
                            </div>
                            <div className="mt-6">
                                <button onClick={handleBookingSubmit} disabled={isSubmitting} className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 disabled:bg-gray-400 text-lg">
                                    {isSubmitting ? 'Processing...' : `PAY NOW (₹${paymentOption === 'advance' ? advanceAmount : totalFare})`}
                                </button>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ReviewBooking;