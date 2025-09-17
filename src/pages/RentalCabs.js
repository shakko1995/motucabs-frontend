
import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Star, ArrowLeft, Car, Users, ShieldCheck, TrendingUp, TrendingDown, Filter, X, Snowflake, Gauge, Clock, Moon } from 'lucide-react';

const vehicleData = {
  Mini: { name: "Indica, Swift", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Hatchback_2x.png" },
  Sedan: { name: "Dzire, Etios", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png" },
  SUV: { name: "Ertiga, Xylo", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" }
};

// ===================================================================
// Cab Card Component (Corrected to show extra rates)
// ===================================================================
const CabCard = ({ packageDetails, isRecommended, onSelect }) => {
    const carInfo = vehicleData[packageDetails.vehicleType] || vehicleData.Mini;
    // Safely access nested rates object
    const rates = packageDetails.rates || {};

    return (
        <div className={`relative bg-white rounded-xl shadow-lg p-5 flex flex-col sm:flex-row items-center gap-5 border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isRecommended ? 'border-blue-500' : 'border-transparent'}`}>
            {isRecommended && (
                <div className="absolute -top-3 left-4 bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full flex items-center shadow-md">
                    <ShieldCheck size={14} className="mr-1.5"/> Recommended
                </div>
            )}
            <div className="flex-shrink-0 w-full sm:w-1/4 text-center">
                <img src={carInfo.image} alt={carInfo.name} className="mx-auto h-28 object-contain" />
            </div>
            <div className="flex-grow w-full sm:w-2/4">
                <h3 className="font-extrabold text-2xl text-slate-800">{carInfo.name}</h3>
                <p className="text-sm text-slate-500">or similar</p>
                <div className="flex flex-wrap items-center gap-3 mt-4 text-sm font-medium">
                    <span className="flex items-center text-slate-700"><Car size={16} className="mr-1.5 text-blue-500"/>{packageDetails.vehicleType}</span>
                    <span className="flex items-center text-slate-700"><Users size={16} className="mr-1.5 text-blue-500"/>{packageDetails.seater} Seater</span>
                    {packageDetails.ac && <span className="flex items-center text-slate-700"><Snowflake size={16} className="mr-1.5 text-blue-500"/>AC</span>}
                </div>
                <p className="text-sm text-slate-600 font-semibold mt-2 pt-2 border-t border-dashed">
                    Package: {packageDetails.uptoHour} Hours & {packageDetails.uptoKm} km
                </p>
                {/* 👇 Extra rates are now displayed correctly */}
                <div className="mt-3 text-xs text-slate-500 space-y-1 border-t pt-2">
                    <p className="flex items-center"><Gauge size={14} className="mr-2 text-gray-400"/> Extra Fare: ₹{rates.extraKmRate}/km</p>
                    <p className="flex items-center"><Clock size={14} className="mr-2 text-gray-400"/> Extra Hour: ₹{rates.extraHourRate}/hr</p>
                    <p className="flex items-center"><Moon size={14} className="mr-2 text-gray-400"/> Night Allowance: ₹{rates.nightDrivingAllowance}</p>
                </div>
            </div>
            <div className="w-full sm:w-1/4 text-center sm:text-right border-t sm:border-t-0 sm:border-l-2 border-dashed pl-0 sm:pl-5 pt-4 sm:pt-0">
                <span className="text-4xl font-extrabold text-slate-900">₹{packageDetails.packageRate}</span>
                <p className="text-xs text-slate-600 font-medium mb-3">Advance: ₹{packageDetails.advanceAmount}</p>
                <button onClick={onSelect} className="w-full sm:w-auto bg-orange-500 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-orange-600 transition-all duration-300 transform hover:scale-105">
                    SELECT
                </button>
            </div>
        </div>
    );
};


// ===================================================================
// Filter Panel Component
// ===================================================================
const FilterPanel = ({ sortBy, setSortBy, filters, handleFilterChange, onClose }) => (
  <div className="bg-white p-5 rounded-xl shadow-lg h-full">
    <div className="flex justify-between items-center border-b-2 border-slate-100 pb-3">
      <h3 className="font-bold text-xl text-slate-800">Filter & Sort</h3>
      <button
        onClick={onClose}
        className="lg:hidden text-slate-500 hover:text-slate-800"
      >
        <X size={24} />
      </button>
    </div>

    {/* SORT SECTION */}
    <div className="mt-4">
      <h4 className="font-semibold text-slate-600 mb-2 text-sm">SORT BY</h4>
      <div className="flex flex-col space-y-1">
        <button
          onClick={() => setSortBy("price_asc")}
          className={`flex items-center text-left text-sm p-3 rounded-lg font-medium transition-colors ${
            sortBy === "price_asc"
              ? "bg-blue-600 text-white shadow"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <TrendingUp size={16} className="mr-2" /> Price: Low to High
        </button>

        <button
          onClick={() => setSortBy("price_desc")}
          className={`flex items-center text-left text-sm p-3 rounded-lg font-medium transition-colors ${
            sortBy === "price_desc"
              ? "bg-blue-600 text-white shadow"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <TrendingDown size={16} className="mr-2" /> Price: High to Low
        </button>
      </div>
    </div>

    {/* CAR TYPE SECTION */}
    <div className="mt-6">
      <h4 className="font-semibold text-slate-600 mb-2 text-sm">CAR TYPE</h4>
      <div className="flex flex-col space-y-1">
        <button
          onClick={() => handleFilterChange("vehicleType", "all")}
          className={`text-left text-sm p-3 rounded-lg font-medium transition-colors ${
            filters.vehicleType === "all"
              ? "bg-blue-600 text-white shadow"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          All Types
        </button>

        <button
          onClick={() => handleFilterChange("vehicleType", "Mini")}
          className={`text-left text-sm p-3 rounded-lg font-medium transition-colors ${
            filters.vehicleType === "Mini"
              ? "bg-blue-600 text-white shadow"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          Mini
        </button>

        <button
          onClick={() => handleFilterChange("vehicleType", "Sedan")}
          className={`text-left text-sm p-3 rounded-lg font-medium transition-colors ${
            filters.vehicleType === "Sedan"
              ? "bg-blue-600 text-white shadow"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          Sedan
        </button>

        <button
          onClick={() => handleFilterChange("vehicleType", "SUV")}
          className={`text-left text-sm p-3 rounded-lg font-medium transition-colors ${
            filters.vehicleType === "SUV"
              ? "bg-blue-600 text-white shadow"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          SUV
        </button>
      </div>
    </div>

    {/* FEATURES SECTION */}
    <div className="mt-6 border-t pt-4">
      <h4 className="font-semibold text-slate-600 mb-2 text-sm">FEATURES</h4>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="ac_only"
          checked={filters.ac === "ac_only"}
          onChange={(e) =>
            handleFilterChange("ac", e.target.checked ? "ac_only" : "all")
          }
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label
          htmlFor="ac_only"
          className="ml-3 block text-sm font-medium text-slate-700"
        >
          AC Only
        </label>
      </div>
    </div>
  </div>
);


// ===================================================================
// Main Rental Cabs Page Component
// ===================================================================
const RentalCabs = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [allPackages, setAllPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('price_asc');
  const [filters, setFilters] = useState({ vehicleType: 'all', ac: 'all' });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const city = searchParams.get('city');
  const hours = parseInt(searchParams.get('hours'), 10);
  const date = searchParams.get('date');
  const time = searchParams.get('time');
  
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/api/rental-packages');
        setAllPackages(res.data.data);
      } catch (err) {
        setError('Packages Loading Failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    if (city && hours) fetchPackages();
  }, [city, hours]);

  const displayedPackages = useMemo(() => {
    if (!allPackages) return [];
    let packages = [...allPackages];
    packages = packages.filter(pkg => pkg.uptoHour >= hours && city.toLowerCase().includes(pkg.state.toLowerCase()));
    if (filters.vehicleType !== 'all') {
      packages = packages.filter(pkg => pkg.vehicleType === filters.vehicleType);
    }
    if (filters.ac === 'ac_only') {
      packages = packages.filter(pkg => pkg.ac);
    }
    packages.sort((a, b) => (sortBy === 'price_asc' ? a.packageRate - b.packageRate : b.packageRate - a.packageRate));
    if (packages.length > 0) {
        const cheapestSuv = packages.find(p => p.vehicleType === 'SUV');
        if (cheapestSuv) cheapestSuv.isRecommended = true;
        else packages[0].isRecommended = true;
    }
    return packages;
  }, [allPackages, hours, city, sortBy, filters]);

  const handleFilterChange = (filterType, value) => setFilters(prev => ({ ...prev, [filterType]: value }));

  const handleSelectCab = (selectedPackage) => {
    const tripDetails = {
        from: city,
        to: city,
        pickupDate: date,
        pickupTime: time,
        tripType: 'Rental'
    };
    navigate('/review-booking', { 
        state: { 
            packageDetails: selectedPackage, 
            tripDetails: tripDetails 
        } 
    });
  };

  if (loading) { /* ... Skeleton Loader ... */ }
  if (error) return <div className="text-center p-20 text-lg text-red-500">{error}</div>;

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* ... Mobile filter logic ... */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-6">
                <FilterPanel sortBy={sortBy} setSortBy={setSortBy} filters={filters} handleFilterChange={handleFilterChange} />
            </div>
          </aside>
          <main className="lg:col-span-3">
            <div className="bg-white p-5 rounded-xl shadow-lg mb-6">
              <h1 className="text-3xl font-extrabold text-slate-900">Available Rental Cabs</h1>
              <p className="text-slate-600 mt-1">Showing packages for <span className="font-bold text-blue-600">{hours} hours</span> or more in <span className="font-bold text-blue-600">{city}</span></p>
            </div>
            {displayedPackages.length > 0 ? (
              <div className="space-y-6">
                {displayedPackages.map(pkg => (
                    <CabCard 
                        key={pkg._id} 
                        packageDetails={pkg} 
                        isRecommended={pkg.isRecommended}
                        onSelect={() => handleSelectCab(pkg)}
                    />
                ))}
              </div>
            ) : (
              <div className="text-center p-12 bg-white rounded-xl shadow-lg">
                <Car size={48} className="mx-auto text-slate-300"/>
                <p className="mt-4 font-semibold text-xl text-slate-800">No Matching Cabs Found</p>
                <p className="text-slate-500 mt-2">Try adjusting your filters or search for a different package duration.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
export default RentalCabs;