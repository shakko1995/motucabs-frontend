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

const DayRentalPage = () => {
    return (
        <div className="bg-white">

            {/* Full-width Ride Booking Form at the top */}
            <RideBookingForm />

            {/* Banner with text below the form */}
            <div className="relative bg-gray-50 py-20">
                <img 
                    src="https://images.unsplash.com/photo-1571607385818-cc38b0a9b17c?w=1600"
                    alt="Day Rental Banner"
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                <div className="relative max-w-5xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Day Rentals – Flexible, Convenient, and Affordable
                    </h2>
                    <p className="text-lg text-gray-600">
                        Book a car for the entire day with ease. Perfect for sightseeing, business trips, or personal errands.
                    </p>
                </div>
            </div>

            {/* Content Sections */}
            <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
                <Section title="Why Choose Our Day Rentals?">
                    <p>
                        Our day rental service gives you the freedom to use the car for an entire day, with transparent pricing and professional drivers for a worry-free experience.
                    </p>
                    <ul className="list-disc list-inside space-y-2 pl-4 mt-4">
                        <li><strong>Flexible Timing:</strong> Use the car for the whole day, no rush.</li>
                        <li><strong>Professional Drivers:</strong> Experienced drivers to make your day smooth.</li>
                        <li><strong>Transparent Pricing:</strong> No hidden fees, pay only for what you need.</li>
                    </ul>
                </Section>

                <Section title="Affordable Day Rental Packages">
                    <p>
                        Choose from different vehicles according to your needs. Our packages are designed to be affordable and convenient.
                    </p>
                    <div className="mt-6 bg-blue-50 p-6 rounded-lg border border-blue-200">
                        <h3 className="font-bold text-xl text-blue-800">Packages starting from ₹1499/day</h3>
                        <ul className="list-disc list-inside space-y-1 pl-4 mt-2 text-gray-600">
                            <li>Sedan – ₹1499 for 8 hours / 80km</li>
                            <li>Small SUV – ₹1799 for 8 hours / 80km</li>
                            <li>Large SUV – ₹2099 for 8 hours / 80km</li>
                        </ul>
                    </div>
                </Section>

                <Section title="Zero Stress & Easy Extensions">
                    <ul className="list-disc list-inside space-y-2 pl-4">
                        <li>Extend your rental easily if you need more hours.</li>
                        <li>No surge pricing for peak hours.</li>
                        <li>Quick customer support for any day rental changes.</li>
                    </ul>
                </Section>

                <Section title="Real-time Ride Alerts">
                    <p>Get updates at every stage of your day rental:</p>
                    <ul className="list-disc list-inside space-y-1 pl-4 mt-2">
                        <li><strong>Car Allocated:</strong> Vehicle details and photos</li>
                        <li><strong>Driver En Route:</strong> Live tracking</li>
                        <li><strong>Start of Rental:</strong> Confirm pickup and enjoy your day</li>
                        <li><strong>End of Rental:</strong> Smooth drop-off and feedback request</li>
                    </ul>
                </Section>

                <Section title="Upgrade to Premium Day Rental Experience">
                    <p>
                        Want more luxury? Upgrade to our premium service and enjoy:
                    </p>
                    <ul className="list-disc list-inside space-y-1 pl-4 mt-2">
                        <li>Luxury and premium vehicles</li>
                        <li>Unlimited kilometers within city limits</li>
                        <li>Priority allocation and scheduling</li>
                        <li>Dedicated support for all your day rental trips</li>
                    </ul>
                </Section>
            </div>

            <Footer />
        </div>
    );
};

export default DayRentalPage;
