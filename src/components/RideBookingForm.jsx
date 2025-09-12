
import { useState } from "react";
import axios from "axios";

export default function RideBookingForm() {
  const [rideType, setRideType] = useState("outstation");
  const [pickupQuery, setPickupQuery] = useState("");
  const [dropQuery, setDropQuery] = useState("");
  const [pickupResults, setPickupResults] = useState([]);
  const [dropResults, setDropResults] = useState([]);
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");

  // API: Location Search
  const handleSearch = async (type, query) => {
    if (!query) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/locations/search?query=${query}`);
      if (type === "pickup") setPickupResults(res.data.results);
      else setDropResults(res.data.results);
    } catch (err) {
      console.error("Location fetch error", err);
    }
  };

  // API: Ride Create
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      rideType,
      pickupLocation: pickupQuery,
      dropLocation: dropQuery,
      pickupDate,
      pickupTime
    };
    try {
      const res = await axios.post(`http://localhost:5000/api/rides/${rideType}`, payload);
      alert("✅ Ride created successfully!");
      console.log(res.data);
    } catch (err) {
      alert("❌ Failed to create ride");
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl w-[500px] mx-auto mt-6">
      {/* Ride Type Tabs */}
      <div className="flex space-x-4 mb-4">
        {["airport", "outstation", "daytrip"].map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-full font-semibold ${
              rideType === type ? "bg-blue-600 text-white" : "bg-gray-100"
            }`}
            onClick={() => setRideType(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Pickup Location */}
        <div>
          <input
            type="text"
            value={pickupQuery}
            onChange={(e) => {
              setPickupQuery(e.target.value);
              handleSearch("pickup", e.target.value);
            }}
            placeholder="Pickup Location"
            className="w-full border p-2 rounded"
          />
          {pickupResults.length > 0 && (
            <ul className="bg-white border rounded shadow-md max-h-40 overflow-y-auto">
              {pickupResults.map((loc, i) => (
                <li
                  key={i}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setPickupQuery(loc.address);
                    setPickupResults([]);
                  }}
                >
                  {loc.address}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Drop Location */}
        <div>
          <input
            type="text"
            value={dropQuery}
            onChange={(e) => {
              setDropQuery(e.target.value);
              handleSearch("drop", e.target.value);
            }}
            placeholder="Drop Location"
            className="w-full border p-2 rounded"
          />
          {dropResults.length > 0 && (
            <ul className="bg-white border rounded shadow-md max-h-40 overflow-y-auto">
              {dropResults.map((loc, i) => (
                <li
                  key={i}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setDropQuery(loc.address);
                    setDropResults([]);
                  }}
                >
                  {loc.address}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Date & Time */}
        <div className="flex space-x-2">
          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="border p-2 rounded w-1/2"
          />
          <input
            type="time"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="border p-2 rounded w-1/2"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded"
        >
          NEXT
        </button>
      </form>
    </div>
  );
}
