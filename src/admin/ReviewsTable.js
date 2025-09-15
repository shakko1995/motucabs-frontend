import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AdminContext } from "../context/AdminContext";
import { Star, ChevronLeft, ChevronRight, MessageSquareWarning } from 'lucide-react';
import { format } from 'date-fns';

// Helper component to display star rating
const StarRating = ({ rating }) => {
  const totalStars = 5;
  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => (
        <Star
          key={index}
          size={16}
          className={index < rating ? "text-yellow-400 fill-current" : "text-gray-300"}
          fill={index < rating ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
};

// Skeleton Loader Component
const ReviewSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-10 bg-gray-200 rounded-md w-64 mb-4"></div>
    {[...Array(4)].map((_, i) => (
      <div key={i} className="flex space-x-4 py-4 border-b border-gray-200">
        <div className="rounded-full bg-gray-300 h-10 w-10"></div>
        <div className="flex-1 space-y-3 py-1">
          <div className="h-2 bg-gray-300 rounded"></div>
          <div className="space-y-2">
            <div className="h-2 bg-gray-300 rounded"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-gray-300 rounded col-span-2"></div>
              <div className="h-2 bg-gray-300 rounded col-span-1"></div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);


export default function ReviewsTable() {
  const { adminToken } = useContext(AdminContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination के लिए State
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  useEffect(() => {
    const fetchReviews = async () => {
      if (!adminToken) return;
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("http://localhost:5000/api/admin/reviews", {
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        setReviews(res.data.reviews);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
        setError("रिव्यूज़ लोड करने में विफल। कृपया पुनः प्रयास करें।");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [adminToken]);

  // Pagination Logic
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <ReviewSkeleton />;
  if (error) return <div className="text-center p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>;

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Reviews Management</h2>
      
      <div className="space-y-4">
        {currentReviews.length > 0 ? (
          currentReviews.map((review) => (
            <article key={review._id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                   <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 text-xl">
                      {review.user?.name.charAt(0).toUpperCase() || '?'}
                   </div>
                   <div>
                     <p className="font-semibold text-gray-900">{review.user?.name || 'Anonymous'}</p>
                     <p className="text-sm text-gray-500">{review.user?.email || 'No email'}</p>
                   </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                   <StarRating rating={review.rating} />
                   <p className="text-xs text-gray-500">
                     {review.createdAt ? format(new Date(review.createdAt), 'dd MMM yyyy') : 'No date'}
                   </p>
                </div>
              </div>
              <p className="mt-4 text-gray-700">{review.comment}</p>
            </article>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            <MessageSquareWarning size={40} className="mx-auto mb-2" />
            <p>No reviews found.</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
            <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
            </span>
            <div className="inline-flex items-center space-x-2">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                    <ChevronLeft size={16} />
                </button>
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
      )}
    </div>
  );
}