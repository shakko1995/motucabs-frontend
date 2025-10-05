import React, { useState } from 'react';
import { ThumbsUp, HeartHandshake, DollarSign, ShieldCheck, Globe, Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

// Professional Header Component
const Header = () => {
    const handleLogoClick = () => {
        window.location.href = '/';
    };

    return (
        <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                <div className="text-3xl font-bold cursor-pointer flex items-center gap-2" onClick={handleLogoClick}>

                    <span className="text-blue-600">Motu<span className="text-orange-500">Cab</span></span>
                </div>
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <a href="/about" className="text-gray-600 hover:text-blue-600 transition-colors py-2 px-4 rounded-lg hover:bg-blue-50">About Us</a>
                    <a href="/contact" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md">Contact Us</a>
                </nav>
            </div>
        </header>
    );
};

// Professional Footer Component
const Footer = () => (
    <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div>
                    <div className="text-2xl font-bold mb-4 flex items-center gap-2">

                        <span className="text-blue-600">Motu<span className="text-orange-500">Cab</span></span>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">Your trusted partner for reliable, safe, and affordable transportation solutions across India.</p>
                </div>
                <div>
                    <h4 className="font-semibold text-white mb-4">Services</h4>
                    <ul className="text-sm space-y-2">
                        <li><a href="/city-rides" className="hover:text-blue-400 transition-colors">City Rides</a></li>
                        <li><a href="/one-way-cabs" className="hover:text-blue-400 transition-colors">Outstation</a></li>
                        <li><a href="/airport-transfers" className="hover:text-blue-400 transition-colors">Airport Transfer</a></li>
                        <li><a href="/corporate" className="hover:text-blue-400 transition-colors">Corporate</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-white mb-4">Company</h4>
                    <ul className="text-sm space-y-2">
                        <li><a href="/" className="hover:text-blue-400 transition-colors">Home</a></li>
                        <li><a href="/about" className="hover:text-blue-400 transition-colors">About Us</a></li>
                        <li><a href="/contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
                        <li><a href="/careers" className="hover:text-blue-400 transition-colors">Careers</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-white mb-4">Legal</h4>
                    <ul className="text-sm space-y-2">
                        <li><a href="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                        <li><a href="/terms-and-conditions" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                        <li><a href="/refund-policy" className="hover:text-blue-400 transition-colors">Refund Policy</a></li>
                        <li><a href="/cookie-policy" className="hover:text-blue-400 transition-colors">Cookie Policy</a></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center">
                <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} MotuCab Technologies Pvt. Ltd. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
);

// Main Professional Contact Page Component
const ContactPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.fullName || !formData.email || !formData.message) {
            alert('Please fill in all required fields.');
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
            setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' });

            // Reset success message after 5 seconds
            setTimeout(() => setSubmitted(false), 5000);
        }, 1500);
    };

    const features = [
        { icon: <ThumbsUp size={28} className="text-blue-600" />, title: "EASY", description: "Simple, convenient, and frictionless booking experience for all customers." },
        { icon: <HeartHandshake size={28} className="text-blue-600" />, title: "RELIABLE", description: "Pre-book weeks ahead with confidence. Our tech ensures over 98% on-time service." },
        { icon: <DollarSign size={28} className="text-blue-600" />, title: "AFFORDABLE", description: "Competitive market rates with transparent pricing. No hidden charges ever." },
        { icon: <ShieldCheck size={28} className="text-blue-600" />, title: "SAFE", description: "Pre-vetted drivers with continuous monitoring and real-time tracking for your safety." },
        { icon: <Globe size={28} className="text-blue-600" />, title: "EVERYWHERE", description: "Serving thousands of towns and cities across India. Just pin your location." }
    ];

    const contactMethods = [
        {
            icon: <Phone size={24} className="text-blue-600" />,
            title: "Call Us",
            description: "Speak directly with our support team",
            contact: "+91 12345 67890",
            availability: "Available 24/7"
        },
        {
            icon: <Mail size={24} className="text-blue-600" />,
            title: "Email Us",
            description: "Send us your queries anytime",
            contact: "support@motucab.com",
            availability: "Response within 2 hours"
        },
        {
            icon: <MessageSquare size={24} className="text-blue-600" />,
            title: "Live Chat",
            description: "Get instant help from our team",
            contact: "Chat with us",
            availability: "Online now"
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            <Header />

            {/* Hero Section with Gradient */}
            <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
                <div className="relative max-w-5xl mx-auto px-6 py-24 text-center text-white">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        Get In <span className="text-blue-200">Touch</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                        Have questions? We're here to help. Our expert team is ready to assist you with all your transportation needs.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                            <Clock size={16} />
                            <span>24/7 Support</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                            <CheckCircle2 size={16} />
                            <span>Quick Response</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Contact Methods */}
            <div className="max-w-6xl mx-auto px-6 -mt-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {contactMethods.map((method, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-xl p-6 text-center border border-gray-100 hover:shadow-2xl transition-all transform hover:-translate-y-1">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                {method.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{method.title}</h3>
                            <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                            <p className="font-semibold text-blue-600 mb-1">{method.contact}</p>
                            <p className="text-xs text-green-600 font-medium">{method.availability}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact Form & Details Section */}
            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Enhanced Contact Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <Send size={20} className="text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800">Send us a Message</h3>
                        </div>

                        {submitted && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                                <CheckCircle2 className="text-green-600" size={20} />
                                <div>
                                    <p className="text-green-800 font-medium">Message sent successfully!</p>
                                    <p className="text-green-600 text-sm">We'll get back to you within 2 hours.</p>
                                </div>
                            </div>
                        )}

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        id="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                                <select
                                    name="subject"
                                    id="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                >
                                    <option value="">Select a subject</option>
                                    <option value="booking">Booking Support</option>
                                    <option value="payment">Payment Issues</option>
                                    <option value="driver">Driver Feedback</option>
                                    <option value="partnership">Partnership Inquiry</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                                    placeholder="Tell us how we can help you..."
                                ></textarea>
                            </div>

                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Sending...
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-2">
                                        <Send size={20} />
                                        Send Message
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Enhanced Contact Details & Map */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                                <MapPin className="text-blue-600" />
                                Visit Our Office
                            </h3>
                            <div className="space-y-6 text-gray-600">
                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                                    <MapPin className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                                    <div>
                                        <p className="font-semibold text-gray-800">Head Office</p>
                                        <p className="text-sm leading-relaxed">123 MotuCab Lane, Tech City,<br />Patna, Bihar, India - 800001</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                                    <Clock className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                                    <div>
                                        <p className="font-semibold text-gray-800">Business Hours</p>
                                        <p className="text-sm">Mon - Fri: 9:00 AM - 8:00 PM</p>
                                        <p className="text-sm">Sat - Sun: 10:00 AM - 6:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115132.8228189893!2d85.0603223592189!3d25.60815783457523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f29937c52d4f05%3A0x831a0e05f607b270!2sPatna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1694851254321!5m2!1sen!2sin"
                                width="100%"
                                height="300"
                                
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced "Why Choose Us" section */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200">
                <div className="max-w-6xl mx-auto px-6 py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose MotuCab?</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Experience the difference with India's most trusted cab service</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {features.map((feature, index) => (
                            <div key={index} className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100">
                                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-all group-hover:scale-110">
                                    <div className="group-hover:text-white transition-colors">
                                        {feature.icon}
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-3 text-center">{feature.title}</h3>
                                <p className="text-sm text-gray-600 text-center leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ContactPage;