// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { ChevronDown } from 'lucide-react';

// // --- API Function to fetch a single vendor partner page by its slug ---
// const getVendorPartnerBySlug = async (slug) => {
//     try {
//         const response = await axios.get(`http://localhost:5000/api/vendor-partner/${slug}`);
//         return response.data;
//     } catch (error) {
//         console.error("Failed to fetch vendor partner data", error);
//         return null;
//     }
// };

// // --- Reusable FAQ Item Component ---
// const FaqItem = ({ faq }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     return (
//         <div className="border-b">
//             <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="flex justify-between items-center w-full py-4 text-left"
//             >
//                 <h3 className="text-lg font-medium text-gray-800">{faq.question}</h3>
//                 <ChevronDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={20} />
//             </button>
//             {isOpen && (
//                 <div className="pb-4 text-gray-600">
//                     <p>{faq.answer}</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// // --- Main Vendor Partner Page Component ---
// export default function VendorPartnerPage() {
//     const { slug } = useParams(); // Gets city slug from URL (e.g., "patna")
//     const [partnerData, setPartnerData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchData = async () => {
//             if (!slug) return;
//             setLoading(true);
//             setError('');
//             const data = await getVendorPartnerBySlug(slug);
//             if (data) {
//                 setPartnerData(data);
//             } else {
//                 setError(`Could not find partnership information for the city: ${slug}.`);
//             }
//             setLoading(false);
//         };
//         fetchData();
//     }, [slug]);

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="text-center py-20 px-4">
//                 <h1 className="text-2xl font-bold text-red-600">Information Not Available</h1>
//                 <p className="text-gray-700 mt-2">{error}</p>
//             </div>
//         );
//     }

//     if (!partnerData) {
//         return null;
//     }

//     // Sort sections by the 'order' field
//     const sortedSections = partnerData.sections.sort((a, b) => a.order - b.order);

//     return (
//         <div className="bg-gray-50 font-sans">
//             {/* --- Hero Section --- */}
//             <header className="bg-gradient-to-r from-green-500 to-teal-600 text-white text-center py-20 px-4">
//                 <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{partnerData.title || `Become a Vendor Partner in ${partnerData.city}`}</h1>
//                 <p className="max-w-3xl mx-auto text-lg md:text-xl opacity-90">{partnerData.description || `Grow your business by partnering with us. Join our network of trusted vendors in ${partnerData.city}.`}</p>
//                 <button className="mt-8 bg-white text-green-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300">
//                     Partner With Us
//                 </button>
//             </header>

//             <main className="container mx-auto px-4 py-12 md:py-16">

//                 {/* --- Dynamically Rendered Content Sections --- */}
//                 {sortedSections.map((section, index) => (
//                     <section key={index} className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
//                         {/* Alternate image and text position */}
//                         <div className={`order-2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
//                             {section.image && (
//                                 <img
//                                     src={section.image}
//                                     alt={section.imageAltText || section.heading}
//                                     title={section.imageTitle || section.heading}
//                                     className="rounded-lg shadow-xl w-full h-auto object-cover"
//                                 />
//                             )}
//                         </div>
//                         <div className={`order-1 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
//                             {section.heading && <h2 className="text-3xl font-bold text-gray-800 mb-3">{section.heading}</h2>}
//                             {section.subheading && <p className="text-xl text-teal-500 mb-4">{section.subheading}</p>}
//                             {section.paragraph && <p className="text-gray-600 leading-relaxed whitespace-pre-line">{section.paragraph}</p>}
//                         </div>
//                     </section>
//                 ))}

//                 {/* --- Services Section --- */}
//                 {partnerData.services && partnerData.services.length > 0 && (
//                     <section className="bg-white p-8 rounded-lg shadow-md my-16">
//                         <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Our Partnership Services</h2>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                             {partnerData.services.map((service, index) => (
//                                 <div key={index} className="border rounded-lg overflow-hidden transition-shadow hover:shadow-xl">
//                                     {service.image && <img src={service.image} alt={service.serviceType} className="w-full h-48 object-cover" />}
//                                     <div className="p-6">
//                                         <h3 className="text-xl font-semibold text-gray-900">{service.serviceType}</h3>
//                                         <p className="text-gray-600 mt-2">{service.description}</p>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </section>
//                 )}

//                 {/* --- FAQ Section --- */}
//                 {partnerData.faqs && partnerData.faqs.length > 0 && (
//                     <section className="max-w-3xl mx-auto my-16">
//                         <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Frequently Asked Questions</h2>
//                         <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
//                             {partnerData.faqs.map((faq, index) => (
//                                 <FaqItem key={index} faq={faq} />
//                             ))}
//                         </div>
//                     </section>
//                 )}
//             </main>
//         </div>
//     );
// }


import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Check, ChevronDown } from 'lucide-react';
import HeroForm from "./HeroForm"; // Assuming HeroForm is a separate component

// --- DUMMY IMPORTS FOR CAR IMAGES (replace with your actual paths) ---
import img1 from "../assets/car-mini-motucabs.webp";
import img2 from "../assets/innova-motucabs.jpg";
import img3 from "../assets/prime-sedan.webp";
import img4 from "../assets/tempo_12_seater-motucabs.webp";

// --- Dummy Header Component ---
const Header = () => (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-20 flex justify-between items-center">
            <div className="text-3xl font-bold">
                <span className="text-blue-600">Motu</span><span className="text-orange-500">Cab</span>
            </div>
            <div>
                <button className="font-semibold text-blue-600 border border-blue-600 rounded-full px-6 py-2 hover:bg-blue-600 hover:text-white transition-colors">
                    Request a call
                </button>
            </div>
        </div>
    </nav>
);

// --- API Function ---
const getVendorPartnerBySlug = async (slug) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/vendor-partner/${slug}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch vendor partner data", error);
        // Fallback to mock data
        const cityName = slug.charAt(0).toUpperCase() + slug.slice(1);
        return {
            city: cityName,
            sections: [], // Admin sections would come from the API
            faqs: [
                { question: `How do I register as a vendor in ${cityName}?`, answer: "You can start by filling out the form on this page. Our team will then contact you for the next steps." },
                { question: "What documents are required?", answer: "You will need your business registration, vehicle documents (RC, Permit, Insurance), and KYC documents." }
            ]
        };
    }
};

// --- FAQ Item Component ---
const FaqItem = ({ faq }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b">
            <button onClick={() => setIsOpen(!isOpen)} className="flex justify-between items-center w-full py-4 text-left">
                <h3 className="text-lg font-medium text-gray-800">{faq.question}</h3>
                <ChevronDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={20} />
            </button>
            {isOpen && <div className="pb-4 text-gray-600"><p>{faq.answer}</p></div>}
        </div>
    );
};

// --- Main Vendor Partner Page Component ---
export default function VendorPartnerPage() {
    const { slug } = useParams();
    const [partnerData, setPartnerData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const formRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!slug) {
                setError('City slug not provided in URL.');
                setLoading(false);
                return;
            }
            setLoading(true);
            setError('');
            const data = await getVendorPartnerBySlug(slug);
            if (data) {
                setPartnerData(data);
            } else {
                setError(`Could not find partnership information for the city: ${slug}.`);
            }
            setLoading(false);
        };
        fetchData();
    }, [slug]);

    const handleAttachClick = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    
    const horizontalImages = [
        { src: img1, alt: "Hatchback Cab", description: "Attach your Hatchback" },
        { src: img3, alt: "Sedan Cab", description: "Attach your Sedan" },
        { src: img2, alt: "SUV Cab", description: "Attach your SUV" },
        { src: img4, alt: "Tempo Traveller", description: "Attach your Minibus" },
    ];

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div></div>;
    }
    if (error) {
        return <div className="text-center py-20"><h1 className="text-2xl font-bold text-red-600">Error</h1><p className="text-gray-700 mt-2">{error}</p></div>;
    }
    if (!partnerData) return null;

    const sortedSections = partnerData.sections?.sort((a, b) => a.order - b.order) || [];

    return (
        <div className="bg-gray-50 font-sans">
            <Header />

            <header ref={formRef} className="bg-gradient-to-r from-slate-100 to-blue-50">
                <div className="container mx-auto px-4 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 text-white">
                        <h2 className="text-3xl font-bold mb-2">Become a Vendor Partner</h2>
                        <p className="text-slate-400 mb-6">Fill in your details to get started.</p>
                        <HeroForm />
                    </div>
                    <div className="text-slate-700">
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-800 mb-6">Grow Your Business with Motu Cabs.</h1>
                        <p className="text-lg text-slate-600 mb-8">Partner with a nationwide network and gain access to thousands of customers. Increase your revenue and reduce idle time.</p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3"><Check className="text-green-500 flex-shrink-0 mt-1" size={22}/><div><h3 className="font-bold">Access a Wide Customer Base</h3><p className="text-sm text-slate-600">Get bookings for outstation, rental, and airport trips.</p></div></li>
                            <li className="flex items-start gap-3"><Check className="text-green-500 flex-shrink-0 mt-1" size={22}/><div><h3 className="font-bold">Increase Vehicle Utilization</h3><p className="text-sm text-slate-600">Our smart booking system minimizes downtime for your fleet.</p></div></li>
                            <li className="flex items-start gap-3"><Check className="text-green-500 flex-shrink-0 mt-1" size={22}/><div><h3 className="font-bold">Transparent & Timely Payments</h3><p className="text-sm text-slate-600">Track your earnings and receive payments on schedule, every time.</p></div></li>
                        </ul>
                    </div>
                </div>
            </header>

             <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">Vehicles We Onboard</h2>
                    <p className="text-center text-slate-600 mb-12">We accept a wide range of commercial vehicles in good condition.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {horizontalImages.map((img, index) => (
                            <div key={index} className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300">
                                <div className="w-full h-48 bg-white flex items-center justify-center p-4"><img src={img.src} alt={img.alt} className="max-w-full max-h-full object-contain" /></div>
                                {img.description && <p className="px-4 pt-4 pb-2 text-black font-semibold text-center text-base">{img.description}</p>}
                                <div className="px-4 py-4 mt-auto border-t border-slate-100">
                                    <button onClick={handleAttachClick} className="w-full px-5 py-2 bg-gradient-to-r from-blue-600 to-orange-500 text-white font-semibold rounded-lg hover:opacity-90 transition">
                                        Attach Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <main className="container mx-auto px-4 py-12 md:py-16">
                <section className="max-w-4xl mx-auto text-left space-y-12 mb-16">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Attach Your Car with Motu Cabs</h2>
                        <h3 className="text-xl text-gray-600 mb-4">For Airport Transfers, Hourly Rentals & Outstation Trips</h3>
                        <p className="text-gray-600 leading-relaxed">Own a car or operate intercity taxis? Join the Motu Cabs Partner Network today and start earning more with reliable, high-demand rides. We’re inviting dedicated drivers, car owners, and taxi operators across India to become part of the Motu family—where great service meets steady income.</p>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Partner with Motu Cabs?</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">By attaching your car with Motu, you gain access to a large customer base, continuous trip requests, and transparent earnings. All you need to do is focus on providing great service — we’ll handle the rest. Here’s what you get as a Motu Vendor Partner:</p>
                        <ul className="space-y-4 text-gray-700">
                            <li className="flex gap-3"><Check className="text-green-500 mt-1 flex-shrink-0" /><span><strong>Consistent Ride Requests</strong> – Motu connects you with verified customers for airport transfers, local rentals, and outstation trips.</span></li>
                            <li className="flex gap-3"><Check className="text-green-500 mt-1 flex-shrink-0" /><span><strong>Focus on Driving, We Handle the Demand</strong> – You provide the rides; we manage bookings, customer service, and promotions.</span></li>
                            <li className="flex gap-3"><Check className="text-green-500 mt-1 flex-shrink-0" /><span><strong>More Rides = More Reviews = More Earnings</strong> – Deliver quality service and watch your reputation and income grow.</span></li>
                            <li className="flex gap-3"><Check className="text-green-500 mt-1 flex-shrink-0" /><span><strong>Timely Payments</strong> – Get your payments on time, directly in your account—always transparent, never delayed.</span></li>
                            <li className="flex gap-3"><Check className="text-green-500 mt-1 flex-shrink-0" /><span><strong>Motu Partner+ App</strong> – Manage trips, track earnings, and stay connected with the Motu team through our easy-to-use mobile app.</span></li>
                            <li className="flex gap-3"><Check className="text-green-500 mt-1 flex-shrink-0" /><span><strong>Stay Busy Year-Round</strong> – With Motu’s wide customer network, you’ll have consistent trip opportunities across all seasons.</span></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Who Can Join?</h2>
                        <p className="text-gray-600 leading-relaxed">We welcome: Individual Drivers, Car Owners with Commercial Vehicles, Fleet Operators and Taxi Companies, Driver Cum Owners (DCOs). If you provide reliable and customer-friendly service, Motu Cabs is the right platform for you!</p>
                    </div>
                     <div className="text-center bg-blue-50 p-8 rounded-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Ready to Partner with Motu Cabs?</h2>
                        <p className="text-gray-600">Fill out the form above to get started — our Vendor Relations Team will contact you shortly to help you onboard and start earning.</p>
                    </div>
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">Drive with Motu. Earn More. Grow Faster.</h2>
                        <p className="text-gray-600 mt-2">Join one of India’s fastest-growing cab networks and experience steady income, flexible work, and full transparency — powered by Motu Cabs.</p>
                    </div>
                </section>

                {sortedSections.map((section, index) => (
                    <section key={index} className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                       {/* ... Dynamic section rendering from API ... */}
                    </section>
                ))}

                {partnerData.faqs && partnerData.faqs.length > 0 && (
                    <section className="max-w-3xl mx-auto my-16">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Frequently Asked Questions</h2>
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            {partnerData.faqs.map((faq, index) => <FaqItem key={index} faq={faq} />)}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}