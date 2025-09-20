// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { AdminContext } from '../context/AdminContext';
// import { UserPlus, Mail, Phone, Car } from 'lucide-react';

// const DriverApplications = () => {
//     const { adminToken } = useContext(AdminContext);
//     const [applications, setApplications] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchApplications = async () => {
//             if (!adminToken) {
//                 setLoading(false);
//                 setError("Admin not authenticated.");
//                 return;
//             }
//             try {
//                 const res = await axios.get('http://localhost:5000/api/drivers', {
//                     headers: { Authorization: `Bearer ${adminToken}` }
//                 });
//                 setApplications(res.data.data || []);
//             } catch (err) {
//                 setError('Failed to fetch driver applications.');
//                 console.error("Failed to fetch driver applications", err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchApplications();
//     }, [adminToken]);

//     if (loading) return <p>Loading driver applications...</p>;
//     if (error) return <p className="text-red-500">{error}</p>;

//     return (
//         <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-2xl font-semibold mb-4 text-slate-800 flex items-center">
//                 <UserPlus className="mr-3 text-blue-600"/>
//                 Driver Applications
//             </h2>
//             <div className="overflow-x-auto">
//                 <table className="w-full text-sm text-left">
//                     <thead className="bg-gray-100 uppercase text-xs text-gray-600">
//                         <tr>
//                             <th className="p-3">Applicant Name</th>
//                             <th className="p-3">Contact Info</th>
//                             <th className="p-3">City of Business</th>
//                             <th className="p-3">License Number</th>
//                             <th className="p-3">Status</th>
//                             <th className="p-3">Submitted On</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {applications.length > 0 ? applications.map(app => (
//                             <tr key={app._id} className="border-b hover:bg-gray-50">
//                                 <td className="p-3 font-medium">{app.firstName} {app.lastName}</td>
//                                 <td className="p-3">
//                                     <div className="flex items-center gap-2"><Mail size={14} className="text-slate-400"/> {app.email}</div>
//                                     <div className="flex items-center gap-2 mt-1"><Phone size={14} className="text-slate-400"/> {app.phone}</div>
//                                 </td>
//                                 <td className="p-3">{app.city}</td>
//                                 <td className="p-3 font-mono">{app.driverLicenseNumber}</td>
//                                 <td className="p-3">
//                                     <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
//                                         app.status === 'Approved' ? 'bg-green-100 text-green-800' :
//                                         app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
//                                         'bg-yellow-100 text-yellow-800'
//                                     }`}>
//                                         {app.status}
//                                     </span>
//                                 </td>
//                                 <td className="p-3">{new Date(app.createdAt).toLocaleDateString()}</td>
//                             </tr>
//                         )) : (
//                             <tr>
//                                 <td colSpan="6" className="text-center p-4 text-gray-500">
//                                     No driver applications found.
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default DriverApplications;

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AdminContext } from '../context/AdminContext';
import { UserPlus, Mail, Phone, Car } from 'lucide-react';

const DriverApplications = () => {
    const { adminToken } = useContext(AdminContext);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            if (!adminToken) {
                setLoading(false);
                setError("Admin not authenticated.");
                return;
            }
            try {
                const res = await axios.get('http://localhost:5000/api/drivers', {
                    headers: { Authorization: `Bearer ${adminToken}` }
                });
                setApplications(res.data.data || []);
            } catch (err) {
                setError('Failed to fetch driver applications.');
                console.error("Failed to fetch driver applications", err);
            } finally {
                setLoading(false);
            }
        };
        fetchApplications();
    }, [adminToken]);

    if (loading) return <p>Loading driver applications...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-slate-800 flex items-center">
                <UserPlus className="mr-3 text-blue-600"/>
                Driver Applications
            </h2>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-100 uppercase text-xs text-gray-600">
                        <tr>
                            <th className="p-3">Applicant Name</th>
                            <th className="p-3">Contact Info</th>
                            <th className="p-3">City of Business</th>
                            <th className="p-3">License Number</th>
                            <th className="p-3">Status</th>
                            {/* 👇 New Column Added */}
                            <th className="p-3">Submitted On</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.length > 0 ? applications.map(app => (
                            <tr key={app._id} className="border-b hover:bg-gray-50">
                                <td className="p-3 font-medium">{app.firstName} {app.lastName}</td>
                                <td className="p-3">
                                    <div className="flex items-center gap-2"><Mail size={14} className="text-slate-400"/> {app.email}</div>
                                    <div className="flex items-center gap-2 mt-1"><Phone size={14} className="text-slate-400"/> {app.phone}</div>
                                </td>
                                <td className="p-3">{app.city}</td>
                                <td className="p-3 font-mono">{app.driverLicenseNumber}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                        app.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                        app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {app.status}
                                    </span>
                                </td>
                                {/* 👇 Displaying the submission date and time */}
                                <td className="p-3">{new Date(app.createdAt).toLocaleString()}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="6" className="text-center p-4 text-gray-500">
                                    No driver applications found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DriverApplications;