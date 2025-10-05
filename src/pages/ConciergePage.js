import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Rocket } from 'lucide-react';
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
                <a href="/contact" className="hover:text-blue-600">Careers</a> • 
                <a href="/terms-and-conditions" className="hover:text-blue-600">Terms and conditions</a>
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

const BulletPoint = ({ children }) => (
    <li className="flex items-start gap-3">
        <span className="text-blue-500 font-bold mt-1">•</span>
        <span>{children}</span>
    </li>
);

const CheckListItem = ({ children }) => (
     <li className="flex items-start gap-3">
        <Check size={20} className="text-green-500 mt-1 flex-shrink-0"/>
        <span>{children}</span>
    </li>
);


const ConciergePage = () => {
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
                        MotuCab Concierge Service
                    </motion.h1>
                    <motion.p 
                        className="mt-4 text-xl text-gray-600"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Your Journey, Made Effortless
                    </motion.p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-16">
                <Section title="What is Motu Concierge?">
                    <p>At Motu, travel is more than just getting from point A to B – it's about creating seamless, memorable experiences. With Motu Concierge, you gain a dedicated travel partner to make your journeys across India comfortable, dependable, and stress-free.</p>
                    <p>Our expert concierges assist you before, during, and after your trip, helping with:</p>
                     <ul className="list-disc list-inside space-y-2 pl-4">
                        <li>Booking and adjusting trips</li>
                        <li>Planning itineraries</li>
                        <li>Picking great places to eat</li>
                        <li>Organizing special experiences via trusted partners</li>
                    </ul>
                </Section>

                <Section title="We Designed Motu Concierge to Make Your Travels Across India Dependable, Comfortable and Memorable">
                    <p>Traveling across India offers unparalleled richness – from breathtaking geographic diversity and UNESCO heritage sites to vibrant cities, luxury retreats, Ayurveda wellness experiences, and an extraordinary culinary landscape.</p>
                    <ul className="space-y-3 mt-4">
                        <BulletPoint><strong>Nationwide Reach, Single Point of Service:</strong> Book confidently across India through a single trusted provider.</BulletPoint>
                        <BulletPoint><strong>Dedicated Concierge Support:</strong> A personal concierge assists you with itinerary adjustments and on-the-go travel changes.</BulletPoint>
                        <BulletPoint><strong>Transparency and Service Quality:</strong> Transparent pricing and 24x7x365 human support ensure there are no hidden surprises.</BulletPoint>
                    </ul>
                </Section>
                
                <Section title="Concierge Benefits You'll Love">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        <div>
                             <ul className="space-y-4">
                                <CheckListItem><strong>Available on-call:</strong> Message us via the app, tap a button for call back or simply whatsapp your concierge.</CheckListItem>
                                <CheckListItem><strong>We'll ping you before upcoming trips:</strong> Your concierge will ping you about your upcoming trips and check in.</CheckListItem>
                                <CheckListItem><strong>Pre-Scheduled Rides:</strong> Secure your rides in advance with precision timing – drivers typically arrive 10 minutes early.</CheckListItem>
                                <CheckListItem><strong>Flight Tracking:</strong> We monitor your flight for delays or early arrivals, ensuring your ride syncs perfectly.</CheckListItem>
                                <CheckListItem><strong>Flexible Cancellations:</strong> Cancel free up until your driver departs.</CheckListItem>
                            </ul>
                        </div>
                         <div className="flex justify-center">
                            <img src="https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/concierge_new.png" alt="Concierge Benefits" className="max-w-xs w-full" />
                        </div>
                    </div>
                </Section>

                <Section title="How It Works">
                    <ol className="list-decimal list-inside space-y-2 pl-4">
                        <li>Subscribe or Pay Per Trip</li>
                        <li>Access via WhatsApp, Call, or App Chat</li>
                        <li>Receive Instant, Personalized Support</li>
                        <li>Travel with Confidence!</li>
                    </ol>
                </Section>

                <Section title="Pricing">
                    <div className="overflow-x-auto border rounded-lg">
                        <table className="w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-4 text-left font-semibold">Plan</th>
                                    <th className="p-4 text-left font-semibold">Details</th>
                                    <th className="p-4 text-left font-semibold">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t">
                                    <td className="p-4 font-medium">Per Trip</td>
                                    <td className="p-4">Concierge service for one booking</td>
                                    <td className="p-4 font-bold">₹249</td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-4 font-medium">Monthly Subscription</td>
                                    <td className="p-4">Unlimited concierge service for all trips that month</td>
                                    <td className="p-4 font-bold">₹1000/month</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <ul className="list-disc list-inside text-sm text-gray-500 mt-4 pl-4 space-y-1">
                        <li>Subscription activates immediately and is valid for 30 days.</li>
                        <li>Auto-renews monthly but **cancel anytime** for a **prorated refund**.</li>
                        <li>Try it for free! Your first month is on us.</li>
                    </ul>
                </Section>

                 <Section title="Important Notes">
                    <ul className="list-disc list-inside space-y-2 pl-4">
                        <li>Concierge support currently applies **only to Motu-booked trips.**</li>
                        <li>Expansion to other services via partners is coming soon.</li>
                        <li>Cancelled subscriptions cannot be restarted for **3 months** if used for less than one month initially.</li>
                    </ul>
                </Section>
            </div>

            <Footer />
        </div>
    );
};

export default ConciergePage;