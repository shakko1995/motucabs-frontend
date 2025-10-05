import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const CabRoutesPage = () => {
  // Popular routes with predefined paths
  const popularRoutes = [
    { name: "Delhi to Jaipur", path: "/book-taxi/delhi-jaipur" },
    { name: "Jaipur to Delhi", path: "/book-taxi/jaipur-delhi" },
    { name: "Delhi to Haridwar", path: "/book-taxi/delhi-haridwar" },
    { name: "Dehradun to Delhi", path: "/book-taxi/dehradun-delhi" },
    { name: "Delhi to Dehradun", path: "/book-taxi/delhi-dehradun" },
    { name: "Mumbai to Pune", path: "/book-taxi/mumbai-pune" },
    { name: "Pune to Mumbai", path: "/book-taxi/pune-mumbai" },
    { name: "Pimpri-Chinchwad to Mumbai", path: "/book-taxi/pimpri-mumbai" },
    { name: "Mumbai to Nashik", path: "/book-taxi/mumbai-nashik" },
    { name: "Bhopal to Indore", path: "/book-taxi/bhopal-indore" },
  ];

  // Top cities with predefined paths
  const topCities = [
    { name: "Delhi", path: "/outstation-cabs/delhi" },
    { name: "Gurugram", path: "/outstation-cabs/gurugram" },
    { name: "Noida", path: "/outstation-cabs/noida" },
    { name: "Jaipur", path: "/outstation-cabs/jaipur" },
    { name: "Chandigarh", path: "/outstation-cabs/chandigarh" },
    { name: "Pune", path: "/outstation-cabs/pune" },
    { name: "Mumbai", path: "/outstation-cabs/mumbai" },
    { name: "Calangute", path: "/outstation-cabs/calangute" },
    { name: "Shilong", path: "/outstation-cabs/shillong" },
    { name: "Bhopal", path: "/outstation-cabs/bhopal" },
  ];

  return (
    <div className="bg-[#d9e6f1]  flex items-center justify-center p-[2%] ">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* Left Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            Popular <span className="font-bold">outstation</span> cab routes
          </h2>
          <ul className="space-y-3 text-lg">
            {popularRoutes.map((route, index) => (
              <li key={index} className="flex items-center">
                <ChevronRight size={18} className="mr-2 text-gray-600" />
                <Link
                  to={route.path}
                  className="text-gray-800 hover:text-blue-700 transition"
                >
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            Top <span className="font-bold">cities</span>{" "}
            <span className="text-gray-600 text-sm font-normal">
              (Hourly Rentals, Airport Transfers, Outstation)
            </span>
          </h2>
          <ul className="space-y-3 text-lg">
            {topCities.map((city, index) => (
              <li key={index} className="flex items-center">
                <ChevronRight size={18} className="mr-2 text-gray-600" />
                <Link
                  to={city.path}
                  className="text-gray-800 hover:text-blue-700 transition"
                >
                  {city.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CabRoutesPage;
