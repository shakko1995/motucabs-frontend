import { useEffect, useState } from "react";
import { getAirports } from "../api/airportApi";
import { Link } from "react-router-dom";

export default function Sitemap() {
  const [airports, setAirports] = useState([]);

  useEffect(() => {
    getAirports().then((data) => setAirports(data));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Airport Sitemap</h1>

      {airports.length === 0 ? (
        <p className="text-gray-500 text-center">No airports available.</p>
      ) : (
        <ul className="grid md:grid-cols-3 gap-3">
          {airports.map((airport) => (
            <li key={airport._id}>
              <Link
                to={`/airport/${airport.slug}`}
                className="block p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                ✈ {airport.name} 
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
