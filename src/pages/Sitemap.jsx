

import { useEffect, useState } from "react";
import { getAirports } from "../api/airportApi";
import { getCarRentals } from "../api/rentalApi";
import { getOutstations } from "../api/outstationApi";
import { getPopularRoutes } from "../api/popularRoutesApi";
import { getGroupedOneWayRoutes } from "../api/oneWayRouteApi";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Sitemap() {
  const [popularRoutes, setPopularRoutes] = useState([]);
  const [oneWayRoutes, setOneWayRoutes] = useState([]);
  const [airports, setAirports] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [outstations, setOutstations] = useState([]);

  const [loadingPopular, setLoadingPopular] = useState(true);
  const [loadingOneWay, setLoadingOneWay] = useState(true);
  const [loadingAirports, setLoadingAirports] = useState(true);
  const [loadingRentals, setLoadingRentals] = useState(true);
  const [loadingOutstations, setLoadingOutstations] = useState(true);

  // Track which card is hovered
  const [hoveredCard, setHoveredCard] = useState(null);
  const [openCity, setOpenCity] = useState(null);

  useEffect(() => {
    getPopularRoutes()
      .then((data) => setPopularRoutes(Array.isArray(data) ? data : []))
      .catch(() => setPopularRoutes([]))
      .finally(() => setLoadingPopular(false));

    getGroupedOneWayRoutes()
      .then((data) => setOneWayRoutes(Array.isArray(data) ? data : []))
      .catch(() => setOneWayRoutes([]))
      .finally(() => setLoadingOneWay(false));

    getOutstations()
      .then((data) => setOutstations(Array.isArray(data) ? data : []))
      .catch(() => setOutstations([]))
      .finally(() => setLoadingOutstations(false));

    getAirports()
      .then((data) => setAirports(Array.isArray(data) ? data : []))
      .catch(() => setAirports([]))
      .finally(() => setLoadingAirports(false));

    getCarRentals()
      .then((data) => {
        if (!data) setRentals([]);
        else if (Array.isArray(data)) setRentals(data);
        else setRentals([data]);
      })
      .catch(() => setRentals([]))
      .finally(() => setLoadingRentals(false));
  }, []);

  const toggleCity = (cityName) => {
    setOpenCity(openCity === cityName ? null : cityName);
  };


  // Helper to get hover text
  const getHoverText = (type, item) => {
    switch (type) {
      case "popular":
        return `Book taxi from ${item.from} to ${item.to}${item.state ? `, ${item.state}` : ""}`;
      case "outstation":
        return `Hire Outstation cab from ${item.name}${item.state ? `, ${item.state}` : ""}`;
      case "rental":
        return `Car rental in ${item.cityName || item.name}${item.state ? `, ${item.state}` : ""}`;
      case "airport":
        return `Pickup & Drop to  ${item.name}${item.state ? `, ${item.state}` : ""}`;
      default:
        return "";
    }
  }

  // Styles for tooltip
  const tooltipClasses = "absolute bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg z-10";
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-6 relative">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Sitemap</h1>

      {/* Popular Routes */}
      <section className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Popular Outstation Cab Routes (One Way, Round Trip, Multi City Multi Day)
        </h2>
        {loadingPopular ? (
          <p className="text-gray-500 text-sm">Loading popular routes...</p>
        ) : popularRoutes.length === 0 ? (
          <p className="text-gray-500 text-sm">No popular routes available.</p>
        ) : (
          <ul className="grid md:grid-cols-3 gap-3">
            {popularRoutes.map((route) => (
              <li key={route._id} className="relative">
                <Link
                  to={`/book-taxi/${route.slug}`}
                  state={{
                    prefillData: {
                      pickup: route.from,
                      drop: route.to,
                      date: new Date().toISOString().split('T')[0],
                      time: new Date().toTimeString().slice(0, 5),
                      activeTab: "Outstation"
                    }
                  }}
                  className="block p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                  onMouseEnter={() => setHoveredCard(`popular-${route._id}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <span className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-gray-500" />
                    {route.from} to {route.to}
                  </span>
                </Link>
                {hoveredCard === `popular-${route._id}` && (
                  <div className={`${tooltipClasses} mt-2`}>
                    {getHoverText("popular", route)}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

       {/* --- One-Way Taxi Routes Section --- */}
      <section className="mb-12">
  <h2 className="text-2xl font-semibold text-gray-800 mb-6">One-Way Taxi Routes</h2>
  <div className="border rounded-lg bg-white shadow-sm">
    {oneWayRoutes.map((group) => (
      <div key={group._id} className="border-b last:border-b-0">
        <button
          onClick={() => toggleCity(group._id)}
          className={`w-full flex justify-between items-center p-5 text-left transition-colors ${openCity === group._id ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
        >
          <span className="text-lg font-medium text-gray-800">{group._id}</span>
          <ChevronDown className={`transition-transform duration-300 ${openCity === group._id ? 'rotate-180 text-red-600' : ''}`} />
        </button>
        
        {openCity === group._id && (
          <div className="px-5 pb-5">
            {/* --- UPDATE: Add header for the list --- */}
            <div className="flex justify-between pt-4 border-t text-sm font-semibold text-gray-500">
              <span>Route</span>
              <span>Starting Price (₹)</span>
            </div>
            <ul className="grid grid-cols-1 gap-y-2 pt-2">
              {group.routes.map((route) => (
                <li key={route.slug}>
                   <Link 
                     to={`/one-way-taxi/${route.slug}`}
                     className="flex justify-between items-center p-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md"
                   >
                     <span>{group._id} to {route.toCity}</span>
                     {/* --- UPDATE: Display the price --- */}
                     {route.price && (
                       <span className="font-semibold text-gray-800">
                         ₹{route.price}
                       </span>
                     )}
                   </Link>
                 </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    ))}
  </div>
</section>
      {/* Outstations */}
      <section className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Top Cities (Outstation)</h2>
        {loadingOutstations ? (
          <p className="text-gray-500 text-sm">Loading outstations...</p>
        ) : outstations.length === 0 ? (
          <p className="text-gray-500 text-sm">No outstations available.</p>
        ) : (
          <ul className="grid md:grid-cols-3 gap-3">
            {outstations.map((city) => (
              <li key={city._id} className="relative">
                <Link
                  to={`/outstation-cab/${city.slug}`}
                  state={{
                    prefillData: {
                      pickup: city.name,
                      date: new Date().toISOString().split('T')[0],
                      time: new Date().toTimeString().slice(0, 5),
                      activeTab: "Outstation"
                    }
                  }}
                  className="block p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                  onMouseEnter={() => setHoveredCard(`outstation-${city._id}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <span className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-gray-500" />
                    {city.name}
                  </span>
                </Link>
                {hoveredCard === `outstation-${city._id}` && (
                  <div className={`${tooltipClasses} mt-2`}>
                    {getHoverText("outstation", city)}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
      {/* Car Rentals */}
      <section className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Car Rental (Hourly Rentals, Outstation)</h2>
        {loadingRentals ? (
          <p className="text-gray-500 text-sm">Loading rentals...</p>
        ) : rentals.length === 0 ? (
          <p className="text-gray-500 text-sm">No rentals available.</p>
        ) : (
          <ul className="grid md:grid-cols-3 gap-3">
            {rentals.map((rental) => (
              <li key={rental._id} className="relative">
                <Link
                  to={`/car-rentals/${rental.slug}`}
                  state={{
                    prefillData: {
                      pickup: rental.cityName || rental.name,
                      date: new Date().toISOString().split('T')[0],
                      time: new Date().toTimeString().slice(0, 5),
                      activeTab: "Rentals"
                    }
                  }}
                  className="block p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                  onMouseEnter={() => setHoveredCard(`rental-${rental._id}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <span className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-gray-500" />
                    {rental.name}
                  </span>
                </Link>
                {hoveredCard === `rental-${rental._id}` && (
                  <div className={`${tooltipClasses} mt-2`}>
                    {getHoverText("rental", rental)}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Airports */}
      {/* new Line Added */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Airport Transfer (Pickup & Drop)</h2>
        {loadingAirports ? (
          <p className="text-gray-500 text-sm">Loading airports...</p>
        ) : airports.length === 0 ? (
          <p className="text-gray-500 text-sm">No airports available.</p>
        ) : (
          <ul className="grid md:grid-cols-3 gap-3">
            {airports.map((airport) => (
              <li key={airport._id} className="relative">
                <Link
                  to={`/airport-transfer/${airport.slug}`}
                  state={{
                    prefillData: {
                      pickup: airport.name,
                      date: new Date().toISOString().split('T')[0],
                      time: new Date().toTimeString().slice(0, 5),
                      activeTab: "Airport Rides"
                    }
                  }}
                  className="block p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                  onMouseEnter={() => setHoveredCard(`airport-${airport._id}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <span className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-gray-500" />
                    {airport.name}
                  </span>
                </Link>
                {hoveredCard === `airport-${airport._id}` && (
                  <div className={`${tooltipClasses} mt-2`}>
                    {getHoverText("airport", airport)}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}



