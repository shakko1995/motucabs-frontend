// import React, { useState, useEffect, useMemo } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Star, ArrowLeft, Car, Users, ShieldCheck, CalendarDays, Clock, Gauge, Moon, Filter, X, TrendingUp, TrendingDown } from 'lucide-react';

// const vehicleData = {
//   Mini: { name: "Indica, Swift", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Hatchback_2x.png" },
//   Sedan: { name: "Dzire, Etios", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png" },
//   SUV: { name: "Ertiga, Xylo", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" },
//   "SUV+": { name: "Innova Crysta", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" },
// };

// const RoundTripCabCard = ({ packageDetails, tripDays, isRecommended }) => {
//     const carInfo = vehicleData[packageDetails.fleet] || vehicleData.Mini;
//     const totalEstimatedPrice = packageDetails.packagePerDay * tripDays;
//     const totalIncludedKm = packageDetails.includingKm * tripDays;
//     const totalIncludedHours = packageDetails.includingHour * tripDays;

//     return (
//       <div className={`relative bg-white rounded-xl shadow-lg p-5 flex flex-col sm:flex-row items-center gap-5 border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isRecommended ? 'border-blue-500' : 'border-transparent'}`}>
//          {isRecommended && (<div className="absolute -top-3 left-4 bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full flex items-center shadow-md"><ShieldCheck size={14} className="mr-1.5"/> Recommended</div>)}
//         <div className="flex-shrink-0 w-full sm:w-1/4 text-center"><img src={carInfo.image} alt={carInfo.name} className="mx-auto h-28 object-contain" /></div>
//         <div className="flex-grow w-full sm:w-2/4">
//           <h3 className="font-extrabold text-2xl text-slate-800">{carInfo.name}</h3>
//           <p className="text-sm text-slate-500">or similar</p>
//           <div className="flex flex-wrap items-center gap-3 mt-4 text-sm font-medium">
//               <span className="flex items-center text-slate-700"><Car size={16} className="mr-1.5 text-blue-500"/>{packageDetails.fleet}</span>
//               <span className="flex items-center text-slate-700"><Users size={16} className="mr-1.5 text-blue-500"/>{packageDetails.seater || 4} Seater</span>
//           </div>
//           <p className="text-sm text-slate-600 font-semibold mt-2 pt-2 border-t border-dashed">
//             Includes: {totalIncludedKm} km & {totalIncludedHours} Hours for {tripDays} Day(s)
//           </p>
//           <div className="mt-3 text-xs text-slate-500 space-y-1 border-t pt-2">
//             <p className="flex items-center"><Gauge size={14} className="mr-2 text-gray-400"/> Extra Fare: ₹{packageDetails.extraKmRate}/km</p>
//             <p className="flex items-center"><Clock size={14} className="mr-2 text-gray-400"/> Extra Hour: ₹{packageDetails.extraHourRate}/hr</p>
//             <p className="flex items-center"><Moon size={14} className="mr-2 text-gray-400" /> Night Allowance: ₹{packageDetails.nightDrivingAllowance}</p>
//           </div>
//         </div>
//         <div className="w-full sm:w-1/4 text-center sm:text-right border-t sm:border-t-0 sm:border-l-2 border-dashed pl-0 sm:pl-5 pt-4 sm:pt-0">
//           <p className="text-sm text-slate-500 font-medium">Total Estimated Price</p>
//           <span className="text-4xl font-extrabold text-slate-900">₹{totalEstimatedPrice.toLocaleString('en-IN')}</span>
//           <p className="text-xs text-slate-500 font-medium my-2">Advance: ₹{packageDetails.advance}</p>
//           <button className="w-full sm:w-auto bg-orange-500 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-orange-600 transition-all duration-300 transform hover:scale-105">SELECT</button>
//         </div>
//       </div>
//     );
// };

// const FilterPanel = ({ sortBy, setSortBy, filters, handleFilterChange, onClose }) => (
//     <div className="bg-white p-5 rounded-xl shadow-lg h-full">
//        <div className="flex justify-between items-center border-b-2 border-slate-100 pb-3">
//             <h3 className="font-bold text-xl text-slate-800">Filter & Sort</h3>
//             <button onClick={onClose} className="lg:hidden text-slate-500 hover:text-slate-800"><X size={24} /></button>
//        </div>
//        <div className="mt-4">
//           <h4 className="font-semibold text-slate-600 mb-2 text-sm">SORT BY</h4>
//           <div className="flex flex-col space-y-1">
//               <button onClick={() => setSortBy('price_asc')} className={`flex items-center text-left text-sm p-3 rounded-lg font-medium transition-colors ${sortBy === 'price_asc' ? 'bg-blue-600 text-white shadow' : 'text-slate-700 hover:bg-slate-100'}`}><TrendingUp size={16} className="mr-2"/> Price/Day: Low to High</button>
//               <button onClick={() => setSortBy('price_desc')} className={`flex items-center text-left text-sm p-3 rounded-lg font-medium transition-colors ${sortBy === 'price_desc' ? 'bg-blue-600 text-white shadow' : 'text-slate-700 hover:bg-slate-100'}`}><TrendingDown size={16} className="mr-2"/> Price/Day: High to Low</button>
//           </div>
//        </div>
//        <div className="mt-6">
//           <h4 className="font-semibold text-slate-600 mb-2 text-sm">CAR TYPE</h4>
//           <div className="flex flex-col space-y-1">
//              <button onClick={() => handleFilterChange('fleet', 'all')} className={`text-left text-sm p-3 rounded-lg font-medium transition-colors ${filters.fleet === 'all' ? 'bg-blue-600 text-white shadow' : 'text-slate-700 hover:bg-slate-100'}`}>All Types</button>
//              <button onClick={() => handleFilterChange('fleet', 'Mini')} className={`text-left text-sm p-3 rounded-lg font-medium transition-colors ${filters.fleet === 'Mini' ? 'bg-blue-600 text-white shadow' : 'text-slate-700 hover:bg-slate-100'}`}>Mini</button>
//              <button onClick={() => handleFilterChange('fleet', 'Sedan')} className={`text-left text-sm p-3 rounded-lg font-medium transition-colors ${filters.fleet === 'Sedan' ? 'bg-blue-600 text-white shadow' : 'text-slate-700 hover:bg-slate-100'}`}>Sedan</button>
//              <button onClick={() => handleFilterChange('fleet', 'SUV')} className={`text-left text-sm p-3 rounded-lg font-medium transition-colors ${filters.fleet === 'SUV' ? 'bg-blue-600 text-white shadow' : 'text-slate-700 hover:bg-slate-100'}`}>SUV</button>
//           </div>
//        </div>
//     </div>
// );

// const OutstationRoundTripCabs = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [tripDays, setTripDays] = useState(1);
//   const [tripDuration, setTripDuration] = useState({ days: 0, hours: 0, minutes: 0 });
//   const [sortBy, setSortBy] = useState('price_asc');
//   const [filters, setFilters] = useState({ fleet: 'all' });
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

//   const from = searchParams.get('from');
//   const to = searchParams.get('to');
//   const date = searchParams.get('date');
//   const time = searchParams.get('time');
//   const returnDate = searchParams.get('returnDate');
//   const returnTime = searchParams.get('returnTime');

//   useEffect(() => {
//     if (date && time && returnDate && returnTime) {
//         const startDate = new Date(`${date}T${time}`);
//         const endDate = new Date(`${returnDate}T${returnTime}`);
//         if (endDate > startDate) {
//             let diffMs = endDate - startDate;
//             const days = Math.floor(diffMs / 86400000);
//             diffMs -= days * 86400000;
//             const hours = Math.floor(diffMs / 3600000);
//             diffMs -= hours * 3600000;
//             const minutes = Math.floor(diffMs / 60000);
//             setTripDuration({ days, hours, minutes });
//         }
//     }
//     if (date && returnDate) {
//         const startDateOnly = new Date(date);
//         const endDateOnly = new Date(returnDate);
//         const diffTime = Math.abs(endDateOnly - startDateOnly);
//         const diffDays = Math.ceil(diffTime / 86400000);
//         setTripDays(diffDays === 0 ? 1 : diffDays);
//     }
//     const fetchPackages = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get('http://localhost:5000/api/outstation-roundtrip');
//         setPackages(res.data.data);
//       } catch (err) {
//         setError('Failed to load details.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPackages();
//   }, [date, time, returnDate, returnTime]);

//   const displayedPackages = useMemo(() => {
//     if (!packages) return [];
//     let filtered = [...packages];
//     if (filters.fleet !== 'all') {
//         filtered = filtered.filter(pkg => pkg.fleet === filters.fleet);
//     }
//     filtered.sort((a, b) => (sortBy === 'price_asc' ? a.packagePerDay - b.packagePerDay : b.packagePerDay - a.packagePerDay));
//     if (filtered.length > 0) filtered[0].isRecommended = true;
//     return filtered;
//   }, [packages, sortBy, filters]);

//   const handleFilterChange = (type, value) => setFilters(prev => ({ ...prev, [type]: value }));

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="bg-slate-100 min-h-screen">
//       <div className="max-w-7xl mx-auto p-4 sm:p-6">
//         {isFilterOpen && <div onClick={() => setIsFilterOpen(false)} className="fixed inset-0 bg-black/40 z-40 lg:hidden"></div>}
//         <div className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 lg:hidden ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}`}>
//             <FilterPanel sortBy={sortBy} setSortBy={setSortBy} filters={filters} handleFilterChange={handleFilterChange} onClose={() => setIsFilterOpen(false)} />
//         </div>
//         <div className="mb-6 flex justify-between items-center">
//             <button onClick={() => navigate(-1)} className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors"><ArrowLeft size={16} className="mr-2"/>Edit Search</button>
//             <button onClick={() => setIsFilterOpen(true)} className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border rounded-lg shadow font-semibold"><Filter size={16} /> Filters</button>
//         </div>
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           <aside className="hidden lg:block lg:col-span-1">
//             <div className="sticky top-6">
//                 <FilterPanel sortBy={sortBy} setSortBy={setSortBy} filters={filters} handleFilterChange={handleFilterChange} />
//             </div>
//           </aside>
//           <main className="lg:col-span-3">
//             <div className="bg-white p-5 rounded-xl shadow-lg mb-6">
//               <h1 className="text-3xl font-extrabold text-slate-900">Available Round Trip Cabs</h1>
//               <p className="text-slate-600 mt-1">{from} → {to}</p>
//               <div className="mt-2 pt-2 border-t text-sm text-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-2">
//                 <span><span className="font-semibold">Pickup:</span> {date} at {time}</span>
//                 <span><span className="font-semibold">Return:</span> {returnDate} at {returnTime}</span>
//               </div>
//               <div className="mt-2 pt-2 border-t flex items-center text-blue-600 font-bold">
//                 <Clock size={18} className="mr-2"/>
//                 <span>Total Trip Duration: {tripDuration.days} Day(s), {tripDuration.hours} Hour(s)</span>
//               </div>
//             </div>
//             {displayedPackages.length > 0 ? (
//               <div className="space-y-6">
//                 {displayedPackages.map(pkg => (<RoundTripCabCard key={pkg._id} packageDetails={pkg} tripDays={tripDays} isRecommended={pkg.isRecommended} />))}
//               </div>
//             ) : (
//               <div className="text-center p-12 bg-white rounded-xl shadow-lg">
//                 <p className="mt-4 font-semibold text-xl text-slate-800">No Cabs Found</p>
//               </div>
//             )}
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default OutstationRoundTripCabs;

// import React, { useState, useEffect, useMemo } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Star, ArrowLeft, Car, Users, ShieldCheck, CalendarDays } from 'lucide-react';

// const vehicleData = {
//   Mini: { name: "Indica, Swift", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Hatchback_2x.png" },
//   Sedan: { name: "Dzire, Etios", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png" },
//   SUV: { name: "Ertiga, Xylo", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" },
//   "SUV+": { name: "Innova Crysta", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" },
// };

// // Cab Card Component
// const RoundTripCabCard = ({ packageDetails }) => {
//     const carInfo = vehicleData[packageDetails.car] || vehicleData.Mini;
//     return (
//       <div className={`relative bg-white rounded-xl shadow-lg p-5 flex flex-col sm:flex-row items-center gap-5 border-2 border-transparent transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
//         <div className="flex-shrink-0 w-full sm:w-1/4 text-center"><img src={carInfo.image} alt={carInfo.name} className="mx-auto h-28 object-contain" /></div>
//         <div className="flex-grow w-full sm:w-2/4">
//           <h3 className="font-extrabold text-2xl text-slate-800">{carInfo.name}</h3>
//           <p className="text-sm text-slate-500">or similar</p>
//           <div className="flex flex-wrap items-center gap-3 mt-4 text-sm font-medium">
//               <span className="flex items-center text-slate-700"><Car size={16} className="mr-1.5 text-blue-500"/>{packageDetails.car}</span>
//           </div>
//           <p className="text-sm text-slate-600 font-semibold mt-2 pt-2 border-t border-dashed">
//             Includes: {packageDetails.includingKm} km for {packageDetails.noOfDays} Day(s)
//           </p>
//         </div>
//         <div className="w-full sm:w-1/4 text-center sm:text-right border-t sm:border-t-0 sm:border-l-2 border-dashed pl-0 sm:pl-5 pt-4 sm:pt-0">
//           <p className="text-sm text-slate-500 font-medium">Total Fare</p>
//           <span className="text-4xl font-extrabold text-slate-900">₹{packageDetails.fare.toLocaleString('en-IN')}</span>
//           <p className="text-xs text-slate-500 font-medium my-2">Extra Km: ₹{packageDetails.extraKmRate}/km</p>
//           <button className="w-full sm:w-auto bg-orange-500 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-orange-600 transition-all duration-300 transform hover:scale-105">SELECT</button>
//         </div>
//       </div>
//     );
// };


// // Main Page Component
// const OutstationRoundTripCabs = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [tripDays, setTripDays] = useState(1);

//   const from = searchParams.get('from');
//   const to = searchParams.get('to');
//   const pickupDate = searchParams.get('pickupDate');
//   const dropDate = searchParams.get('dropDate');

//   useEffect(() => {
//     // Calculate the number of days for display
//     if (pickupDate && dropDate) {
//         const startDate = new Date(pickupDate);
//         const endDate = new Date(dropDate);
//         const diffTime = Math.abs(endDate - startDate);
//         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
//         setTripDays(diffDays);
//     }

//     const fetchPackages = async () => {
//       try {
//         setLoading(true);
//         // Extract state from the 'from' location to send to the backend
//         const state = from.split(',')[1]?.trim() || "Unknown";

//         // Call the backend API with the calculated days and state
//         const res = await axios.get('http://localhost:5000/api/outstation-roundtrip', {
//             params: {
//                 state: state,
//                 pickupDate: pickupDate,
//                 dropDate: dropDate,
//             }
//         });
//         setPackages(res.data.data);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to load details.');
//         setPackages([]); // Ensure packages are cleared on error
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (from && to && pickupDate && dropDate) {
//         fetchPackages();
//     }
//   }, [from, to, pickupDate, dropDate]);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="bg-slate-100 min-h-screen">
//       <div className="max-w-4xl mx-auto p-4 sm:p-6">
//         <div className="bg-white p-5 rounded-xl shadow-lg mb-6">
//           <button onClick={() => navigate(-1)} className="flex items-center text-sm text-blue-600 hover:underline font-semibold mb-3">
//             <ArrowLeft size={16} className="mr-2"/>Edit Search
//           </button>
//           <h1 className="text-3xl font-extrabold text-slate-900">Available Round Trip Cabs</h1>
//           <p className="text-slate-600 mt-1">{from} → {to}</p>
//           <div className="mt-2 pt-2 border-t flex items-center text-blue-600 font-bold">
//             <CalendarDays size={18} className="mr-2"/>
//             <span>Trip Duration: {tripDays} Day(s)</span>
//           </div>
//         </div>
        
//         {error && <div className="text-center p-12 bg-red-50 text-red-700 rounded-xl shadow-lg"><p>{error}</p></div>}

//         {!error && packages.length > 0 && (
//           <div className="space-y-6">
//             {packages.map(pkg => (
//               <RoundTripCabCard key={pkg._id} packageDetails={pkg} />
//             ))}
//           </div>
//         )}
        
//         {!loading && !error && packages.length === 0 && (
//           <div className="text-center p-12 bg-white rounded-xl shadow-lg">
//             <p className="mt-4 font-semibold text-xl text-slate-800">No Packages Found</p>
//             <p className="text-slate-500 mt-1">Sorry, no packages match your search criteria for a {tripDays}-day trip.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
// export default OutstationRoundTripCabs;


// import React, { useState, useEffect, useMemo } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Star, ArrowLeft, Car, Users, ShieldCheck, CalendarDays } from 'lucide-react';

// const vehicleData = {
//   Mini: { name: "Indica, Swift", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Hatchback_2x.png" },
//   Sedan: { name: "Dzire, Etios", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png" },
//   SUV: { name: "Ertiga, Xylo", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" },
//   "SUV+": { name: "Innova Crysta", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" },
// };

// const RoundTripCabCard = ({ packageDetails }) => {
//     const carInfo = vehicleData[packageDetails.car] || vehicleData.Mini;
//     return (
//       <div className="bg-white rounded-xl shadow-lg p-5 flex flex-col sm:flex-row items-center gap-5 border-2 border-transparent">
//         <div className="flex-shrink-0 w-full sm:w-1/4 text-center">
//             <img src={carInfo.image} alt={carInfo.name} className="mx-auto h-28 object-contain" />
//         </div>
//         <div className="flex-grow w-full sm:w-2/4">
//           <h3 className="font-extrabold text-2xl text-slate-800">{carInfo.name}</h3>
//           <p className="text-sm text-slate-500">or similar</p>
//           <p className="text-sm text-slate-600 font-semibold mt-2 pt-2 border-t border-dashed">
//             Package for {packageDetails.noOfDays} Day(s), Includes {packageDetails.includingKm} km
//           </p>
//         </div>
//         <div className="w-full sm:w-1/4 text-center sm:text-right border-t sm:border-t-0 sm:border-l-2 border-dashed pl-0 sm:pl-5 pt-4 sm:pt-0">
//           <p className="text-sm text-slate-500 font-medium">Total Fare</p>
//           <span className="text-4xl font-extrabold text-slate-900">₹{packageDetails.fare.toLocaleString('en-IN')}</span>
//           <p className="text-xs text-slate-500 font-medium my-2">Extra: ₹{packageDetails.extraKmRate}/km</p>
//           <button className="w-full sm:w-auto bg-orange-500 text-white font-bold py-3 px-8 rounded-lg shadow-md">SELECT</button>
//         </div>
//       </div>
//     );
// };

// const OutstationRoundTripCabs = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [tripDays, setTripDays] = useState(0);

//   const from = searchParams.get('from');
//   const to = searchParams.get('to');
//   const pickupDate = searchParams.get('pickupDate');
//   const dropDate = searchParams.get('dropDate');

//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         setLoading(true);
       
//         const state = from.split(',')[1]?.trim();

       
//         const res = await axios.get('http://localhost:5000/api/outstation-roundtrip', {
//             params: {
//                 state: state,
//                 pickupDate: pickupDate,
//                 dropDate: dropDate,
//             }
//         });

//         if (res.data.success) {
//             setPackages(res.data.data);
            
//             if (res.data.data.length > 0) {
//                 setTripDays(res.data.data[0].noOfDays);
//             }
//         }
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to load details.');
//         setPackages([]);
//       } finally {
//         setLoading(false); 
//       }
//     };

//     if (from && to && pickupDate && dropDate) {
//         fetchPackages();
//     } else {
//         setLoading(false);
//         setError("Missing search details. Please go back and search again.");
//     }
//   }, [from, to, pickupDate, dropDate]);

//   if (loading) return <div className="text-center p-20 text-lg font-semibold">Finding best cabs for your trip...</div>;
  
//   return (
//     <div className="bg-slate-100 min-h-screen">
//       <div className="max-w-4xl mx-auto p-4 sm:p-6">
//         <div className="bg-white p-5 rounded-xl shadow-lg mb-6">
//           <button onClick={() => navigate(-1)} className="flex items-center text-sm text-blue-600 hover:underline font-semibold mb-3">
//             <ArrowLeft size={16} className="mr-2"/>Edit Search
//           </button>
//           <h1 className="text-3xl font-extrabold text-slate-900">Available Round Trip Cabs</h1>
//           <p className="text-slate-600 mt-1">{from} → {to}</p>
//           {tripDays > 0 && (
//             <div className="mt-2 pt-2 border-t flex items-center text-blue-600 font-bold">
//               <CalendarDays size={18} className="mr-2"/>
//               <span>Trip Duration: {tripDays} Day(s)</span>
//             </div>
//           )}
//         </div>
        
//         {error && <div className="text-center p-12 bg-white rounded-xl shadow-lg"><p className="text-red-600">{error}</p></div>}

//         {!loading && !error && packages.length > 0 && (
//           <div className="space-y-6">
//             {packages.map(pkg => (
//               <RoundTripCabCard key={pkg._id} packageDetails={pkg} />
//             ))}
//           </div>
//         )}
        
//         {!loading && !error && packages.length === 0 && (
//            <div className="text-center p-12 bg-white rounded-xl shadow-lg">
//              <p className="mt-4 font-semibold text-xl text-slate-800">No Packages Found</p>
//              <p className="text-slate-500 mt-1">Sorry, no packages match your search criteria for a {tripDays}-day trip.</p>
//            </div>
//         )}
//       </div>
//     </div>
//   );
// };
// export default OutstationRoundTripCabs;

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Star, ArrowLeft, Car, Users, ShieldCheck, CalendarDays, Filter, X, TrendingUp, TrendingDown, Gauge, Clock, Moon } from 'lucide-react';

const vehicleData = {
  Mini: { name: "Indica, Swift", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Hatchback_2x.png" },
  Sedan: { name: "Dzire, Etios", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png" },
  SUV: { name: "Ertiga, Xylo", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" },
  "SUV+": { name: "Innova Crysta", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" },
};

const RoundTripCabCard = ({ packageDetails, isRecommended }) => {
    const carInfo = vehicleData[packageDetails.car] || vehicleData.Mini;
    return (
      <div className={`relative bg-white rounded-xl shadow-lg p-5 flex flex-col sm:flex-row items-center gap-5 border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isRecommended ? 'border-blue-500' : 'border-transparent'}`}>
         {isRecommended && (<div className="absolute -top-3 left-4 bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full flex items-center shadow-md"><ShieldCheck size={14} className="mr-1.5"/> Recommended</div>)}
        <div className="flex-shrink-0 w-full sm:w-1/4 text-center"><img src={carInfo.image} alt={carInfo.name} className="mx-auto h-28 object-contain" /></div>
        <div className="flex-grow w-full sm:w-2/4">
          <h3 className="font-extrabold text-2xl text-slate-800">{carInfo.name}</h3>
          <p className="text-sm text-slate-500">or similar</p>
          <div className="flex flex-wrap items-center gap-3 mt-4 text-sm font-medium">
              <span className="flex items-center text-slate-700"><Car size={16} className="mr-1.5 text-blue-500"/>{packageDetails.car}</span>
          </div>
          <p className="text-sm text-slate-600 font-semibold mt-2 pt-2 border-t border-dashed">
            Package for {packageDetails.noOfDays} Day(s) - Includes {packageDetails.includingKm} km
          </p>
          <div className="mt-3 text-xs text-slate-500 space-y-1 border-t pt-2">
            <p className="flex items-center"><Gauge size={14} className="mr-2 text-gray-400"/> Extra Fare: ₹{packageDetails.extraKmRate}/km</p>
            <p className="flex items-center"><Clock size={14} className="mr-2 text-gray-400"/> Extra Hour: ₹{packageDetails.extraHourRate}/hr</p>
            <p className="flex items-center"><Moon size={14} className="mr-2 text-gray-400"/> Night Allowance: ₹{packageDetails.nightDrivingAllowance}</p>
          </div>
        </div>
        <div className="w-full sm:w-1/4 text-center sm:text-right border-t sm:border-t-0 sm:border-l-2 border-dashed pl-0 sm:pl-5 pt-4 sm:pt-0">
          <p className="text-sm text-slate-500 font-medium">Total Fare</p>
          <span className="text-4xl font-extrabold text-slate-900">₹{packageDetails.fare.toLocaleString('en-IN')}</span>
          <button className="w-full mt-4 sm:w-auto bg-orange-500 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-orange-600 transition-all duration-300 transform hover:scale-105">SELECT</button>
        </div>
      </div>
    );
};

const FilterPanel = ({ sortBy, setSortBy, filters, handleFilterChange, onClose }) => (
    <div className="bg-white p-5 rounded-xl shadow-lg h-full">
       <div className="flex justify-between items-center border-b-2 border-slate-100 pb-3">
            <h3 className="font-bold text-xl text-slate-800">Filter & Sort</h3>
            <button onClick={onClose} className="lg:hidden text-slate-500 hover:text-slate-800"><X size={24} /></button>
       </div>
       <div className="mt-4">
          <h4 className="font-semibold text-slate-600 mb-2 text-sm">SORT BY</h4>
          <div className="flex flex-col space-y-1">
              <button onClick={() => setSortBy('price_asc')} className={`flex items-center text-left text-sm p-3 rounded-lg font-medium transition-colors ${sortBy === 'price_asc' ? 'bg-blue-600 text-white shadow' : 'text-slate-700 hover:bg-slate-100'}`}><TrendingUp size={16} className="mr-2"/> Fare: Low to High</button>
              <button onClick={() => setSortBy('price_desc')} className={`flex items-center text-left text-sm p-3 rounded-lg font-medium transition-colors ${sortBy === 'price_desc' ? 'bg-blue-600 text-white shadow' : 'text-slate-700 hover:bg-slate-100'}`}><TrendingDown size={16} className="mr-2"/> Fare: High to Low</button>
          </div>
       </div>
       <div className="mt-6">
          <h4 className="font-semibold text-slate-600 mb-2 text-sm">CAR TYPE</h4>
          <div className="flex flex-col space-y-1">
             <button onClick={() => handleFilterChange('car', 'all')} className={`text-left text-sm p-3 rounded-lg font-medium transition-colors ${filters.car === 'all' ? 'bg-blue-600 text-white shadow' : 'text-slate-700 hover:bg-slate-100'}`}>All</button>
             <button onClick={() => handleFilterChange('car', 'Mini')} className={`text-left text-sm p-3 rounded-lg font-medium transition-colors ${filters.car === 'Mini' ? 'bg-blue-600 text-white shadow' : 'text-slate-700 hover:bg-slate-100'}`}>Mini</button>
             <button onClick={() => handleFilterChange('car', 'Sedan')} className={`text-left text-sm p-3 rounded-lg font-medium transition-colors ${filters.car === 'Sedan' ? 'bg-blue-600 text-white shadow' : 'text-slate-700 hover:bg-slate-100'}`}>Sedan</button>
             <button onClick={() => handleFilterChange('car', 'SUV')} className={`text-left text-sm p-3 rounded-lg font-medium transition-colors ${filters.car === 'SUV' ? 'bg-blue-600 text-white shadow' : 'text-slate-700 hover:bg-slate-100'}`}>SUV</button>
          </div>
       </div>
    </div>
);

const OutstationRoundTripCabs = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tripDays, setTripDays] = useState(0);
  const [sortBy, setSortBy] = useState('price_asc');
  const [filters, setFilters] = useState({ car: 'all' });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const pickupDate = searchParams.get('pickupDate');
  const dropDate = searchParams.get('dropDate');

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const state = from.split(',')[1]?.trim();
        const res = await axios.get('http://localhost:5000/api/outstation-roundtrip', {
            params: { state, pickupDate, dropDate }
        });
        if (res.data.success) {
            setPackages(Array.isArray(res.data.data) ? res.data.data : []);
            if (res.data.data.length > 0) {
                setTripDays(res.data.data[0].noOfDays);
            }
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load details.');
        setPackages([]);
      } finally {
        setLoading(false);
      }
    };

    if (from && to && pickupDate && dropDate) {
        fetchPackages();
    } else {
        setLoading(false);
        setError("Missing search details. Please go back and search again.");
    }
  }, [from, to, pickupDate, dropDate]);

  const displayedPackages = useMemo(() => {
    if (!packages) return [];
    let filtered = [...packages];

    if (filters.car !== 'all') {
        filtered = filtered.filter(pkg => pkg.car === filters.car);
    }
    
    filtered.sort((a, b) => (sortBy === 'price_asc' ? a.fare - b.fare : b.fare - a.fare));
    
    if (filtered.length > 0) filtered[0].isRecommended = true;

    return filtered;
  }, [packages, sortBy, filters]);

  const handleFilterChange = (type, value) => setFilters(prev => ({ ...prev, [type]: value }));

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {isFilterOpen && <div onClick={() => setIsFilterOpen(false)} className="fixed inset-0 bg-black/40 z-40 lg:hidden"></div>}
        <div className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 lg:hidden ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <FilterPanel sortBy={sortBy} setSortBy={setSortBy} filters={filters} handleFilterChange={handleFilterChange} onClose={() => setIsFilterOpen(false)} />
        </div>
        <div className="mb-6 flex justify-between items-center">
            <button onClick={() => navigate(-1)} className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors"><ArrowLeft size={16} className="mr-2"/>Edit Search</button>
            <button onClick={() => setIsFilterOpen(true)} className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border rounded-lg shadow font-semibold"><Filter size={16} /> Filters</button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-6">
                <FilterPanel sortBy={sortBy} setSortBy={setSortBy} filters={filters} handleFilterChange={handleFilterChange} />
            </div>
          </aside>
          <main className="lg:col-span-3">
            <div className="bg-white p-5 rounded-xl shadow-lg mb-6">
              <h1 className="text-3xl font-extrabold text-slate-900">Available Round Trip Cabs</h1>
              <p className="text-slate-600 mt-1">{from} → {to}</p>
              {tripDays > 0 && (
                <div className="mt-2 pt-2 border-t flex items-center text-blue-600 font-bold">
                  <CalendarDays size={18} className="mr-2"/>
                  <span>Trip Duration: {tripDays} Day(s)</span>
                </div>
              )}
            </div>
            {error && <div className="text-center p-12 bg-white rounded-xl shadow-lg"><p className="text-red-600">{error}</p></div>}
            {!error && packages.length > 0 && (
              <div className="space-y-6">
                {displayedPackages.map(pkg => (<RoundTripCabCard key={pkg._id} packageDetails={pkg} isRecommended={pkg.isRecommended} />))}
              </div>
            )}
            {!loading && !error && packages.length === 0 && (
               <div className="text-center p-12 bg-white rounded-xl shadow-lg">
                 <p className="mt-4 font-semibold text-xl text-slate-800">No Packages Found</p>
                 <p className="text-slate-500 mt-1">Sorry, no packages match your search criteria for a {tripDays}-day trip.</p>
               </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
export default OutstationRoundTripCabs;