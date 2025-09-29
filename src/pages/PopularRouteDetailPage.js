// // SiteMAp for PopularRouteDetailPage


// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from 'axios';
// import { CheckCircle, ChevronRight, Star, Route } from 'lucide-react';
// import GoZoBooking from "../components/RideBookingForm";

// // Reusable Header & Footer Components
// const Header = () => { /* ... */ };
// // Professional Footer Component
// const Footer = () => (
//     <footer className="bg-gray-900 text-gray-300">
//         <div className="max-w-7xl mx-auto px-8 py-12">
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
//                 <div>
//                     <div className="text-2xl font-bold mb-4 flex items-center gap-2">
                       
//                         <span className="text-blue-600">Motu<span className="text-orange-500">Cab</span></span>
//                     </div>
//                     <p className="text-sm text-gray-400 leading-relaxed">Your trusted partner for reliable, safe, and affordable transportation solutions across India.</p>
//                 </div>
//                 <div>
//                     <h4 className="font-semibold text-white mb-4">Services</h4>
//                     <ul className="text-sm space-y-2">
//                         <li><a href="#" className="hover:text-blue-400 transition-colors">City Rides</a></li>
//                         <li><a href="#" className="hover:text-blue-400 transition-colors">Outstation</a></li>
//                         <li><a href="#" className="hover:text-blue-400 transition-colors">Airport Transfer</a></li>
//                         <li><a href="#" className="hover:text-blue-400 transition-colors">Corporate</a></li>
//                     </ul>
//                 </div>
//                 <div>
//                     <h4 className="font-semibold text-white mb-4">Company</h4>
//                     <ul className="text-sm space-y-2">
//                         <li><a href="/" className="hover:text-blue-400 transition-colors">Home</a></li>
//                         <li><a href="/about" className="hover:text-blue-400 transition-colors">About Us</a></li>
//                         <li><a href="/contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
//                         <li><a href="" className="hover:text-blue-400 transition-colors">Careers</a></li>
//                     </ul>
//                 </div>
//                 <div>
//                     <h4 className="font-semibold text-white mb-4">Legal</h4>
//                     <ul className="text-sm space-y-2">
//                         <li><a href="" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
//                         <li><a href="" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
//                         <li><a href="" className="hover:text-blue-400 transition-colors">Refund Policy</a></li>
//                         <li><a href="" className="hover:text-blue-400 transition-colors">Cookie Policy</a></li>
//                     </ul>
//                 </div>
//             </div>
//             <div className="border-t border-gray-800 pt-8 text-center">
//                 <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} MotuCab Technologies Pvt. Ltd. All Rights Reserved.</p>
//             </div>
//         </div>
//     </footer>
// );

// const PopularRouteDetailPage = () => {
//     const { slug } = useParams();
//     const [route, setRoute] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchRouteDetails = async () => {
//             try {
//                 // This should match your backend route for popular routes
//                 const res = await axios.get(`http://localhost:5000/api/book-taxi/${slug}`);
//                 if (res.data) {
//                     setRoute(res.data);
//                 }
//             } catch (err) {
//                 setError("Could not load route details.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchRouteDetails();
//     }, [slug]);

//     if (loading) return <p className="text-center py-20">Loading route details...</p>;
//     if (error) return <p className="text-center py-20 text-red-500">{error}</p>;
//     if (!route) return <p className="text-center py-20">No details found for this route.</p>;

//     return (
//         <div className="bg-white">
//             <Header />
//             <div >
//         <GoZoBooking />
//       </div>
//             <div className="max-w-6xl mx-auto px-4 py-12">
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
//                     {/* Left Column: Main Content */}
//                     <div className="lg:col-span-2 space-y-12">
//                         <div>
//                             <h1 className="text-3xl font-extrabold text-slate-800 mb-2">
//                                 Cabs from {route.from} to {route.to}
//                             </h1>
//                             <div className="flex items-center gap-2 text-yellow-500 mb-6">
//                                 <Star size={18} fill="currentColor"/>
//                                 <span className="text-sm text-gray-600">(Based on user ratings)</span>
//                             </div>
//                             <div className="prose max-w-none text-slate-600 leading-relaxed space-y-4">
//                                 {route.descriptions?.map((desc, i) => (
//                                     <div key={i}>
//                                         <h2 className="text-xl font-bold">{desc.title}</h2>
//                                         <p>{desc.content}</p>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
                        
//                         <div>
//                             <h2 className="text-2xl font-bold text-slate-800 mb-6">Fare Chart for {route.from} to {route.to} Taxi</h2>
//                             <div className="space-y-3">
//                                 {route.fares?.map((fare, index) => (
//                                     <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
//                                         <span className="font-semibold">{fare.vehicleType}</span>
//                                         <span className="font-bold">Starts from ₹{fare.price.toLocaleString('en-IN')}</span>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Right Column: Sidebar */}
//                     <div className="lg:col-span-1">
//                         <div className="sticky top-28 space-y-8">
//                              <div className="bg-slate-50 p-6 rounded-lg border">
//                                 <h3 className="font-bold text-xl text-slate-800 mb-4">Route Details</h3>
//                                 <p className="text-sm text-slate-600">
//                                     <strong>Distance:</strong> {route.distance} km<br/>
//                                     <strong>Duration:</strong> {route.duration}
//                                 </p>
//                              </div>
//                              <div className="bg-slate-50 p-6 rounded-lg border">
//                                 <h4 className="font-bold text-xl text-slate-800 mb-4">FAQs for {route.from} to {route.to} Cabs</h4>
//                                 <div className="space-y-2">
//                                     {route.faqs?.map((faq, i) => (
//                                         <div key={i} className="p-3 bg-white border rounded shadow-sm text-left">
//                                             <h4 className="font-semibold">{faq.question}</h4>
//                                         </div>
//                                     ))}
//                                 </div>
//                              </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// }

// export default PopularRouteDetailPage;



import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import axios from 'axios';
import { CheckCircle, ChevronRight, Star, Route } from 'lucide-react';
import GoZoBooking from "../components/RideBookingForm";

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
                        <li><a href="#" className="hover:text-blue-400 transition-colors">City Rides</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Outstation</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Airport Transfer</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Corporate</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-white mb-4">Company</h4>
                    <ul className="text-sm space-y-2">
                        <li><a href="/" className="hover:text-blue-400 transition-colors">Home</a></li>
                        <li><a href="/about" className="hover:text-blue-400 transition-colors">About Us</a></li>
                        <li><a href="/contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
                        <li><a href="" className="hover:text-blue-400 transition-colors">Careers</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-white mb-4">Legal</h4>
                    <ul className="text-sm space-y-2">
                        <li><a href="" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                        <li><a href="" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                        <li><a href="" className="hover:text-blue-400 transition-colors">Refund Policy</a></li>
                        <li><a href="" className="hover:text-blue-400 transition-colors">Cookie Policy</a></li>
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

    // Get prefillData from navigation state
    const prefillData = location.state?.prefillData;

    useEffect(() => {
        const fetchRouteDetails = async () => {
            try {
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
            {/* Pass prefillData to GoZoBooking */}
            <div>
                <GoZoBooking prefillData={prefillData} />
            </div>
            
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