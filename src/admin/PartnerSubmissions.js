// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { AdminContext } from '../context/AdminContext';
// import { Briefcase, Mail, Phone, Globe } from 'lucide-react';

// const PartnerSubmissions = () => {
//     const { adminToken } = useContext(AdminContext);
//     const [submissions, setSubmissions] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchSubmissions = async () => {
//             try {
//                 // Ensure this endpoint matches your backend route for partners
//                 const res = await axios.get('http://localhost:5000/api/international-partners', {
//                     headers: { Authorization: `Bearer ${adminToken}` }
//                 });
//                 setSubmissions(res.data.data || []);
//             } catch (err) {
//                 setError('Failed to fetch partner submissions.');
//                 console.error("Failed to fetch partner submissions", err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         if (adminToken) {
//             fetchSubmissions();
//         }
//     }, [adminToken]);

//     if (loading) return <p>Loading partner applications...</p>;
//     if (error) return <p className="text-red-500">{error}</p>;

//     return (
//         <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-2xl font-semibold mb-4 text-slate-800">Partner & Reseller Applications</h2>
//             <div className="overflow-x-auto">
//                 <table className="w-full text-sm text-left">
//                     <thead className="bg-gray-100 uppercase text-xs text-gray-600">
//                         <tr>
//                             <th className="p-3">Contact Name</th>
//                             <th className="p-3">Company Name</th>
//                             <th className="p-3">Email</th>
//                             <th className="p-3">Phone</th>
//                             <th className="p-3">Website</th>
//                             <th className="p-3">Submitted On</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {submissions.length > 0 ? submissions.map(item => (
//                             <tr key={item._id} className="border-b hover:bg-gray-50">
//                                 <td className="p-3 font-medium">{item.name || `${item.firstName} ${item.lastName}`}</td>
//                                 <td className="p-3">{item.companyName}</td>
//                                 <td className="p-3">{item.email}</td>
//                                 <td className="p-3">{item.phone}</td>
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
//                                 <td colSpan="6" className="text-center p-4 text-gray-500">
//                                     No partner applications found.
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default PartnerSubmissions;


import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AdminContext } from '../context/AdminContext';
import { Briefcase, Mail, Phone, Globe } from 'lucide-react';

const PartnerSubmissions = () => {
    const { adminToken } = useContext(AdminContext);
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                // This endpoint should match your backend route for international partners
                const res = await axios.get('http://localhost:5000/api/international-partners', {
                    headers: { Authorization: `Bearer ${adminToken}` }
                });
                setSubmissions(res.data.data || []);
            } catch (err) {
                setError('Failed to fetch partner submissions.');
                console.error("Failed to fetch partner submissions", err);
            } finally {
                setLoading(false);
            }
        };
        if (adminToken) {
            fetchSubmissions();
        }
    }, [adminToken]);

    if (loading) return <p>Loading partner applications...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-slate-800">Partner & Reseller Applications</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-100 uppercase text-xs text-gray-600">
                        <tr>
                            <th className="p-3">Contact Name</th>
                            <th className="p-3">Company Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Phone</th>
                            <th className="p-3">Website</th>
                            {/* 👇 New Column Added */}
                            <th className="p-3">Submitted On</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.length > 0 ? submissions.map(item => (
                            <tr key={item._id} className="border-b hover:bg-gray-50">
                                <td className="p-3 font-medium">{item.name || `${item.firstName} ${item.lastName}`}</td>
                                <td className="p-3">{item.companyName}</td>
                                <td className="p-3">{item.email}</td>
                                <td className="p-3">{item.phone}</td>
                                <td className="p-3">
                                    {item.website ? (
                                        <a href={item.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                            Visit
                                        </a>
                                    ) : 'N/A'}
                                </td>
                                {/* 👇 Displaying the submission date and time */}
                                <td className="p-3">{new Date(item.createdAt).toLocaleString()}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="6" className="text-center p-4 text-gray-500">
                                    No partner applications found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PartnerSubmissions;