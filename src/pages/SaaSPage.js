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
        <CheckCircle size={20} className="text-blue-500 mt-1 flex-shrink-0" />
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
                    {/* <p className="text-blue-600 font-semibold mb-2">SaaS</p> */}
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
                        Motu SaaS Solutions for Cab & Mobility Businesses
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        A Game-Changer for the Future of Transportation
                    </p>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="max-w-4xl mx-auto px-6 py-16">

                <Section title="Why Choose the Motu SaaS Platform?">
                    <p>The Motu SaaS taxi management system offers a plug-and-play model that’s simple to deploy and powerful to run. Within days, your business can integrate a smart booking, dispatch, tracking, and payment ecosystem—eliminating the need for custom development or expensive IT setups.
                    </p>
                    <p>
                        From startups to enterprise fleet operators, everyone can now access enterprise-grade technology and stay competitive in a fast-moving mobility market.
                    </p>
                </Section>

                <Section title="Key Benefits of Motu SaaS for Cab Businesses">
                    <ul className="space-y-3">
                        <BulletPoint>
                            <strong>Cost-Effective and Scalable:</strong> Subscription-based model with no large upfront investment.No need for dedicated IT teams, servers, or manual updates.Scales seamlessly as your business, fleet, and service areas grow.
                        </BulletPoint>
                        <BulletPoint>
                            <strong>Fast & Easy Deployment:</strong> Ready-to-use taxi dispatch system deployable in just days, not months.Integrates effortlessly with your website, mobile apps, and third-party APIs (payments, maps, messaging tools). Minimal customization needed—simply plug in your branding and go live.
                        </BulletPoint>
                        <BulletPoint>
                            <strong>Smart Dispatch & Route Optimization:</strong> AI-powered auto-dispatch system matches the nearest drivers with ride requests instantly. Real-time GPS tracking ensures optimized routes and reduced fuel costs. Predictive analytics help anticipate demand and adjust fleet availability automatically.
                        </BulletPoint>
                        <BulletPoint>
                            <strong>Multiple Payment & Billing Options:</strong> Accepts UPI, debit/credit cards, net banking, digital wallets, and corporate billing. Automated fare calculation and transparent billing for a smooth user experience. Generates invoices instantly for customers and corporate accounts.
                        </BulletPoint>
                        <BulletPoint>
                            <strong>Customer-Focused Experience:</strong> Simple, intuitive booking platforms for both web and mobile users. Supports one-way, round-trip, hourly rentals, and airport transfers. Real-time notifications via SMS, WhatsApp, email, or app alerts. Built-in feedback and rating systems  to ensure consistent service quality.
                        </BulletPoint>
                        <BulletPoint>
                            <strong>Business Intelligence & Analytics:</strong> AI-driven insights to track performance, customer demand, and earnings. Live fleet dashboards for complete operational visibility. Predictive analytics for smarter pricing and improved driver utilization.
                        </BulletPoint>
                    </ul>
                </Section>

                <Section title="How Motu SaaS Works?">
                    <p> The Motu SaaS Solution is a complete, all-in-one taxi management ecosystem that includes everything you need to operate efficiently and scale confidently:</p>
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">White-Label Booking Platform</h3>
                        <ul className="list-disc list-inside space-y-1 pl-4">
                            <li>Fully branded taxi booking portal customized for your business.</li>
                            <li>Customer apps for Android and iOS, featuring your own brand identity.</li>
                            <li>Instant customer-driver connectivity with real-time updates.</li>
                        </ul>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Admin Dashboard & Fleet Management</h3>
                        <ul className="list-disc list-inside space-y-1 pl-4">
                            <li>Monitor trips, ride history, and driver performance in real time.</li>
                            <li>Adjust pricing, manage promotions, and assign rides dynamically.</li>
                            <li>* Gain full operational control with easy-to-use analytics tools.</li>
                        </ul>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Driver App for Smooth Operations</h3>
                        <ul className="list-disc list-inside space-y-1 pl-4">
                            <li>GPS and navigation-enabled app for optimized pick-ups and drop-offs.</li>
                            <li>Digital fare calculations and payment settlements built-in.</li>
                            <li> Driver incentive and earnings dashboard for motivation and transparency.</li>
                        </ul>
                    </div>
                     <div className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">AI-Powered Dispatch Engine</h3>
                        <ul className="list-disc list-inside space-y-1 pl-4">
                            <li>Smart ride allocation based on proximity, driver ratings, and traffic patterns.</li>
                            <li>Dynamic surge pricing to maximize efficiency during high-demand periods.</li>
                            <li>Instant alerts and automated ride assignment ensure zero downtime.</li>
                        </ul>
                    </div>
                </Section>

                 <Section title="Accelerate Your Taxi Business with Motu SaaS">
                    <p>Whether you’re managing a small fleet or scaling across multiple cities, Motu SaaS gives you the tools, technology, and insights to build a modern, efficient, and profitable cab business.
                    </p>
                    <p>
                        Join the digital mobility revolution with Motu’s SaaS platform—fast to deploy, easy to scale, and built for India’s growing transportation ecosystem.
                    </p>
                    <p>Contact our B2B team today for a demo or consultation.</p>
                </Section>
            </div>

            <Footer />
        </div>
    );
};

export default SaaSPage;