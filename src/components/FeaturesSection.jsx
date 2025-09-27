

import { useRef } from "react";

export default function FeaturesSection() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth;
      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const features = [
    {
      img: "https://cdn-icons-png.flaticon.com/512/299/299626.png",
      title: "Pan-India Reach",
      desc: "Available across 3000+ cities & towns",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/2097/2097743.png",
      title: "On-Time Guarantee",
      desc: "Punctual pickups, every time",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/1170/1170576.png",
      title: "Transparent Pricing",
      desc: "No hidden charges, instant fare confirmation",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/3524/3524659.png",
      title: "24x7 Customer Support",
      desc: "Live human support anytime you need",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/942/942751.png",
      title: "Verified Drivers",
      desc: "Trained & background-checked professionals",
    },
  ];

  return (
    <div className="w-full bg-[#f8fafc] py-6 mt-10">
      {/* 🔹 Top Info Bar */}
      <div className="w-full  py-2 mb-2">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm md:text-base gap-2">
          {/* Left */}
          <div className="flex items-center gap-2 text-blue-600 font-medium">
            <span>✅</span>
            <span>Book worry-free! Flexible cancellation</span>
          </div>

          {/* Middle */}
          <div className="flex items-center gap-2">
            <span>Get our app</span>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Play Store"
              className="h-6 cursor-pointer"
            />
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              className="h-6 cursor-pointer"
            />
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 text-blue-600 font-medium">
            <span>Excellent Reviews on</span>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
              alt="Google"
              className="h-5"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Tripadvisor_logoset_solid_green.svg"
              alt="Tripadvisor"
              className="h-5"
            />
          </div>
        </div>
      </div>

      {/* 🔹 Features Section */}
      <div className="relative max-w-7xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          Why Choose Us
        </h2>

        {/* Carousel Container */}
        <div className="relative flex items-center">
          {/* Left Button */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute -left-4 z-10 bg-gray-100 rounded-full shadow p-2 hover:bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Scrollable Cards */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide py-2 max-w-full"
          >
            {features.map((f, i) => (
              <div
                key={i}
                className="min-w-[250px] bg-white rounded-xl shadow p-6 flex-shrink-0 hover:shadow-lg transition"
              >
                <div className="flex justify-center mb-3">
                  <img
                    src={f.img}
                    alt={f.title}
                    className="h-12 w-12 transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <h3 className="font-semibold text-lg text-center">
                  {f.title}
                </h3>
                <p className="text-gray-600 text-sm mt-1 text-center">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Right Button */}
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute -right-4 z-10 bg-gray-100 rounded-full shadow p-2 hover:bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
