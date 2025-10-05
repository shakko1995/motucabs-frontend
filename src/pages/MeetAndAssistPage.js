import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// import { Handshake, Briefcase, Clock, Shield } from 'lucide-react';

// Reusable Header & Footer Components
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

const Footer = () => (
    <footer className="bg-gray-100 border-t">
        <div className="max-w-7xl mx-auto px-8 py-12 text-center text-gray-500">
            <div className="text-sm flex flex-wrap justify-center gap-x-4 gap-y-2 mb-6">
                <a href="/" className="hover:text-blue-600">Home</a>
                <a href="/about" className="hover:text-blue-600">About us</a>
                <a href="/faq" className="hover:text-blue-600">Faq's</a>
                <a href="/contact" className="hover:text-blue-600">Contact us</a>
            </div>
            <p className="text-xs">© {new Date().getFullYear()} MotuCab Technologies Pvt. Ltd. All Rights Reserved.</p>
        </div>
    </footer>
);

const Section = ({ title, children }) => (
    <motion.div 
        className="mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
    >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
            {children}
        </div>
    </motion.div>
);

const MeetAndAssistPage = () => {
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
                        Meet and Assist
                    </motion.h1>
                    <motion.p 
                        className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Concierge service that handles rentals, bookings, and personalized support, saving time and managing daily tasks and travel plans for you.
                    </motion.p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-16">
                <Section title="Key Services">
                    <p>
                        With Meet and Assist, we offer a range of premium airport services designed to make air travel smoother and more convenient. We provide personalized assistance for passengers at major airports across India, ensuring a hassle-free journey from arrival to departure.
                    </p>
                    <ul className="list-disc list-inside space-y-3 pl-4 mt-4">
                        <li>
                            <strong>Meet and Greet Assistance:</strong> A guest relations executive will meet passengers at the airport's arrival or departure gate, guiding them through the airport processes. This includes help with check-in, baggage claim, and directing them to the appropriate gates or vehicle parking.
                        </li>
                        <li>
                            <strong>Porter Services:</strong> Professional porters assist with luggage handling, from vehicle drop-off to check-in counters or vice versa, making the airport experience more efficient and comfortable.
                        </li>
                        <li>
                            <strong>Transit and Short Layover Support:</strong> For travelers with short layovers or tight schedules, the service provides quick and efficient transfers between gates and areas, ensuring a smooth connection for onward flights.
                        </li>
                        <li>
                            <strong>VIP Concierge Services:</strong> Exclusive services for high-end travelers, including priority access to check-in counters, airport lounges, and fast-track immigration or security clearances.
                        </li>
                        <li>
                            <strong>Customizable Packages:</strong> They offer customizable packages based on the individual needs of the traveler, whether it's for business or leisure trips, allowing for a tailored experience based on passenger preferences and requirements.
                        </li>
                        <li>
                            <strong>Multicity Coverage:</strong> Available in major Indian cities like Mumbai, Chennai, Pune, Delhi, Hyderabad, Kolkata, Coimbatore, Visakhapatnam, and many others, providing nationwide coverage.
                        </li>
                    </ul>
                </Section>
            </div>

            <Footer />
        </div>
    );
};

export default MeetAndAssistPage;