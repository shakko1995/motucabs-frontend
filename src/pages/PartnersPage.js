import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle } from 'lucide-react';

// SwiperJS for the image carousel
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Reusable Header & Footer Components
const Header = () => { /* ... Your Header Component ... */ };
const Footer = () => { /* ... Your Footer Component ... */ };

const PartnersPage = () => {
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', phone: '', city: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await axios.post('http://localhost:5000/api/resellers', formData);
            if (res.data.message) {
                alert(res.data.message);
                setFormData({ firstName: '', lastName: '', email: '', phone: '', city: '' });
            }
        } catch (error) {
            alert(error.response?.data?.message || "Submission failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const partnerImages = [
        'https://images.unsplash.com/photo-1517404215738-15263e9f9178?w=800',
        'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800',
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800',
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800'
    ];

    return (
        <div className="bg-white">
            <Header />

            {/* Hero Section */}
            <div className="max-w-6xl mx-auto px-6 py-12 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
                    Become a Motu Cabs Reseller
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                    Join the Motu Travel Partner Family and Grow Your Business.
                    Offer convenient travel solutions to your customers — and earn great income while doing it!
                </p>
            </div>

            {/* Carousel */}
            <div className="mb-16 rounded-lg overflow-hidden shadow-xl">
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    loop={true}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    navigation={true}
                    className="h-64 md:h-96"
                >
                    {partnerImages.map((imgUrl, index) => (
                        <SwiperSlide key={index}>
                            <img src={imgUrl} alt={`Partner ${index + 1}`} className="w-full h-full object-cover" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                {/* Left Column: Info & Benefits */}
                <div className="space-y-10">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Motu Travel Partner Program</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Start booking airport transfers, hourly rentals, and outstation cabs for your clients instantly — all under one platform.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            As a Motu Cabs Partner, you get access to competitive pricing, a robust booking system, and full backend support.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Benefits of Joining Motu's Travel Network</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3"><CheckCircle size={20} className="text-green-500 mt-1"/> Access to India’s Trusted Intercity Taxi Network.</li>
                            <li className="flex items-start gap-3"><CheckCircle size={20} className="text-green-500 mt-1"/> Buy Low, Sell Smart, Earn More on every booking.</li>
                            <li className="flex items-start gap-3"><CheckCircle size={20} className="text-green-500 mt-1"/> Simple Booking Dashboard for easy management.</li>
                            <li className="flex items-start gap-3"><CheckCircle size={20} className="text-green-500 mt-1"/> 24x7 Partner Support for assistance.</li>
                            <li className="flex items-start gap-3"><CheckCircle size={20} className="text-green-500 mt-1"/> Perfect for Travel Agents, Hotels, Corporate Offices & Shop Owners.</li>
                            <li className="flex items-start gap-3"><CheckCircle size={20} className="text-green-500 mt-1"/> Earn ₹50,000 to ₹1 Lakh+ per month.</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Questions? Contact our Travel Partner Team</h3>
                        <a href="mailto:partners@gozocabs.com" className="text-blue-600 hover:underline">partners@gozocabs.com</a>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">How It Works</h3>
                        <ol className="list-decimal list-inside text-gray-700 space-y-2">
                            <li>Register as a Motu Partner – Fill out the registration form.</li>
                            <li>Get Your Access Dashboard – Receive login credentials.</li>
                            <li>Start Booking & Earning – Create bookings and earn commissions.</li>
                        </ol>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Who Can Join?</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                            <li>Travel Agents & Tour Operators</li>
                            <li>Hotel & Guesthouse Travel Desks</li>
                            <li>Corporate Travel Managers</li>
                            <li>Small Business Owners / Shopkeepers</li>
                            <li>Freelance Travel Consultants</li>
                        </ul>
                        <p className="text-gray-600 mt-2">If you interact with travelers — you can earn with Motu!</p>
                    </div>
                </div>

                {/* Right Column: Fixed Form */}
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border sticky top-28 max-w-md w-full mx-auto lg:mx-0">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Fill Your Details Here</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">First Name</label>
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Your First Name" className="mt-1 w-full p-3 border rounded-md" required />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Last Name</label>
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Your Last Name" className="mt-1 w-full p-3 border rounded-md" required />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Email*</label>
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter primary email" className="mt-1 w-full p-3 border rounded-md" required />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Phone*</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="081234 56789" className="mt-1 w-full p-3 border rounded-md" required />
                        </div>
                        <div>
                            <label className="text-sm font-medium">City of Business</label>
                            <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="Enter Your City" className="mt-1 w-full p-3 border rounded-md" required />
                        </div>
                        <div className="flex items-start mt-4">
                            <input id="terms" type="checkbox" className="h-4 w-4 mt-1 text-blue-600 border-gray-300 rounded" required />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                                I Agree to the <a href="/terms-and-conditions" className="text-orange-500 hover:underline">Terms and Conditions</a>
                            </label>
                        </div>
                        <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700">
                            {isSubmitting ? 'Submitting...' : 'BECOME A RESELLER'}
                        </button>
                    </form>
                </div>

            </div>

            {/* Closing Section */}
            <div className="max-w-4xl mx-auto text-center py-12 text-gray-700">
                <h3 className="text-2xl font-bold mb-4">Partner with Motu Cabs. Grow Your Business. Earn More.</h3>
                <p>Join the Motu Cabs Partner Family today and bring affordable, reliable, and professional cab services to your customers — while building a steady income stream for yourself.</p>
            </div>

            <Footer />
        </div>
    );
};

export default PartnersPage;
