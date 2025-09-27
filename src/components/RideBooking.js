// import { useState } from "react";
// import LocationInput from "./LocationInput";
// import { bookAirportRide, bookOutstationRide, bookDayTripRide } from "../api/rides.api";
// import { useNavigate } from "react-router-dom";
// import  { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";


// export default function RideBooking() {
//   const [tab, setTab] = useState("airport"); // airport | outstation | daytrip
//   const [tripType, setTripType] = useState("oneway"); // one way, round trip, multi city
//   const [pickup, setPickup] = useState(null);
//   const [drop, setDrop] = useState(null);
//   const [pickupDate, setPickupDate] = useState("");
//   const [pickupTime, setPickupTime] = useState("");
//   const [returnDate, setReturnDate] = useState("");
//   const [returnTime, setReturnTime] = useState("");
//   const [hours, setHours] = useState(9);
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();
    
//   const handleSubmit = async () => {
//     try {
//       let payload = {
//         pickup,
//         drop,
//         pickupDate,
//         pickupTime,
//         returnDate,
//         returnTime,
//         hours,
//         tripType
//       };

//       let res;
//       if (tab === "airport") res = await bookAirportRide(payload);
//       if (tab === "outstation") res = await bookOutstationRide(payload);
//       if (tab === "daytrip") res = await bookDayTripRide(payload);

//       alert(`Booking Successful! Ride ID: ${res.data.id || "12345"}`);
//     } catch (err) {
//       console.error(err);
//       alert("Booking failed!");
//     }
//   };
//   const handleNext = () => {
//     if (!user) {
//       navigate("/login"); // ✅ User not logged in → redirect to login page
//     } else {
//       // Proceed to booking confirmation or payment
//       navigate("/confirm-ride");
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded-2xl shadow-md max-w-lg mx-auto">
//       {/* Tabs */}
//       <div className="flex justify-around mb-4">
//         {["airport", "outstation", "daytrip"].map((t) => (
//           <button
//             key={t}
//             className={`px-4 py-2 rounded-full font-semibold ${
//               tab === t ? "bg-blue-500 text-white" : "bg-gray-200"
//             }`}
//             onClick={() => setTab(t)}
//           >
//             {t === "airport" ? "Airport Rides" : t === "outstation" ? "Outstation" : "Day Trips"}
//           </button>
//         ))}
//       </div>

//       {/* Trip Type */}
//       {tab !== "daytrip" && (
//         <div className="flex space-x-4 mb-4">
//           {["oneway", "roundtrip", "multicity"].map((type) => (
//             <label key={type} className="flex items-center space-x-2">
//               <input
//                 type="radio"
//                 checked={tripType === type}
//                 onChange={() => setTripType(type)}
//               />
//               <span>{type.replace(/^\w/, (c) => c.toUpperCase())}</span>
//             </label>
//           ))}
//         </div>
//       )}

//       {/* Location Inputs */}
//       <LocationInput label="Pickup Location" value={pickup?.address} onChange={setPickup} />
//       {tab !== "daytrip" && (
//         <LocationInput label="Drop Location" value={drop?.address} onChange={setDrop} />
//       )}

//       {/* Date & Time */}
//       <div className="grid grid-cols-2 gap-2 my-3">
//         <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} />
//         <input type="time" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} />
//       </div>

//       {/* Return date for round trip */}
//       {tripType === "roundtrip" && (
//         <div className="grid grid-cols-2 gap-2 mb-3">
//           <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
//           <input type="time" value={returnTime} onChange={(e) => setReturnTime(e.target.value)} />
//         </div>
//       )}

//       {/* Hours Selector for Day Trips */}
//       {tab === "daytrip" && (
//         <div className="flex items-center justify-between my-4">
//           <button
//             className="p-2 bg-gray-200 rounded-full"
//             onClick={() => setHours(Math.max(1, hours - 1))}
//           >
//             -
//           </button>
//           <span className="font-bold">{hours} Hours</span>
//           <button
//             className="p-2 bg-gray-200 rounded-full"
//             onClick={() => setHours(hours + 1)}
//           >
//             +
//           </button>
//         </div>
//       )}

//       {/* Submit */}
//       <button
//         className="bg-orange-500 text-white px-6 py-2 rounded-full w-full"
//         onClick={handleNext}
//       >
//         NEXT
//       </button>
      
//     </div>
//   );
// }
