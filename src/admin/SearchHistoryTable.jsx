// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const SearchHistoryTable = () => {
//   const [history, setHistory] = useState([]);

//   useEffect(() => {
//     axios.get(`${process.env.REACT_APP_BACKEND_URL}/search-history`)
    
//       .then((res) =>
        
//          setHistory(res.data.data))
      
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-xl font-bold mb-4">User Search History</h2>
//       <table className="min-w-full border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2 border">User</th>
//             <th className="p-2 border">Query</th>
//             <th className="p-2 border">Type</th>
//             <th className="p-2 border">Tab</th>
//             <th className="p-2 border">Results</th>
//             <th className="p-2 border">Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {history.map((item) => (
//             <tr key={item._id} className="border-b">
//               <td className="p-2 border">{item.userId?.name || "Guest"}</td>
//               <td className="p-2 border">{item.query}</td>
//               <td className="p-2 border">{item.type}</td>
//               <td className="p-2 border">{item.tab}</td>
//               <td className="p-2 border">{item.resultsCount}</td>
//               <td className="p-2 border">{new Date(item.createdAt).toLocaleString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SearchHistoryTable;

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AdminContext } from "../context/AdminContext"; // 👈 import

const SearchHistoryTable = () => {
  const [history, setHistory] = useState([]);
  const { adminToken, logoutAdmin } = useContext(AdminContext); // 👈 use context

  useEffect(() => {
    if (!adminToken) return; // agar token hi nahi hai to request mat bhejo

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/search-history`, {
        headers: {
          Authorization: `Bearer ${adminToken}`, // 👈 use adminToken from context
        },
      })
      .then((res) => {
        console.log("Search history API response:", res.data);
        setHistory(res.data.data || res.data.history || res.data || []);
      })
      .catch((err) => {
        console.error(err);
        if (err.response?.status === 401) {
          logoutAdmin(); // agar token invalid/expired hai to logout kara do
        }
      });
  }, [adminToken, logoutAdmin]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">User Search History</h2>
      {!adminToken ? (
        <p className="text-red-500">⚠️ Please login as Admin to view this data.</p>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">User</th>
              <th className="p-2 border">Query</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Tab</th>
              <th className="p-2 border">Results</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="p-2 border">{item.userId?.name || "Guest"}</td>
                <td className="p-2 border">{item.query}</td>
                <td className="p-2 border">{item.type}</td>
                <td className="p-2 border">{item.tab}</td>
                <td className="p-2 border">{item.resultsCount}</td>
                <td className="p-2 border">
                  {new Date(item.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SearchHistoryTable;

