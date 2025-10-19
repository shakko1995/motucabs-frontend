



import React from "react";
import { Helmet } from "react-helmet";

// Import icons
import OneWayIcon from "../assets/icons/oneway-icon.png";
import AirportIcon from "../assets/icons/airport-icon.png";
import CarIcon from "../assets/icons/car-icon.png";
import CityIcon from "../assets/icons/city-icon.png";

const OutstationServiceSection = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Book Outstation Taxi & One Way Cab at Best Price | MotuCabs</title>
        <meta
          name="title"
          content="Book Outstation Taxi & One Way Cab at Best Price | MotuCabs"
        />
        <meta
          name="description"
          content="Hire outstation taxis, one-way cabs, and local car rentals at the lowest price. Reliable drivers, 24/7 support & instant booking across India with Motucabs."
        />
        <meta
          name="keywords"
          content="outstation taxi service, one way cab booking, taxi service india, affordable cab hire, car rental service, city to city taxi"
        />
        <link rel="canonical" href="https://www.motucabs.com" />
        <meta name="copyright" content="copyright @motucabs. All Rights Reserved" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <section className="w-full py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          {/* Main Heading */}
          <h2 className="text-3xl font-normal mb-4">
            Outstation Taxi Service &{" "}
            <span className="font-bold">One Way Cab Booking</span> in India
          </h2>
          <p className="text-gray-700 text-lg mb-12">
            Your trusted partner for safe, affordable, and comfortable rides
            across India! Available 24/7 for one-way or round trips. Travel
            stress-free with professional drivers, clean cabs, and transparent
            pricing. Book your hassle-free ride today!
          </p>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            {/* One way cab */}
            <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
              <img src={OneWayIcon} alt="One way cab" className="w-16 h-16" />
              <div>
                <h3 className="text-lg font-bold mb-1 text-gray-900">
                  One Way Cab
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Book Affordable{" "}
                  <a href="#cabs" className="text-blue-600 underline">
                    One-Way Cabs
                  </a>{" "}
                  Online! Enjoy seamless travel with our reliable one-way taxi
                  services. Flexible routes, competitive fares, and hassle-free
                  bookings. Perfect for your city-to-city trips. Ride smart,
                  ride easy with us!
                </p>
              </div>
            </div>

            {/* Airport taxi */}
            <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
              <img src={AirportIcon} alt="Airport taxi" className="w-16 h-16" />
              <div>
                <h3 className="text-lg font-bold mb-1 text-gray-900">
                  Airport Taxi
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Reliable Airport Taxi Services – Travel with Comfort and Ease!
                  Book your ride to and from the airport with our punctual,
                  affordable, and professional taxi service. Available 24/7 for
                  a seamless journey. Book now and experience convenience at its
                  best!
                </p>
              </div>
            </div>

            {/* Car rental */}
            <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
              <img src={CarIcon} alt="Car rental" className="w-16 h-16" />
              <div>
                <h3 className="text-lg font-bold mb-1 text-gray-900">
                  Car Rental
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Find the perfect car rental for your needs! We offer reliable,
                  affordable services for local trips, outstation travel, and
                  airport transfers. Book your ride now for a smooth and
                  convenient journey.
                </p>
              </div>
            </div>

            {/* City to city travel */}
            <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
              <img src={CityIcon} alt="City to city travel" className="w-16 h-16" />
              <div>
                <h3 className="text-lg font-bold mb-1 text-gray-900">
                  City to City Travel
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Ready for your next inter-city trip? Book your reliable and
                  affordable cab now! Enjoy a smooth, hassle-free journey with
                  our top-rated inter-city cab services. Don’t wait—your perfect
                  ride is just a click away!
                </p>
              </div>
            </div>
          </div>

          {/* Extra Sections */}
          <div className="mt-20 text-center">
            {/* Why Choose MotuCabs */}
            <h2 className="text-3xl font-semibold mb-8">
              Why Choose MotuCabs for Cab Booking?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto text-left">
              <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg shadow-sm">
                <span className="text-green-600 text-2xl">✅</span>
                <h3 className="text-lg font-medium text-gray-800">
                  Affordable Fares – Transparent pricing, no hidden charges.
                </h3>
              </div>
              <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg shadow-sm">
                <span className="text-blue-600 text-2xl">🌍</span>
                <h3 className="text-lg font-medium text-gray-800">
                  Pan India Coverage – Book cabs in 5000+ cities and towns.
                </h3>
              </div>
              <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg shadow-sm">
                <span className="text-indigo-600 text-2xl">🔁</span>
                <h3 className="text-lg font-medium text-gray-800">
                  One Way & Round Trip – Pay only for what you travel.
                </h3>
              </div>
              <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg shadow-sm">
                <span className="text-purple-600 text-2xl">🕐</span>
                <h3 className="text-lg font-medium text-gray-800">
                  24/7 Support – Dedicated team to assist your journey anytime.
                </h3>
              </div>
            </div>

            {/* Local Taxi & How to Book */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 bg-gradient-to-r from-blue-50 to-indigo-50 p-10 rounded-2xl shadow-md text-left">
              {/* Left Section */}
              <div>
                <h2 className="text-3xl font-semibold mb-4 text-gray-900">
                  Local Taxi & Car Rental Services
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Whether you need a local city ride, airport transfer, or hourly
                  car rental, MotuCabs makes travel simple and reliable.
                </p>
              </div>

              {/* Right Section */}
              <div>
                <h2 className="text-3xl font-semibold mb-6 text-gray-900">
                  How to Book a Taxi Online with MotuCabs?
                </h2>
                <ol className="list-decimal list-inside text-gray-700 text-lg space-y-3 bg-white p-6 rounded-xl shadow-sm">
                  <li>Enter pickup & drop details</li>
                  <li>Choose your cab type (Sedan, SUV, Tempo Traveller)</li>
                  <li>Confirm & enjoy your ride with us!</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OutstationServiceSection;
