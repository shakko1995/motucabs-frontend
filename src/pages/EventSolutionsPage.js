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

            {/* Hero Section */}
            <div className="bg-gray-50 border-b">
                <div className="max-w-5xl mx-auto px-6 py-20 text-center">
                    <motion.h1
                        className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Event Transportation Solutions
                    </motion.h1>
                    <motion.p
                        className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Seamless, Sophisticated & Reliable Mobility for Every Occasion
                    </motion.p>
                </div>
            </div>

            {/* Intro Section */}
            <div className="max-w-5xl mx-auto px-6 py-16 space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-4"
                >
                    <p className="leading-relaxed">
                        At Motu Cabs, we understand that flawless transportation plays a vital role in the success of any event. 
                        Our premium event transportation solutions are designed to deliver efficiency, elegance, and precision, 
                        ensuring that every guest arrives on time, in comfort, and with a lasting impression of excellence.
                    </p>
                    <p className="leading-relaxed">
                        Whether you’re organizing a corporate summit, a high-profile wedding, a product launch, a music concert, 
                        or a large-scale exhibition, Motu Cabs offers customized mobility solutions to suit every occasion. 
                        From luxury sedans and business SUVs to premium minibuses and traveler vans, our versatile fleet and experienced chauffeurs ensure smooth coordination and world-class service.
                    </p>
                </motion.div>

                {/* Fleet & Illustration Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                >
                    <div className="space-y-4">
                        <p className="leading-relaxed">
                            From the planning stage, our team works closely with you to understand your essential requirements and guarantee guest satisfaction. 
                            Our professional chauffeurs ensure comfortable and punctual transportation while prioritizing passenger safety.
                        </p>
                        <p className="leading-relaxed">
                            Our vehicles are the first point of contact for your guests. We can customize them according to your needs, offering personalized touches and specific equipment to reflect the sophistication and exclusivity of your event.
                        </p>
                        <p className="leading-relaxed">
                            Transform transportation into a key component of your event's overall experience with our premium solutions.
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

                {/* Detailed Services Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="space-y-8"
                >
                    <h2 className="text-3xl font-bold text-gray-800">Tailored Transportation for Every Event Type</h2>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-700">Corporate & Business Events</h3>
                            <p className="leading-relaxed mt-2">
                                From conferences, expos, and product launches to VIP transfers for executive guests, Motu Cabs provides efficient, punctual, and professional corporate travel management. 
                                Our dedicated event coordinators handle multi-vehicle logistics, airport pickups, and route planning to make sure everything runs seamlessly.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-700">Weddings & Celebrations</h3>
                            <p className="leading-relaxed mt-2">
                                Make your big day even more special with luxury wedding transportation that combines comfort and class. 
                                Our chauffeurs ensure smooth transfers for the bride, groom, and guests — offering vehicles decorated or personalized to match your event theme.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-700">Entertainment & Cultural Events</h3>
                            <p className="leading-relaxed mt-2">
                                For film festivals, concerts, award shows, and sports events, we manage large fleets and coordinate hundreds of rides in real time. 
                                Our real-time GPS tracking system ensures every vehicle arrives on schedule, even when plans change at the last minute.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-700">Corporate Delegations & VIP Transport</h3>
                            <p className="leading-relaxed mt-2">
                                Our chauffeur-driven executive fleet caters to international delegations, CEOs, diplomats, and high-profile guests who require discreet, secure, and comfortable ground transportation.
                            </p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 mt-8">Why Choose Motu Cabs for Event Mobility?</h2>
                        <ul className="list-disc list-inside space-y-2 mt-4 text-gray-700">
                            <li>Comprehensive Fleet Options: From compact sedans to premium SUVs, travelers, and luxury coaches.</li>
                            <li>Real-Time Tracking & Coordination: Stay updated on every trip with GPS-enabled monitoring.</li>
                            <li>End-to-End Event Logistics: Our team handles planning, scheduling, routing, and on-ground supervision.</li>
                            <li>Professional Chauffeurs: Trained drivers ensuring punctuality, discretion, and guest comfort.</li>
                            <li>Customized Branding: Add your event logos, themes, or decor to vehicles for a personalized touch.</li>
                            <li>Safety & Reliability: Regularly maintained vehicles with 24/7 customer support and backup fleets.</li>
                        </ul>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-3xl font-bold text-gray-800">Your Event, Our Expertise</h2>
                        <p className="leading-relaxed mt-4">
                            At Motu Cabs, we don’t just move guests — we elevate the entire event experience. From the moment your attendees step into our vehicles, they experience the professionalism, care, and comfort that define your event’s reputation.
                        </p>
                        <p className="leading-relaxed mt-2">
                            Let Motu Cabs be your trusted partner for event logistics, corporate transportation, and large-scale mobility coordination — ensuring your event runs with precision, elegance, and peace of mind.
                        </p>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
};

export default EventSolutionsPage;
