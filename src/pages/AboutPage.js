import React, { useState, useEffect } from 'react';
import { ShieldCheck, HeartHandshake, Zap, Map, ThumbsUp, DollarSign, Globe, Star, Package, Route, Plane, Repeat, Users, Clock, MapPin, Award, TrendingUp, ChevronDown } from 'lucide-react';

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        let startTime;
        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }, [end, duration]);
    
    return <span>{count}{suffix}</span>;
};

// Header Component
const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <div className="text-2xl font-bold cursor-pointer transition-transform hover:scale-105" onClick={() => window.location.href = '/'}>
                    <span className="text-blue-600">Motu</span><span className="text-orange-500">Cab</span>
                </div>
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <a href="/business" className="text-gray-700 hover:text-blue-600 transition-colors relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-600 after:left-0 after:-bottom-1 after:transition-all hover:after:w-full">For Business</a>
                    <a href="/help-support" className="text-gray-700 hover:text-blue-600 transition-colors relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-600 after:left-0 after:-bottom-1 after:transition-all hover:after:w-full">Help & Support</a>
                </nav>
            </div>
        </header>
    );
};

// Footer Component
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

// Floating Particles Background
const FloatingParticles = () => {
    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 10
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map(particle => (
                <div
                    key={particle.id}
                    className="absolute w-2 h-2 bg-blue-500/20 rounded-full animate-bounce"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        animationDelay: `${particle.delay}s`,
                        animationDuration: `${particle.duration}s`
                    }}
                />
            ))}
        </div>
    );
};

// Main About Page Component
const AboutPage = () => {
    const [activeFeature, setActiveFeature] = useState(0);
    
    const features = [
        { 
            icon: <ThumbsUp size={40} className="text-blue-500"/>, 
            title: "EASY", 
            description: "A simple, convenient, and frictionless booking experience for all our customers.",
            color: "from-blue-500 to-cyan-500"
        },
        { 
            icon: <HeartHandshake size={40} className="text-emerald-500"/>, 
            title: "RELIABLE", 
            description: "Pre-book weeks ahead with confidence. Our tech ensures over 98% on-time service.",
            color: "from-emerald-500 to-green-500"
        },
        { 
            icon: <DollarSign size={40} className="text-yellow-500"/>, 
            title: "AFFORDABLE", 
            description: "With our price guarantee, customers get competitive market rates every time.",
            color: "from-yellow-500 to-orange-500"
        },
        { 
            icon: <ShieldCheck size={40} className="text-purple-500"/>, 
            title: "SAFE", 
            description: "Our drivers are pre-vetted and documented. Continuous feedback ensures quality service.",
            color: "from-purple-500 to-violet-500"
        },
        { 
            icon: <Globe size={40} className="text-indigo-500"/>, 
            title: "EVERYWHERE", 
            description: "We serve thousands of towns and cities. Just pin your location and we'll be there.",
            color: "from-indigo-500 to-blue-500"
        }
    ];

    const stats = [
        { icon: <Users size={32} />, value: 50000, suffix: "+", label: "Happy Customers" },
        { icon: <MapPin size={32} />, value: 1000, suffix: "+", label: "Cities Covered" },
        { icon: <Clock size={32} />, value: 98, suffix: "%", label: "On-Time Service" },
        { icon: <Award size={32} />, value: 5, suffix: "", label: "Years Experience" }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFeature(prev => (prev + 1) % features.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-white overflow-hidden">
            <Header />
            
            {/* Hero Section */}
            <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
                <FloatingParticles />
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative max-w-6xl mx-auto px-6 text-center text-white z-10">
                    <div className="animate-fade-in-up">
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
                            Quality Cabs at <br/><span className="text-orange-400">Amazing Prices</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                            Your trusted partner for reliable, comfortable, and affordable travel across India. Experience luxury without breaking the bank.
                        </p>
                        <div className="mt-12 animate-bounce">
                            <ChevronDown size={32} className="mx-auto text-white/70" />
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
            </div>

            {/* Stats Section */}
            <div className="bg-white py-16 -mt-16 relative z-10">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <div className="text-blue-600">
                                        {stat.icon}
                                    </div>
                                </div>
                                <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                                </div>
                                <p className="text-gray-600 font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className="bg-gray-50 py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                                About <span className="text-blue-600">MotuCab</span>
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                MotuCab is India's most trusted chauffeur-drive transport solution, providing reliable, comfortable, and affordable travel for long-distance journeys, airport transfers, and tourism.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                With a focus on transparency, safety, and customer-first service, MotuCab ensures a seamless experience through its tech-enabled concierge booking system, vetted drivers, and well-maintained AC vehicles, ranging from Economy to Luxury.
                            </p>
                        </div>
                        <div className="relative">
                            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                                <div className="bg-white rounded-2xl p-8 transform -rotate-3">
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Star size={32} className="text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Premium Experience</h3>
                                        <p className="text-gray-600">Luxury travel redefined for the modern traveler</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* What's Unique Section */}
            <div className="bg-white py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 text-center">
                        What's <span className="text-blue-600">Unique</span> About MotuCab?
                    </h2>
                    <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
                        The problem with traveling in a vast and diverse country like India is multi-faceted. MotuCab solves all of these problems by offering nationwide coverage and car rentals with licensed drivers across a variety of service classes and budgets.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Route size={48} className="text-blue-500" />,
                                title: "Chauffeur-Driven Excellence",
                                description: "Self-drive is impractical for most travelers, making our chauffeur-driven cars the preferred option for comfort and safety."
                            },
                            {
                                icon: <Map size={48} className="text-emerald-500" />,
                                title: "Simplified Itinerary Planning",
                                description: "We handle complex itinerary planning for business travelers and vacation goers, making your journey stress-free."
                            },
                            {
                                icon: <TrendingUp size={48} className="text-purple-500" />,
                                title: "Consistent Quality Assurance",
                                description: "Unlike other travel solutions, we ensure predictable punctuality, reliability, quality, and availability across all services."
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 group">
                                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-4">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Interactive Features Grid Section */}
            <div className="bg-gradient-to-br from-gray-900 to-black py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
                        Why Choose <span className="text-blue-400">MotuCab</span>?
                    </h2>
                    <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
                        Experience the perfect blend of technology, comfort, and reliability that sets us apart from the competition.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {features.map((feature, index) => (
                            <div 
                                key={index} 
                                className={`relative p-8 rounded-2xl transition-all duration-500 cursor-pointer group ${
                                    activeFeature === index 
                                        ? 'bg-gradient-to-br ' + feature.color + ' scale-105 shadow-2xl' 
                                        : 'bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50'
                                }`}
                                onMouseEnter={() => setActiveFeature(index)}
                            >
                                <div className="text-center">
                                    <div className={`flex items-center justify-center h-20 w-20 rounded-2xl mx-auto mb-6 transition-all duration-300 ${
                                        activeFeature === index ? 'bg-white/20 scale-110' : 'bg-gray-700/50 group-hover:bg-gray-600/50'
                                    }`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className={`text-xl font-bold mb-4 transition-colors ${
                                        activeFeature === index ? 'text-white' : 'text-gray-300 group-hover:text-white'
                                    }`}>
                                        {feature.title}
                                    </h3>
                                    <p className={`text-sm leading-relaxed transition-colors ${
                                        activeFeature === index ? 'text-white/90' : 'text-gray-400 group-hover:text-gray-300'
                                    }`}>
                                        {feature.description}
                                    </p>
                                </div>
                                {activeFeature === index && (
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AboutPage;