import { useEffect, useRef, useState } from "react";
import { getReviews } from "../api/reviewApi"; // api file import
import { useNavigate } from "react-router-dom";

export default function ReviewsSection() {
  const scrollRef = useRef(null);
  const [reviews, setReviews] = useState([]);
  const [expanded, setExpanded] = useState({});
  const navigate = useNavigate(); 

  // Fetch reviews from backend via API file
  useEffect(() => {
    async function fetchReviews() {
      const fetchedReviews = await getReviews();
      setReviews(fetchedReviews);
    }
    fetchReviews();
  }, []);

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

  const toggleExpand = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="w-full bg-[#e2e8f0] py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Read our reviews</h2>
        <p className="text-gray-700 mb-8">
          Million+ customers. 300+ Million kilometers. Smiles for Miles. All
          India
        </p>

        {/* Carousel */}
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

          {/* Scrollable reviews */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide pb-4"
          >
            {reviews.map((review, i) => (
              <div
                key={i}
                className="min-w-[350px] md:min-w-[420px] h-[350px] bg-[#1f2937] text-white rounded-xl shadow-lg p-8 "
              >
                {/* Name + Logo */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-purple-600 h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold">
                      {review.user?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </div>
                    <h3 className="font-semibold">{review.user?.name}</h3>
                  </div>
                  <img src="/gozo-logo.png" alt="gozo" className="h-5" />
                </div>

                {/* Stars */}
                <div className="flex mb-2">
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <span key={idx} className="text-yellow-400 text-lg">
                      ★
                    </span>
                  ))}
                </div>

                {/* Review text */}
                <p
                  className={`text-sm leading-relaxed ${!expanded[i] ? "line-clamp-5" : ""
                    }`}
                >
                  "{review.comment}"
                </p>

                {/* Read more / Show less */}
                {review.comment.length > 150 && (
                  <button
                    onClick={() => toggleExpand(i)}
                    className="text-blue-400 mt-2 text-sm hover:underline"
                  >
                    {expanded[i] ? "Show less" : "Read more"}
                  </button>
                )}
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

        {/* Dots */}
        <div className="flex justify-center mt-4 gap-2">
          {reviews.slice(0, 6).map((_, idx) => (
            <span
              key={idx}
              className={`h-2 w-2 rounded-full ${idx === 2 ? "bg-blue-600" : "bg-gray-400"
                }`}
            ></span>
          ))}
        </div>

        {/* All reviews button */}
        <div className="mt-6">
      <button
        onClick={() => navigate("/reviews")}
        className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
      >
        All Reviews
      </button>
    </div>

      </div>
    </div>
  );
}

