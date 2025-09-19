import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Reusable Header Component
const Header = () => {
    const navigate = useNavigate();
    return (
        <header className="bg-white shadow-sm sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>
                    <span className="text-blue-600">Motu</span><span className="text-orange-500">Cab</span>
                </div>
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
                    <a href="/about" className="hover:text-blue-600">About Us</a>
                    <a href="/contact" className="hover:text-blue-600">Contact Us</a>
                </nav>
            </div>
        </header>
    );
};

// Reusable Footer Component
const Footer = () => (
    <footer className="bg-gray-100 border-t">
        <div className="max-w-7xl mx-auto px-8 py-12 text-center text-gray-500">
            <div className="text-xl font-bold mb-4">
                <span className="text-blue-600">Motu</span><span className="text-orange-500">Cab</span>
            </div>
            <div className="text-sm flex flex-wrap justify-center gap-x-4 gap-y-2 mb-6">
                <a href="/" className="hover:text-blue-600">Home</a>
                <a href="/about" className="hover:text-blue-600">About Us</a>
                <a href="/contact" className="hover:text-blue-600">Contact</a>
            </div>
            <p className="text-xs">© {new Date().getFullYear()} MotuCab Technologies Pvt. Ltd. All Rights Reserved.</p>
        </div>
    </footer>
);

const HourlyServicePage = () => {
    return (
        <div className="bg-white">
            <Header />
            
            <div className="bg-gray-50 border-b">
                <div className="max-w-5xl mx-auto px-6 py-20 text-center">
                    <motion.h1 
                        className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Hourly Service
                    </motion.h1>
                    <motion.p 
                        className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Hourly service for personalized and flexible transportation
                    </motion.p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-16 space-y-8">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                    className="text-gray-600 leading-relaxed"
                >
                    Enjoy the ultimate freedom and flexibility with our hourly chauffeur service, designed to adapt perfectly to your schedule and needs. Whether you're attending important business meetings, exploring a new destination, or indulging in a shopping spree, our service ensures convenience, reliability, and unmatched customer satisfaction.
                </motion.p>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-gray-600 leading-relaxed"
                >
                    With our hourly service, you're not tied to predefined routes or destinations. You can book a chauffeur for as long as you need, even if your itinerary isn't fully planned. This flexibility allows you to focus on your priorities while we take care of your transportation.
                </motion.p>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-gray-600 leading-relaxed"
                >
                    Our professional and experienced drivers are dedicated to delivering a smooth, exclusive experience, ensuring you travel in comfort and style. From luxury vehicles to impeccable service, we cater to your preferences and provide tailored solutions for your journey.
                </motion.p>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-gray-600 leading-relaxed"
                >
                    Discover the excellence of our hourly chauffeur service and experience transportation that revolves around your unique schedule. Let us drive you while you enjoy the freedom to focus on what truly matters.
                </motion.p>
            </div>

            <Footer />
        </div>
    );
};

export default HourlyServicePage;