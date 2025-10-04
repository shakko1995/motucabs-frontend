

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

const AirportTransfersPage = () => {
    return (
        <div className="bg-white">

            {/* Full-width Ride Booking Form at the top */}
            <RideBookingForm />

            {/* Banner with text below the form */}
            <div className="relative bg-gray-50 py-20">
                <img 
                    src="https://images.unsplash.com/photo-1579046929826-58b7de0f3585?w=1600"
                    alt="Airport Transfer Banner"
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                <div className="relative max-w-5xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Gozo Airport Transfers – Dependable, Comfortable, and Affordable
                    </h2>
                    <p className="text-lg text-gray-600">
                        The Smart Way to Get To & From the Airport all over India
                    </p>
                </div>
            </div>

            {/* Content Sections */}
            <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
                <Section title="Why Choose Gozo for Airport Transfers?">
                    <p>
                        We extend our heartfelt thanks to each of you for your service and the sacrifices you've made. To show our appreciation, Gozo is proud to offer special privileges to members of the Armed Forces, Veterans, and their families, making it easier for you to enjoy reliable, safe, and comfortable travel.
                    </p>
                    <ul className="list-disc list-inside space-y-2 pl-4 mt-4">
                        <li><strong>Pre-Scheduled Rides:</strong> Book in advance and travel with peace of mind.</li>
                        <li><strong>Be in the know, always:</strong> We'll notify you when your car is allocated.</li>
                    </ul>
                </Section>

                <Section title="Introducing the Gozo Airport Transfer Subscription">
                    <p>
                        Perfect for frequent travelers, business executives, and professionals, our subscription service makes airport transfers affordable, predictable, and hassle-free.
                    </p>
                    <div className="mt-6 bg-blue-50 p-6 rounded-lg border border-blue-200">
                        <h3 className="font-bold text-xl text-blue-800">Just ₹300/month. As a subscriber you get...</h3>
                        <p className="mt-2 font-semibold text-lg text-gray-700">Seriously discounted, Flat-Rate Airport Transfers</p>
                        <ul className="list-disc list-inside space-y-1 pl-4 mt-2 text-gray-600">
                            <li>₹799 for up to 15km in a sedan</li>
                            <li>₹999 for up to 15km in a small SUV</li>
                            <li>₹1199 for up to 15km in a larger SUV</li>
                        </ul>
                    </div>
                </Section>

                <Section title="Zero Stress & 100% Refundable Credits">
                    <ul className="list-disc list-inside space-y-2 pl-4">
                        <li>Free cancellations anytime.</li>
                        <li>Get a 100% of your money as a refund in Gozo credits for future rides.</li>
                        <li>Never ever pay surge pricing again!</li>
                    </ul>
                </Section>

                <Section title="Of course, you get complimentary Trip Alerts">
                    <p>Receive real-time updates at every stage of your journey:</p>
                    <ul className="list-disc list-inside space-y-1 pl-4 mt-2">
                        <li><strong>Car Allocated</strong> – Get vehicle details & pictures</li>
                        <li><strong>Driver En Route</strong> – Live tracking available</li>
                        <li><strong>ETA Updates</strong> – Know exactly when to expect pickup</li>
                        <li><strong>Arrival Notification</strong> – No last-minute confusion</li>
                    </ul>
                </Section>

                <Section title="Upgrade Anytime to Gozo Concierge">
                    <p>
                        Already love our service? <strong>Upgrade to Gozo Concierge for ₹1000/month</strong> and get:
                    </p>
                    <ul className="list-disc list-inside space-y-1 pl-4 mt-2">
                        <li>Unlimited Airport Transfers at flat rates</li>
                        <li>Priority access to premium vehicles</li>
                        <li>Our best Discounts always, no coupons needed</li>
                        <li>Dedicated travel assistance & planning for all your rides</li>
                    </ul>
                </Section>
            </div>

            <Footer />
        </div>
    );
};

export default AirportTransfersPage;

