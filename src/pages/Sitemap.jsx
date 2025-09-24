import { useEffect, useState } from "react";
import { getAirports } from "../api/airportApi";
import { getCarRentals } from "../api/rentalApi";
import { Link } from "react-router-dom";

export default function Sitemap() {
  const [airports, setAirports] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [loadingAirports, setLoadingAirports] = useState(true);
  const [loadingRentals, setLoadingRentals] = useState(true);

  useEffect(() => {
    // Fetch airports
    getAirports()
      .then((data) => {
        setAirports(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Error fetching airports:", err);
        setAirports([]);
      })
      .finally(() => setLoadingAirports(false));

    // Fetch car rentals
    getCarRentals()
      .then((data) => {
        if (!data) setRentals([]);
        else if (Array.isArray(data)) setRentals(data);
        else setRentals([data]); // wrap single object
      })
      .catch((err) => {
        console.error("Error fetching car rentals:", err);
        setRentals([]);
      })
      .finally(() => setLoadingRentals(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Sitemap</h1>

      {/* Car Rentals */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">🚖 Car Rentals</h2>
        {loadingRentals ? (
          <p className="text-gray-500 text-sm">Loading rentals...</p>
        ) : rentals.length === 0 ? (
          <p className="text-gray-500 text-sm">No rentals available.</p>
        ) : (
          <ul className="grid md:grid-cols-3 gap-3">
            {rentals.map((rental) => (
              <li key={rental._id}>
                <Link
                  to={`/car-rentals/${rental.slug}`}
                  className="block p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                >
                  🚖 {rental.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Airports */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">✈ Airports</h2>
        {loadingAirports ? (
          <p className="text-gray-500 text-sm">Loading airports...</p>
        ) : airports.length === 0 ? (
          <p className="text-gray-500 text-sm">No airports available.</p>
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
      </section>
    </div>
  );
}
