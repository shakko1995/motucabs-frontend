import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, MapPin, Route, Clock, ConciergeBell, Handshake, CalendarPlus } from 'lucide-react';

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

const ServiceCard = ({ icon, title, description, link }) => {
    const navigate = useNavigate();
    return (
        <div 
            onClick={() => link && navigate(link)} 
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
        >
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
        </div>
    );
};

const ServicesPage = () => {
    const services = [
        { icon: <Plane size={32} />, title: "Airport Transfers", description: "Reliable, on-time pickups and drops for all major airports.", link: "/airport-transfers" },
        { icon: <MapPin size={32} />, title: "Point to Point", description: "Direct, hassle-free travel from your location to any destination.", link: "/point-to-point" },
        { icon: <Route size={32} />, title: "Planned Itineraries", description: "Customizable multi-day and multi-city travel plans.", link: "/itineraries" },
        { icon: <Clock size={32} />, title: "Hourly Service", description: "Book a cab for a few hours for flexible city travel.", link: "/hourly-service" },
        { icon: <ConciergeBell size={32} />, title: "Concierge Service", description: "Premium assistance for all your travel needs and planning.", link: "/concierge" },
        { icon: <Handshake size={32} />, title: "Meet and Assist", description: "Personalized assistance service at airports and stations.", link: "/meet-and-assist" },
        { icon: <CalendarPlus size={32} />, title: "Event Solutions", description: "Comprehensive transportation solutions for your events.", link: "/event-solutions" },
    ];

    return (
        <div className="bg-gray-50">
            <Header />
            
            <div className="max-w-5xl mx-auto px-6 py-20 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
                    Our Services
                </h1>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    We offer a wide range of chauffeur-driven services to cater to all your travel needs, ensuring a seamless and comfortable journey every time.
                </p>
            </div>

            <div className="max-w-6xl mx-auto px-6 pb-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map(service => (
                        <ServiceCard key={service.title} {...service} />
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ServicesPage;