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

const PlannedItinerariesPage = () => {
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
                        Planned Itineraries
                    </motion.h1>
                    <motion.p 
                        className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Effortless multi-destination travel with customizable plans and professional service.
                    </motion.p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-16 space-y-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Round-trip Cab Service</h2>
                    <ul className="list-disc list-inside space-y-3 pl-4 text-gray-600 leading-relaxed">
                        <li>
                            Perfect for individuals who need to travel to a specific destination and then return to the starting point in a single booking.
                        </li>
                        <li>
                            The round-trip booking will pick you up at your preferred time, drive you to your destination, and after a pre-agreed duration or at a scheduled time, return you to the starting location.
                        </li>
                        <li>
                            Ideal for business trips, vacations, or visits to nearby cities, where the traveler doesn't want to arrange separate rides for each leg of the journey.
                        </li>
                        <li>
                            Flexibility in adjusting pickup or return times if your travel plans change.
                        </li>
                    </ul>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Multi-way (Multi-city) Cab Service</h2>
                    <ul className="list-disc list-inside space-y-3 pl-4 text-gray-600 leading-relaxed">
                        <li>
                            Visit multiple destinations during a single trip, without booking separate rides for each destination.
                        </li>
                        <li>
                            Idea for tourists or business travelers who wish to explore multiple cities or locations during one journey.
                        </li>
                        <li>
                            You can plan a customized itinerary, such as visiting different cities, local attractions, or even a mix of short and long-distance stops.
                        </li>
                        <li>
                            For instance, someone traveling from Delhi might stop in Agra and Jaipur, before returning to Delhi or continuing to another city. We ensure your cab and driver are ready at each stop, optimizing the entire route to avoid unnecessary delays.
                        </li>
                        <li>
                            Flexible departure and arrival times, allowing adjustments as needed for unforeseen delays, making it ideal for longer, multi-stop trips. Both services offer comfort, convenience, and cost-effectiveness by reducing the hassle of frequent bookings. Additionally, professional drivers and well-maintained vehicles are typically available to ensure a smooth travel experience throughout the trip.
                        </li>
                    </ul>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
};

export default PlannedItinerariesPage;