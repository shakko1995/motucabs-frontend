import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Phone, Airplay, Repeat, Star, Clock, MessageCircle, User,Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

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
                <a href="/" className="hover:text-blue-600">Home</a> • 
                <a href="/about" className="hover:text-blue-600">About us</a> • 
                <a href="/faq" className="hover:text-blue-600">Faq's</a> • 
                <a href="/contact" className="hover:text-blue-600">Contact us</a> • 
                <a href="/careers" className="hover:text-blue-600">Careers</a> • 
                <a href="/terms-and-conditions" className="hover:text-blue-600">Terms & Conditions</a>
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
        <h2 className="text-3xl font-bold text-gray-800 mb-6">{title}</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
            {children}
        </div>
    </motion.div>
);

const CheckListItem = ({ icon, children }) => (
    <li className="flex items-start gap-3">
        {icon}
        <span>{children}</span>
    </li>
);

const ConciergePage = () => {
    return (
        <div className="bg-white">
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
                        Motu Concierge Service
                    </motion.h1>
                    <motion.p 
                        className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Your Journey, Elevated — Personalized, Effortless, and Worry-Free
                    </motion.p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-16 space-y-12">

                {/* What is Motu Concierge */}
                <Section title="What Is Motu Concierge?">
                    <p>
                        At Motu Cabs, we believe travel is more than just a ride — it’s a curated experience that should be smooth, dependable, and memorable.
                    </p>
                    <p>
                        Motu Concierge is your personal travel assistant, offering end-to-end support before, during, and after your trip. Our concierges handle everything from bookings, restaurant suggestions, exclusive experiences, to last-minute itinerary adjustments, ensuring that you always have expert help — anytime, anywhere.
                    </p>
                    <p>
                        You focus on the experience. We’ll handle the rest.
                    </p>
                </Section>

                {/* Travel Across India */}
                <Section title="Designed for Effortless Travel Across India">
                    <p>
                        India’s diversity makes it one of the world’s most rewarding yet complex destinations to explore. From urban metros to hidden heritage towns, our nationwide network and local expertise ensure a smooth, worry-free journey — no matter where the road takes you.
                    </p>
                </Section>

                {/* Why Choose Motu Concierge */}
                <Section title="Why Choose Motu Concierge">
                    <ul className="space-y-4">
                        <CheckListItem icon={<Check size={20} className="text-green-500 mt-1 flex-shrink-0"/>}>
                            Nationwide Coverage, Single Trusted Platform — Book confidently anywhere in India through one verified network of vehicles and professional chauffeurs.
                        </CheckListItem>
                        <CheckListItem icon={<User size={20} className="text-blue-500 mt-1 flex-shrink-0"/>}>
                            Dedicated Concierge Support — Your personal concierge helps with itineraries, dining, accommodations, and adjustments tailored to your preferences.
                        </CheckListItem>
                        <CheckListItem icon={<Clock size={20} className="text-yellow-500 mt-1 flex-shrink-0"/>}>
                            Transparent & Reliable — Enjoy fair pricing, flexible bookings, and round-the-clock support with zero hidden charges.
                        </CheckListItem>
                        <CheckListItem icon={<Star size={20} className="text-purple-500 mt-1 flex-shrink-0"/>}>
                            Local Experts, Global Standards — Our chauffeurs double as local guides, helping you uncover authentic experiences safely and respectfully.
                        </CheckListItem>
                        <CheckListItem icon={<Rocket size={20} className="text-red-500 mt-1 flex-shrink-0"/>}>
                            Comfort and Peace of Mind — With GPS tracking, flight monitoring, and real-time ride updates, we keep your travel smooth and secure.
                        </CheckListItem>
                    </ul>
                </Section>

                {/* Concierge Benefits */}
                <Section title="Concierge Benefits You’ll Love">
                    <ul className="space-y-3">
                        <CheckListItem icon={<Phone size={20} className="text-blue-500 mt-1 flex-shrink-0"/>}>
                            On-Call Assistance — Connect via WhatsApp, call, or in-app chat anytime.
                        </CheckListItem>
                        <CheckListItem icon={<Airplay size={20} className="text-blue-500 mt-1 flex-shrink-0"/>}>
                            Pre-Scheduled Rides — Drivers arrive early to ensure on-time departures.
                        </CheckListItem>
                        <CheckListItem icon={<Airplay size={20} className="text-blue-500 mt-1 flex-shrink-0"/>}>
                            Flight Tracking — Automatic sync with your flight schedule.
                        </CheckListItem>
                        <CheckListItem icon={<MessageCircle size={20} className="text-blue-500 mt-1 flex-shrink-0"/>}>
                            Real-Time Notifications — Instant updates on trip and driver status.
                        </CheckListItem>
                        <CheckListItem icon={<Repeat size={20} className="text-blue-500 mt-1 flex-shrink-0"/>}>
                            Flexible Cancellations — Cancel anytime before dispatch with no penalty.
                        </CheckListItem>
                        <CheckListItem icon={<Star size={20} className="text-yellow-500 mt-1 flex-shrink-0"/>}>
                            Double Loyalty Points — Earn 2x Motu Points on every concierge trip.
                        </CheckListItem>
                        <CheckListItem icon={<Clock size={20} className="text-purple-500 mt-1 flex-shrink-0"/>}>
                            Priority Customer Support — Your requests always go to the front of the line.
                        </CheckListItem>
                        <CheckListItem icon={<User size={20} className="text-pink-500 mt-1 flex-shrink-0"/>}>
                            Multi-Language Assistance — Concierge support in your preferred language.
                        </CheckListItem>
                        <CheckListItem icon={<Repeat size={20} className="text-green-500 mt-1 flex-shrink-0"/>}>
                            Unlimited Requests — Get help anytime during your journey, without limits.
                        </CheckListItem>
                    </ul>
                </Section>

                {/* How it works */}
                <Section title="How It Works">
                    <ol className="list-decimal list-inside space-y-2 pl-4">
                        <li>Choose Your Plan — Subscribe monthly or pay per trip.</li>
                        <li>Access Instantly — Connect via WhatsApp, call, or chat in-app.</li>
                        <li>Get Personalized Support — Your concierge manages all travel details.</li>
                        <li>Travel Confidently — Enjoy seamless experiences, every time.</li>
                    </ol>
                </Section>

                {/* Subscription Details */}
                <Section title="Subscription Details">
                    <ul className="list-disc list-inside space-y-2 pl-4">
                        <li>Activated immediately and valid for 30 days.</li>
                        <li>Auto-renews monthly (cancel anytime).</li>
                        <li>If canceled after using the service, receive equivalent value as a Motu Wallet Coupon for future bookings.</li>
                        <li>If canceled without usage, a pro-rated wallet coupon based on remaining days is issued.</li>
                        <li>Wallet coupons never expire and can be applied toward any future Motu Cabs trip.</li>
                        <li>Try it risk-free — your first month is free!</li>
                    </ul>
                </Section>

                {/* Who Can Access */}
                <Section title="Who Can Access Motu Concierge?">
                    <ul className="list-disc list-inside space-y-2 pl-4">
                        <li>Available for all registered Motu travelers.</li>
                        <li>Operates daily from 8:00 AM to 10:00 PM IST.</li>
                        <li>The first available concierge responds immediately.</li>
                        <li>Wherever possible, the same concierge is assigned for ongoing trips to maintain continuity.</li>
                    </ul>
                </Section>

                {/* How to Get Started */}
                <Section title="How to Get Started">
                    <ul className="list-disc list-inside space-y-2 pl-4">
                        <li>Already booked a trip? Add Concierge Service at checkout.</li>
                        <li>Want full-time access? Subscribe directly via your Motu account or app.</li>
                        <li>Friends and family of Motu partners enjoy complimentary concierge access.</li>
                    </ul>
                </Section>

                {/* Important Notes */}
                <Section title="Important Notes">
                    <ul className="list-disc list-inside space-y-2 pl-4">
                        <li>Concierge applies exclusively to Motu-booked trips.</li>
                        <li>Expansion to additional services and partner experiences coming soon.</li>
                        <li>Canceled subscriptions used for less than one month can be restarted after 3 months.</li>
                    </ul>
                </Section>

            </div>

            <Footer />
        </div>
    );
};

export default ConciergePage;
