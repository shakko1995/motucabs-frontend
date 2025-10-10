import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plane, User, Briefcase, Star, Clock } from 'lucide-react'; // Corrected icon imports

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
        <h2 className="text-3xl font-bold text-gray-800 mb-6">{title}</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
            {children}
        </div>
    </motion.div>
);

const FeatureItem = ({ icon: Icon, title, children }) => (
    <div className="flex gap-4 items-start">
        <Icon className="w-6 h-6 text-blue-500 mt-1" />
        <div>
            <h4 className="font-semibold text-gray-800">{title}</h4>
            <p className="text-gray-600">{children}</p>
        </div>
    </div>
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
                        Meet & Assist
                    </motion.h1>
                    <motion.p 
                        className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Personalized Airport Concierge Services for Effortless Travel
                    </motion.p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-16 space-y-12">
                <Section title="Premium Airport Assistance">
                    <p>
                        Traveling through busy airports can be overwhelming. Motu Cabs’ Meet & Assist services ensure a smooth, stress-free, and truly premium experience from arrival to departure.
                    </p>
                    <FeatureItem icon={Plane} title="Meet & Greet Assistance">
                        Dedicated airport representative meets you at the terminal or gate, assisting with check-in, baggage, and navigation through airport processes.
                    </FeatureItem>
                    <FeatureItem icon={Briefcase} title="Porter & Luggage Handling">
                        Professional porters manage your luggage from curbside to check-in or baggage claim, ideal for families, elderly travelers, and executives.
                    </FeatureItem>
                    <FeatureItem icon={Clock} title="Transit & Short Layover Support">
                        For tight schedules or connecting flights, seamless coordination ensures you reach your gate without stress.
                    </FeatureItem>
                    <FeatureItem icon={Star} title="VIP Concierge & Fast-Track">
                        Exclusive services including priority check-in, lounge access, and fast-track immigration for high-end travelers.
                    </FeatureItem>
                    <FeatureItem icon={User} title="Customizable Packages">
                        Fully tailored packages for business or leisure travelers, ensuring a personalized and hassle-free airport experience.
                    </FeatureItem>
                </Section>

                <Section title="Nationwide Airport Coverage">
                    <p>
                        Meet & Assist services are available at major airports across India, including:
                    </p>
                    <ul className="list-disc list-inside pl-4 space-y-2">
                        <li>Delhi (DEL)</li>
                        <li>Mumbai (BOM)</li>
                        <li>Bengaluru (BLR)</li>
                        <li>Chennai (MAA)</li>
                        <li>Hyderabad (HYD)</li>
                        <li>Kolkata (CCU)</li>
                        <li>Pune (PNQ)</li>
                        <li>Coimbatore (CJB)</li>
                        <li>Visakhapatnam (VTZ)</li>
                        <li>…and more across India</li>
                    </ul>
                </Section>

                <Section title="Why Choose Motu Cabs Meet & Assist?">
                    <ul className="list-disc list-inside pl-4 space-y-3">
                        <li>✅ Hassle-free travel experience with door-to-gate assistance</li>
                        <li>✅ Ideal for corporate executives, senior citizens, VIPs, and international travelers</li>
                        <li>✅ Trained professionals ensuring discretion, security, and comfort</li>
                        <li>✅ 24/7 support for flight tracking, coordination, and last-minute requests</li>
                        <li>✅ Combine with Motu Cabs’ chauffeur services for complete end-to-end travel convenience</li>
                    </ul>
                </Section>

                <Section title="Elevate Your Airport Experience">
                    <p>
                        With Motu Cabs Meet & Assist, you don’t just travel — you glide through the airport with ease. Let us handle the details, so you can focus on what truly matters — your journey ahead.
                    </p>
                </Section>
            </div>

            <Footer />
        </div>
    );
};

export default MeetAndAssistPage;
