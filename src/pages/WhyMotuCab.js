import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Reusable Header & Footer Components
const Header = () => { /* ... Your Header Component ... */ };
const Footer = () => (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-8 py-12">
            <div className="text-center mb-8">
                <div className="text-3xl font-bold mb-4">
                    <span className="text-blue-400">Motu</span><span className="text-orange-400">Cab</span>
                </div>
                <p className="text-gray-300 max-w-2xl mx-auto">Your trusted partner for reliable, comfortable, and affordable travel across India.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8 text-sm">
                <a href="/" className="text-gray-300 hover:text-blue-400 transition-colors">Home</a>
                <a href="/about" className="text-gray-300 hover:text-blue-400 transition-colors">About Us</a>
                <a href="/contact" className="text-gray-300 hover:text-blue-400 transition-colors">Contact</a>
                <a href="/privacy-policy" className="text-gray-300 hover:text-blue-400 transition-colors">Privacy Policy</a>
                <a href="/terms-and-conditions" className="text-gray-300 hover:text-blue-400 transition-colors">Terms & Conditions</a>
            </div>
            <div className="border-t border-gray-700 pt-8 text-center">
                <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} MotuCab Technologies Pvt. Ltd. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
);


const WhyMotuCab = () => {
    const navigate = useNavigate();

    const popularRoutes = [
        { name: "Delhi to Jaipur", path: "/book-taxi/delhi-jaipur" },
        { name: "Jaipur to Delhi", path: "/book-taxi/jaipur-delhi" },
        { name: "Delhi to Haridwar", path: "/book-taxi/delhi-haridwar" },
        // ... add more popular routes as needed
    ];

    return (
        <div className="bg-white">
            <Header />

            {/* Hero Section with Banner */}
            <div className="relative bg-gray-800 text-white">
                <img 
                    src="https://img.freepik.com/free-photo/beautiful-girl-standing-road-looking-mountains-concept-wanderlust_1150-11108.jpg" 
                    alt="Woman with luggage looking at mountains"
                    className="w-full h-80 object-cover opacity-30"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="max-w-4xl text-center px-4">
                        <h1 className="text-4xl font-extrabold mb-4">We have the largest outstation taxi network in India.</h1>
                        <h2 className="text-2xl font-semibold text-yellow-400">Get great rates for your travel with MotuCab</h2>
                    </div>
                </div>
            </div>
            
            <div className="max-w-4xl mx-auto px-4 py-16">
                <div className="prose max-w-none text-slate-700 leading-relaxed">
                    <p>Our mission is to simplify outstation road travel anywhere in India. 'Motu' means 'delight and joy'! We started MotuCab because we felt that there was a need to make outstation road travel in India 'delightful'.</p>
                    
                    <h2 className="font-bold text-2xl mt-8">We know what you want when you book an outstation taxi -</h2>
                    <p>You want reliable transportation in an AC cab. You want it everywhere, not just in the major metros like Delhi, Mumbai, Bengaluru, Hyderabad, Chennai or Kolkata.</p>
                    <p>While its common to haggle in India - most of us don't like to bargain.</p>
                    <p>You don't want guesswork. You simply want to book with one company and let them find you a taxi that meets your budget and needs.</p>
                    
                    <h3 className="font-bold text-xl mt-8">At MotuCab, we're bringing you just what you need.</h3>
                    <p>MotuCab is the easiest way to book and enjoy a chauffeur-driven road trip at the right price all over India. At MotuCab, we're making it -</p>
                    <ul className="space-y-4 mt-4">
                        <li><strong>CONVENIENT</strong> - Book one-way outstation trips, round-trip journeys, hourly car rental packages, airport pick and drop service or multi-city packaged itineraries with MotuCab.</li>
                        <li><strong>EASY TO RENT</strong> - We're on the web, on your mobile phone.</li>
                        <li><strong>AVAILABLE ALL OVER INDIA</strong> - Travel from or to over 1000 towns and cities across India. We aim to provide the best service at a fair price. We may not be the cheapest but we strive to be the best.</li>
                        <li><strong>BARGAIN-FREE PRICING</strong> - Since you don't like to bargain and haggle, We don't. Your price and payment terms are clearly listed on your booking confirmation. Extra kms are billed separately. Payment terms for parking, tolls and taxes are also clearly stated.</li>
                        <li><strong>QUALITY SERVICE</strong> - We do our part to ensure that the taxi operator will provide good service and honour time commitments.</li>
                        <li><strong>ALWAYS IMPROVING</strong> - We ask you to review our driver, car and customer service for every trip. Please tell us and be very frank. We take your input seriously and are working to get better every day.</li>
                    </ul>
                    
                    <p className="mt-8">We also make it clear that we're a technology based marketplace. We're not a taxi service operator. We work with taxi operators who will serve your trip and want your business.</p>
                    <p>Because we work with these operators more regularly than you would, they tend to pay more attention to our requests and comply with the requirements we set forth. Our goal is simple. To serve you better than anyone else can in India. And we do that by bringing you the best prices, quality services and great support.</p>

                    <p className="mt-8">So Dear friend, if you need to travel outstation just remember our mantra...</p>
                    <p className="font-bold text-lg text-center mt-4">"idhar udhar kyu khojo, just get a Motu!"</p>
                </div>
            </div>

            <div className="bg-blue-50 py-12">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Popular outstation cab routes</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3 text-blue-600 font-semibold">
                         {popularRoutes.map((route, i) => (
                            <Link to={route.path} key={i} className="hover:underline">&gt; {route.name}</Link>
                         ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default WhyMotuCab;