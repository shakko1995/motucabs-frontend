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
            // This should point to your reseller/partner backend endpoint
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
            
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-blue-600 hover:text-orange-500 transition-colors cursor-pointer">
                        Become a Gozo's reseller. Join Gozo's travel partner family..
                    </h1>
                </div>

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
                                <img src={imgUrl} alt={`Partner image ${index + 1}`} className="w-full h-full object-cover" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div className="space-y-10">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Gozo Travel partner program</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Travel Agents, Hotels, travel desks, Shopkeepers... Offer convenience to your customers and make money. Its simple! Join now and instantly start creating bookings for your customers.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Benefits of joining Gozo's Travel network...</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3"><CheckCircle size={20} className="text-green-500 mt-1"/><span>Get direct access to India's largest network of intercity AC Taxi</span></li>
                                <li className="flex items-start gap-3"><CheckCircle size={20} className="text-green-500 mt-1"/><span>Offer convenience of outstation taxi bookings to your customers</span></li>
                                <li className="flex items-start gap-3"><CheckCircle size={20} className="text-green-500 mt-1"/><span>Buy bookings at very low pricing - and sell them to create profits</span></li>
                                <li className="flex items-start gap-3"><CheckCircle size={20} className="text-green-500 mt-1"/><span>Get 24x7 support from our travel desk & service center</span></li>
                            </ul>
                        </div>
                         <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Any questions? Contact our Travel Partner team</h3>
                            <a href="mailto:partners@gozocabs.com" className="text-blue-600 hover:underline">partners@gozocabs.com</a>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-lg border sticky top-28">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">Fill your details here:</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                             <div>
                                <label className="text-sm font-medium">First name</label>
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Your First Name" className="mt-1 w-full p-3 border rounded-md" required />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Last name</label>
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
                                <label className="text-sm font-medium">Select City in which your business is located</label>
                                <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="Enter Your City" className="mt-1 w-full p-3 border rounded-md" required />
                            </div>
                            <div className="flex items-start mt-4">
                                <input id="terms" type="checkbox" className="h-4 w-4 mt-1 text-blue-600 border-gray-300 rounded" required />
                                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                                    I Agree to the <a href="/terms-and-conditions" className="text-orange-500 hover:underline">Terms and Conditions</a> Channel Partner
                                </label>
                            </div>
                            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700">
                                {isSubmitting ? 'Submitting...' : 'BECOME A RESELLER'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default PartnersPage;