
// import { useState } from "react";
// import axios from "axios";

// export default function RideBookingForm() {
//   const [rideType, setRideType] = useState("outstation");
//   const [pickupQuery, setPickupQuery] = useState("");
//   const [dropQuery, setDropQuery] = useState("");
//   const [pickupResults, setPickupResults] = useState([]);
//   const [dropResults, setDropResults] = useState([]);
//   const [pickupDate, setPickupDate] = useState("");
//   const [pickupTime, setPickupTime] = useState("");

//   // API: Location Search
//   const handleSearch = async (type, query) => {
//     if (!query) return;
//     try {
//       const res = await axios.get(`http://localhost:5000/api/locations/search?query=${query}`);
//       if (type === "pickup") setPickupResults(res.data.results);
//       else setDropResults(res.data.results);
//     } catch (err) {
//       console.error("Location fetch error", err);
//     }
//   };

//   // API: Ride Create
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const payload = {
//       rideType,
//       pickupLocation: pickupQuery,
//       dropLocation: dropQuery,
//       pickupDate,
//       pickupTime
//     };
//     try {
//       const res = await axios.post(`http://localhost:5000/api/rides/${rideType}`, payload);
//       alert("✅ Ride created successfully!");
//       console.log(res.data);
//     } catch (err) {
//       alert("❌ Failed to create ride");
//     }
//   };

//   return (
//     <div className="p-6 bg-white shadow-lg rounded-2xl w-[500px] mx-auto mt-6">
//       {/* Ride Type Tabs */}
//       <div className="flex space-x-4 mb-4">
//         {["airport", "outstation", "daytrip"].map((type) => (
//           <button
//             key={type}
//             className={`px-4 py-2 rounded-full font-semibold ${
//               rideType === type ? "bg-blue-600 text-white" : "bg-gray-100"
//             }`}
//             onClick={() => setRideType(type)}
//           >
//             {type.charAt(0).toUpperCase() + type.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Pickup Location */}
//         <div>
//           <input
//             type="text"
//             value={pickupQuery}
//             onChange={(e) => {
//               setPickupQuery(e.target.value);
//               handleSearch("pickup", e.target.value);
//             }}
//             placeholder="Pickup Location"
//             className="w-full border p-2 rounded"
//           />
//           {pickupResults.length > 0 && (
//             <ul className="bg-white border rounded shadow-md max-h-40 overflow-y-auto">
//               {pickupResults.map((loc, i) => (
//                 <li
//                   key={i}
//                   className="p-2 hover:bg-gray-200 cursor-pointer"
//                   onClick={() => {
//                     setPickupQuery(loc.address);
//                     setPickupResults([]);
//                   }}
//                 >
//                   {loc.address}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Drop Location */}
//         <div>
//           <input
//             type="text"
//             value={dropQuery}
//             onChange={(e) => {
//               setDropQuery(e.target.value);
//               handleSearch("drop", e.target.value);
//             }}
//             placeholder="Drop Location"
//             className="w-full border p-2 rounded"
//           />
//           {dropResults.length > 0 && (
//             <ul className="bg-white border rounded shadow-md max-h-40 overflow-y-auto">
//               {dropResults.map((loc, i) => (
//                 <li
//                   key={i}
//                   className="p-2 hover:bg-gray-200 cursor-pointer"
//                   onClick={() => {
//                     setDropQuery(loc.address);
//                     setDropResults([]);
//                   }}
//                 >
//                   {loc.address}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Date & Time */}
//         <div className="flex space-x-2">
//           <input
//             type="date"
//             value={pickupDate}
//             onChange={(e) => setPickupDate(e.target.value)}
//             className="border p-2 rounded w-1/2"
//           />
//           <input
//             type="time"
//             value={pickupTime}
//             onChange={(e) => setPickupTime(e.target.value)}
//             className="border p-2 rounded w-1/2"
//           />
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded"
//         >
//           NEXT
//         </button>
//       </form>
//     </div>
//   );
// }

// GozoCab Home Page



import React, { useState } from "react";
import { Check, ChevronDown, ArrowUpDown } from "lucide-react";

const GoZoBooking = () => {
  const [activeTab, setActiveTab] = useState("Airport Rides");
  const [tripType, setTripType] = useState("One way");
  const [airportOption, setAirportOption] = useState("Pick-up from");
  const [hours, setHours] = useState(8);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("IN");

  // Pickup & Drop for Outstation
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");

  const handleSwap = () => {
    setPickup((prevPickup) => {
      const temp = drop;
      setDrop(prevPickup);
      return temp;
    });
  };

  // Features for right side
  const tabContent = {
    "Airport Rides": {
      title: "Airport Transfers Made Easy",
      features: [
        { title: "All-Inclusive Pricing", description: "No hidden fees or surge charges." },
        { title: "Flight Tracking + Wait Time", description: "Up to 60 mins free waiting included." },
        { title: "Meet & Greet Service", description: "Driver with name board & luggage help." },
        { title: "Door-to-Door Transfers", description: "Pickup/drop at terminals, hotels & homes." },
        { title: "Clean, Comfortable Cars", description: "From Hatchbacks to SUVs & Travellers." },
      ],
    },
    Outstation: {
      title: "Long-Distance Travel, Simplified",
      features: [
        { title: "One-Way & Round Trips", description: "Pay only for what you need." },
        { title: "Transparent Pricing", description: "Upfront fares with no hidden charges." },
        { title: "PAN-India Coverage", description: "Available in 3,000+ towns & cities." },
        { title: "Multiple Car Options", description: "Hatchbacks to Tempo Travellers." },
        { title: "Verified Drivers", description: "Trained and background-checked professionals." },
      ],
    },
    "Day Trips": {
      title: "City Travel Made Simple",
      features: [
        { title: "Flexible Hourly Packages", description: "Choose from various durations & km slabs." },
        { title: "Wide Car Selection", description: "Hatchbacks, Sedans, SUVs & Premium Cars." },
        { title: "Chauffeur-Driven Comfort", description: "Air-conditioned rides — no driving hassles." },
        { title: "All-Inclusive Pricing", description: "Fuel, driver & taxes covered upfront." },
        { title: "Perfect for City Use", description: "Great for errands, tours, meetings & more." },
      ],
    },
  };

  // Render content based on selected tab
  const renderTabContent = () => {
    
    if (activeTab === "Airport Rides") {
      return (
        <div className="space-y-6">
          {/* Pick-up / Drop-off */}
          <div className="flex space-x-6">
            {["Pick-up from", "Drop-off"].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setAirportOption(opt)}
                className={`flex items-center font-medium ${
                  airportOption === opt ? "text-blue-600" : "text-gray-600"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 mr-2 ${
                    airportOption === opt
                      ? "bg-blue-600 border-blue-600"
                      : "border-gray-400"
                  }`}
                ></div>
                {opt}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Enter Airport"
            className="w-full border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="text"
            placeholder="Enter Destination"
            className="w-full border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <div className="grid grid-cols-2 gap-4">
            <input type="date" className="border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            <input type="time" className="border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
        </div>
      );
    }

    if (activeTab === "Outstation") {
      

      return (
        <div className="space-y-6">
          {/* Trip Type */}
          <div className="flex flex-wrap gap-4">
            {["One way", "Round trip", "Multi city"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setTripType(type)}
                className={`flex items-center font-medium ${
                  tripType === type ? "text-blue-600" : "text-gray-600"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 mr-2 ${
                    tripType === type ? "bg-blue-600 border-blue-600" : "border-gray-400"
                  }`}
                ></div>
                {type}
              </button>
            ))}
          </div>

          {/* One way & Round trip */}
          {(tripType === "One way" || tripType === "Round trip") && (
            <div className="relative space-y-4">
              {/* Pickup */}
              <div className="relative">
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="Pickup Location"
                  className="w-full border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none pl-10"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500">⭕</span>
              </div>

              {/* Drop */}
              <div className="relative">
                <input
                  type="text"
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  placeholder="Drop Location"
                  className="w-full border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none pl-10"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500">📍</span>
              </div>

              {/* Vice-Versa Button */}
              <button
                type="button"
                onClick={handleSwap}
                className="absolute right-3 top-10 bg-blue-100 text-blue-600 p-2 rounded-lg shadow"
              >
                <ArrowUpDown className="w-5 h-5" />
              </button>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <input type="date" className="border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                <input type="time" className="border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>

              {/* Round trip extra */}
              {tripType === "Round trip" && (
                <>
                  <input
                    type="text"
                    placeholder="Returning the cab to"
                    className="w-full border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="date" className="border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                    <input type="time" className="border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                </>
              )}
            </div>
          )}

          {/* Multi City */}
          {tripType === "Multi city" && (
            <>
              <input type="text" placeholder="Pickup Location" className="w-full border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              <input type="text" placeholder="Drop Location" className="w-full border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              <div className="grid grid-cols-2 gap-4">
                <input type="date" className="border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                <input type="time" className="border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold">ADD TO PLAN</button>
              <div className="w-full bg-white border rounded-lg p-3 shadow-sm text-gray-700">Your trip plan: day()</div>
            </>
          )}
        </div>
      );
    }

    if (activeTab === "Day Trips") {
      return (
        <div className="space-y-6">
          <input type="text" placeholder="Pickup Location" className="w-full border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          <div className="grid grid-cols-2 gap-4">
            <input type="date" className="border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            <input type="time" className="border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm text-center">
            <p className="text-gray-600 text-sm mb-4">Select length of time for which you require a cab</p>
            <div className="flex items-center justify-center space-x-6">
              <button type="button" onClick={() => setHours(Math.max(1, hours - 1))} className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-xl font-bold hover:bg-gray-50">−</button>
              <div>
                <div className="text-3xl font-bold text-gray-800">{hours} Hours</div>
                <div className="text-gray-500 text-sm">10 km included</div>
              </div>
              <button type="button" onClick={() => setHours(hours + 1)} className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-xl font-bold hover:bg-gray-50">+</button>
            </div>
          </div>
        </div>
      );
    }
  };

  const currentContent = tabContent[activeTab];

  return (
    <div className=" bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="text-2xl font-bold">
            <span className="text-blue-600">Motu</span>
            <span className="text-orange-500">Cab</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Country Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                className="flex items-center text-sm bg-orange-100 px-3 py-2 rounded-lg hover:bg-orange-200 transition-colors"
              >
                <span className="font-medium text-gray-700">{selectedCountry}</span>
                <ChevronDown className="w-4 h-4 ml-1 text-gray-600" />
              </button>

              {showCountryDropdown && (
                <div className="absolute top-full mt-1 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-40">
                  <button onClick={() => { setSelectedCountry("IN"); setShowCountryDropdown(false); }} className="w-full px-4 py-2 text-left hover:bg-gray-50">Travel in India</button>
                  <button onClick={() => { setSelectedCountry("USA"); setShowCountryDropdown(false); }} className="w-full px-4 py-2 text-left hover:bg-gray-50">Travel in USA</button>
                </div>
              )}
            </div>

            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">Request a call</button>
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">Hi User</button>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Left - Booking Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              {/* Tabs */}
              <div className="flex flex-col space-y-2 mb-8 bg-gray-100 rounded-xl p-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                {["Airport Rides", "Outstation", "Day Trips"].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
                      activeTab === tab
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="space-y-4">{renderTabContent()}</div>

              {/* Next Button */}
              <button className="w-full bg-orange-500 text-white font-bold py-3 sm:py-4 px-6 rounded-xl mt-6 hover:bg-orange-600 transition-colors shadow-lg">
                NEXT
              </button>
            </div>
          </div>

          {/* Right - Features */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 sticky top-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
                {currentContent.title}
              </h2>
              <div className="space-y-4">
                {currentContent.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-6 h-6 rounded bg-green-500 flex items-center justify-center flex-shrink-0 mr-3">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GoZoBooking;


