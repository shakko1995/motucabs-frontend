import React, { useState, useEffect } from 'react';
import { getAllDestinations } from '../api/destinationApi';

// DestinationCard Component
const DestinationCard = ({ destination }) => {
  return (
    <a
      href={destination.link || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <img
            src={destination.image?.url}
            alt={destination.heading}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-5">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {destination.heading}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {destination.description}
          </p>
        </div>
      </div>
    </a>
  );
};

// Main DestinationsPage Component
const DestinationsPage = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await getAllDestinations();
        setDestinations(res.data.data.destinations || []);
      } catch (err) {
        console.error("Failed to fetch destinations:", err);
        setError('Could not load destinations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading destinations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Navigation */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold">
                <span className="text-blue-600">go</span>
                <span className="text-orange-500">z</span>
                <span className="text-blue-600">o</span>
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8 text-sm">
              <button className="text-gray-700 hover:text-gray-900 flex items-center">
                Destinations <span className="ml-1">▾</span>
              </button>
              <button className="text-gray-700 hover:text-gray-900 flex items-center">
                Fleet <span className="ml-1">▾</span>
              </button>
              <button className="text-gray-700 hover:text-gray-900 flex items-center">
                Services <span className="ml-1">▾</span>
              </button>
              <button className="text-gray-700 hover:text-gray-900 flex items-center">
                Partners <span className="ml-1">▾</span>
              </button>
              <button className="text-gray-700 hover:text-gray-900 flex items-center">
                Solutions <span className="ml-1">▾</span>
              </button>
              <button className="text-gray-700 hover:text-gray-900 flex items-center">
                Community <span className="ml-1">▾</span>
              </button>
              <button className="text-gray-700 hover:text-gray-900 flex items-center">
                Company <span className="ml-1">▾</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Banner with Illustrations */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between">
            {/* Left Illustration - Gateway/Architecture */}
            <div className="hidden lg:block flex-1">
              <svg className="w-full max-w-sm opacity-30" viewBox="0 0 300 150" fill="none">
                <rect x="40" y="40" width="60" height="80" stroke="#9CA3AF" strokeWidth="2" rx="2"/>
                <rect x="110" y="40" width="60" height="80" stroke="#9CA3AF" strokeWidth="2" rx="2"/>
                <rect x="180" y="40" width="60" height="80" stroke="#9CA3AF" strokeWidth="2" rx="2"/>
                <ellipse cx="70" cy="90" rx="20" ry="30" stroke="#9CA3AF" strokeWidth="2"/>
                <ellipse cx="140" cy="90" rx="20" ry="30" stroke="#9CA3AF" strokeWidth="2"/>
                <ellipse cx="210" cy="90" rx="20" ry="30" stroke="#9CA3AF" strokeWidth="2"/>
                <line x1="30" y1="40" x2="250" y2="40" stroke="#9CA3AF" strokeWidth="2"/>
                <line x1="30" y1="120" x2="250" y2="120" stroke="#9CA3AF" strokeWidth="2"/>
              </svg>
            </div>

            {/* Center Content */}
            <div className="text-center px-8">
              <h2 className="text-5xl font-bold mb-3">
                <span className="text-blue-600">go</span>
                <span className="text-orange-500">z</span>
                <span className="text-blue-600">o</span>
              </h2>
              <p className="text-xl text-gray-600 mb-1">Quality cabs</p>
              <p className="text-xl text-gray-600">at amazing prices</p>
              {/* Simple Car Icon */}
              <div className="mt-6 flex justify-center">
                <svg className="w-24 h-12 opacity-30" viewBox="0 0 100 50" fill="none">
                  <ellipse cx="30" cy="35" rx="8" ry="8" stroke="#9CA3AF" strokeWidth="2"/>
                  <ellipse cx="70" cy="35" rx="8" ry="8" stroke="#9CA3AF" strokeWidth="2"/>
                  <path d="M20 35 L15 35 L10 25 L20 20 L80 20 L88 25 L85 35 L80 35" stroke="#9CA3AF" strokeWidth="2" fill="none"/>
                  <path d="M25 20 L30 12 L70 12 L75 20" stroke="#9CA3AF" strokeWidth="2"/>
                </svg>
              </div>
            </div>

            {/* Right Illustration - Monument/Taj Mahal style */}
            <div className="hidden lg:block flex-1 flex justify-end">
              <svg className="w-full max-w-sm opacity-30" viewBox="0 0 300 150" fill="none">
                <rect x="50" y="70" width="40" height="50" stroke="#9CA3AF" strokeWidth="2" rx="2"/>
                <rect x="210" y="70" width="40" height="50" stroke="#9CA3AF" strokeWidth="2" rx="2"/>
                <rect x="110" y="80" width="80" height="40" stroke="#9CA3AF" strokeWidth="2" rx="2"/>
                <circle cx="150" cy="50" r="25" stroke="#9CA3AF" strokeWidth="2"/>
                <path d="M125 50 Q150 20 175 50" stroke="#9CA3AF" strokeWidth="2" fill="none"/>
                <line x1="145" y1="25" x2="145" y2="15" stroke="#9CA3AF" strokeWidth="2"/>
                <circle cx="145" cy="12" r="3" fill="#9CA3AF"/>
                <line x1="230" y1="50" x2="230" y2="40" stroke="#9CA3AF" strokeWidth="2"/>
                <circle cx="230" cy="37" r="3" fill="#9CA3AF"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Headings */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-blue-600 mb-4">Destinations</h2>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Explore Our Nationwide Cab Services
          </h3>
          <p className="text-gray-600 leading-relaxed max-w-5xl">
            Discover the top 10 most popular destinations in India where our cab services are in high demand. 
            However, our reach extends far beyond these cities, with a presence in over 3000+ cities and towns 
            across the country. Our extensive network spans across PAN India, ensuring that you can book a cab 
            with us in almost every city and town.
          </p>
        </div>

        {/* Book Your Ride Today Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-12 shadow-sm">
          <h4 className="text-xl font-bold text-gray-900 mb-3">Book Your Ride Today:</h4>
          <p className="text-gray-600 mb-6">
            Click the link below to explore our services, check prices, and book a cab in any city across India.
          </p>
          <a 
            href="/"
            className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-md hover:bg-blue-700 transition-colors shadow-sm"
          >
            Get Quote / Book Now
          </a>
        </div>

        {/* Destinations Grid */}
        {destinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((destination) => (
              <DestinationCard key={destination._id} destination={destination} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No destinations have been added yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationsPage;