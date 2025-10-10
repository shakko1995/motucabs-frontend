import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from 'axios';
import { CheckCircle, Star, MapPin, Clock } from 'lucide-react';
import GoZoBooking from "../components/RideBookingForm";
import img1 from "../assets/car-mini-motucabs.webp";
import img2 from "../assets/innova-motucabs.jpg";
import img3 from "../assets/prime-sedan.webp";
import img4 from "../assets/tempo_12_seater-motucabs.webp";

const Footer = () => (
    <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div>
                    <div className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <span className="text-blue-600">Motu<span className="text-orange-500">Cab</span></span>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">Reliable, safe, and affordable transportation solutions across India.</p>
                </div>
                <div>
                    <h4 className="font-semibold text-white mb-4">Services</h4>
                    <ul className="text-sm space-y-2">
                        <li><a href="/city-rides" className="hover:text-blue-400 transition-colors">City Rides</a></li>
                        <li><a href="/outstation" className="hover:text-blue-400 transition-colors">Outstation</a></li>
                        <li><a href="/airport-transfer" className="hover:text-blue-400 transition-colors">Airport Transfer</a></li>
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

const PopularRouteDetailPage = () => {
    const { slug } = useParams();
    const location = useLocation();
    const [route, setRoute] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const bookingFormRef = useRef(null);

    const prefillData = location.state?.prefillData;

    useEffect(() => {
        const fetchRouteDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/book-taxi/${slug}`);
                if (res.data) setRoute(res.data);
            } catch (err) {
                setError("Could not load route details.");
            } finally {
                setLoading(false);
            }
        };
        fetchRouteDetails();
    }, [slug]);

    if (loading) return <p className="text-center py-20">Loading route details...</p>;
    if (error) return <p className="text-center py-20 text-red-500">{error}</p>;
    if (!route) return <p className="text-center py-20">No details found for this route.</p>;

    const getBannerImage = () => {
        const routeKey = `${route.from.toLowerCase()}-${route.to.toLowerCase()}`;
        const banners = {
            "ahmedabad-sanand": "https://example.com/banners/ahmedabad-sanand.jpg",
            "delhi-gurgaon": "https://example.com/banners/delhi-gurgaon.jpg"
        };
        return banners[routeKey] || "https://example.com/banners/default.jpg";
    };

    const handleBookNowClick = () => {
        bookingFormRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const horizontalImages = [
        { src: img1, alt: "cab1", description: "Swift, Celerio or equivalent" },
        { src: img3, alt: "cab2", description: "Dzire, Etios or equivalent" },
        { src: img2, alt: "cab3", description: "Innova, Ertiga or equivalent" },
        { src: img4, alt: "cab4", description: "Tempo Traveller (12 seater)" },
    ];

    return (
        <div className="bg-gray-50">
            {/* Booking Form */}
            <div ref={bookingFormRef} className="max-w-6xl mx-auto px-4 py-6">
                <GoZoBooking prefillData={prefillData} />
            </div>

            {/* Professional Banner */}
            <div className="relative w-full h-40 md:h-48 lg:h-56 mb-6 rounded-lg overflow-hidden shadow-lg">
                <img
                    src={getBannerImage()}
                    alt={`${route.from.toLowerCase()}-to-${route.to.toLowerCase()}-banner-image`}
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 opacity-70"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-extrabold text-center drop-shadow-lg">
                        {route.from} to {route.to} Cabs
                    </h1>
                </div>
            </div>

            {/* Horizontal 4-image section */}
            {/* Horizontal 4-image section */}
            <div className="max-w-7xl mx-auto px-6 mb-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {horizontalImages.map((img, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300"
                        >
                            {/* Image Container */}
                            <div className="w-full h-60 md:h-64 lg:h-72 overflow-hidden bg-gray-100">
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    className="w-full h-full object-contain object-center"
                                />
                            </div>

                            {/* Description */}
                            {img.description && (
                                <p className="px-4 pt-4 pb-2 text-black font-medium text-sm md:text-base">
                                    {img.description}
                                </p>
                            )}

                            {/* Book Now Button */}
                            <div className="px-4 py-3 flex justify-center">
                                <button
                                    onClick={handleBookNowClick}
                                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors"
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>



            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-10">
                        <div className="flex items-center gap-2 text-yellow-500 mb-4">
                            <Star size={18} fill="currentColor" />
                            <span className="text-sm text-gray-600">(Based on user ratings)</span>
                        </div>

                        <div className="space-y-6 text-gray-700">
                            <p>Looking for a reliable {route.from} to {route.to} one way taxi? Enjoy comfortable, affordable, and professional travel. Clean, GPS-enabled vehicles with door-to-door pickup and flexible scheduling ensure peace of mind.</p>

                            <h2 className="text-2xl font-bold">Cab Service Overview</h2>
                            <p>Choose from hatchbacks, sedans, or SUVs. All vehicles are sanitized and maintained for safety. Enjoy 24x7 support and real-time assistance for a smooth journey.</p>

                            <h2 className="text-2xl font-bold">Booking Options</h2>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2"><CheckCircle size={20} className="text-green-500" />Hatchback – Best for solo trips.</li>
                                <li className="flex items-center gap-2"><CheckCircle size={20} className="text-green-500" />Sedan – Ideal for small families or business travelers.</li>
                                <li className="flex items-center gap-2"><CheckCircle size={20} className="text-green-500" />SUVs & Premium – For group travel or extra comfort.</li>
                            </ul>

                            <h2 className="text-2xl font-bold">Fare Details</h2>
                            <p>Get the best fares from {route.from} to {route.to} with no hidden charges. Prices start from ₹999 depending on vehicle type and schedule.</p>

                            {route.descriptions?.map((desc, i) => (
                                <div key={i}>
                                    <h3 className="text-xl font-semibold">{desc.title}</h3>
                                    <p>{desc.content}</p>
                                </div>
                            ))}

                            <div>
                                <h2 className="text-2xl font-bold mb-4">Fare Chart</h2>
                                <div className="space-y-3">
                                    {route.fares?.map((fare, index) => (
                                        <div key={index} className="flex justify-between items-center p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                                            <span className="font-semibold">{fare.vehicleType}</span>
                                            <span className="font-bold">₹{fare.price.toLocaleString('en-IN')}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-white p-6 rounded-lg shadow-md border">
                                <h3 className="text-xl font-bold mb-4">Route Details</h3>
                                <p className="text-gray-700">
                                    <MapPin size={16} className="inline mr-1" /> <strong>Distance:</strong> {route.distance} km<br />
                                    <Clock size={16} className="inline mr-1" /> <strong>Duration:</strong> {route.duration}
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md border">
                                <h4 className="text-xl font-bold mb-4">FAQs</h4>
                                <div className="space-y-2">
                                    {route.faqs?.map((faq, i) => (
                                        <div key={i} className="p-3 border rounded flex items-start gap-2 bg-gray-50 hover:bg-gray-100 transition-colors">
                                            <CheckCircle size={20} className="text-green-500 mt-1 flex-shrink-0" />
                                            <div>
                                                <h4 className="font-semibold">{faq.question}</h4>
                                                {faq.answer && <p className="text-sm text-gray-600">{faq.answer}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default PopularRouteDetailPage;
