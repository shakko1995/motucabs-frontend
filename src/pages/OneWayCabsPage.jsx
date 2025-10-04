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

const OneWayCabsPage = () => {
    return (
        <div className="bg-white">

            {/* Full-width Ride Booking Form at the top */}
            <RideBookingForm />

            {/* Banner with text below the form */}
            <div className="relative bg-gray-50 py-20">
                <img 
                    src="https://images.unsplash.com/photo-1563720227177-0a349c9e1d06?w=1600"
                    alt="One Way Cabs Banner"
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                <div className="relative max-w-5xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        One Way Cabs – Comfortable, Affordable, and Punctual
                    </h2>
                    <p className="text-lg text-gray-600">
                        Book your one-way ride across cities with ease and reliability. Perfect for business or personal trips.
                    </p>
                </div>
            </div>

            {/* Content Sections */}
            <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
                <Section title="Why Choose Our One Way Cabs?">
                    <p>
                        Our one-way cab service is designed to give you flexibility and peace of mind. Travel across cities without worrying about return trips or hidden costs.
                    </p>
                    <ul className="list-disc list-inside space-y-2 pl-4 mt-4">
                        <li><strong>Transparent Pricing:</strong> No hidden charges, pay for exactly what you travel.</li>
                        <li><strong>Professional Drivers:</strong> Safe and courteous drivers for a stress-free journey.</li>
                        <li><strong>Flexible Booking:</strong> Book at any time, any city, for your convenience.</li>
                    </ul>
                </Section>

                <Section title="Affordable One Way Packages">
                    <p>
                        We offer competitive pricing for all types of vehicles. Choose a package based on your travel distance and vehicle preference.
                    </p>
                    <div className="mt-6 bg-blue-50 p-6 rounded-lg border border-blue-200">
                        <h3 className="font-bold text-xl text-blue-800">Packages starting from ₹599</h3>
                        <ul className="list-disc list-inside space-y-1 pl-4 mt-2 text-gray-600">
                            <li>Up to 15km in a sedan – ₹599</li>
                            <li>Up to 15km in a small SUV – ₹799</li>
                            <li>Up to 15km in a large SUV – ₹999</li>
                        </ul>
                    </div>
                </Section>

                <Section title="Zero Stress & Easy Rescheduling">
                    <ul className="list-disc list-inside space-y-2 pl-4">
                        <li>Cancel or reschedule anytime with ease.</li>
                        <li>No surge pricing, even during peak hours.</li>
                        <li>Quick support for any travel changes.</li>
                    </ul>
                </Section>

                <Section title="Real-time Ride Alerts">
                    <p>Get updates at every stage of your trip:</p>
                    <ul className="list-disc list-inside space-y-1 pl-4 mt-2">
                        <li><strong>Car Allocated:</strong> Vehicle details and photos</li>
                        <li><strong>Driver En Route:</strong> Live tracking</li>
                        <li><strong>ETA Updates:</strong> Know your pickup time accurately</li>
                        <li><strong>Trip Completed:</strong> Smooth drop-off and feedback request</li>
                    </ul>
                </Section>

                <Section title="Upgrade for Premium One Way Experience">
                    <p>
                        Want more comfort? Upgrade to our premium service and enjoy:
                    </p>
                    <ul className="list-disc list-inside space-y-1 pl-4 mt-2">
                        <li>Priority allocation of luxury vehicles</li>
                        <li>Flat-rate pricing for long distances</li>
                        <li>Dedicated travel assistance & support</li>
                        <li>Special discounts for frequent travelers</li>
                    </ul>
                </Section>
            </div>

            <Footer />
        </div>
    );
};

export default OneWayCabsPage;
