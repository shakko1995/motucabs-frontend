import { useEffect, useState } from "react";
import { getReviews } from "../api/reviewApi";
import { motion } from "framer-motion";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews().then((data) => setReviews(data));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-10">
        What Our Customers Say 🚖
      </h1>

      {reviews.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">
          No reviews available. Be the first to share your experience!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              {/* User Info */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-tr from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md">
                  {review.user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {review.user?.name || "Anonymous"}
                  </h2>
                  <p className="text-sm text-gray-500">{review.user?.email}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    className={`text-2xl transition-colors ${
                      index < review.rating
                        ? "text-yellow-400 drop-shadow-sm"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
                <span className="ml-2 text-gray-600 text-sm">
                  {review.rating}/5
                </span>
              </div>

              {/* Comment */}
              <p className="text-gray-700 leading-relaxed mb-4">
                "{review.comment}"
              </p>

              {/* Date */}
              <p className="text-xs text-gray-400 text-right">
                {new Date(review.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
