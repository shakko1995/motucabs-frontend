

import React from "react";

const BusinessSection = () => {
  return (
    <section className="w-full py-12 bg-white">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-normal">
          Build <span className="font-bold">YOUR BUSINESS</span> on our technology stack
        </h2>
      </div>

      {/* Cards Container */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {/* Card 1 */}
        <div className="bg-[#f9f9fb] rounded-2xl p-8 flex flex-col items-center text-center">
          <img
            src="/icons/taxi.png" 
            alt="Taxi Booking"
            className="w-24 h-24 mb-6"
          />
          <h3 className="text-xl font-normal mb-3">
            Power your Online Taxi Booking platform
          </h3>
          <p className="text-sm italic text-gray-600 mb-6">
            with Gozo’s All India reach
          </p>
          <button className="bg-[#2868c9] text-white px-5 py-2 rounded-md hover:bg-blue-700 transition">
            Know More
          </button>
        </div>

        {/* Card 2 */}
        <div className="bg-[#f9f9fb] rounded-2xl p-8 flex flex-col items-center text-center">
          <img
            src="/icons/api.png" 
            alt="Travel Platform"
            className="w-24 h-24 mb-6"
          />
          <h3 className="text-xl font-normal mb-3">
            Enable India wide road travel on your travel platform
          </h3>
          <p className="text-sm italic text-gray-600 mb-6">
            Become our channel partner
          </p>
          <button className="bg-[#2868c9] text-white px-5 py-2 rounded-md hover:bg-blue-700 transition">
            Know More
          </button>
        </div>

        {/* Card 3 */}
        <div className="bg-[#f9f9fb] rounded-2xl p-8 flex flex-col items-center text-center">
          <img
            src="/icons/agent.png"
            alt="Travel Cab" 
            className="w-24 h-24 mb-6"
          />
          <h3 className="text-xl font-normal mb-3">Be a Gozo Agent</h3>
          <p className="text-sm italic text-gray-600 mb-6">
            Simplify travel, Grow your profits
          </p>
          <button className="bg-[#2868c9] text-white px-5 py-2 rounded-md hover:bg-blue-700 transition">
            Know More
          </button>
        </div>
      </div>
    </section>
  );
};

export default BusinessSection;
