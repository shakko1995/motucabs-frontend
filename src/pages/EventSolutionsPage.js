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

const EventSolutionsPage = () => {
    return (
        <div className="bg-white text-gray-700">
            <Header />
            
            <div className="bg-gray-50 border-b">
                <div className="max-w-5xl mx-auto px-6 py-20 text-center">
                    <motion.h1 
                        className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Event Solutions
                    </motion.h1>
                    <motion.p 
                        className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Premium event solutions for seamless transportation
                    </motion.p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                >
                    <div className="space-y-4">
                        <p className="leading-relaxed">
                            Ensure the success of your events with our personalized and expertly coordinated transportation services. Whether it's a corporate gathering such as the Davos World Economic Forum or prestigious events like Watches and Wonders, the Paris Motor Show, the Paris Air Show, or the Milan and Paris Fashion Weeks, our expertise is at your service.
                        </p>
                        <p className="leading-relaxed">
                            We provide tailored solutions for any type of event, whether it's a business meeting, a wedding, or a music festival. Using our advanced real-time tracking system, we efficiently coordinate multiple vehicles and drivers to ensure smooth and secure transportation, even in unexpected situations.
                        </p>
                    </div>
                    <div className="flex justify-center items-center">
                        <img 
                            src="https://img.freepik.com/free-vector/people-gathering-music-festival_52683-38833.jpg?w=996" 
                            alt="Event Solutions Illustration" 
                            className="rounded-lg shadow-lg w-full max-w-sm"
                        />
                    </div>
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-12 space-y-4"
                >
                    <p className="leading-relaxed">
                        From the planning stage, our team works closely with you to understand your essential requirements and guarantee guest satisfaction. Our professional chauffeurs ensure comfortable and punctual transportation while prioritizing passenger safety.
                    </p>
                    <p className="leading-relaxed">
                        Our vehicles are the first point of contact for your guests. We can customize them according to your needs, offering personalized touches and specific equipment to reflect the sophistication and exclusivity of your event.
                    </p>
                    <p className="leading-relaxed">
                        Transform transportation into a key component of your event's overall experience with our premium solutions.
                    </p>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
};

export default EventSolutionsPage;