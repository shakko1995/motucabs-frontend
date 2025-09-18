import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

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
    <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
            {children}
        </div>
    </div>
);

const BulletPoint = ({ children }) => (
    <li className="flex items-start gap-3">
        <CheckCircle size={20} className="text-blue-500 mt-1 flex-shrink-0"/>
        <span>{children}</span>
    </li>
);

const SaaSPage = () => {
    return (
        <div className="bg-white">
            <Header />
            
            {/* Hero Section */}
            <div className="bg-gray-50 border-b">
                <div className="max-w-5xl mx-auto px-6 py-20 text-center">
                    <p className="text-blue-600 font-semibold mb-2">SaaS</p>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
                        SaaS Solutions for Cab Transportation Businesses
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        A Game-Changer for your mobility business.
                    </p>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="max-w-4xl mx-auto px-6 py-16">
                
                <Section title="Why subscribe to our SaaS solution?">
                    <p>
                        Motu's SaaS-based dispatch and management software offer a plug-and-play model that reduces technical complexity while enhancing efficiency. Taxi businesses can integrate an advanced booking, dispatch, tracking, and payment system within a short time, eliminating the need for extensive custom development.
                    </p>
                    <p>
                        Some of the biggest players in the transportation market rely on cloud based solutions to streamline operations. By leveraging our SaaS solution, even small to mid-sized businesses can adopt a similar model and stay competitive.
                    </p>
                </Section>

                <Section title="Key Benefits of our SaaS solution">
                    <ul className="space-y-3">
                        <BulletPoint>
                            <strong>Cost-Effective and Scalable:</strong> Unlike traditional software, SaaS operates on a subscription-based model, significantly reducing upfront costs.
                        </BulletPoint>
                        <BulletPoint>
                            <strong>Faster Deployment:</strong> Our solution come with ready-to-use taxi dispatch systems that require minimal customization.
                        </BulletPoint>
                        <BulletPoint>
                            <strong>Automated Dispatch and Route Optimization:</strong> AI-powered auto-dispatching matches best bookings with supply instantly.
                        </BulletPoint>
                         <BulletPoint>
                            <strong>Multi-Payment and Billing Options:</strong> SaaS solutions integrate multiple payment methods, including Credit/Debit Cards, UPI & Digital Wallets, Net Banking, and Corporate Billing.
                        </BulletPoint>
                         <BulletPoint>
                            <strong>Customer-Centric Experience:</strong> User-friendly booking platforms for mobile and desktop.
                        </BulletPoint>
                    </ul>
                </Section>

                <Section title="How our SaaS Solution Works?">
                    <p>Gozo SaaS solution is an all-in-one taxi management system with the following core functionalities:</p>
                    
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">White-Label Taxi Booking Portal</h3>
                        <ul className="list-disc list-inside space-y-1 pl-4">
                            <li>Custom-branded apps with business-specific themes.</li>
                            <li>Available for Android and iOS platforms.</li>
                            <li>Seamless customer-driver connectivity.</li>
                        </ul>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Admin Dashboard & Fleet Management</h3>
                        <ul className="list-disc list-inside space-y-1 pl-4">
                            <li>Monitor real-time trip progress, driver availability, and ride history.</li>
                            <li>Optimize pricing and promotions dynamically.</li>
                            <li>Assign and schedule rides efficiently.</li>
                        </ul>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Driver App for Seamless Operations</h3>
                        <ul className="list-disc list-inside space-y-1 pl-4">
                            <li>Navigation-integrated driver apps for efficient pick-ups and drop-offs.</li>
                            <li>Digital fare calculation and payment settlements.</li>
                            <li>Incentive-based earning dashboards for drivers.</li>
                        </ul>
                    </div>
                </Section>
            </div>

            <Footer />
        </div>
    );
};

export default SaaSPage;