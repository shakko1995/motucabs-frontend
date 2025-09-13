"use client";

import React from "react";

const OutstationServiceSection = () => {
  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl font-normal mb-4">
          Best Outstation <span className="font-bold">Cab Service</span> in India
        </h2>
        <p className="text-gray-700 text-lg mb-12">
          Experience the Best Outstation Taxi Service in India! Affordable,
          reliable, and available 24/7 for one-way or round trips. Travel
          stress-free with professional drivers, clean cabs, and transparent
          pricing. Book your hassle-free ride today!
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          {/* One way cab */}
          <div className="flex items-start gap-4">
            <img
              src="/icons/oneway.png" 
              alt="One way cab"
              className="w-12 h-12"
            />
            <div>
              <h3 className="text-lg font-bold mb-1">One way cab</h3>
              <p className="text-gray-700">
                Book Affordable{" "}
                <a href="#" className="text-blue-600 underline">
                  One-Way Cabs
                </a>{" "}
                Online! Enjoy seamless travel with our reliable one-way taxi
                services. Flexible routes, competitive fares, and hassle-free
                bookings. Perfect for your city-to-city trips. Ride smart, ride
                easy with us!
              </p>
            </div>
          </div>

          {/* Airport taxi */}
          <div className="flex items-start gap-4">
            <img
              src="/icons/airport.png" 
              alt="Airport taxi"
              className="w-12 h-12"
            />
            <div>
              <h3 className="text-lg font-bold mb-1">Airport taxi</h3>
              <p className="text-gray-700">
                Reliable Airport Taxi Services – Travel with Comfort and Ease!
                Book your ride to and from the airport with our punctual,
                affordable, and professional taxi service. Available 24/7 for a
                seamless journey. Book now and experience convenience at its
                best!
              </p>
            </div>
          </div>

          {/* Car rental */}
          <div className="flex items-start gap-4">
            <img
              src="/icons/carrental.png" 
              alt="Car rental"
              className="w-12 h-12"
            />
            <div>
              <h3 className="text-lg font-bold mb-1">Car rental</h3>
              <p className="text-gray-700">
                Find the perfect car rental for your needs! We offer reliable,
                affordable services for local trips, outstation travel, and
                airport transfers. Book your ride now for a smooth and
                convenient journey.
              </p>
            </div>
          </div>

          {/* City to city travel */}
          <div className="flex items-start gap-4">
            <img
              src="/icons/citytravel.png" 
              alt="City to city travel"
              className="w-12 h-12"
            />
            <div>
              <h3 className="text-lg font-bold mb-1">City to city travel</h3>
              <p className="text-gray-700">
                Ready for your next inter-city trip? Book your reliable and
                affordable cab now! Enjoy a smooth, hassle-free journey with our
                top-rated inter-city cab services. Don’t wait—your perfect ride
                is just a click away!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OutstationServiceSection;
