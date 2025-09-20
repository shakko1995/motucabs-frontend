// import { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { AdminContext } from '../context/AdminContext';

// // Renamed component
// const TravelAgentSubmissions = () => {
//     const { adminToken } = useContext(AdminContext);
//     const [submissions, setSubmissions] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchSubmissions = async () => {
//             try {
//                 // This endpoint should match your route for travel agents
//                 const res = await axios.get('http://localhost:5000/api/travel-agents', {
//                     headers: { Authorization: `Bearer ${adminToken}` }
//                 });
//                 setSubmissions(res.data.data || []);
//             } catch (err) {
//                 setError('Failed to fetch travel agent submissions.');
//                 console.error("Failed to fetch submissions", err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         if (adminToken) {
//             fetchSubmissions();
//         }
//     }, [adminToken]);

//     if (loading) return <p>Loading applications...</p>;
//     if (error) return <p className="text-red-500">{error}</p>;

//     return (
//         <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-2xl font-semibold mb-4 text-slate-800">Travel Agent / Partner Applications</h2>
//             <div className="overflow-x-auto">
//                 <table className="w-full text-sm">
//                     <thead className="bg-gray-100 uppercase text-xs">
//                         <tr>
//                             <th className="p-3 text-left">Name</th>
//                             <th className="p-3 text-left">Company Name</th>
//                             <th className="p-3 text-left">Email & Phone</th>
//                             <th className="p-3 text-left">Website</th>
//                             <th className="p-3 text-left">Submitted On</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {submissions.length > 0 ? submissions.map(item => (
//                             <tr key={item._id} className="border-b hover:bg-gray-50">
//                                 <td className="p-3 font-medium">{item.name}</td>
//                                 <td className="p-3">{item.companyName}</td>
//                                 <td className="p-3">{item.email}<br/>{item.phone}</td>
//                                 <td className="p-3">
//                                     {item.website ? (
//                                         <a href={item.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
//                                             Visit
//                                         </a>
//                                     ) : 'N/A'}
//                                 </td>
//                                 <td className="p-3">{new Date(item.createdAt).toLocaleDateString()}</td>
//                             </tr>
//                         )) : (
//                             <tr>
//                                 <td colSpan="5" className="text-center p-4 text-gray-500">No applications found.</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default TravelAgentSubmissions;


import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AdminContext } from '../context/AdminContext';
import { Users } from 'lucide-react';

const TravelAgentSubmissions = () => {
    const { adminToken } = useContext(AdminContext);
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubmissions = async () => {
            if (!adminToken) {
                setLoading(false);
                return;
            }
            try {
                const res = await axios.get('http://localhost:5000/api/travel-agents', {
                    headers: { Authorization: `Bearer ${adminToken}` }
                });
                setSubmissions(res.data.data || []);
            } catch (err) {
                setError('Failed to fetch travel agent submissions.');
                console.error("Failed to fetch submissions", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSubmissions();
    }, [adminToken]);

    if (loading) return <p>Loading applications...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-slate-800 flex items-center">
                <Users className="mr-3 text-blue-600"/>
                Travel Agent / Partner Applications
            </h2>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 uppercase text-xs">
                        <tr>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Company Name</th>
                            <th className="p-3 text-left">Email & Phone</th>
                            <th className="p-3 text-left">Website</th>
                            <th className="p-3 text-left">Submitted On</th>
                            <th className="p-3 text-left">State</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.length > 0 ? submissions.map(item => (
                            <tr key={item._id} className="border-b hover:bg-gray-50">
                                <td className="p-3 font-medium">{item.name}</td>
                                <td className="p-3">{item.companyName}</td>
                                <td className="p-3">{item.email}<br/>{item.phone}</td>
                                <td className="p-3">
                                    {item.website ? (
                                        <a href={item.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                            Visit
                                        </a>
                                    ) : 'N/A'}
                                </td>
                                {/* 👇 This line is updated to show date and time */}
                                <td className="p-3">{new Date(item.createdAt).toLocaleString()}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="text-center p-4 text-gray-500">No applications found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TravelAgentSubmissions;