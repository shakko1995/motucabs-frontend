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
                // Reset the form after successful submission
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
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-blue-600">Attach your Taxi for Airport Transfers, Hourly Rentals & Outstation Trips</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    {/* Left Column: Benefits */}
                    <div className="bg-slate-50 p-8 rounded-xl border">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">Attach your car into the Gozo Vendor networks</h2>
                        <p className="text-slate-600 mb-6">If you own or operate an inter-city taxi, then you should join with Gozo.</p>
                        
                        <h3 className="font-semibold text-lg text-slate-800 mb-4">Benefits for Gozo vendor partners</h3>
                        <ul className="space-y-3 text-slate-700">
                            <li className="flex items-start gap-3"><CheckCircle size={20} className="text-green-500 mt-1"/><span>Gozo focuses on getting customer demand</span></li>
                            <li className="flex items-start gap-3"><CheckCircle size={20} className="text-green-500 mt-1"/><span>You simply provide top quality service</span></li>
                            <li className="flex items-start gap-3"><CheckCircle size={20} className="text-green-500 mt-1"/><span>Stay busy in all seasons. Good service = More business</span></li>
                            <li className="flex items-start gap-3"><CheckCircle size={20} className="text-green-500 mt-1"/><span>Get great reviews from customers</span></li>
                            <li className="flex items-start gap-3"><CheckCircle size={20} className="text-green-500 mt-1"/><span>Gozo sends you payments on-time</span></li>
                        </ul>
                    </div>

                    {/* Right Column: Application Form */}
                    <div className="bg-white p-8 rounded-xl shadow-lg border">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">Start your application</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">First name <span className="text-gray-500">(as shown on your Driver's License)</span></label>
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Enter First Name" className="mt-1 w-full p-3 border rounded-md" required />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Last name <span className="text-gray-500">(as shown on your Driver's License)</span></label>
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Enter Last Name" className="mt-1 w-full p-3 border rounded-md" required />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Phone numbers</label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="081234 56789" className="mt-1 w-full p-3 border rounded-md" required />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Email address</label>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter Email Id" className="mt-1 w-full p-3 border rounded-md" required />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">What city do you do most business in</label>
                                <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="Select City" className="mt-1 w-full p-3 border rounded-md" required />
                            </div>
                             <div>
                                <label className="text-sm font-medium text-gray-700">Driver license number</label>
                                <input type="text" name="driverLicenseNumber" value={formData.driverLicenseNumber} onChange={handleInputChange} placeholder="Driver license number" className="mt-1 w-full p-3 border rounded-md" required />
                            </div>
                            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400">
                                {isSubmitting ? 'Finishing...' : 'FINISH'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default DriverPage;