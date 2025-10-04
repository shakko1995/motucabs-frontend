import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import RideBookingForm from '../components/RideBookingForm';

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

const RoundTripPage = () => {
    // Force "Round Trip" tab active
    const defaultTabData = {
        activeTab: "Round Trip",
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().slice(0, 5),
        pickup: "",
        drop: "",
    };

    return (
        <div className="bg-white">

            {/* Full-width Ride Booking Form at the top */}
            <RideBookingForm defaultData={defaultTabData} />

            {/* Banner with text below the form */}
            <div className="relative bg-gray-50 py-20">
                <img 
                    src="https://images.unsplash.com/photo-1587614382346-4ec9b7f6b223?w=1600"
                    alt="Round Trip Banner"
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                <div className="relative max-w-5xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Round Trips – Comfortable, Reliable, and Hassle-Free
                    </h2>
                    <p className="text-lg text-gray-600">
                        Book a cab for your round trip and travel worry-free. Perfect for airport returns, city tours, or business trips.
                    </p>
                </div>
            </div>

            {/* Content Sections */}
            <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
                <Section title="Why Choose Our Round Trip Service?">
                    <p>
                        Our round trip service ensures a safe and comfortable ride with the same driver for your return journey, eliminating the hassle of booking separate rides.
                    </p>
                    <ul className="list-disc list-inside space-y-2 pl-4 mt-4">
                        <li><strong>Same Driver & Vehicle:</strong> Enjoy consistency and reliability.</li>
                        <li><strong>Fixed Pricing:</strong> Transparent charges for both trips.</li>
                        <li><strong>Flexible Scheduling:</strong> Plan your pickup and drop times as needed.</li>
                    </ul>
                </Section>

                <Section title="Round Trip Packages">
                    <p>
                        We offer packages suitable for different needs, from airport transfers to day-long city tours.
                    </p>
                    <div className="mt-6 bg-blue-50 p-6 rounded-lg border border-blue-200">
                        <h3 className="font-bold text-xl text-blue-800">Packages starting from ₹999</h3>
                        <ul className="list-disc list-inside space-y-1 pl-4 mt-2 text-gray-600">
                            <li>City Sedan – ₹999 for 2-way within city</li>
                            <li>Small SUV – ₹1299 for 2-way within city</li>
                            <li>Large SUV – ₹1599 for 2-way within city</li>
                        </ul>
                    </div>
                </Section>

                <Section title="Zero Stress & Easy Rescheduling">
                    <ul className="list-disc list-inside space-y-2 pl-4">
                        <li>Reschedule anytime in case of delays.</li>
                        <li>No surge pricing during peak hours.</li>
                        <li>Quick support for any booking changes.</li>
                    </ul>
                </Section>

                <Section title="Real-time Trip Alerts">
                    <p>Stay informed throughout your round trip:</p>
                    <ul className="list-disc list-inside space-y-1 pl-4 mt-2">
                        <li><strong>Driver Assigned:</strong> Vehicle and driver details</li>
                        <li><strong>Driver En Route:</strong> Live tracking of your pickup</li>
                        <li><strong>Trip Start:</strong> Smooth boarding for the first leg</li>
                        <li><strong>Return Trip:</strong> Your driver will pick you up for the return journey</li>
                    </ul>
                </Section>

                <Section title="Upgrade to Premium Round Trip Experience">
                    <p>
                        Enhance your trip with luxury vehicles and priority scheduling:
                    </p>
                    <ul className="list-disc list-inside space-y-1 pl-4 mt-2">
                        <li>Luxury & premium vehicles</li>
                        <li>Unlimited kilometers within city limits</li>
                        <li>Priority allocation and scheduling</li>
                        <li>Dedicated support for your round trips</li>
                    </ul>
                </Section>
            </div>

            <Footer />
        </div>
    );
};

export default RoundTripPage;
