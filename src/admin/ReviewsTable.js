// src/admin/ReviewsTable.js
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AdminContext } from "../context/AdminContext";

export default function ReviewsTable() {
  const { adminToken } = useContext(AdminContext);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/reviews", {
        headers: { Authorization: `Bearer ${adminToken}` },
      })
      .then((res) => setReviews(res.data.reviews))
      .catch((err) => console.error(err));
  }, [adminToken]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Reviews</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">User</th>
            <th className="p-2 border">Review</th>
            <th className="p-2 border">Rating</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((r) => (
            <tr key={r._id}>
              <td className="p-2 border">{r.user?.name}</td>
              <td className="p-2 border">{r.comment}</td>
              <td className="p-2 border">{r.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
