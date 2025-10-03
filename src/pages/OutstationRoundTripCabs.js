

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Car, Users, ShieldCheck, CalendarDays, Filter, X, TrendingUp, TrendingDown, Gauge, Clock, Moon, Droplets, Snowflake } from 'lucide-react';

const vehicleData = {
  Mini: { name: "Indica, Swift", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Hatchback_2x.png" },
  Sedan: { name: "Dzire, Etios", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png" },
  SUV: { name: "Ertiga, Xylo", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" },
  "SUV+": { name: "Innova Crysta", image: "https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png" },
};

// Helper function to extract state from address
const extractStateFromAddress = (address) => {
  if (!address) return null;
  
  const parts = address.split(',').map(p => p.trim()).filter(p => p.length > 0);
  
  if (parts.length >= 3) {
    // Format: "City, State, Country" -> take State (second-to-last)
    return parts[parts.length - 2];
  } else if (parts.length === 2) {
    // Check if last part is a country name
    const lastPart = parts[1].toLowerCase();
    const countryNames = ['india', 'pakistan', 'bangladesh', 'nepal', 'sri lanka', 'bhutan'];
    
    if (countryNames.includes(lastPart)) {
      // Format: "State, Country" -> take State (first part)
      return parts[0];
    } else {
      // Format: "City, State" -> take State (last part)
      return parts[1];
    }
  } else if (parts.length === 1) {
    // Only one part, use it as is
    return parts[0];
  }
  
  return null;
};

const SkeletonCard = () => (
  <div className="bg-white rounded-xl shadow-lg p-4 flex items-center gap-4 border border-gray-200 animate-pulse">
    <div className="flex-shrink-0 w-1/4 h-24 bg-slate-200 rounded-md"></div>
    <div className="flex-grow w-2/4 space-y-3">
      <div className="w-3/4 h-5 bg-slate-200 rounded"></div>
      <div className="w-1/2 h-4 bg-slate-200 rounded"></div>
      <div className="flex gap-2 mt-3">
        <div className="w-16 h-5 bg-slate-200 rounded-full"></div>
        <div className="w-16 h-5 bg-slate-200 rounded-full"></div>
      </div>
    </div>
    <div className="w-1/4 h-20 bg-slate-200 rounded-md"></div>
  </div>
);

const RoundTripCabCard = ({ packageDetails, isRecommended, onSelect }) => {
  const carInfo = vehicleData[packageDetails.car] || vehicleData.Mini;
  return (
    <div className={`relative bg-white rounded-xl shadow-lg p-5 flex flex-col sm:flex-row items-center gap-5 border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isRecommended ? 'border-blue-500' : 'border-transparent'}`}>
      {isRecommended && (
        <div className="absolute -top-3 left-4 bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full flex items-center shadow-md">
          <ShieldCheck size={14} className="mr-1.5" /> Recommended
        </div>
      )}
      <div className="flex-shrink-0 w-full sm:w-1/4 text-center">
        <img src={carInfo.image} alt={carInfo.name} className="mx-auto h-28 object-contain" />
      </div>
      <div className="flex-grow w-full sm:w-2/4">
        <h3 className="font-extrabold text-2xl text-slate-800">{carInfo.name}</h3>
        <p className="text-sm text-slate-500">or similar</p>
        <div className="flex flex-wrap items-center gap-3 mt-4 text-sm font-medium">
          <span className="flex items-center text-slate-700">
            <Car size={16} className="mr-1.5 text-blue-500" />{packageDetails.car}
          </span>
          <span className="flex items-center text-slate-700">
            <Users size={16} className="mr-1.5 text-blue-500" />{packageDetails.seater} Seater
          </span>
          <span className="flex items-center text-slate-700">
            <Droplets size={16} className="mr-1.5 text-blue-500" />{packageDetails.fuelType}
          </span>
          {packageDetails.ac && (
            <span className="flex items-center text-slate-700">
              <Snowflake size={16} className="mr-1.5 text-blue-500" />AC
            </span>
          )}
        </div>
        <p className="text-sm text-slate-600 font-semibold mt-2 pt-2 border-t border-dashed">
          Package for {packageDetails.noOfDays} Day(s) - Includes {packageDetails.includingKm} km
        </p>
        <div className="mt-3 text-xs text-slate-500 space-y-1 border-t pt-2">
          <p className="flex items-center">
            <Gauge size={14} className="mr-2 text-gray-400" /> Extra Fare: ₹{packageDetails.extraKmRate}/km
          </p>
          <p className="flex items-center">
            <Clock size={14} className="mr-2 text-gray-400" /> Extra Hour: ₹{packageDetails.extraHourRate}/hr
          </p>
          <p className="flex items-center">
            <Moon size={14} className="mr-2 text-gray-400" /> Night Allowance: ₹{packageDetails.nightDrivingAllowance}
          </p>
        </div>
      </div>
      <div className="w-full sm:w-1/4 text-center sm:text-right border-t sm:border-t-0 sm:border-l-2 border-dashed pl-0 sm:pl-5 pt-4 sm:pt-0">
        <p className="text-sm text-slate-500 font-medium">Total Fare</p>
        <span className="text-4xl font-extrabold text-slate-900">
          ₹{packageDetails.fare.toLocaleString('en-IN')}
        </span>
        <button 
          onClick={onSelect} 
          className="w-full mt-2 sm:w-auto bg-orange-500 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
        >
          SELECT
        </button>
      </div>
    </div>
  );
};

const FilterPanel = ({ sortBy, setSortBy, filters, handleFilterChange, onClose }) => (
  <div className="bg-white p-5 rounded-xl shadow-lg h-full overflow-y-auto">
    <div className="flex justify-between items-center border-b-2 border-slate-100 pb-3">
      <h3 className="font-bold text-xl text-slate-800">Filter & Sort</h3>
      <button onClick={onClose} className="lg:hidden text-slate-500 hover:text-slate-800">
        <X size={24} />
      </button>
    </div>
    <div className="mt-4">
      <h4 className="font-semibold text-slate-600 mb-2 text-sm">SORT BY</h4>
      <div className="flex flex-col space-y-1">
        <button 
          onClick={() => setSortBy('price_asc')} 
          className={`flex items-center text-left text-sm p-3 rounded-lg font-medium transition-colors ${sortBy === 'price_asc' ? 'bg-blue-600 text-white shadow' : 'text-slate-700 hover:bg-slate-100'}`}
        >
          <TrendingUp size={16} className="mr-2" /> Fare: Low to High
        </button>
        <button 
          onClick={() => setSortBy('price_desc')} 
          className={`flex items-center text-left text-sm p-3 rounded-lg font-medium transition-colors ${sortBy === 'price_desc' ? 'bg-blue-600 text-white shadow' : 'text-slate-700 hover:bg-slate-100'}`}
        >
          <TrendingDown size={16} className="mr-2" /> Fare: High to Low
        </button>
      </div>
    </div>
    <div className="mt-6">
      <h4 className="font-semibold text-slate-600 mb-2 text-sm">CAR TYPE</h4>
      <div className="flex flex-col space-y-1">
        <button 
          onClick={() => handleFilterChange('car', 'all')} 
          className={`text-left text-sm p-3 rounded-lg font-medium transition-colors ${filters.car === 'all' ? 'bg-blue-600 text-white shadow' : 'text-slate-700 hover:bg-slate-100'}`}
        >
          All
        </button>
        <button 
          onClick={() => handleFilterChange('car', 'Mini')} 
          className={`text-left text-sm p-3 rounded-lg font-medium transition-colors ${filters.car === 'Mini' ? 'bg-blue-600 text-white shadow' : 'text-slate-700 hover:bg-slate-100'}`}
        >
          Mini
        </button>
        <button 
          onClick={() => handleFilterChange('car', 'Sedan')} 
          className={`text-left text-sm p-3 rounded-lg font-medium transition-colors ${filters.car === 'Sedan' ? 'bg-blue-600 text-white shadow' : 'text-slate-700 hover:bg-slate-100'}`}
        >
          Sedan
        </button>
        <button 
          onClick={() => handleFilterChange('car', 'SUV')} 
          className={`text-left text-sm p-3 rounded-lg font-medium transition-colors ${filters.car === 'SUV' ? 'bg-blue-600 text-white shadow' : 'text-slate-700 hover:bg-slate-100'}`}
        >
          SUV
        </button>
      </div>
    </div>
    <div className="mt-6 border-t pt-4">
      <h4 className="font-semibold text-slate-600 mb-2 text-sm">FUEL TYPE</h4>
      <div className="flex flex-col space-y-1">
        <button 
          onClick={() => handleFilterChange('fuelType', 'all')} 
          className={`text-left text-sm p-3 rounded-lg font-medium ${filters.fuelType === 'all' ? 'bg-blue-600 text-white shadow' : 'text-slate-700 hover:bg-slate-100'}`}
        >
          Any
        </button>
        <button 
          onClick={() => handleFilterChange('fuelType', 'Petrol')} 
          className={`text-left text-sm p-3 rounded-lg font-medium ${filters.fuelType === 'Petrol' ? 'bg-blue-600 text-white shadow' : 'text-slate-700 hover:bg-slate-100'}`}
        >
          Petrol
        </button>
        <button 
          onClick={() => handleFilterChange('fuelType', 'Diesel')} 
          className={`text-left text-sm p-3 rounded-lg font-medium ${filters.fuelType === 'Diesel' ? 'bg-blue-600 text-white shadow' : 'text-slate-700 hover:bg-slate-100'}`}
        >
          Diesel
        </button>
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
  const [filters, setFilters] = useState({ car: 'all', fuelType: 'all' });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const pickupDate = searchParams.get('pickupDate');
  const dropDate = searchParams.get('dropDate');
  const time = searchParams.get('time');
  const returnTime = searchParams.get('returnTime');

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        
        // Extract state from DROP location (destination)
        const state = extractStateFromAddress(to);
        
        if (!state) {
          setError('Unable to determine destination state. Please check your location.');
          setLoading(false);
          return;
        }
        
        console.log('Pickup Location:', from);
        console.log('Drop Location:', to);
        console.log('Extracted State:', state);

        const res = await axios.get('http://localhost:5000/api/outstation-roundtrip', {
          params: { state, pickupDate, dropDate }
        });

        console.log('API Response:', res.data);

        if (res.data.success) {
          const pkgs = Array.isArray(res.data.data) ? res.data.data : [];
          setPackages(pkgs);
          
          if (pkgs.length > 0) {
            setTripDays(pkgs[0].noOfDays);
          } else {
            // Calculate trip days from dates
            const start = new Date(pickupDate);
            const end = new Date(dropDate);
            const diffTime = Math.abs(end - start);
            const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
            setTripDays(days);
          }
        }
      } catch (err) {
        console.error('Error fetching packages:', err);
        setError(err.response?.data?.message || 'Failed to load packages. Please try again.');
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
    if (!packages || packages.length === 0) return [];
    
    let filtered = [...packages];
    
    // Apply car filter
    if (filters.car !== 'all') {
      filtered = filtered.filter(pkg => pkg.car === filters.car);
    }
    
    // Apply fuel type filter
    if (filters.fuelType !== 'all') {
      filtered = filtered.filter(pkg => pkg.fuelType === filters.fuelType);
    }
    
    // Sort by price
    filtered.sort((a, b) => {
      return sortBy === 'price_asc' ? a.fare - b.fare : b.fare - a.fare;
    });
    
    // Mark first package as recommended
    if (filtered.length > 0) {
      filtered[0].isRecommended = true;
    }
    
    return filtered;
  }, [packages, sortBy, filters]);

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const handleSelectCab = (selectedPackage) => {
    const tripDetails = {
      from,
      to,
      pickupDate,
      dropDate,
      pickupTime: time,
      dropTime: returnTime,
      tripDays,
      tripType: 'Outstation Round Trip'
    };
    
    navigate('/review-booking', {
      state: { 
        packageDetails: selectedPackage, 
        tripDetails: tripDetails 
      }
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

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {isFilterOpen && (
          <div 
            onClick={() => setIsFilterOpen(false)} 
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          ></div>
        )}
        
        <div className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 lg:hidden ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <FilterPanel 
            sortBy={sortBy} 
            setSortBy={setSortBy} 
            filters={filters} 
            handleFilterChange={handleFilterChange} 
            onClose={() => setIsFilterOpen(false)} 
          />
        </div>
        
        <div className="mb-6 flex justify-between items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />Edit Search
          </button>
          <button 
            onClick={() => setIsFilterOpen(true)} 
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border rounded-lg shadow font-semibold"
          >
            <Filter size={16} /> Filters
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-6">
              <FilterPanel 
                sortBy={sortBy} 
                setSortBy={setSortBy} 
                filters={filters} 
                handleFilterChange={handleFilterChange} 
              />
            </div>
          </aside>
          
          <main className="lg:col-span-3">
            <div className="bg-white p-5 rounded-xl shadow-lg mb-6">
              <h1 className="text-3xl font-extrabold text-slate-900">
                Available Round Trip Cabs
              </h1>
              <p className="text-slate-600 mt-1">{from} → {to}</p>
              {tripDays > 0 && (
                <div className="mt-2 pt-2 border-t flex items-center text-blue-600 font-bold">
                  <CalendarDays size={18} className="mr-2"/>
                  <span>Trip Duration: {tripDays} Day(s)</span>
                </div>
              )}
            </div>
            
            {error && (
              <div className="text-center p-12 bg-white rounded-xl shadow-lg">
                <p className="text-red-600 font-bold">{error}</p>
              </div>
            )}
            
            {!error && displayedPackages.length > 0 && (
              <div className="space-y-6">
                {displayedPackages.map(pkg => (
                  <RoundTripCabCard 
                    key={pkg._id} 
                    packageDetails={pkg} 
                    isRecommended={pkg.isRecommended} 
                    onSelect={() => handleSelectCab(pkg)} 
                  />
                ))}
              </div>
            )}
            
            {!loading && !error && displayedPackages.length === 0 && packages.length === 0 && (
              <div className="text-center p-12 bg-white rounded-xl shadow-lg">
                <Car size={48} className="mx-auto text-slate-300" />
                <p className="mt-4 font-semibold text-xl text-slate-800">No Packages Found</p>
                <p className="text-slate-500 mt-1">
                  Sorry, no round trip packages are available for your selected destination.
                </p>
              </div>
            )}

            {!loading && !error && displayedPackages.length === 0 && packages.length > 0 && (
              <div className="text-center p-12 bg-white rounded-xl shadow-lg">
                <Car size={48} className="mx-auto text-slate-300" />
                <p className="mt-4 font-semibold text-xl text-slate-800">No Matching Packages</p>
                <p className="text-slate-500 mt-1">
                  Try adjusting your filters to see more options.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default OutstationRoundTripCabs;
