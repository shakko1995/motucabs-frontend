import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  MapPin,
  Clock,
  CalendarDays,
  IndianRupee,
  Search,
  X,
  Plane,
} from "lucide-react";

const PackagesPage = () => {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [filters, setFilters] = useState({
    fromState: "",
    fromCity: "",
    minNights: "",
    maxNights: "",
  });

  // 🟩 Fetch All Packages
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/packages/all");
        const active = res.data.data?.filter((pkg) => pkg.isActive) || [];
        setPackages(active);
        setFilteredPackages(active);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  // 🟨 Filter Logic
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    const { fromState, fromCity, minNights, maxNights } = filters;
    const filtered = packages.filter((pkg) => {
      const matchState =
        !fromState ||
        pkg.fromState?.toLowerCase().includes(fromState.toLowerCase());
      const matchCity =
        !fromCity ||
        pkg.fromCity?.toLowerCase().includes(fromCity.toLowerCase());
      const matchNights =
        (!minNights || pkg.nights >= Number(minNights)) &&
        (!maxNights || pkg.nights <= Number(maxNights));
      return matchState && matchCity && matchNights;
    });
    setFilteredPackages(filtered);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 animate-pulse text-lg">
          Loading packages...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 🖼️ Banner Section */}
      <div className="relative w-full h-80 md:h-96">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1500&q=80"
          alt="Travel Banner"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Discover Your Perfect Journey
          </h1>
          <p className="max-w-xl text-gray-200 text-lg">
            Handpicked tour packages crafted for unforgettable experiences.
          </p>
        </div>
      </div>

      {/* 🔍 Filter Section */}
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-2xl p-6 mt-[-50px] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Going From
            </label>
            <input
              type="text"
              name="fromState"
              value={filters.fromState}
              onChange={handleFilterChange}
              placeholder="Enter State"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Select City
            </label>
            <input
              type="text"
              name="fromCity"
              value={filters.fromCity}
              onChange={handleFilterChange}
              placeholder="Enter City"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Min Nights
            </label>
            <input
              type="number"
              name="minNights"
              value={filters.minNights}
              onChange={handleFilterChange}
              placeholder="0"
              min="0"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Max Nights
            </label>
            <input
              type="number"
              name="maxNights"
              value={filters.maxNights}
              onChange={handleFilterChange}
              placeholder="10"
              min="0"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <button
              onClick={handleSearch}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition"
            >
              <Search size={18} /> Search
            </button>
          </div>
        </div>
      </div>

      {/* 🧳 Package Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-12 px-6">
        {filteredPackages.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No packages found. Try adjusting filters.
          </p>
        ) : (
          filteredPackages.map((pkg) => (
            <div
              key={pkg._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-64">
                <img
                  src={pkg.images?.[0] || "/placeholder.jpg"}
                  alt={pkg.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                  {pkg.fromCity || "Unknown City"}
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h2 className="text-xl font-semibold text-slate-800 mb-2 line-clamp-2">
                    {pkg.title}
                  </h2>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                    {pkg.description}
                  </p>
                  <div className="flex items-center gap-4 text-gray-500 text-sm mb-3">
                    <div className="flex items-center gap-1">
                      <Clock size={16} /> {pkg.days} Days / {pkg.nights} Nights
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarDays size={16} /> Flexible Dates
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-blue-600 font-semibold text-lg mb-3">
                    <IndianRupee size={18} /> {pkg.price?.toLocaleString()}
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => setSelectedPackage(pkg)}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
                  >
                    Show More
                  </button>
                  <Link
                    to="/login"
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 🪟 Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl overflow-y-auto max-h-[90vh] relative shadow-lg">
            <button
              onClick={() => setSelectedPackage(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            <img
              src={selectedPackage.images?.[0] || "/placeholder.jpg"}
              alt={selectedPackage.title}
              className="w-full h-80 object-cover rounded-t-2xl"
            />

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2 text-slate-800">
                {selectedPackage.title}
              </h2>
              <p className="text-slate-600 mb-4">
                {selectedPackage.description}
              </p>

              <div className="flex items-center gap-4 mb-4 text-gray-600">
                <MapPin size={18} />
                <span>
                  {selectedPackage.fromCity}, {selectedPackage.fromState}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <Clock className="mx-auto text-blue-600 mb-1" />
                  <p className="text-sm font-medium">
                    {selectedPackage.days} Days / {selectedPackage.nights}{" "}
                    Nights
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <IndianRupee className="mx-auto text-green-600 mb-1" />
                  <p className="text-sm font-medium">
                    ₹{selectedPackage.price?.toLocaleString()}
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-3 text-slate-700">
                🗓️ Itinerary
              </h3>
              {selectedPackage.itinerary?.length > 0 ? (
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  {selectedPackage.itinerary.map((item, index) => (
                    <li key={index}>
                      <strong>Day {item.day}:</strong> {item.title} —{" "}
                      {item.description}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No itinerary available.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackagesPage;