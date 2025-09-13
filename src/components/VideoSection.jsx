"use client";
import React, { useEffect, useRef, useState } from "react";

const VideoSection = () => {
  const [videos, setVideos] = useState([]);
  const scrollRef = useRef(null);

  //  Backend se videos fetch
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/videos");
        const data = await res.json();
        setVideos(data.videos || []);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };
    fetchVideos();
  }, []);

  // ✅ YouTube embed URL generate function
  const getEmbedUrl = (youtubeUrl) => {
    try {
      const url = new URL(youtubeUrl);
      const videoId = url.searchParams.get("v");
      if (!videoId) return "";
      return `https://www.youtube.com/embed/${videoId}`;
    } catch (err) {
      console.error("Invalid YouTube URL:", youtubeUrl);
      return "";
    }
  };

  // ✅ Scroll function
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

  return (
    <div className="bg-[#e6f0fa] py-12">
      <div className="max-w-6xl mx-auto px-4 relative">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
          Customer Video Reviews
        </h2>

        {/* Carousel with buttons */}
        <div className="relative flex items-center">
          {/* Left button */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 z-10 bg-gray-200 rounded-full shadow p-2 hover:bg-gray-300 hidden md:flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
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

          {/* Scrollable videos */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide pb-4"
          >
            {videos.map((video, index) => (
              <div
                key={index}
                className="min-w-[350px] md:min-w-[400px] bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex-shrink-0"
              >
                <div className="relative w-full h-48">
                  {getEmbedUrl(video.youtubeUrl) ? (
                    <iframe
                      className="w-full h-full"
                      src={getEmbedUrl(video.youtubeUrl)}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-600 text-sm">
                      Invalid URL
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 text-sm md:text-base mb-1">
                    {video.title}
                  </h3>
                  <p className="text-gray-500 text-xs">2 months ago</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right button */}
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 z-10 bg-gray-200 rounded-full shadow p-2 hover:bg-gray-300 hidden md:flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
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
};

export default VideoSection;

