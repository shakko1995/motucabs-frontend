

import React from "react";

const AttachTaxiSection = () => {
  return (
    <section className="w-full bg-[#e6f2ff] py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        {/* Left Text */}
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h2 className="text-3xl font-normal mb-3">
            Do you operate an <span className="font-bold">AC cab service?</span>
          </h2>
          <p className="text-[#1a56db] text-lg">
            Become a Gozo service operator. Attach your taxi business into
            Gozo’s network
          </p>
        </div>

        {/* Right Card */}
        <div className="md:w-1/2 flex justify-center">
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
            <img
              src="/icons/taxi-blue.png" 
              alt="Attach Taxi"
              className="w-28 h-28 mx-auto mb-6"
            />
            <h3 className="text-xl font-semibold mb-2">Attach Your Taxi</h3>
            <p className="text-sm italic text-gray-700 mb-6">
              Attach your taxi - Attach. Grow. Prosper.
            </p>
            <button className="bg-[#2868c9] text-white px-5 py-2 rounded-md hover:bg-blue-700 transition">
              Know More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AttachTaxiSection;
