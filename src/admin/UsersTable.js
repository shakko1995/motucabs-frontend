import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AdminContext } from "../context/AdminContext";
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Skeleton Loader Component
const TableSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-10 bg-gray-200 rounded-md w-48 mb-4"></div>
    {[...Array(5)].map((_, i) => (
      <div key={i} className="h-10 bg-gray-200 rounded-md w-full mb-2"></div>
    ))}
  </div>
);

export default function UsersTable() {
  const { adminToken } = useContext(AdminContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  useEffect(() => {
    const fetchUsers = async () => {
      if (!adminToken) return;
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        setUsers(res.data.users);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError("यूज़र्स को लोड करने में विफल। कृपया पुनः प्रयास करें।");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [adminToken]);

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Loading State
  if (loading) {
    return <TableSkeleton />;
  }

  // Error State
  if (error) {
    return <div className="text-center p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>;
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Users List</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Phone</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user._id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phone || 'N/A'}</td>
                </tr>
              ))
            ) : (
              // Empty State
              <tr>
                <td colSpan="3" className="text-center py-10 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
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