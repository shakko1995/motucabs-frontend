import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AdminContext } from '../context/AdminContext';
import { FileText, Download } from 'lucide-react';

const JobApplications = () => {
    const { adminToken } = useContext(AdminContext);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/applications', {
                    headers: { Authorization: `Bearer ${adminToken}` }
                });
                setApplications(res.data.data || []);
            } catch (err) {
                setError('Failed to fetch applications.');
                console.error("Failed to fetch applications", err);
            } finally {
                setLoading(false);
            }
        };
        if (adminToken) {
            fetchApplications();
        }
    }, [adminToken]);

    if (loading) return <p>Loading job applications...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-slate-800">Job Applications</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-100 uppercase text-xs text-gray-600">
                        <tr>
                            <th className="p-3">Applicant Name</th>
                            <th className="p-3">Applied For (Job ID)</th>
                            <th className="p-3">Email & Phone</th>
                            <th className="p-3">Resume</th>
                            <th className="p-3">Applied On</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.length > 0 ? applications.map(app => (
                            <tr key={app._id} className="border-b hover:bg-gray-50">
                                <td className="p-3 font-medium">{app.name}</td>
                                <td className="p-3">{app.jobTitle} ({app.jobId})</td>
                                <td className="p-3">{app.email}<br/>{app.phone}</td>
                                <td className="p-3">
                                    <a 
                                        href={`http://localhost:5000/${app.resumePath}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        download // 👇 This attribute triggers the download
                                        className="text-blue-600 hover:underline flex items-center gap-1"
                                    >
                                        <Download size={16}/> Download Resume
                                    </a>
                                </td>
                                <td className="p-3">{new Date(app.createdAt).toLocaleDateString()}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="text-center p-4 text-gray-500">
                                    No applications found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default JobApplications;