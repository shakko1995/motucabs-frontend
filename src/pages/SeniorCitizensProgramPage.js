import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Percent, Gift, Zap, UserCheck, UploadCloud, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

// Header
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

// Footer
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

const SeniorCitizensProgramPage = () => {
    const navigate = useNavigate();

    const handleJoinClick = () => {
        navigate('/login');
    };

    const benefits = [
        { icon: Percent, title: "10% Discount on All Motu Rides", text: "Automatically applied to every ride—no promo code needed." },
        { icon: Gift, title: "50% Off Motu Concierge Service", text: "Normally ₹1500/month, now just ₹750. Personalized assistance & priority support included." },
        { icon: Award, title: "Complimentary Cancellation Upgrade", text: "Flexible cancellation benefits at no extra cost—plans can change anytime." },
        { icon: Zap, title: "Double Motu Points", text: "Earn 2x rewards on all rides and redeem them for discounts or future benefits." }
    ];

    return (
        <div className="bg-white text-slate-800">
            <Header />
            
            {/* Hero */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b">
                <div className="max-w-5xl mx-auto px-6 py-24 text-center">
                    <motion.h1 
                        className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        MotuCab for Seniors
                    </motion.h1>
                    <motion.p 
                        className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Comfort, Care & Exclusive Rewards — specially crafted for your golden years.
                    </motion.p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-20">
                {/* Intro Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.7 }}
                    >
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">A Hassle-Free Travel Experience</h2>
                        <p className="text-slate-600 leading-relaxed">
                            At Motu Cabs, we believe every journey should be safe, comfortable, and stress-free. The Motu Senior Citizens Program ensures extra care, flexibility, and rewards for your trips.
                        </p>
                    </motion.div>
                    <motion.div 
                        className="flex justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.7 }}
                    >
                        <img 
                            src="https://img.freepik.com/free-vector/happy-elderly-couple-traveling-car_74855-10872.jpg?w=900" 
                            alt="Seniors enjoying a comfortable cab ride" 
                            className="rounded-lg shadow-xl w-full max-w-md"
                        />
                    </motion.div>
                </div>

                {/* Benefits */}
                <div className="mb-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Exclusive Benefits</h2>
                        <p className="mt-2 text-slate-600">As a valued member, you enjoy:</p>
                    </div>
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ staggerChildren: 0.2 }}
                    >
                        {benefits.map((perk, index) => (
                            <motion.div 
                                key={index} 
                                className="flex items-start gap-4 p-6 bg-white rounded-xl border border-slate-200 shadow-lg hover:border-orange-500 hover:shadow-xl transition-all"
                                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                            >
                                <div className="bg-orange-100 text-orange-600 p-3 rounded-full">
                                    <perk.icon size={24} className="flex-shrink-0"/>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-slate-800">{perk.title}</h3>
                                    <p className="text-slate-600 text-sm">{perk.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* How to Join */}
                <motion.div 
                    className="text-center bg-gradient-to-r from-orange-500 to-red-500 text-white p-12 rounded-2xl shadow-lg"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl font-extrabold mb-4">How to Enroll</h2>
                    <p className="mb-8 max-w-2xl mx-auto opacity-90">
                        If you are 60 years or older, you qualify for the Motu Senior Citizens Program.
                    </p>
                    <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        <div className="flex items-center gap-4">
                            <UserCheck size={32} className="flex-shrink-0"/>
                            <div>
                                <h3 className="font-semibold text-lg">1. Create Profile</h3>
                                <p className="opacity-80 text-sm">Sign up or log in to your Motu account.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <UploadCloud size={32} className="flex-shrink-0"/>
                            <div>
                                <h3 className="font-semibold text-lg">2. Verify Your Age</h3>
                                <p className="opacity-80 text-sm">Upload a valid government-issued ID (Aadhaar, PAN, Passport, etc.).</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Globe size={32} className="flex-shrink-0"/>
                            <div>
                                <h3 className="font-semibold text-lg">3. Activate Benefits</h3>
                                <p className="opacity-80 text-sm">Once approved, all senior benefits are auto-applied.</p>
                            </div>
                        </div>
                    </div>
                    <motion.button 
                        onClick={handleJoinClick} 
                        className="mt-10 bg-white text-orange-600 font-bold py-3 px-10 rounded-lg hover:bg-slate-100 shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Join Now
                    </motion.button>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
};

export default SeniorCitizensProgramPage;
