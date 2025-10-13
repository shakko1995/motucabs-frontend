

// import { useEffect, useState } from "react";
// import { getAirports } from "../api/airportApi";
// import { getCarRentals } from "../api/rentalApi";
// import { getOutstations } from "../api/outstationApi";
// import { getPopularRoutes } from "../api/popularRoutesApi";
// import { getGroupedOneWayRoutes } from "../api/oneWayRouteApi";
// import { Link } from "react-router-dom";
// import { ArrowRight, ChevronDown } from "lucide-react";

// export default function Sitemap() {
//   const [popularRoutes, setPopularRoutes] = useState([]);
//   const [oneWayRoutes, setOneWayRoutes] = useState([]);
//   const [airports, setAirports] = useState([]);
//   const [rentals, setRentals] = useState([]);
//   const [outstations, setOutstations] = useState([]);

//   const [loadingPopular, setLoadingPopular] = useState(true);
//   const [loadingOneWay, setLoadingOneWay] = useState(true);
//   const [loadingAirports, setLoadingAirports] = useState(true);
//   const [loadingRentals, setLoadingRentals] = useState(true);
//   const [loadingOutstations, setLoadingOutstations] = useState(true);

//   // Track which card is hovered
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [openCity, setOpenCity] = useState(null);

//   useEffect(() => {
//     getPopularRoutes()
//       .then((data) => setPopularRoutes(Array.isArray(data) ? data : []))
//       .catch(() => setPopularRoutes([]))
//       .finally(() => setLoadingPopular(false));

//     getGroupedOneWayRoutes()
//       .then((data) => setOneWayRoutes(Array.isArray(data) ? data : []))
//       .catch(() => setOneWayRoutes([]))
//       .finally(() => setLoadingOneWay(false));

//     getOutstations()
//       .then((data) => setOutstations(Array.isArray(data) ? data : []))
//       .catch(() => setOutstations([]))
//       .finally(() => setLoadingOutstations(false));

//     getAirports()
//       .then((data) => setAirports(Array.isArray(data) ? data : []))
//       .catch(() => setAirports([]))
//       .finally(() => setLoadingAirports(false));

//     getCarRentals()
//       .then((data) => {
//         if (!data) setRentals([]);
//         else if (Array.isArray(data)) setRentals(data);
//         else setRentals([data]);
//       })
//       .catch(() => setRentals([]))
//       .finally(() => setLoadingRentals(false));
//   }, []);

//   const toggleCity = (cityName) => {
//     setOpenCity(openCity === cityName ? null : cityName);
//   };


//   // Helper to get hover text
//   const getHoverText = (type, item) => {
//     switch (type) {
//       case "popular":
//         return `Book taxi from ${item.from} to ${item.to}${item.state ? `, ${item.state}` : ""}`;
//       case "outstation":
//         return `Hire Outstation cab from ${item.name}${item.state ? `, ${item.state}` : ""}`;
//       case "rental":
//         return `Car rental in ${item.cityName || item.name}${item.state ? `, ${item.state}` : ""}`;
//       case "airport":
//         return `Pickup & Drop to  ${item.name}${item.state ? `, ${item.state}` : ""}`;
//       default:
//         return "";
//     }
//   }

//   // Styles for tooltip
//   const tooltipClasses = "absolute bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg z-10";
//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10 space-y-6 relative">
//       <h1 className="text-3xl font-semibold text-gray-900 mb-6">Sitemap</h1>

//       {/* Popular Routes */}
//       <section className="mb-6">
//         <h2 className="text-xl font-bold text-gray-900 mb-3">
//           Popular Outstation Cab Routes (One Way, Round Trip, Multi City Multi Day)
//         </h2>
//         {loadingPopular ? (
//           <p className="text-gray-500 text-sm">Loading popular routes...</p>
//         ) : popularRoutes.length === 0 ? (
//           <p className="text-gray-500 text-sm">No popular routes available.</p>
//         ) : (
//           <ul className="grid md:grid-cols-3 gap-3">
//             {popularRoutes.map((route) => (
//               <li key={route._id} className="relative">
//                 <Link
//                   to={`/book-taxi/${route.slug}`}
//                   state={{
//                     prefillData: {
//                       pickup: route.from,
//                       drop: route.to,
//                       date: new Date().toISOString().split('T')[0],
//                       time: new Date().toTimeString().slice(0, 5),
//                       activeTab: "Outstation"
//                     }
//                   }}
//                   className="block p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
//                   onMouseEnter={() => setHoveredCard(`popular-${route._id}`)}
//                   onMouseLeave={() => setHoveredCard(null)}
//                 >
//                   <span className="flex items-center gap-2">
//                     <ArrowRight className="w-4 h-4 text-gray-500" />
//                     {route.from} to {route.to}
//                   </span>
//                 </Link>
//                 {hoveredCard === `popular-${route._id}` && (
//                   <div className={`${tooltipClasses} mt-2`}>
//                     {getHoverText("popular", route)}
//                   </div>
//                 )}
//               </li>
//             ))}
//           </ul>
//         )}
//       </section>

//        {/* --- One-Way Taxi Routes Section --- */}
//       <section className="mb-12">
//   <h2 className="text-2xl font-semibold text-gray-800 mb-6">One-Way Taxi Routes</h2>
//   <div className="border rounded-lg bg-white shadow-sm">
//     {oneWayRoutes.map((group) => (
//       <div key={group._id} className="border-b last:border-b-0">
//         <button
//           onClick={() => toggleCity(group._id)}
//           className={`w-full flex justify-between items-center p-5 text-left transition-colors ${openCity === group._id ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
//         >
//           <span className="text-lg font-medium text-gray-800">{group._id}</span>
//           <ChevronDown className={`transition-transform duration-300 ${openCity === group._id ? 'rotate-180 text-red-600' : ''}`} />
//         </button>

//         {openCity === group._id && (
//           <div className="px-5 pb-5">
//             {/* --- UPDATE: Add header for the list --- */}
//             <div className="flex justify-between pt-4 border-t text-sm font-semibold text-gray-500">
//               <span>Route</span>
//               <span>Starting Price (₹)</span>
//             </div>
//             <ul className="grid grid-cols-1 gap-y-2 pt-2">
//               {group.routes.map((route) => (
//                 <li key={route.slug}>
//                    <Link 
//                      to={`/one-way-taxi/${route.slug}`}
//                      className="flex justify-between items-center p-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md"
//                    >
//                      <span>{group._id} to {route.toCity}</span>
//                      {/* --- UPDATE: Display the price --- */}
//                      {route.price && (
//                        <span className="font-semibold text-gray-800">
//                          ₹{route.price}
//                        </span>
//                      )}
//                    </Link>
//                  </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     ))}
//   </div>
// </section>
//       {/* Outstations */}
//       <section className="mb-6">
//         <h2 className="text-xl font-bold text-gray-900 mb-3">Top Cities (Outstation)</h2>
//         {loadingOutstations ? (
//           <p className="text-gray-500 text-sm">Loading outstations...</p>
//         ) : outstations.length === 0 ? (
//           <p className="text-gray-500 text-sm">No outstations available.</p>
//         ) : (
//           <ul className="grid md:grid-cols-3 gap-3">
//             {outstations.map((city) => (
//               <li key={city._id} className="relative">
//                 <Link
//                   to={`/outstation-cab/${city.slug}`}
//                   state={{
//                     prefillData: {
//                       pickup: city.name,
//                       date: new Date().toISOString().split('T')[0],
//                       time: new Date().toTimeString().slice(0, 5),
//                       activeTab: "Outstation"
//                     }
//                   }}
//                   className="block p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
//                   onMouseEnter={() => setHoveredCard(`outstation-${city._id}`)}
//                   onMouseLeave={() => setHoveredCard(null)}
//                 >
//                   <span className="flex items-center gap-2">
//                     <ArrowRight className="w-4 h-4 text-gray-500" />
//                     {city.name}
//                   </span>
//                 </Link>
//                 {hoveredCard === `outstation-${city._id}` && (
//                   <div className={`${tooltipClasses} mt-2`}>
//                     {getHoverText("outstation", city)}
//                   </div>
//                 )}
//               </li>
//             ))}
//           </ul>
//         )}
//       </section>
//       {/* Car Rentals */}
//       <section className="mb-6">
//         <h2 className="text-xl font-bold text-gray-900 mb-3">Car Rental (Hourly Rentals, Outstation)</h2>
//         {loadingRentals ? (
//           <p className="text-gray-500 text-sm">Loading rentals...</p>
//         ) : rentals.length === 0 ? (
//           <p className="text-gray-500 text-sm">No rentals available.</p>
//         ) : (
//           <ul className="grid md:grid-cols-3 gap-3">
//             {rentals.map((rental) => (
//               <li key={rental._id} className="relative">
//                 <Link
//                   to={`/car-rentals/${rental.slug}`}
//                   state={{
//                     prefillData: {
//                       pickup: rental.cityName || rental.name,
//                       date: new Date().toISOString().split('T')[0],
//                       time: new Date().toTimeString().slice(0, 5),
//                       activeTab: "Rentals"
//                     }
//                   }}
//                   className="block p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
//                   onMouseEnter={() => setHoveredCard(`rental-${rental._id}`)}
//                   onMouseLeave={() => setHoveredCard(null)}
//                 >
//                   <span className="flex items-center gap-2">
//                     <ArrowRight className="w-4 h-4 text-gray-500" />
//                     {rental.name}
//                   </span>
//                 </Link>
//                 {hoveredCard === `rental-${rental._id}` && (
//                   <div className={`${tooltipClasses} mt-2`}>
//                     {getHoverText("rental", rental)}
//                   </div>
//                 )}
//               </li>
//             ))}
//           </ul>
//         )}
//       </section>

//       {/* Airports */}
//       {/* new Line Added */}
//       <section className="mb-10">
//         <h2 className="text-xl font-bold text-gray-900 mb-3">Airport Transfer (Pickup & Drop)</h2>
//         {loadingAirports ? (
//           <p className="text-gray-500 text-sm">Loading airports...</p>
//         ) : airports.length === 0 ? (
//           <p className="text-gray-500 text-sm">No airports available.</p>
//         ) : (
//           <ul className="grid md:grid-cols-3 gap-3">
//             {airports.map((airport) => (
//               <li key={airport._id} className="relative">
//                 <Link
//                   to={`/airport-transfer/${airport.slug}`}
//                   state={{
//                     prefillData: {
//                       pickup: airport.name,
//                       date: new Date().toISOString().split('T')[0],
//                       time: new Date().toTimeString().slice(0, 5),
//                       activeTab: "Airport Rides"
//                     }
//                   }}
//                   className="block p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
//                   onMouseEnter={() => setHoveredCard(`airport-${airport._id}`)}
//                   onMouseLeave={() => setHoveredCard(null)}
//                 >
//                   <span className="flex items-center gap-2">
//                     <ArrowRight className="w-4 h-4 text-gray-500" />
//                     {airport.name}
//                   </span>
//                 </Link>
//                 {hoveredCard === `airport-${airport._id}` && (
//                   <div className={`${tooltipClasses} mt-2`}>
//                     {getHoverText("airport", airport)}
//                   </div>
//                 )}
//               </li>
//             ))}
//           </ul>
//         )}
//       </section>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { getAirports } from "../api/airportApi";
import { getCarRentals } from "../api/rentalApi";
import { getOutstations } from "../api/outstationApi";
import { getPopularRoutes } from "../api/popularRoutesApi";
import { getGroupedOneWayRoutes } from "../api/oneWayRouteApi";
import { getAllTempoTravellerRoutes } from "../api/tempoTravellersApi";
import { getAllTempoTravellers } from "../api/tempoTravellerApi";
import { getAllVendorPartners } from "../api/vendorPartnerApi";
import { getAllDriverPartners } from "../api/driverPartnerApi";
import { getAllCarAttachments } from "../api/carAttachmentApi";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Sitemap() {
  const [popularRoutes, setPopularRoutes] = useState([]);
  const [oneWayRoutes, setOneWayRoutes] = useState([]);
  const [airports, setAirports] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [outstations, setOutstations] = useState([]);
  const [tempoCityPages, setTempoCityPages] = useState([]);
  const [tempoRoutePages, setTempoRoutePages] = useState([]);
  const [vendorPartners, setVendorPartners] = useState([]);
  const [driverPartners, setDriverPartners] = useState([]);
  const [carAttachments, setCarAttachments] = useState([]);

  
  const [loadingPopular, setLoadingPopular] = useState(true);
  const [loadingOneWay, setLoadingOneWay] = useState(true);
  const [loadingAirports, setLoadingAirports] = useState(true);
  const [loadingRentals, setLoadingRentals] = useState(true);
  const [loadingOutstations, setLoadingOutstations] = useState(true);
  const [loadingTempoCity, setLoadingTempoCity] = useState(true);
  const [loadingTempoRoutes, setLoadingTempoRoutes] = useState(true);
  const [loadingVendor, setLoadingVendor] = useState(true);
  const [loadingDriver, setLoadingDriver] = useState(true);
  const [loadingCarAttachment, setLoadingCarAttachment] = useState(true);

  const [hoveredCard, setHoveredCard] = useState(null);
  const [openCity, setOpenCity] = useState(null);

   useEffect(() => {
    // --- Other API calls remain the same ---
    getPopularRoutes().then(setPopularRoutes).catch(() => setPopularRoutes([])).finally(() => setLoadingPopular(false));
    getGroupedOneWayRoutes().then(setOneWayRoutes).catch(() => setOneWayRoutes([])).finally(() => setLoadingOneWay(false));
    getOutstations().then(setOutstations).catch(() => setOutstations([])).finally(() => setLoadingOutstations(false));
    getAirports().then(setAirports).catch(() => setAirports([])).finally(() => setLoadingAirports(false));
    getCarRentals().then(setRentals).catch(() => setRentals([])).finally(() => setLoadingRentals(false));
    getAllVendorPartners().then(setVendorPartners).catch(() => setVendorPartners([])).finally(() => setLoadingVendor(false));
    getAllDriverPartners().then(setDriverPartners).catch(() => setDriverPartners([])).finally(() => setLoadingDriver(false));
    getAllCarAttachments().then(setCarAttachments).catch(() => setCarAttachments([])).finally(() => setLoadingCarAttachment(false));
    
    // CORRECTED USEEFFECT: Fetch both Tempo Traveller types with correct functions
    getAllTempoTravellers()
        .then((data) => setTempoCityPages(Array.isArray(data) ? data : []))
        .catch(() => setTempoCityPages([]))
        .finally(() => setLoadingTempoCity(false));

    getAllTempoTravellerRoutes()
        .then((data) => setTempoRoutePages(Array.isArray(data) ? data : []))
        .catch(() => setTempoRoutePages([]))
        .finally(() => setLoadingTempoRoutes(false));
  }, []);


  const toggleCity = (cityName) => {
    setOpenCity(openCity === cityName ? null : cityName);
  };

const getHoverText = (type, item) => {
    switch (type) {
      case "popular":
        return `Book taxi from ${item.from} to ${item.to}${item.state ? `, ${item.state}` : ""}`;
      case "outstation":
        return `Hire Outstation cab from ${item.name}${item.state ? `, ${item.state}` : ""}`;
      case "rental":
        return `Car rental in ${item.cityName || item.name}${item.state ? `, ${item.state}` : ""}`;
      case "airport":
        return `Pickup & Drop to ${item.name}${item.state ? `, ${item.state}` : ""}`;
    
      case "tempo_city":
        return `Tempo Traveller in ${item.city}`;
      case "tempo_route":
        return `Tempo Traveller route: ${item.fromCity} to ${item.toCity}`;
      case "vendor":
        return `Vendor Partner: ${item.city}`;
      case "driver":
        return `Driver Partner: ${item.city}`;
      case "carAttachment":
        return `Car Attachment: ${item.city}`;
      default:
        return "";
    }
  };

  const tooltipClasses = "absolute bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg z-10";

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-6 relative">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Sitemap</h1>

      {/* Popular Routes */}
      <section className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Popular Outstation Cab Routes</h2>
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
                      date: new Date().toISOString().split("T")[0],
                      time: new Date().toTimeString().slice(0, 5),
                      activeTab: "Outstation",
                    },
                  }}
                  className="block p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                  onMouseEnter={() => setHoveredCard(`popular-${route._id}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <span className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-gray-500" /> {route.from} to {route.to}
                  </span>
                </Link>
                {hoveredCard === `popular-${route._id}` && (
                  <div className={`${tooltipClasses} mt-2`}>{getHoverText("popular", route)}</div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* One-Way Taxi Routes */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">One-Way Taxi Routes</h2>
        <div className="border rounded-lg bg-white shadow-sm">
          {oneWayRoutes.map((group) => (
            <div key={group._id} className="border-b last:border-b-0">
              <button
                onClick={() => toggleCity(group._id)}
                className={`w-full flex justify-between items-center p-5 text-left transition-colors ${openCity === group._id ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
              >
                <span className="text-lg font-medium text-gray-800">{group._id}</span>
                <ChevronDown
                  className={`transition-transform duration-300 ${openCity === group._id ? "rotate-180 text-red-600" : ""
                    }`}
                />
              </button>
              {openCity === group._id && (
                <div className="px-5 pb-5">
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
                          <span>
                            {group._id} to {route.toCity}
                          </span>
                          {route.price && <span className="font-semibold text-gray-800">₹{route.price}</span>}
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
                      date: new Date().toISOString().split("T")[0],
                      time: new Date().toTimeString().slice(0, 5),
                      activeTab: "Outstation",
                    },
                  }}
                  className="block p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                  onMouseEnter={() => setHoveredCard(`outstation-${city._id}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <span className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-gray-500" /> {city.name}
                  </span>
                </Link>
                {hoveredCard === `outstation-${city._id}` && (
                  <div className={`${tooltipClasses} mt-2`}>{getHoverText("outstation", city)}</div>
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
                      date: new Date().toISOString().split("T")[0],
                      time: new Date().toTimeString().slice(0, 5),
                      activeTab: "Rentals",
                    },
                  }}
                  className="block p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                  onMouseEnter={() => setHoveredCard(`rental-${rental._id}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <span className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-gray-500" /> {rental.name}
                  </span>
                </Link>
                {hoveredCard === `rental-${rental._id}` && (
                  <div className={`${tooltipClasses} mt-2`}>{getHoverText("rental", rental)}</div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Airports */}
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
                      date: new Date().toISOString().split("T")[0],
                      time: new Date().toTimeString().slice(0, 5),
                      activeTab: "Airport Rides",
                    },
                  }}
                  className="block p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                  onMouseEnter={() => setHoveredCard(`airport-${airport._id}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <span className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-gray-500" /> {airport.name}
                  </span>
                </Link>
                {hoveredCard === `airport-${airport._id}` && (
                  <div className={`${tooltipClasses} mt-2`}>{getHoverText("airport", airport)}</div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Tempo Travellers */}
       {/* CORRECTED JSX: Full section for Tempo Travellers */}
        {/* Tempo Travellers */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-3">Tempo Traveller Services</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">By City</h3>
            {loadingTempoCity ? (
              <p className="text-gray-500 text-sm">Loading...</p>
            ) : tempoCityPages.length === 0 ? (
              <p className="text-gray-500 text-sm">No city services available.</p>
            ) : (
              <ul className="space-y-2">
                {tempoCityPages.map((t) => (
                  <li key={t._id} className="relative">
                    <Link to={`/tempo-traveller/${t.slug}`} className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition" onMouseEnter={() => setHoveredCard(`tempo-city-${t._id}`)} onMouseLeave={() => setHoveredCard(null)}>
                      <ArrowRight className="w-4 h-4 text-gray-500" /> {t.city}
                    </Link>
                    {hoveredCard === `tempo-city-${t._id}` && <div className={tooltipClasses}>{getHoverText("tempo_city", t)}</div>}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">By Route (A-to-B)</h3>
            {loadingTempoRoutes ? (
              <p className="text-gray-500 text-sm">Loading...</p>
            ) : tempoRoutePages.length === 0 ? (
              <p className="text-gray-500 text-sm">No routes available.</p>
            ) : (
              <ul className="space-y-2">
                {tempoRoutePages.map((t) => (
                  <li key={t._id} className="relative">
                    <Link to={`/tempo-travellers/${t.slug}`} className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition" onMouseEnter={() => setHoveredCard(`tempo-route-${t._id}`)} onMouseLeave={() => setHoveredCard(null)}>
                      <ArrowRight className="w-4 h-4 text-gray-500" /> {t.fromCity} to {t.toCity}
                    </Link>
                    {hoveredCard === `tempo-route-${t._id}` && <div className={tooltipClasses}>{getHoverText("tempo_route", t)}</div>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* Vendor Partners */}
      <section className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Vendor Partners</h2>
        {loadingVendor ? (
          <p className="text-gray-500 text-sm">Loading vendor partners...</p>
        ) : vendorPartners.length === 0 ? (
          <p className="text-gray-500 text-sm">No vendor partners available.</p>
        ) : (
          <ul className="grid md:grid-cols-3 gap-3">
            {vendorPartners.map((v) => (
              <li key={v._id} className="relative">
                <Link
                  to={`/vendor-partner/${v.slug}`}
                  className="block p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                  onMouseEnter={() => setHoveredCard(`vendor-${v._id}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <span className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-gray-500" /> {v.city}
                  </span>
                </Link>
                {hoveredCard === `vendor-${v._id}` && (
                  <div className={`${tooltipClasses} mt-2`}>{getHoverText("vendor", v)}</div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Driver Partners */}
      <section className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Driver Partners</h2>
        {loadingDriver ? (
          <p className="text-gray-500 text-sm">Loading driver partners...</p>
        ) : driverPartners.length === 0 ? (
          <p className="text-gray-500 text-sm">No driver partners available.</p>
        ) : (
          <ul className="grid md:grid-cols-3 gap-3">
            {driverPartners.map((d) => (
              <li key={d._id} className="relative">
                <Link
                  to={`/driver-partner/${d.slug}`}
                  className="block p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                  onMouseEnter={() => setHoveredCard(`driver-${d._id}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <span className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-gray-500" /> {d.city}
                  </span>
                </Link>
                {/* Corrected this line to use d._id */}
                {hoveredCard === `driver-${d._id}` && (
                  <div className={`${tooltipClasses} mt-2`}>{getHoverText("driver", d)}</div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Car Attachments */}
      <section className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Car Attachments</h2>
        {loadingCarAttachment ? (
          <p className="text-gray-500 text-sm">Loading car attachments...</p>
        ) : carAttachments.length === 0 ? (
          <p className="text-gray-500 text-sm">No car attachments available.</p>
        ) : (
          <ul className="grid md:grid-cols-3 gap-3">
            {carAttachments.map((c) => (
              <li key={c._id} className="relative">
                <Link
                  to={`/car-attachment/${c.slug}`}
                  className="block p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                  onMouseEnter={() => setHoveredCard(`carAttachment-${c._id}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <span className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-gray-500" /> {c.city}
                  </span>
                </Link>
                {hoveredCard === `carAttachment-${c._id}` && (
                  <div className={`${tooltipClasses} mt-2`}>{getHoverText("carAttachment", c)}</div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}


