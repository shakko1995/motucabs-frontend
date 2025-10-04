import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AdminContext } from '../context/AdminContext';
import { Edit, Trash2 } from 'lucide-react';

const ManageJobs = () => {
    const { adminToken } = useContext(AdminContext);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(null);

    const initialFormData = {
        title: '',
        jobId: '',
        description: '',
        experience: '',
        location: '',
        openings: '',
        responsibilities: [],
        requirements: []
    };
    const [formData, setFormData] = useState(initialFormData);

    const fetchJobs = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/jobs');
            setJobs(res.data.data || []);
        } catch (err) {
            setError('Failed to fetch jobs.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchJobs(); }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (["responsibilities", "requirements"].includes(name)) {
            setFormData(prev => ({ ...prev, [name]: value.split('\n') }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const resetForm = () => {
        setEditMode(null);
        setFormData(initialFormData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editMode ? `http://localhost:5000/api/jobs/${editMode}` : 'http://localhost:5000/api/jobs';
        const method = editMode ? 'put' : 'post';

        try {
            await axios[method](url, formData, { headers: { Authorization: `Bearer ${adminToken}` } });
            alert(`Job ${editMode ? 'updated' : 'created'} successfully!`);
            resetForm();
            fetchJobs();
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred.');
        }
    };

    const handleEdit = (job) => {
        setEditMode(job._id);
        setFormData({
            title: job.title,
            jobId: job.jobId,
            description: job.description,
            experience: job.experience || '',
            location: job.location || '',
            openings: job.openings || '',
            responsibilities: job.responsibilities || [],
            requirements: job.requirements || []
        });
        window.scrollTo(0, 0);
    };

    const handleDelete = async (id) => {
        if(window.confirm('Are you sure you want to delete this job posting?')) {
            try {
                await axios.delete(`http://localhost:5000/api/jobs/${id}`, { headers: { Authorization: `Bearer ${adminToken}` } });
                alert('Job deleted successfully!');
                fetchJobs();
            } catch (err) {
                setError('Failed to delete job.');
            }
        }
    };

    return (
        <div className="p-6 bg-slate-50 min-h-full">
            <h1 className="text-3xl font-bold text-slate-800 mb-6">Manage Job Postings</h1>

            {/* Form Section */}
            <div className="bg-white p-8 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-6">{editMode ? 'Edit Job Posting' : 'Add New Job Posting'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* First row: title, jobId, location */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input 
                            name="title" 
                            value={formData.title} 
                            onChange={handleInputChange} 
                            placeholder="Job Title" 
                            className="p-3 border rounded-md" 
                            required 
                        />
                        <input 
                            name="jobId" 
                            value={formData.jobId} 
                            onChange={handleInputChange} 
                            placeholder="Job ID" 
                            className="p-3 border rounded-md" 
                            required 
                        />
                        <input 
                            name="location" 
                            value={formData.location} 
                            onChange={handleInputChange} 
                            placeholder="Location" 
                            className="p-3 border rounded-md" 
                        />
                    </div>

                    {/* Second row: experience, openings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input 
                            name="experience" 
                            value={formData.experience} 
                            onChange={handleInputChange} 
                            placeholder="Prior Experience" 
                            className="p-3 border rounded-md" 
                        />
                        <input 
                            name="openings" 
                            value={formData.openings} 
                            onChange={handleInputChange} 
                            placeholder="No. of Openings" 
                            className="p-3 border rounded-md" 
                        />
                    </div>

                    {/* Description */}
                    <textarea 
                        name="description" 
                        value={formData.description} 
                        onChange={handleInputChange} 
                        placeholder="Job Description..." 
                        rows="3" 
                        className="w-full p-3 border rounded-md" 
                        required
                    />

                    {/* Responsibilities & Requirements */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <textarea 
                            name="responsibilities" 
                            value={formData.responsibilities.join('\n')} 
                            onChange={handleInputChange} 
                            placeholder="Responsibilities (one per line)..." 
                            rows="5" 
                            className="w-full p-3 border rounded-md" 
                        />
                        <textarea 
                            name="requirements" 
                            value={formData.requirements.join('\n')} 
                            onChange={handleInputChange} 
                            placeholder="Requirements (one per line)..." 
                            rows="5" 
                            className="w-full p-3 border rounded-md" 
                        />
                    </div>

                    {/* Form buttons */}
                    <div className="flex justify-end gap-4">
                        <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-6 py-2 rounded-lg">Cancel</button>
                        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">{editMode ? 'Update Job' : 'Save Job'}</button>
                    </div>
                </form>
            </div>

            {/* Jobs Table */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Existing Job Postings</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 uppercase text-xs">
                            <tr>
                                <th className="p-3 text-left">Title</th>
                                <th className="p-3 text-left">Job ID</th>
                                <th className="p-3 text-left">Location</th>
                                <th className="p-3 text-left">Experience</th>
                                <th className="p-3 text-left">Openings</th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map(job => (
                                <tr key={job._id} className="border-b">
                                    <td className="p-3 font-medium">{job.title}</td>
                                    <td className="p-3">{job.jobId}</td>
                                    <td className="p-3">{job.location}</td>
                                    <td className="p-3">{job.experience}</td>
                                    <td className="p-3">{job.openings}</td>
                                    <td className="p-3 flex gap-3">
                                        <button onClick={() => handleEdit(job)} className="text-blue-600"><Edit size={18}/></button>
                                        <button onClick={() => handleDelete(job._id)} className="text-red-600"><Trash2 size={18}/></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageJobs;
