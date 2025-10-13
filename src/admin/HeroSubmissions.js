import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader, AlertCircle, Inbox } from 'lucide-react';

// --- API Configuration ---
const API_URL = 'http://localhost:5000/api/hero';

const getAuthHeaders = () => {
    // Assuming your admin routes are protected and require a token
    const token = localStorage.getItem('adminToken');
    return {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
};

// --- API Function ---
const getAllSubmissions = () => axios.get(`${API_URL}/all`, getAuthHeaders());

// --- Main Component ---
export default function HeroSubmissions() {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchSubmissions = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await getAllSubmissions();
            setSubmissions(response.data);
        } catch (err) {
            setError('Failed to fetch form submissions. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold flex items-center gap-2">
                    <Inbox size={24} /> Hero Form Submissions
                </h1>
            </div>

            {/* Content Display */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                {loading && (
                    <div className="flex justify-center items-center p-8">
                        <Loader className="animate-spin text-blue-500" size={32} />
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                        <div className="flex items-center">
                            <AlertCircle className="mr-2" />
                            <p className="font-bold">Error:</p>
                            <p className="ml-1">{error}</p>
                        </div>
                    </div>
                )}

                {!loading && !error && (
                    <div className="overflow-x-auto">
                        {submissions.length === 0 ? (
                            <div className="text-center p-8 text-gray-500">
                                No submissions found.
                            </div>
                        ) : (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fleet Details</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {submissions.map((sub) => (
                                        <tr key={sub._id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(sub.createdAt)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{sub.name}</div>
                                                <div className="text-sm text-gray-500">{sub.phone}</div>
                                                {sub.email && <div className="text-sm text-gray-500">{sub.email}</div>}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{sub.city}</div>
                                                <div className="text-sm text-gray-500">PIN: {sub.pincode}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">Type: <strong>{sub.carType}</strong></div>
                                                <div className="text-sm text-gray-500">Count: {sub.noOfCars}</div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}