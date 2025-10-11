import React from 'react';
import { Helmet } from 'react-helmet-async'; // Recommended for SEO: npm install react-helmet-async
import { useParams } from 'react-router-dom';
import { getOneWayRouteBySlug } from '../api/oneWayRouteApi'; // Adjust path
import { Loader, AlertCircle, Clock, MapPin, ChevronDown, Car, Users, Briefcase } from 'lucide-react';
import GoZoBooking from '../components/RideBookingForm'; // Your booking form

// --- FAQ Item Component (with accessibility improvements) ---
const FaqItem = ({ faq, index }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="border-b">
            <h2>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex justify-between items-center text-left p-4 hover:bg-gray-50"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                >
                    <span className="font-semibold text-gray-800">{faq.question}</span>
                    <ChevronDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} size={20} />
                </button>
            </h2>
            <div
                id={`faq-answer-${index}`}
                className={`p-4 bg-gray-50 ${isOpen ? 'block' : 'hidden'}`}
            >
                <p className="text-gray-600">{faq.answer}</p>
            </div>
        </div>
    );
};

// --- Main Page Component ---
export default function OneWayRoutePage() {
    const { slug } = useParams();
    const [route, setRoute] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');
    const topSectionRef = React.useRef(null); // Ref for scrolling

    React.useEffect(() => {
        const fetchRouteData = async () => {
            if (!slug) return;
            setLoading(true);
            setError('');
            try {
                const data = await getOneWayRouteBySlug(slug);
                if (!data) {
                    throw new Error('Route data not found.');
                }
                setRoute(data);
                // --- SEO Improvement: Dynamically set the page title ---
                document.title = `Taxi from ${data.fromCity} to ${data.toCity} | Your Cab Service`;
            } catch (err) {
                setError('Could not find the requested route. It may have been moved or does not exist.');
                document.title = 'Route Not Found';
            } finally {
                setLoading(false);
            }
        };

        fetchRouteData();
    }, [slug]);

    const handleBookNowClick = () => {
        topSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    
    // Helper to render heading tags dynamically
    const renderHeading = (type, text) => {
        const Tag = type && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(type) ? type : 'h2';
        return <Tag className="text-2xl font-bold text-gray-900 mb-3">{text}</Tag>;
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><Loader className="animate-spin text-blue-600" size={48} /></div>;
    }

    if (error) {
        return (
            <div className="text-center py-20 px-4">
                <AlertCircle className="mx-auto text-red-500" size={48} />
                <h1 className="mt-4 text-2xl font-bold">Route Not Found</h1>
                <p className="mt-2 text-gray-600">{error}</p>
            </div>
        );
    }
    
    if (!route) return null; // Should not happen if error handling is correct, but good practice

    const prefillData = {
        from: route.fromCity,
        to: route.toCity,
        activeTab: "Outstation"
    };

    return (
        <div className="bg-gray-50">
            <section ref={topSectionRef} className="bg-white  sticky top-0 z-20">
                 <div className="max-w-6xl mx-auto px-4">
                    <GoZoBooking prefillData={prefillData} />
                </div>
            </section>

            {/* --- Page Title and Main Content --- */}
            <main className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-8">
                    {route.fromCity} to {route.toCity} Cab Service
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* --- Left/Main Content Column --- */}
                    <div className="lg:col-span-2 space-y-12">
                        <article>
                            <div className="flex flex-wrap gap-6 p-4 border rounded-lg bg-white mb-6">
                                <div className="flex items-center gap-2"><MapPin className="text-blue-600" size={20} /><div><span className="text-sm text-gray-500">Distance</span><p className="font-bold">{route.distance} km</p></div></div>
                                <div className="flex items-center gap-2"><Clock className="text-blue-600" size={20} /><div><span className="text-sm text-gray-500">Journey Time</span><p className="font-bold">Approx. {route.duration}</p></div></div>
                            </div>
                            {route.description && <p className="text-gray-700 leading-relaxed">{route.description}</p>}
                        </article>
                        
                        <section>
                             <h2 className="text-2xl font-bold text-gray-900 mb-4">{route.fromCity} to {route.toCity} Taxi Fare</h2>
                             <div className="overflow-x-auto bg-white rounded-lg shadow">
                                 <table className="w-full text-left">
                                     <caption className="sr-only">Taxi fare chart from {route.fromCity} to {route.toCity}</caption>
                                     <thead className="bg-gray-100"><tr className="border-b"><th className="p-4 font-semibold">Cab Type</th><th className="p-4 font-semibold">Suitable For</th><th className="p-4 font-semibold">Fare</th><th className="p-4"></th></tr></thead>
                                     <tbody>
                                         {route.fares.map((fare, index) => (
                                             <tr key={index} className="border-t">
                                                 <td className="p-4 font-medium flex items-center gap-3"><Car /> {fare.vehicleType}</td>
                                                 <td className="p-4 text-gray-600">1-4 Passengers</td>
                                                 <td className="p-4 font-bold text-lg text-blue-700">₹{fare.price}</td>
                                                 <td className="p-4 text-right"><button onClick={handleBookNowClick} className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition">Book Now</button></td>
                                             </tr>
                                         ))}
                                     </tbody>
                                 </table>
                             </div>
                        </section>

                        <div className="space-y-10">
                            {route.sections.sort((a, b) => a.order - b.order).map((section, index) => (
                                <section key={index}>
                                    {renderHeading(section.headingType, section.heading)}
                                    {section.image && <img src={section.image} alt={section.imageAltText || section.heading} className="w-full h-auto max-h-80 object-cover rounded-lg my-4 shadow-md" />}
                                    {section.paragraph && <p className="text-gray-700 leading-relaxed whitespace-pre-line">{section.paragraph}</p>}
                                </section>
                            ))}
                        </div>
                    </div>

                    {/* --- Right Sidebar (now sticky) --- */}
                    <aside className="lg:sticky top-24 h-fit space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-xl font-bold mb-4">Why Book with Us?</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-center gap-3"><Users size={20} className="text-green-500" /> Professional & Verified Drivers</li>
                                <li className="flex items-center gap-3"><Car size={20} className="text-green-500" /> Clean & Well-Maintained Cabs</li>
                                <li className="flex items-center gap-3"><Briefcase size={20} className="text-green-500" /> Transparent Billing</li>
                                <li className="flex items-center gap-3"><Clock size={20} className="text-green-500" /> 24/7 Customer Support</li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </main>
            
            {route.faqs && route.faqs.length > 0 && (
                 <section className="bg-white py-12 border-t">
                     <div className="max-w-4xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>
                         <div className="border rounded-lg shadow-sm">
                            {route.faqs.map((faq, index) => <FaqItem key={index} faq={faq} index={index} />)}
                         </div>
                     </div>
                 </section>
            )}
        </div>
    );
}