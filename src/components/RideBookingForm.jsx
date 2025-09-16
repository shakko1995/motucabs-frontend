

// import React, { useState, useEffect, useContext } from "react";
// import { Check, ChevronDown, ArrowUpDown, Clock } from "lucide-react";
// import { searchLocation } from "../api/location.api";
// import Modal from "./Modal";
// import LoginForm from "../pages/Login";
// import { AuthContext } from "../context/AuthContext";

// const GoZoBooking = () => {
//   const [activeTab, setActiveTab] = useState("Airport Rides");
//   const [tripType, setTripType] = useState("One way");
//   const [airportOption, setAirportOption] = useState("Pick-up from");
//   const [hours, setHours] = useState(8);
//   const [showCountryDropdown, setShowCountryDropdown] = useState(false);
//   const [selectedCountry, setSelectedCountry] = useState("IN");
//   // const [user, setUser] = useState(null);
//   const [showLoginModal, setShowLoginModal] = useState(false);

//   // Pickup & Drop
//   const [pickup, setPickup] = useState("");
//   const [drop, setDrop] = useState("");

//   // Date & Time
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");

//   // API Results
//   const [pickupResult, setPickupResult] = useState([]);
//   const [dropResult, setDropResult] = useState([]);

//   // Saved Searches
//   const [savedSearches, setSavedSearches] = useState([]);

//   const { user, logout } = useContext(AuthContext); 
//   const [isDropdownOpen, setDropdownOpen] = useState(false);


//   // Load saved searches
//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("savedSearches")) || [];
//     setSavedSearches(stored);
//   }, []);

//   const handleSearch = () => {
//     if (!user) {
//       setShowLoginModal(true);
//       return;
//     }

//     const newSearch = {
//       pickup,
//       drop,
//       activeTab,
//       tripType,
//       date,
//       time,
//       hours,
//       timestamp: new Date().toISOString(),
//     };

//     const updatedSearches = [newSearch, ...savedSearches].slice(0, 5); // keep last 5
//     setSavedSearches(updatedSearches);
//     localStorage.setItem("savedSearches", JSON.stringify(updatedSearches));

//     console.log("Searching cabs for:", newSearch);
//   };

//   // Pickup search
//   useEffect(() => {
//     if (pickup.length > 2) {
//       searchLocation(pickup)
//         .then((res) => setPickupResult(res))
//         .catch((err) => console.error("Pickup Search Error", err));
//     } else {
//       setPickupResult([]);
//     }
//   }, [pickup]);

//   // Drop search
//   useEffect(() => {
//     if (drop.length > 2) {
//       searchLocation(drop)
//         .then((res) => setDropResult(res))
//         .catch((err) => console.error("Drop Search Error", err));
//     } else {
//       setDropResult([]);
//     }
//   }, [drop]);

//   const handleSwap = () => {
//     setPickup((prevPickup) => {
//       const temp = drop;
//       setDrop(prevPickup);
//       return temp;
//     });
//   };

//   const tabContent = {
//     "Airport Rides": {
//       title: "Airport Transfers Made Easy",
//       features: [
//         { title: "All-Inclusive Pricing", description: "No hidden fees or surge charges." },
//         { title: "Flight Tracking + Wait Time", description: "Up to 60 mins free waiting included." },
//         { title: "Meet & Greet Service", description: "Driver with name board & luggage help." },
//         { title: "Door-to-Door Transfers", description: "Pickup/drop at terminals, hotels & homes." },
//         { title: "Clean, Comfortable Cars", description: "From Hatchbacks to SUVs & Travellers." },
//       ],
//     },
//     Outstation: {
//       title: "Long-Distance Travel, Simplified",
//       features: [
//         { title: "One-Way & Round Trips", description: "Pay only for what you need." },
//         { title: "Transparent Pricing", description: "Upfront fares with no hidden charges." },
//         { title: "PAN-India Coverage", description: "Available in 3,000+ towns & cities." },
//         { title: "Multiple Car Options", description: "Hatchbacks to Tempo Travellers." },
//         { title: "Verified Drivers", description: "Trained and background-checked professionals." },
//       ],
//     },
//     "Rentals": {
//       title: "City Travel Made Simple",
//       features: [
//         { title: "Flexible Hourly Packages", description: "Choose from various durations & km slabs." },
//         { title: "Wide Car Selection", description: "Hatchbacks, Sedans, SUVs & Premium Cars." },
//         { title: "Chauffeur-Driven Comfort", description: "Air-conditioned rides — no driving hassles." },
//         { title: "All-Inclusive Pricing", description: "Fuel, driver & taxes covered upfront." },
//         { title: "Perfect for City Use", description: "Great for errands, tours, meetings & more." },
//       ],
//     },
//   };

//   const renderTabContent = () => {
//     if (activeTab === "Airport Rides") {
//       return (
//         <div className="space-y-6">
//           {/* Pick-up / Drop-off */}
//           <div className="flex space-x-6">
//             {["Pick-up from", "Drop-off"].map((opt) => (
//               <button
//                 key={opt}
//                 type="button"
//                 onClick={() => setAirportOption(opt)}
//                 className={`flex items-center font-medium ${
//                   airportOption === opt ? "text-blue-600" : "text-gray-600"
//                 }`}
//               >
//                 <div
//                   className={`w-4 h-4 rounded-full border-2 mr-2 ${
//                     airportOption === opt ? "bg-blue-600 border-blue-600" : "border-gray-400"
//                   }`}
//                 ></div>
//                 {opt}
//               </button>
//             ))}
//           </div>

//           {/* Airport Input */}
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Pick Up Location"
//               value={pickup}
//               onChange={(e) => setPickup(e.target.value)}
//               className="w-full border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//             {pickupResult.length > 0 && (
//               <ul className="absolute bg-white shadow-md rounded-lg mt-1 w-full z-50 max-h-48 overflow-y-auto">
//                 {pickupResult.map((item) => (
//                   <li
//                     key={item._id}
//                     onClick={() => {
//                       setPickup(item.address);
//                       setPickupResult([]);
//                     }}
//                     className="p-2 hover:bg-gray-100 cursor-pointer"
//                   >
//                     {item.address}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           {/* Destination Input */}
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Enter Destination"
//               value={drop}
//               onChange={(e) => setDrop(e.target.value)}
//               className="w-full border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//             {dropResult.length > 0 && (
//               <ul className="absolute bg-white shadow-md rounded-lg mt-1 w-full z-50 max-h-48 overflow-y-auto">
//                 {dropResult.map((item) => (
//                   <li
//                     key={item._id}
//                     onClick={() => {
//                       setDrop(item.address);
//                       setDropResult([]);
//                     }}
//                     className="p-2 hover:bg-gray-100 cursor-pointer"
//                   >
//                     {item.address}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
//               min={new Date().toISOString().split("T")[0]}
//             />
//             <input
//               type="time"
//               value={time}
//               onChange={(e) => setTime(e.target.value)}
//               className="border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>
//         </div>
//       );
//     }

//     // Outstation & Day Trips logic remains same...
//     // (I left your original rendering logic unchanged to avoid breaking layout)
//     if (activeTab === "Outstation") {
//   return (
//     <div className="space-y-6">
//       {/* Trip Type */}
//       <div className="flex flex-wrap gap-4">
//         {["One way", "Round trip", "Multi city"].map((type) => (
//           <button
//             key={type}
//             type="button"
//             onClick={() => setTripType(type)}
//             className={`flex items-center font-medium ${
//               tripType === type ? "text-blue-600" : "text-gray-600"
//             }`}
//           >
//             <div
//               className={`w-4 h-4 rounded-full border-2 mr-2 ${
//                 tripType === type
//                   ? "bg-blue-600 border-blue-600"
//                   : "border-gray-400"
//               }`}
//             ></div>
//             {type}
//           </button>
//         ))}
//       </div>

//       {/* One way & Round trip */}
//       {(tripType === "One way" || tripType === "Round trip") && (
//         <div className="relative space-y-4">
//           {/* Pickup Input with Suggestions */}
//           <div className="relative">
//             <input
//               type="text"
//               value={pickup}
//               onChange={(e) => setPickup(e.target.value)}
//               placeholder="Pickup Location"
//               className="w-full border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none pl-10"
//             />
//             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500">
//               ⭕
//             </span>
//             {pickupResult.length > 0 && (
//               <ul className="absolute bg-white shadow-md rounded-lg mt-1 w-full z-50 max-h-48 overflow-y-auto">
//                 {pickupResult.map((item) => (
//                   <li
//                     key={item._id}
//                     onClick={() => {
//                       setPickup(item.address);
//                       setPickupResult([]);
//                     }}
//                     className="p-2 hover:bg-gray-100 cursor-pointer"
//                   >
//                     {item.address}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           {/* Drop Input with Suggestions */}
//           <div className="relative">
//             <input
//               type="text"
//               value={drop}
//               onChange={(e) => setDrop(e.target.value)}
//               placeholder="Drop Location"
//               className="w-full border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none pl-10"
//             />
//             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500">
//               📍
//             </span>
//             {dropResult.length > 0 && (
//               <ul className="absolute bg-white shadow-md rounded-lg mt-1 w-full z-50 max-h-48 overflow-y-auto">
//                 {dropResult.map((item) => (
//                   <li
//                     key={item._id}
//                     onClick={() => {
//                       setDrop(item.address);
//                       setDropResult([]);
//                     }}
//                     className="p-2 hover:bg-gray-100 cursor-pointer"
//                   >
//                     {item.address}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           {/* Vice-Versa Button */}
//           <button
//             type="button"
//             onClick={handleSwap}
//             className="absolute right-3 top-10 bg-blue-100 text-blue-600 p-2 rounded-lg shadow"
//           >
//             <ArrowUpDown className="w-5 h-5" />
//           </button>

//           {/* Date & Time */}
//           <div className="grid grid-cols-2 gap-4">
//             <input
//               type="date"
//               className="border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
//               min={new Date().toISOString().split("T")[0]}
//             />
//             <input
//               type="time"
//               className="border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>

//           {tripType === "Round trip" && (
//             <>
//               <input
//                 type="text"
//                 placeholder="Returning the cab to"
//                 className="w-full border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//               <div className="grid grid-cols-2 gap-4">
//                 <input
//                   type="date"
//                   className="border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
//                   min={new Date().toISOString().split("T")[0]}
//                 />
//                 <input
//                   type="time"
//                   className="border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//               </div>
//             </>
//           )}
//         </div>
//       )}

//       {/* Multi City */}
//       {tripType === "Multi city" && (
//         <div className="space-y-4">
//           <input
//             type="text"
//             placeholder="Pickup Location"
//             className="w-full border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
//           />
//           <input
//             type="text"
//             placeholder="Drop Location"
//             className="w-full border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
//           />
//           <div className="grid grid-cols-2 gap-4">
//             <input
//               type="date"
//               className="border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
//               min={new Date().toISOString().split("T")[0]}
//             />
//             <input
//               type="time"
//               className="border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>
//           <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold">
//             ADD TO PLAN
//           </button>
//           <div className="w-full bg-white border rounded-lg p-3 shadow-sm text-gray-700">
//             Your trip plan: day()
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// if (activeTab === "Rentals") {
//   return (
//     <div className="space-y-6">
//       <input
//         type="text"
//         placeholder="Pickup Location"
//         value={pickup}
//         onChange={(e) => setPickup(e.target.value)}
//         className="w-full border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
//       />
//       {pickupResult.length > 0 && (
//         <ul className="absolute bg-white shadow-md rounded-lg mt-1 w-full z-50 max-h-48 overflow-y-auto">
//           {pickupResult.map((item) => (
//             <li
//               key={item._id}
//               onClick={() => {
//                 setPickup(item.address);
//                 setPickupResult([]);
//               }}
//               className="p-2 hover:bg-gray-100 cursor-pointer"
//             >
//               {item.address}
//             </li>
//           ))}
//         </ul>
//       )}
//       <div className="grid grid-cols-2 gap-4">
//         <input
//           type="date"
//           className="border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
//           min={new Date().toISOString().split("T")[0]}
//         />
//         <input
//           type="time"
//           className="border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
//         />
//       </div>

//       <div className="bg-white rounded-lg p-6 shadow-sm text-center">
//         <p className="text-gray-600 text-sm mb-4">
//           Select length of time for which you require a cab
//         </p>

//         <div className="flex items-center justify-center space-x-6">
//           <button
//             type="button"
//             onClick={() => setHours(Math.max(1, hours - 1))}
//             className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-xl font-bold hover:bg-gray-50"
//           >
//             −
//           </button>

//           <div>
//             <div className="text-3xl font-bold text-gray-800">
//               {hours} Hours
//             </div>
//             <div className="text-gray-500 text-sm">{hours * 10} km included</div>
//           </div>

//           <button
//             type="button"
//             onClick={() => setHours(hours + 1)}
//             className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-xl font-bold hover:bg-gray-50"
//           >
//             +
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



//   };

//   const currentContent = tabContent[activeTab] || tabContent["Rentals"];

//   return (
//     <div className="bg-gradient-to-br from-gray-50 to-gray-100">
//       {/* Header */}
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3">
//           <div className="text-2xl font-bold">
//             <span className="text-blue-600">Motu</span>
//             <span className="text-orange-500">Cab</span>
//           </div>

//           <div className="flex flex-wrap items-center gap-2">
//             {/* Country Dropdown */}
//             <div className="relative">
//               <button
//                 onClick={() => setShowCountryDropdown(!showCountryDropdown)}
//                 className="flex items-center text-sm bg-orange-100 px-3 py-2 rounded-lg hover:bg-orange-200 transition-colors"
//               >
//                 <span className="font-medium text-gray-700">{selectedCountry}</span>
//                 <ChevronDown className="w-4 h-4 ml-1 text-gray-600" />
//               </button>

//               {showCountryDropdown && (
//                 <div className="absolute top-full mt-1 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-40">
//                   <button
//                     onClick={() => {
//                       setSelectedCountry("IN");
//                       setShowCountryDropdown(false);
//                     }}
//                     className="w-full px-4 py-2 text-left hover:bg-gray-50"
//                   >
//                     Travel in India
//                   </button>
//                   <button
//                     onClick={() => {
//                       setSelectedCountry("USA");
//                       setShowCountryDropdown(false);
//                     }}
//                     className="w-full px-4 py-2 text-left hover:bg-gray-50"
//                   >
//                     Travel in USA
//                   </button>
//                 </div>
//               )}
//             </div>

//             <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
//               Request a call
//             </button>
//             <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
//               Hi User
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Body */}
//       <main className="max-w-7xl mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {/* Left - Booking Form */}
//           <div className="md:col-span-2">
//             <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
//               {/* Tabs */}
//               <div className="flex flex-col space-y-2 mb-8 bg-gray-100 rounded-xl p-2 sm:flex-row sm:space-y-0 sm:space-x-2">
//                 {["Airport Rides", "Outstation", "Rentals"].map((tab) => (
//                   <button
//                     key={tab}
//                     type="button"
//                     onClick={() => setActiveTab(tab)}
//                     className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
//                       activeTab === tab ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:bg-gray-200"
//                     }`}
//                   >
//                     {tab}
//                   </button>
//                 ))}
//               </div>

//               {/* Tab Content */}
//               {renderTabContent()}

//               {user ? (
//                 <button
//                   onClick={handleSearch}
//                   className="w-full mt-8 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
//                 >
//                   SEARCH CABS
//                 </button>
//               ) : (
//                 <>
//                   <button
//                     onClick={() => setShowLoginModal(true)}
//                     className="w-full mt-8 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
//                   >
//                     SEARCH CABS
//                   </button>

//                   {/* Login Modal */}
//                   {showLoginModal && (
//                     <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
//                       <LoginForm onClose={() => setShowLoginModal(false)} />
//                     </Modal>
//                   )}
//                 </>
//               )}
//             </div>

//             {/* Saved Searches */}
//             {savedSearches.length > 0 && (
//               <div className="mt-6 bg-white rounded-xl shadow p-4">
//                 <h3 className="font-bold text-gray-800 mb-3 flex items-center">
//                   <Clock className="w-5 h-5 mr-2 text-blue-500" />
//                   Recent Searches
//                 </h3>
//                 <ul className="space-y-2">
//                   {savedSearches.map((s, idx) => (
//                     <li
//                       key={idx}
//                       className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
//                       onClick={() => {
//                         setPickup(s.pickup);
//                         setDrop(s.drop);
//                         setActiveTab(s.activeTab);
//                         setTripType(s.tripType);
//                         setDate(s.date);
//                         setTime(s.time);
//                         setHours(s.hours);
//                       }}
//                     >
//                       <div className="font-semibold text-gray-700">
//                         {s.pickup} ➝ {s.drop}
//                       </div>
//                       <div className="text-sm text-gray-500">
//                         {s.activeTab}, {s.tripType} • {s.date} {s.time}
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>

//           {/* Right - Features */}
//           <div className="bg-white rounded-2xl shadow-lg p-6">
//             <h2 className="text-xl font-bold text-gray-800 mb-6">{currentContent.title}</h2>
//             <div className="space-y-4">
//               {currentContent.features.map((feature, idx) => (
//                 <div key={idx} className="flex items-start space-x-3">
//                   <Check className="w-5 h-5 text-green-500 mt-1" />
//                   <div>
//                     <h3 className="font-semibold text-gray-800">{feature.title}</h3>
//                     <p className="text-gray-600 text-sm">{feature.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default GoZoBooking;



import React, { useState, useEffect, useContext } from "react";
import { Check, ChevronDown, ArrowUpDown, Clock, User, LogOut } from "lucide-react";
import { searchLocation } from "../api/location.api";
import Modal from "./Modal";
import LoginForm from "../pages/Login";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GoZoBooking = () => {
  // Form States
  const [activeTab, setActiveTab] = useState("Outstation");
  const [tripType, setTripType] = useState("One way");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [hours, setHours] = useState(8);
  const [airportOption, setAirportOption] = useState("Pick-up from");
  const navigate = useNavigate();


  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");

  // UI States
  const [pickupResult, setPickupResult] = useState([]);
  const [dropResult, setDropResult] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [savedSearches, setSavedSearches] = useState([]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("IN");

  const { user, logout } = useContext(AuthContext);
  const [pickupCityRates, setPickupCityRates] = useState([]);
  const [ratesLoading, setRatesLoading] = useState(false);

  useEffect(() => {
    const storedItem = localStorage.getItem("savedSearches");
    if (storedItem) {
      try {
        setSavedSearches(JSON.parse(storedItem));
      } catch (e) {
        console.error("Failed to parse saved searches", e);
        localStorage.removeItem("savedSearches");
      }
    }
  }, []);



  const handleSearch = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    if (activeTab === "Rentals") {
      if (!pickup || !date || !time) {
        alert("Please enter city, date, and time for rental booking.");
        return;
      }
      navigate(`/rental-cabs?city=${pickup}&hours=${hours}&date=${date}&time=${time}`);
    
    } else if (activeTab === "Outstation") {
      if (!pickup || !drop || !date || !time) {
        alert("Please enter pickup, drop, date, and time for booking.");
        return;
      }
      
      
      if (tripType === 'Round trip') {
        
        if (!returnDate || !returnTime) {
          navigate(`/outstation-roundtrip-cabs?from=${pickup}&to=${drop}&date=${date}&time=${time}&returnDate=${returnDate}&returnTime=${returnTime}`);
            alert("Please select a return date and time for a round trip.");
            return; 
        }
        // navigate(`/outstation-roundtrip-cabs?from=${pickup}&to=${drop}&pickupDate=${date}&time=${time}&dropDate=${returnDate}&returnTime=${returnTime}`);
         navigate(`/outstation-roundtrip-cabs?from=${pickup}&to=${drop}&date=${date}&time=${time}&returnDate=${returnDate}&returnTime=${returnTime}`);
      } else { 
        
        navigate(`/outstation-cabs?from=${pickup}&to=${drop}&date=${date}&time=${time}`);
      }

    } else if (activeTab === "Airport Rides") {
        if (!pickup || !drop || !date || !time) {
            alert("Please fill all details for Airport Rides.");
            return;
        }
        navigate(`/airport-cabs?from=${pickup}&to=${drop}&date=${date}&time=${time}&tripType=${airportOption}`);
    }

    const searchDetails = { pickup, drop, activeTab, tripType, date, time, hours, timestamp: new Date().toISOString() };
    if (tripType === 'Round trip') {
      searchDetails.returnDate = returnDate;
      searchDetails.returnTime = returnTime;
    }
    const updatedSearches = [searchDetails, ...savedSearches].slice(0, 3);
    setSavedSearches(updatedSearches);
    localStorage.setItem("savedSearches", JSON.stringify(updatedSearches));

    console.log("Searching cabs for:", searchDetails);
    alert(`Searching for user: ${user.name}`);
  };

  useEffect(() => {
    if (pickup.length > 2) searchLocation(pickup).then(setPickupResult).catch(console.error);
    else setPickupResult([]);
  }, [pickup]);

  useEffect(() => {
    if (drop.length > 2) searchLocation(drop).then(setDropResult).catch(console.error);
    else setDropResult([]);
  }, [drop]);

  const handleSwap = () => {
    const temp = pickup;
    setPickup(drop);
    setDrop(temp);
  };

  const tabContentData = {
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
    "Rentals": {
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



  const currentContent = tabContentData[activeTab] || tabContentData["Outstation"];

  const renderTabContent = () => {
    if (activeTab === "Airport Rides") {
      return (
        <div className="space-y-4">
          <div className="flex space-x-6">
            {["Pick-up from", "Drop-off"].map((opt) => (
              <button key={opt} type="button" onClick={() => setAirportOption(opt)} className={`flex items-center font-medium ${airportOption === opt ? "text-blue-600" : "text-gray-600"}`}>
                <div className={`w-4 h-4 rounded-full border-2 mr-2 ${airportOption === opt ? "bg-blue-600 border-blue-600" : "border-gray-400"}`}></div>
                {opt}
              </button>
            ))}
          </div>
          <div className="relative">
            <input type="text" value={pickup} onChange={(e) => setPickup(e.target.value)} placeholder="Pick Up Location" className="w-full border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            {pickupResult.length > 0 && (<ul className="absolute bg-white shadow-md rounded-lg mt-1 w-full z-30 max-h-48 overflow-y-auto">{pickupResult.map((item) => (<li key={item._id} onClick={() => { setPickup(item.address); setPickupResult([]); }} className="p-2 hover:bg-gray-100 cursor-pointer">{item.address}</li>))}</ul>)}
          </div>
          <div className="relative">
            <input type="text" value={drop} onChange={(e) => setDrop(e.target.value)} placeholder="Enter Destination" className="w-full border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            {dropResult.length > 0 && (<ul className="absolute bg-white shadow-md rounded-lg mt-1 w-full z-30 max-h-48 overflow-y-auto">{dropResult.map((item) => (<li key={item._id} onClick={() => { setDrop(item.address); setDropResult([]); }} className="p-2 hover:bg-gray-100 cursor-pointer">{item.address}</li>))}</ul>)}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" min={new Date().toISOString().split("T")[0]} />
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
        </div>
      );
    }

    if (activeTab === "Outstation") {
      return (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            {["One way", "Round trip", "Multi city"].map((type) => (
              <button key={type} type="button" onClick={() => setTripType(type)} className={`flex items-center font-medium ${tripType === type ? "text-blue-600" : "text-gray-600"}`}>
                <div className={`w-4 h-4 rounded-full border-2 mr-2 ${tripType === type ? "bg-blue-600 border-blue-600" : "border-gray-400"}`}></div>
                {type}
              </button>
            ))}
          </div>
          {(tripType === "One way" || tripType === "Round trip") && (
            <div className="relative space-y-4">
              <div className="relative">
                <input type="text" value={pickup} onChange={(e) => setPickup(e.target.value)} placeholder="Pickup Location" className="w-full border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                {pickupResult.length > 0 && (<ul className="absolute bg-white shadow-md rounded-lg mt-1 w-full z-30 max-h-48 overflow-y-auto">{pickupResult.map((item) => (<li key={item._id} onClick={() => { setPickup(item.address); setPickupResult([]); }} className="p-2 hover:bg-gray-100 cursor-pointer">{item.address}</li>))}</ul>)}
              </div>
              <div className="relative">
                <input type="text" value={drop} onChange={(e) => setDrop(e.target.value)} placeholder="Drop Location" className="w-full border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                {dropResult.length > 0 && (<ul className="absolute bg-white shadow-md rounded-lg mt-1 w-full z-30 max-h-48 overflow-y-auto">{dropResult.map((item) => (<li key={item._id} onClick={() => { setDrop(item.address); setDropResult([]); }} className="p-2 hover:bg-gray-100 cursor-pointer">{item.address}</li>))}</ul>)}
              </div>
              <button type="button" onClick={handleSwap} className="absolute right-3 top-16 -translate-y-1/2 bg-white border p-2 rounded-full shadow z-20 hover:bg-gray-100">
                <ArrowUpDown className="w-5 h-5 text-blue-600" />
              </button>
              <div className="grid grid-cols-2 gap-4">
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" min={new Date().toISOString().split("T")[0]} />
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>


              {tripType === "Round trip" && (
                <>
                  <input
                    type="text"
                    
                    placeholder="Returning the cab to"
                    className="w-full border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="date"
                      className="border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      min={new Date().toISOString().split("T")[0]}
                    />
                    <input
                      type="time"
                      className="border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </>
              )}

            </div>
          )}
          {tripType === "Multi city" && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Pickup Location"
                className="w-full border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="text"
                placeholder="Drop Location"
                className="w-full border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  className="border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  min={new Date().toISOString().split("T")[0]}
                />
                <input
                  type="time"
                  className="border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold">
                ADD TO PLAN
              </button>
              <div className="w-full bg-white border rounded-lg p-3 shadow-sm text-gray-700">
                Your trip plan: day()
              </div>
            </div>
          )}

        </div>
      );
    }

    if (activeTab === "Rentals") {
      return (
        <div className="space-y-4">
          <div className="relative">
            <input type="text" value={pickup} onChange={(e) => setPickup(e.target.value)} placeholder="Enter City for Rental" className="w-full border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            {pickupResult.length > 0 && (<ul className="absolute bg-white shadow-md rounded-lg mt-1 w-full z-30 max-h-48 overflow-y-auto">{pickupResult.map((item) => (<li key={item._id} onClick={() => { setPickup(item.address); setPickupResult([]); }} className="p-2 hover:bg-gray-100 cursor-pointer">{item.address}</li>))}</ul>)}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" min={new Date().toISOString().split("T")[0]} />
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-gray-600 text-sm mb-2">Select length of time for which you require a cab</p>
            <div className="flex items-center justify-center space-x-4">
              <button type="button" onClick={() => setHours(Math.max(1, hours - 1))} className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-xl font-bold hover:bg-gray-100">−</button>
              <div>
                <div className="text-2xl font-bold text-gray-800">{hours} Hours</div>
                <div className="text-gray-500 text-sm">{hours * 10} km included</div>
              </div>
              <button type="button" onClick={() => setHours(hours + 1)} className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-xl font-bold hover:bg-gray-100">+</button>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        {/* ... Header is correct and remains unchanged ... */}
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="text-2xl font-bold cursor-pointer" onClick={() => window.location.href = '/'}>
            <span className="text-blue-600">Motu</span><span className="text-orange-500">Cab</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <div className="relative">
              <button onClick={() => setShowCountryDropdown(!showCountryDropdown)} className="flex items-center text-sm bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors">
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
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
              Request a call
            </button>
            {user ? (
              <div className="relative">
                <button onClick={() => setDropdownOpen(!isDropdownOpen)} className="flex items-center px-4 py-2 border border-transparent text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  Hi, {user.name.split(' ')[0]}
                  <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-full mt-2 right-0 bg-white border rounded-lg shadow-lg z-50 w-48">
                    <button onClick={() => { logout(); setDropdownOpen(false); }} className="w-full px-4 py-2.5 text-left text-red-600 hover:bg-red-50 flex items-center text-sm font-medium">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => setShowLoginModal(true)} className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Login / Signup
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <div className="flex flex-col space-y-2 mb-8 bg-gray-100 rounded-xl p-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                {["Airport Rides", "Outstation", "Rentals"].map((tab) => (
                  <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`flex-1 px-4 py-2.5 rounded-lg font-semibold transition-all text-sm sm:text-base ${activeTab === tab ? "bg-blue-600 text-white shadow" : "text-gray-700 hover:bg-gray-200"}`}>
                    {tab}
                  </button>
                ))}
              </div>

              {renderTabContent()}

              <button onClick={handleSearch} className="w-full mt-8 bg-orange-500 text-white py-3.5 rounded-lg font-bold hover:bg-orange-600 transition-colors text-lg tracking-wider">
                SEARCH CABS
              </button>
            </div>

            {user && savedSearches.length > 0 && (
              <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center"><Clock className="w-5 h-5 mr-2 text-blue-500" />Recent Searches</h3>
                <ul className="space-y-3">{savedSearches.map((s, idx) => (<li key={idx} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => { setPickup(s.pickup); setDrop(s.drop); setActiveTab(s.activeTab); }}> <div className="font-semibold text-gray-800">{s.pickup || 'N/A'} ➝ {s.drop || 'N/A'}</div> <div className="text-sm text-gray-500 mt-1">{s.activeTab}</div> </li>))}</ul>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hidden lg:block">
            <h2 className="text-xl font-bold text-gray-800 mb-6">{currentContent.title}</h2>
            <div className="space-y-5">
              {currentContent.features.map((feature, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <div className="flex-shrink-0"><Check className="w-5 h-5 text-green-500 mt-1" /></div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {showLoginModal && (
        <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
          <LoginForm onClose={() => setShowLoginModal(false)} />
        </Modal>
      )}
    </div>
  );
};

export default GoZoBooking;