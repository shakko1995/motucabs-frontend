
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AdminContext } from '../context/AdminContext';

const BusinessSubmissions = () => {
    const { adminToken } = useContext(AdminContext);
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/business', {
                    headers: { Authorization: `Bearer ${adminToken}` }
                });
                setSubmissions(res.data.data || []);
            } catch (err) {
                console.error("Failed to fetch business submissions", err);
            } finally {
                setLoading(false);
            }
        };
        if (adminToken) {
            fetchSubmissions();
        }
    }, [adminToken]);

    if (loading) return <p>Loading submissions...</p>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">White Label / Business Inquiries</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 uppercase text-xs">
                        <tr>
                            <th className="p-3 text-left">Company</th>
                            <th className="p-3 text-left">Contact Name</th>
                            <th className="p-3 text-left">Email & Phone</th>
                            <th className="p-3 text-left">Location</th>
                            {/* 👇 New Column Added */}
                            <th className="p-3 text-left">Submitted On</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map(item => (
                            <tr key={item._id} className="border-b">
                                <td className="p-3 font-medium">{item.companyName}</td>
                                <td className="p-3">{item.firstName} {item.lastName}</td>
                                <td className="p-3">{item.email}<br/>{item.phone}</td>
                                <td className="p-3">{item.city}, {item.state}</td>
                                {/* 👇 Displaying the submission date and time */}
                                <td className="p-3">{new Date(item.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BusinessSubmissions;