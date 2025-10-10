import React, { useState } from 'react';
import axios from 'axios';
import { CheckCircle } from 'lucide-react';
// import Header from '../components/Header';
// import Footer from '../components/Footer';

const DriverPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        city: '',
        driverLicenseNumber: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await axios.post('http://localhost:5000/api/drivers', formData);
            if (res.data.message) {
                alert(res.data.message);
                setFormData({ firstName: '', lastName: '', phone: '', email: '', city: '', driverLicenseNumber: '' });
            }
        } catch (error) {
            alert(error.response?.data?.message || "Submission failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white">
            {/* <Header /> */}
            <div className="max-w-6xl mx-auto py-16 px-4">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-blue-600">
                        Attach Your Car with Motu Cabs
                    </h1>
                    <p className="mt-4 text-lg text-slate-700">
                        For Airport Transfers, Hourly Rentals & Outstation Trips
                    </p>
                    <p className="mt-2 text-slate-600 max-w-2xl mx-auto">
                        Own a car or operate intercity taxis? Join the Motu Cabs Partner Network today and start earning more with reliable, high-demand rides.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    {/* Left Column: Benefits */}
                    <div className="bg-slate-50 p-8 rounded-xl border">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">
                            Why Partner with Motu Cabs?
                        </h2>
                        <p className="text-slate-600 mb-6">
                            By attaching your car with Motu, you gain access to a large customer base, continuous trip requests, and transparent earnings. Focus on providing great service — we handle the rest.
                        </p>

                        <h3 className="font-semibold text-lg text-slate-800 mb-4">
                            Benefits for Gozo Vendor Partners
                        </h3>
                        <ul className="space-y-3 text-slate-700">
                            <li className="flex items-start gap-3">
                                <CheckCircle size={20} className="text-green-500 mt-1"/>
                                <span>Consistent Ride Requests – Airport transfers, local rentals & outstation trips.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle size={20} className="text-green-500 mt-1"/>
                                <span>Focus on Driving – We handle bookings, customer service & promotions.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle size={20} className="text-green-500 mt-1"/>
                                <span>More Rides = More Reviews = More Earnings – Deliver quality service and grow your income.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle size={20} className="text-green-500 mt-1"/>
                                <span>Timely Payments – Always transparent, directly to your account.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle size={20} className="text-green-500 mt-1"/>
                                <span>Motu Partner+ App – Manage trips, track earnings, and stay connected with the Motu team.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle size={20} className="text-green-500 mt-1"/>
                                <span>Stay Busy Year-Round – Consistent trip opportunities across all seasons.</span>
                            </li>
                        </ul>

                        <h3 className="font-semibold text-lg text-slate-800 mt-6 mb-2">
                            Who Can Join?
                        </h3>
                        <p className="text-slate-600 mb-2">
                            We welcome:
                        </p>
                        <ul className="list-disc list-inside text-slate-700 space-y-1">
                            <li>Individual Drivers</li>
                            <li>Car Owners with Commercial Vehicles</li>
                            <li>Fleet Operators and Taxi Companies</li>
                            <li>Driver Cum Owners (DCOs)</li>
                        </ul>
                    </div>

                    {/* Right Column: Application Form */}
                    <div className="bg-white p-8 rounded-xl shadow-lg border">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">Start Your Application</h2>
                        <p className="text-slate-600 mb-6">
                            Fill out the form below — our Vendor Relations Team will contact you shortly to help you onboard and start earning.
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    First Name <span className="text-gray-500">(as shown on your Driver's License)</span>
                                </label>
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Enter First Name" className="mt-1 w-full p-3 border rounded-md" required />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Last Name <span className="text-gray-500">(as shown on your Driver's License)</span>
                                </label>
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Enter Last Name" className="mt-1 w-full p-3 border rounded-md" required />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="081234 56789" className="mt-1 w-full p-3 border rounded-md" required />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Email Address</label>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter Email Id" className="mt-1 w-full p-3 border rounded-md" required />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">City of Operations</label>
                                <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="Enter City" className="mt-1 w-full p-3 border rounded-md" required />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Driver License Number</label>
                                <input type="text" name="driverLicenseNumber" value={formData.driverLicenseNumber} onChange={handleInputChange} placeholder="Driver License Number" className="mt-1 w-full p-3 border rounded-md" required />
                            </div>
                            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400">
                                {isSubmitting ? 'Finishing...' : 'FINISH'}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-16 text-center text-slate-600 max-w-3xl mx-auto">
                    <h3 className="text-2xl font-bold mb-4">Drive with Motu. Earn More. Grow Faster.</h3>
                    <p>
                        Join one of India’s fastest-growing cab networks and experience steady income, flexible work, and full transparency — powered by Motu Cabs.
                    </p>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default DriverPage;
