import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Briefcase, MapPin, Users, FileText, X } from 'lucide-react';
// import Header from '../components/Header';
// import Footer from '../components/Footer';

// Application Form Modal Component
const ApplicationFormModal = ({ job, onClose }) => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const [resume, setResume] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setResume(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const applicationData = new FormData();
        applicationData.append('jobTitle', job.title);
        applicationData.append('jobId', job.jobId);
        applicationData.append('name', formData.name);
        applicationData.append('email', formData.email);
        applicationData.append('phone', formData.phone);
        if (resume) {
            applicationData.append('resume', resume);
        }

        try {
            await axios.post('http://localhost:5000/api/applications', applicationData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Application submitted successfully!');
            onClose();
        } catch (error) {
            alert('Failed to submit application. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"><X /></button>
                <h2 className="text-2xl font-bold mb-2">Apply for {job.title}</h2>
                <p className="text-sm text-gray-500 mb-6">Job ID: {job.jobId}</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="name" placeholder="Full Name" onChange={handleInputChange} className="w-full p-3 border rounded" required />
                    <input type="email" name="email" placeholder="Email" onChange={handleInputChange} className="w-full p-3 border rounded" required />
                    <input type="tel" name="phone" placeholder="Phone Number" onChange={handleInputChange} className="w-full p-3 border rounded" required />
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Upload Resume</label>
                        <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded mt-1" required />
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700">
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                </form>
            </div>
        </div>
    );
};


const CareersPage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/jobs');
                setJobs(res.data.data || []);
            } catch (err) {
                console.error("Failed to fetch jobs", err);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    return (
        <div className="bg-white">
            {/* <Header /> */}
            <div className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 py-16 text-white">
                <div className="max-w-6xl mx-auto flex flex-col items-center justify-center text-center px-6">
                    {/* Logo */}
                    <div className="flex items-center mb-6">

                        <span className="text-3xl font-bold">
                            <span className="text-blue-300">Motu</span>
                            <span className="text-orange-400">Cab</span>
                        </span>
                    </div>

                    {/* Text */}
                    <h1 className="text-4xl md:text-5xl font-bold mb-3">
                        We are always looking for talent
                    </h1>
                    <p className="text-lg md:text-xl text-gray-100">
                        If you think you have a good fit in MotuCab, we’d love to hear from you.
                    </p>
                </div>
            </div>



            <div className="max-w-4xl mx-auto py-16 px-4">
                <h2 className="text-3xl font-bold text-slate-800">Career</h2>
                <p className="text-slate-600 mt-2 mb-12">
                    We are always looking for talent – if you think you have a good fit in gozocabs, please contact us at <a href="mailto:careers@Motucabs.in" className="text-blue-600">careers@gozocabs.in</a>.
                </p>

                <div className="space-y-8">
                    {jobs.map(job => (
                        <div key={job._id} className="bg-white p-8 rounded-lg shadow-lg border">
                            <h3 className="text-2xl font-bold text-slate-800">{job.title} <span className="text-yellow-500">(Job ID: {job.jobId})</span></h3>
                            <p className="text-slate-600 my-4">{job.description}</p>
                            <div className="flex flex-wrap gap-4 text-sm mb-6">
                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">Prior Experience: {job.experience}</span>
                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">Location: {job.location}</span>
                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">No. of Openings: {job.openings}</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-bold mb-2">Responsibilities</h4>
                                    <ul className="list-disc list-inside space-y-1 text-slate-600">
                                        {job.responsibilities.map((item, i) => <li key={i}>{item}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-2">Requirements</h4>
                                    <ul className="list-disc list-inside space-y-1 text-slate-600">
                                        {job.requirements.map((item, i) => <li key={i}>{item}</li>)}
                                    </ul>
                                </div>
                            </div>
                            <div className="text-right mt-6">
                                <button onClick={() => { setSelectedJob(job); setShowModal(true); }} className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg">Apply Now</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showModal && selectedJob && (
                <ApplicationFormModal job={selectedJob} onClose={() => setShowModal(false)} />
            )}

            {/* <Footer /> */}
        </div>
    );
};

export default CareersPage;