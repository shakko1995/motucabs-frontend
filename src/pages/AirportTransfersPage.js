import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Zap } from 'lucide-react';
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
            <Header />
            
            <div className="bg-gray-50 border-b">
                <div className="max-w-5xl mx-auto px-6 py-20 text-center">
                    <motion.h1 
                        className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Gozo Airport Transfers – Dependable, Comfortable, and Affordable
                    </motion.h1>
                    <motion.p 
                        className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        The Smart Way to Get To & From the Airport all over India
                    </motion.p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-16">
                <Section title="Why Choose Gozo for Airport Transfers?">
                    <p>
                        We extend our heartfelt thanks to each of you for your service and the sacrifices you've made. To show our appreciation, Gozo is proud to offer special privileges to members of the Armed Forces, Veterans, and their families, making it easier for you to enjoy reliable, safe, and comfortable travel. These benefits are designed to make your Gozo experience even better, and we hope they add a touch of comfort to your life.
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