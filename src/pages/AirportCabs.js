
// import React, { useState, useEffect, useMemo } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Star, ArrowLeft, Car, Snowflake, Users, ShieldCheck, TrendingUp, TrendingDown, Filter, X, Gauge, Clock, Moon } from 'lucide-react';

// const vehicleData = {
//   Mini: { name: "Indica, Swift", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Hatchback_2x.png" },
//   Sedan: { name: "Dzire, Etios", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png" },
//   SUV: { name: "Ertiga, Xylo", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" },
// };

// // ===================================================================
// // Cab Card Component
// // ===================================================================
// const AirportCabCard = ({ packageDetails, isRecommended }) => {
//     const carInfo = vehicleData[packageDetails.vehicleType] || vehicleData.Mini;
    
//     const originalPrice = Math.round(packageDetails.packageCost / 0.80);

//     return (
//       <div className={`relative bg-white rounded-xl shadow-lg p-5 flex flex-col sm:flex-row items-center gap-5 border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isRecommended ? 'border-blue-500' : 'border-transparent'}`}>
//          {isRecommended && (<div className="absolute -top-3 left-4 bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full flex items-center shadow-md"><ShieldCheck size={14} className="mr-1.5"/> Recommended</div>)}
//         <div className="flex-shrink-0 w-full sm:w-1/4 text-center"><img src={carInfo.image} alt={carInfo.name} className="mx-auto h-28 object-contain" /></div>
//         <div className="flex-grow w-full sm:w-2/4">
//           <h3 className="font-extrabold text-2xl text-slate-800">{carInfo.name}</h3>
//           <p className="text-sm text-slate-500">or similar</p>
//           <div className="flex flex-wrap items-center gap-3 mt-4 text-sm font-medium">
//               <span className="flex items-center text-slate-700"><Car size={16} className="mr-1.5 text-blue-500"/>{packageDetails.vehicleType}</span>
//               <span className="flex items-center text-slate-700"><Users size={16} className="mr-1.5 text-blue-500"/>{packageDetails.seater} Seater</span>
//               {packageDetails.ac && <span className="flex items-center text-slate-700"><Snowflake size={16} className="mr-1.5 text-blue-500"/>AC</span>}
//           </div>
//           {/* <p className="text-sm text-slate-600 font-semibold mt-2 pt-2 border-t border-dashed">Includes {packageDetails.packageKm} km</p>
//           <div className="mt-3 text-xs text-slate-500 space-y-1 border-t pt-2">
//               <p className="flex items-center"><Gauge size={14} className="mr-2 text-gray-400"/> Extra Fare: ₹{packageDetails.extraKmCharge}/km</p>
//               <p className="flex items-center"><Clock size={14} className="mr-2 text-gray-400"/> Waiting Charge: ₹{packageDetails.waitingTimeCharge}/hr</p>
//               <p className="flex items-center"><Moon size={14} className="mr-2 text-gray-400"/> Night Charge: ₹{packageDetails.nightDrivingCharge}</p>
//           </div> */}
//         </div>
//         <div className="w-full sm:w-1/4 text-center sm:text-right border-t sm:border-t-0 sm:border-l-2 border-dashed pl-0 sm:pl-5 pt-4 sm:pt-0">
          
//           <div className="mb-2">
//             <span className="text-lg text-slate-500 line-through mr-2">₹{originalPrice}</span>
//             <span className="text-green-600 font-semibold text-lg">20% off</span>
//           </div>
//           <span className="text-4xl font-extrabold text-slate-900">₹{packageDetails.packageCost}</span>
//           {/* <p className="text-xs text-slate-500 font-medium my-2">Advance: ₹{packageDetails.advanceAmount}</p> */}
//           <button className="w-full mt-2 sm:w-auto bg-orange-500 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-orange-600 transition-all duration-300 transform hover:scale-105">SELECT</button>
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
//               <button onClick={() => setSortBy('price_asc')} className={`flex items-center text-left text-sm p-3 rounded-lg font-medium transition-colors ${sortBy === 'price_asc' ? 'bg-blue-600 text-white shadow' : 'text-slate-700 hover:bg-slate-100'}`}><TrendingUp size={16} className="mr-2"/> Price: Low to High</button>
//               <button onClick={() => setSortBy('price_desc')} className={`flex items-center text-left text-sm p-3 rounded-lg font-medium transition-colors ${sortBy === 'price_desc' ? 'bg-blue-600 text-white shadow' : 'text-slate-700 hover:bg-slate-100'}`}><TrendingDown size={16} className="mr-2"/> Price: High to Low</button>
//           </div>
//        </div>
//        <div className="mt-6">
//           <h4 className="font-semibold text-slate-600 mb-2 text-sm">CAR TYPE</h4>
//           <div className="flex flex-col space-y-1">
//              <button onClick={() => handleFilterChange('vehicleType', 'all')} className={`text-left text-sm p-3 rounded-lg font-medium transition-colors ${filters.vehicleType === 'all' ? 'bg-blue-600 text-white shadow' : 'text-slate-700 hover:bg-slate-100'}`}>All</button>
//              <button onClick={() => handleFilterChange('vehicleType', 'Mini')} className={`text-left text-sm p-3 rounded-lg font-medium transition-colors ${filters.vehicleType === 'Mini' ? 'bg-blue-600 text-white shadow' : 'text-slate-700 hover:bg-slate-100'}`}>Mini</button>
//              <button onClick={() => handleFilterChange('vehicleType', 'Sedan')} className={`text-left text-sm p-3 rounded-lg font-medium transition-colors ${filters.vehicleType === 'Sedan' ? 'bg-blue-600 text-white shadow' : 'text-slate-700 hover:bg-slate-100'}`}>Sedan</button>
//              <button onClick={() => handleFilterChange('vehicleType', 'SUV')} className={`text-left text-sm p-3 rounded-lg font-medium transition-colors ${filters.vehicleType === 'SUV' ? 'bg-blue-600 text-white shadow' : 'text-slate-700 hover:bg-slate-100'}`}>SUV</button>
//           </div>
//        </div>
//     </div>
// );


// const AirportCabs = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const [allPackages, setAllPackages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [sortBy, setSortBy] = useState('price_asc');
//   const [filters, setFilters] = useState({ vehicleType: 'all' });
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

//   const from = searchParams.get('from');
//   const to = searchParams.get('to');
//   const date = searchParams.get('date');
//   const tripType = searchParams.get('tripType');

//   useEffect(() => {
//     const fetchAirportPackages = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get('http://localhost:5000/api/airport-packages');
//         setAllPackages(res.data.data);
//       } catch (err) { setError('Failed to load cab details.'); } 
//       finally { setLoading(false); }
//     };
//     if (from && to) fetchAirportPackages();
//   }, [from, to]);

//   const displayedPackages = useMemo(() => {
//     if (!allPackages) return [];
//     let packages = [...allPackages];

//     const locationToFilter = tripType === 'Pick-up from' ? to : from;
//     packages = packages.filter(pkg => locationToFilter.toLowerCase().includes(pkg.state.toLowerCase()));
//     if (filters.vehicleType !== 'all') {
//         packages = packages.filter(pkg => pkg.vehicleType === filters.vehicleType);
//     }
    
//     packages.sort((a, b) => (sortBy === 'price_asc' ? a.packageCost - b.packageCost : b.packageCost - a.packageCost));
    
//     if (packages.length > 0) packages[0].isRecommended = true;

//     return packages;
//   }, [allPackages, from, to, tripType, sortBy, filters]);

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
//               <h1 className="text-3xl font-extrabold text-slate-900">Available Airport Cabs</h1>
//               <p className="text-slate-600 mt-1">{from} → {to}</p>
//             </div>
//             {displayedPackages.length > 0 ? (
//               <div className="space-y-6">
//                 {displayedPackages.map(pkg => (<AirportCabCard key={pkg._id} packageDetails={pkg} isRecommended={pkg.isRecommended} />))}
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
// export default AirportCabs;

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Star, ArrowLeft, Car, Users, ShieldCheck, Filter, X, TrendingUp, TrendingDown, Gauge, Clock, Moon, Snowflake } from 'lucide-react';

const vehicleData = {
  Mini: { name: "Indica, Swift", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Hatchback_2x.png" },
  Sedan: { name: "Dzire, Etios", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png" },
  SUV: { name: "Ertiga, Xylo", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" },
};

const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-lg p-4 flex items-center gap-4 border border-gray-200 animate-pulse">
      <div className="flex-shrink-0 w-1/4 h-24 bg-slate-200 rounded-md"></div>
      <div className="flex-grow w-2/4 space-y-3">
        <div className="w-3/4 h-5 bg-slate-200 rounded"></div>
        <div className="w-1/2 h-4 bg-slate-200 rounded"></div>
        <div className="flex gap-2 mt-3"><div className="w-16 h-5 bg-slate-200 rounded-full"></div><div className="w-16 h-5 bg-slate-200 rounded-full"></div></div>
      </div>
      <div className="w-1/4 h-20 bg-slate-200 rounded-md"></div>
    </div>
);

const AirportCabCard = ({ packageDetails, isRecommended, onSelect }) => {
    const carInfo = vehicleData[packageDetails.vehicleType] || vehicleData.Mini;
    return (
      <div className={`relative bg-white rounded-xl shadow-lg p-5 flex flex-col sm:flex-row items-center gap-5 border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isRecommended ? 'border-blue-500' : 'border-transparent'}`}>
         {isRecommended && (<div className="absolute -top-3 left-4 bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full flex items-center shadow-md"><ShieldCheck size={14} className="mr-1.5"/> Recommended</div>)}
        <div className="flex-shrink-0 w-full sm:w-1/4 text-center"><img src={carInfo.image} alt={carInfo.name} className="mx-auto h-28 object-contain" /></div>
        <div className="flex-grow w-full sm:w-2/4">
          <h3 className="font-extrabold text-2xl text-slate-800">{carInfo.name}</h3>
          <p className="text-sm text-slate-500">or similar</p>
          <div className="flex flex-wrap items-center gap-3 mt-4 text-sm font-medium">
              <span className="flex items-center text-slate-700"><Car size={16} className="mr-1.5 text-blue-500"/>{packageDetails.vehicleType}</span>
              <span className="flex items-center text-slate-700"><Users size={16} className="mr-1.5 text-blue-500"/>{packageDetails.seater} Seater</span>
              {packageDetails.ac && <span className="flex items-center text-slate-700"><Snowflake size={16} className="mr-1.5 text-blue-500"/>AC</span>}
          </div>
          <p className="text-sm text-slate-600 font-semibold mt-2 pt-2 border-t border-dashed">
            Package includes {packageDetails.packageKm} km
          </p>
          <div className="mt-3 text-xs text-slate-500 space-y-1 border-t pt-2">
            <p className="flex items-center"><Gauge size={14} className="mr-2 text-gray-400"/> Extra Fare: ₹{packageDetails.extraKmCharge}/km</p>
            <p className="flex items-center"><Clock size={14} className="mr-2 text-gray-400"/> Waiting Charge: ₹{packageDetails.waitingTimeCharge}/hr</p>
            <p className="flex items-center"><Moon size={14} className="mr-2 text-gray-400"/> Night Charge: ₹{packageDetails.nightDrivingCharge}</p>
          </div>
        </div>
        <div className="w-full sm:w-1/4 text-center sm:text-right border-t sm:border-t-0 sm:border-l-2 border-dashed pl-0 sm:pl-5 pt-4 sm:pt-0">
          <p className="text-sm text-slate-500 font-medium">Total Price</p>
          <span className="text-4xl font-extrabold text-slate-900">₹{packageDetails.packageCost}</span>
          <p className="text-xs text-slate-500 font-medium my-2">Advance: ₹{packageDetails.advanceAmount}</p>
          <button onClick={onSelect} className="w-full sm:w-auto bg-orange-500 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-orange-600 transition-all duration-300 transform hover:scale-105">SELECT</button>
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
              <button onClick={() => setSortBy('price_asc')} className={`flex items-center text-left text-sm p-3 rounded-lg font-medium transition-colors ${sortBy === 'price_asc' ? 'bg-blue-600 text-white shadow' : 'text-slate-700 hover:bg-slate-100'}`}><TrendingUp size={16} className="mr-2"/> Price: Low to High</button>
              <button onClick={() => setSortBy('price_desc')} className={`flex items-center text-left text-sm p-3 rounded-lg font-medium transition-colors ${sortBy === 'price_desc' ? 'bg-blue-600 text-white shadow' : 'text-slate-700 hover:bg-slate-100'}`}><TrendingDown size={16} className="mr-2"/> Price: High to Low</button>
          </div>
       </div>
       <div className="mt-6">
          <h4 className="font-semibold text-slate-600 mb-2 text-sm">CAR TYPE</h4>
          <div className="flex flex-col space-y-1">
             <button onClick={() => handleFilterChange('vehicleType', 'all')} className={`text-left text-sm p-3 rounded-lg font-medium transition-colors ${filters.vehicleType === 'all' ? 'bg-blue-600 text-white shadow' : 'text-slate-700 hover:bg-slate-100'}`}>All</button>
             <button onClick={() => handleFilterChange('vehicleType', 'Mini')} className={`text-left text-sm p-3 rounded-lg font-medium transition-colors ${filters.vehicleType === 'Mini' ? 'bg-blue-600 text-white shadow' : 'text-slate-700 hover:bg-slate-100'}`}>Mini</button>
             <button onClick={() => handleFilterChange('vehicleType', 'Sedan')} className={`text-left text-sm p-3 rounded-lg font-medium transition-colors ${filters.vehicleType === 'Sedan' ? 'bg-blue-600 text-white shadow' : 'text-slate-700 hover:bg-slate-100'}`}>Sedan</button>
             <button onClick={() => handleFilterChange('vehicleType', 'SUV')} className={`text-left text-sm p-3 rounded-lg font-medium transition-colors ${filters.vehicleType === 'SUV' ? 'bg-blue-600 text-white shadow' : 'text-slate-700 hover:bg-slate-100'}`}>SUV</button>
          </div>
       </div>
    </div>
);

const AirportCabs = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [allPackages, setAllPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('price_asc');
  const [filters, setFilters] = useState({ vehicleType: 'all' });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const date = searchParams.get('date');
  const time = searchParams.get('time');
  const tripType = searchParams.get('tripType');

  useEffect(() => {
    const fetchAirportPackages = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/api/airport-packages');
        setAllPackages(res.data.data);
      } catch (err) { setError('Failed to load cab details.'); } 
      finally { setLoading(false); }
    };
    if (from && to) fetchAirportPackages();
  }, [from, to]);

  const displayedPackages = useMemo(() => {
    if (!allPackages) return [];
    let packages = [...allPackages];

    const locationToFilter = tripType === 'Pick-up from' ? to : from;
    if (locationToFilter) {
      packages = packages.filter(pkg => locationToFilter.toLowerCase().includes(pkg.state.toLowerCase()));
    }
    
    if (filters.vehicleType !== 'all') {
        packages = packages.filter(pkg => pkg.vehicleType === filters.vehicleType);
    }
    packages.sort((a, b) => (sortBy === 'price_asc' ? a.packageCost - b.packageCost : b.packageCost - a.packageCost));
    if (packages.length > 0) packages[0].isRecommended = true;

    return packages;
  }, [allPackages, from, to, tripType, sortBy, filters]);

  const handleFilterChange = (type, value) => setFilters(prev => ({ ...prev, [type]: value }));

  const handleSelectCab = (selectedPackage) => {
    const tripDetails = {
        from, to, tripType: 'Airport Ride',
        pickupDate: date, pickupTime: time
    };
    navigate('/review-booking', { 
        state: { packageDetails: selectedPackage, tripDetails } 
    });
  };

  if (loading) {
    return (
        <div className="bg-slate-100 min-h-screen">
            <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-4">
                <div className="h-16 bg-slate-200 rounded-lg animate-pulse w-1/3"></div>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1 h-64 bg-slate-200 rounded-lg animate-pulse"></div>
                    <div className="lg:col-span-3 space-y-4">
                        {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                </div>
            </div>
        </div>
    );
  }
  if (error) return <div className="text-center p-20 text-lg text-red-500">{error}</div>;

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
              <h1 className="text-3xl font-extrabold text-slate-900">Available Airport Cabs</h1>
              <p className="text-slate-600 mt-1">{from} → {to}</p>
            </div>
            {displayedPackages.length > 0 ? (
              <div className="space-y-6">
                {displayedPackages.map(pkg => (<AirportCabCard key={pkg._id} packageDetails={pkg} isRecommended={pkg.isRecommended} onSelect={() => handleSelectCab(pkg)} />))}
              </div>
            ) : (
              <div className="text-center p-12 bg-white rounded-xl shadow-lg">
                 <Car size={48} className="mx-auto text-slate-300"/>
                 <p className="mt-4 font-semibold text-xl text-slate-800">No Cabs Found</p>
                 <p className="text-slate-500 mt-1">Sorry, no airport cabs were found for this location.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
export default AirportCabs;