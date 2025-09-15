import React, { useEffect, useState, useContext, useMemo } from "react";
import axios from "axios";
import { AdminContext } from "../context/AdminContext";
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, History, AlertCircle } from 'lucide-react';

// Skeleton Loader Component
const TableSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-10 bg-gray-200 rounded-md w-72 mb-4"></div>
    {[...Array(7)].map((_, i) => (
      <div key={i} className="h-12 bg-gray-200 rounded-md w-full mb-2"></div>
    ))}
  </div>
);

// Helper component for colored badges
const TypeBadge = ({ type }) => {
    const typeColors = {
        movie: 'bg-blue-100 text-blue-800',
        tv: 'bg-green-100 text-green-800',
        person: 'bg-purple-100 text-purple-800',
        default: 'bg-gray-100 text-gray-800'
    };
    const colorClass = typeColors[type] || typeColors.default;
    return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${colorClass}`}>
            {type}
        </span>
    );
};


const SearchHistoryTable = () => {
  const [history, setHistory] = useState([]);
  const { adminToken, logoutAdmin } = useContext(AdminContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (!adminToken) {
        setLoading(false);
        return;
    }

    const fetchHistory = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/search-history`, {
                headers: { Authorization: `Bearer ${adminToken}` },
            });
            setHistory(res.data.data || res.data.history || []);
        } catch (err) {
            console.error("Failed to fetch search history:", err);
            setError("Search history could not be loaded.");
            if (err.response?.status === 401) {
                logoutAdmin();
            }
        } finally {
            setLoading(false);
        }
    };
    fetchHistory();
  }, [adminToken, logoutAdmin]);

  // Pagination Logic
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return history.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, history]);

  const totalPages = Math.ceil(history.length / itemsPerPage);

  // Loading State
  if (loading) return <TableSkeleton />;

  // Error State
  if (error) {
    return (
        <div className="text-center p-6 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            <AlertCircle className="mx-auto h-12 w-12 text-red-400" />
            <h3 className="mt-2 text-lg font-medium">An error occurred</h3>
            <p className="mt-1 text-sm">{error}</p>
        </div>
    );
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">User Search History</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">User</th>
              <th scope="col" className="px-6 py-3">Query</th>
              <th scope="col" className="px-6 py-3">Type</th>
              <th scope="col" className="px-6 py-3">Tab</th>
              <th scope="col" className="px-6 py-3">Results</th>
              <th scope="col" className="px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {currentTableData.length > 0 ? (
              currentTableData.map((item) => (
                <tr key={item._id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {item.userId?.name || <span className="text-gray-500 italic">Guest</span>}
                  </td>
                  <td className="px-6 py-4 font-semibold">{item.query}</td>
                  <td className="px-6 py-4">
                    <TypeBadge type={item.type} />
                  </td>
                  <td className="px-6 py-4 capitalize">{item.tab}</td>
                  <td className="px-6 py-4 text-center">{item.resultsCount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {format(new Date(item.createdAt), 'dd MMM yyyy, hh:mm a')}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-500">
                  <History size={40} className="mx-auto mb-2" />
                  No search history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
         <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
            </span>
            <div className="inline-flex items-center space-x-2">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                    <ChevronLeft size={16} />
                </button>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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
};

export default SearchHistoryTable;