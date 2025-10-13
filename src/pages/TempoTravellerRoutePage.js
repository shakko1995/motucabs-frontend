import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ChevronDown, Route, Clock, IndianRupee } from 'lucide-react';

// --- API Function to fetch a single route page by its slug ---
const getTempoTravellerRouteBySlug = async (slug) => {
    try {
        // NOTE: Ensure this URL matches your backend route structure
        const response = await axios.get(`http://localhost:5000/api/tempo-travellers/${slug}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch Tempo Traveller route data", error);
        return null;
    }
};

// --- Reusable FAQ Item Component ---
const FaqItem = ({ faq }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full py-4 text-left"
            >
                <h3 className="text-lg font-medium text-gray-800">{faq.question}</h3>
                <ChevronDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={20} />
            </button>
            {isOpen && (
                <div className="pb-4 text-gray-600">
                    <p>{faq.answer}</p>
                </div>
            )}
        </div>
    );
};

// --- Main Tempo Traveller Route Page Component ---
export default function TempoTravellerRoutePage() {
    const { slug } = useParams(); // Gets route slug from URL (e.g., "patna-to-ranchi")
    const [routeData, setRouteData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            if (!slug) return;
            setLoading(true);
            setError('');
            const data = await getTempoTravellerRouteBySlug(slug);
            if (data) {
                setRouteData(data);
            } else {
                setError(`Could not find route details for: ${slug}.`);
            }
            setLoading(false);
        };
        fetchData();
    }, [slug]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20 px-4">
                <h1 className="text-2xl font-bold text-red-600">Route Not Found</h1>
                <p className="text-gray-700 mt-2">{error}</p>
            </div>
        );
    }

    if (!routeData) {
        return null;
    }

    // Sort sections by the 'order' field
    const sortedSections = routeData.sections.sort((a, b) => a.order - b.order);

    return (
        <div className="bg-gray-50 font-sans">
            {/* --- Hero Section --- */}
            <header className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-16 px-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                        Tempo Traveller from {routeData.fromCity} to {routeData.toCity}
                    </h1>
                    <p className="max-w-3xl mx-auto text-lg md:text-xl opacity-90 mb-8">{routeData.description}</p>
                    <div className="flex justify-center items-center gap-6 text-lg">
                        {routeData.distance && (
                            <div className="flex items-center gap-2">
                                <Route size={24} />
                                <strong>{routeData.distance} km</strong>
                            </div>
                        )}
                        {routeData.duration && (
                             <div className="flex items-center gap-2">
                                <Clock size={24} />
                                <strong>{routeData.duration}</strong>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-12 md:py-16">

                {/* --- Fares Section --- */}
                {routeData.fares && routeData.fares.length > 0 && (
                     <section className="bg-white p-8 rounded-lg shadow-lg my-12">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Fare Chart & Booking</h2>
                         <div className="overflow-x-auto">
                            <table className="min-w-full text-left border-collapse">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="py-3 px-4 font-semibold text-gray-700">Vehicle Type</th>
                                        <th className="py-3 px-4 font-semibold text-gray-700">Price</th>
                                        <th className="py-3 px-4 font-semibold text-gray-700 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {routeData.fares.map((fare, index) => (
                                        <tr key={index} className="border-b border-gray-200">
                                            <td className="py-4 px-4 font-medium text-gray-800">{fare.vehicleType}</td>
                                            <td className="py-4 px-4 font-bold text-lg text-cyan-600">₹{fare.price}</td>
                                            <td className="py-4 px-4 text-right">
                                                <button className="bg-cyan-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-cyan-600 transition duration-300">
                                                    Book Now
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}


                {/* --- Dynamically Rendered Content Sections --- */}
                {sortedSections.map((section, index) => (
                    <section key={index} className="my-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                        {/* Alternate image and text position */}
                        <div className={`order-2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                            {section.image && (
                                <img
                                    src={section.image}
                                    alt={section.imageAltText || section.heading}
                                    title={section.imageTitle || section.heading}
                                    className="rounded-lg shadow-xl w-full h-auto object-cover"
                                />
                            )}
                        </div>
                        <div className={`order-1 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                            {section.heading && <h2 className="text-3xl font-bold text-gray-800 mb-3">{section.heading}</h2>}
                            {section.subheading && <p className="text-xl text-cyan-500 mb-4">{section.subheading}</p>}
                            {section.paragraph && <p className="text-gray-600 leading-relaxed whitespace-pre-line">{section.paragraph}</p>}
                        </div>
                    </section>
                ))}

                {/* --- FAQ Section --- */}
                {routeData.faqs && routeData.faqs.length > 0 && (
                    <section className="max-w-3xl mx-auto my-16">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Frequently Asked Questions</h2>
                        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
                            {routeData.faqs.map((faq, index) => (
                                <FaqItem key={index} faq={faq} />
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}