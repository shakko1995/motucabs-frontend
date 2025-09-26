// SiteMAp for PopularRouteDetailPage


import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import { CheckCircle, ChevronRight, Star, Route } from 'lucide-react';

// Reusable Header & Footer Components
const Header = () => { /* ... */ };
const Footer = () => { /* ... */ };

const PopularRouteDetailPage = () => {
    const { slug } = useParams();
    const [route, setRoute] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRouteDetails = async () => {
            try {
                // This should match your backend route for popular routes
                const res = await axios.get(`http://localhost:5000/api/book-taxi/${slug}`);
                if (res.data) {
                    setRoute(res.data);
                }
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

    return (
        <div className="bg-white">
            <Header />
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <div>
                            <h1 className="text-3xl font-extrabold text-slate-800 mb-2">
                                Cabs from {route.from} to {route.to}
                            </h1>
                            <div className="flex items-center gap-2 text-yellow-500 mb-6">
                                <Star size={18} fill="currentColor"/>
                                <span className="text-sm text-gray-600">(Based on user ratings)</span>
                            </div>
                            <div className="prose max-w-none text-slate-600 leading-relaxed space-y-4">
                                {route.descriptions?.map((desc, i) => (
                                    <div key={i}>
                                        <h2 className="text-xl font-bold">{desc.title}</h2>
                                        <p>{desc.content}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">Fare Chart for {route.from} to {route.to} Taxi</h2>
                            <div className="space-y-3">
                                {route.fares?.map((fare, index) => (
                                    <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                                        <span className="font-semibold">{fare.vehicleType}</span>
                                        <span className="font-bold">Starts from ₹{fare.price.toLocaleString('en-IN')}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 space-y-8">
                             <div className="bg-slate-50 p-6 rounded-lg border">
                                <h3 className="font-bold text-xl text-slate-800 mb-4">Route Details</h3>
                                <p className="text-sm text-slate-600">
                                    <strong>Distance:</strong> {route.distance} km<br/>
                                    <strong>Duration:</strong> {route.duration}
                                </p>
                             </div>
                             <div className="bg-slate-50 p-6 rounded-lg border">
                                <h4 className="font-bold text-xl text-slate-800 mb-4">FAQs for {route.from} to {route.to} Cabs</h4>
                                <div className="space-y-2">
                                    {route.faqs?.map((faq, i) => (
                                        <div key={i} className="p-3 bg-white border rounded shadow-sm text-left">
                                            <h4 className="font-semibold">{faq.question}</h4>
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
}

export default PopularRouteDetailPage;