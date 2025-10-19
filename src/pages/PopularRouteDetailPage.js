// import React, { useEffect, useState, useRef } from "react";
// import { useParams, useLocation, Link } from "react-router-dom";
// import { CheckCircle, Star, MapPin, Clock, ChevronRight } from 'lucide-react';
// import GoZoBooking from "../components/RideBookingForm";

// // --- DUMMY IMPORTS FOR CAR IMAGES (replace with your actual paths) ---
// import img1 from "../assets/car-mini-motucabs.webp";
// import img2 from "../assets/innova-motucabs.jpg";
// import img3 from "../assets/prime-sedan.webp";
// import img4 from "../assets/tempo_12_seater-motucabs.webp";

// // --- DYNAMIC MOCK DATA GENERATOR ---
// const generateRouteData = (from, to) => {
//     return {
//         from, to,
//         distance: 280,
//         duration: "Approx. 5 hr 30 min",
//         sections: [
//             { title: null, content: `Looking for a comfortable and affordable way to travel from ${from} to ${to}? Book your outstation cab with Motu Cabs from ${from} to ${to} and experience safe, reliable, and on-time rides every time...` },
//             { title: `${from} to ${to} Outstation Cab Prices and Options`, content: `At Motu Cabs, we offer competitive and flexible ${from} to ${to} outstation cab prices that suit every budget and travel need...` },
//             { title: `Book Outstation Roundtrip from ${from} to ${to}`, content: `Planning a return journey from ${from} to ${to}? Save more by booking your roundtrip outstation cab...` },
//             { title: `${from} to ${to} Outstation Cabs with Driver`, content: `Enjoy a smooth and stress-free travel experience with ${from} to ${to} outstation cabs with driver by Motu Cabs...` }
//         ],
//         fares: [
//             { vehicleType: "Hatchback (Indica, Swift)" }, { vehicleType: "Sedan (Etios, Dzire)" },
//             { vehicleType: "SUV (Ertiga, Innova)" }, { vehicleType: "Premium SUV (Innova Crysta)" },
//         ],
//         whyBook: ["Excellent reputation", "No credit card fees", "Tolls included", "Free cancellation", "Professional drivers", "Hassle-free booking"],
//         faqs: [
//             { question: `What is the best way to travel from ${from} to ${to}?`, answer: "Booking a one-way outstation cab is the most convenient and comfortable option." },
//             { question: "How far is the journey?", answer: "The approximate distance can vary, but it is a journey best made with a professional driver." },
//         ],
//         popularRoutes: ["Jaipur", "Dehradun", "Agra", "Bareilly", "Haridwar", "Moradabad"]
//     };
// };

// const Footer = () => (
//     <footer className="bg-gray-900 text-gray-300">
//         <div className="max-w-7xl mx-auto px-8 py-12"><div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8"><div><div className="text-2xl font-bold mb-4 flex items-center gap-2"><span className="text-blue-600">Motu<span className="text-orange-500">Cab</span></span></div><p className="text-sm text-gray-400 leading-relaxed">Reliable, safe, and affordable transportation solutions across India.</p></div><div><h4 className="font-semibold text-white mb-4">Services</h4><ul className="text-sm space-y-2"><li><a href="/city-rides" className="hover:text-blue-400">City Rides</a></li><li><a href="/outstation" className="hover:text-blue-400">Outstation</a></li><li><a href="/airport-transfer" className="hover:text-blue-400">Airport Transfer</a></li><li><a href="/corporate" className="hover:text-blue-400">Corporate</a></li></ul></div><div><h4 className="font-semibold text-white mb-4">Company</h4><ul className="text-sm space-y-2"><li><a href="/" className="hover:text-blue-400">Home</a></li><li><a href="/about" className="hover:text-blue-400">About Us</a></li><li><a href="/contact" className="hover:text-blue-400">Contact</a></li><li><a href="/careers" className="hover:text-blue-400">Careers</a></li></ul></div><div><h4 className="font-semibold text-white mb-4">Legal</h4><ul className="text-sm space-y-2"><li><a href="/privacy-policy" className="hover:text-blue-400">Privacy Policy</a></li><li><a href="/terms-and-conditions" className="hover:text-blue-400">Terms of Service</a></li><li><a href="/refund-policy" className="hover:text-blue-400">Refund Policy</a></li><li><a href="/cookie-policy" className="hover:text-blue-400">Cookie Policy</a></li></ul></div></div><div className="border-t border-gray-800 pt-8 text-center"><p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} MotuCab Technologies Pvt. Ltd. All Rights Reserved.</p></div></div>
//     </footer>
// );

// const PopularRouteDetailPage = () => {
//     const { slug } = useParams();
//     const location = useLocation();
//     const [route, setRoute] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const bookingFormRef = useRef(null);

//     const prefillData = location.state?.prefillData;

//     useEffect(() => {
//         const fetchRouteDetails = async () => {
//             try {
//                 if (!slug || !slug.includes('-to-')) {
//                     throw new Error("Invalid route slug.");
//                 }
//                 // ✅ FIXED: Correctly parses complex slugs like 'new-delhi-to-gurgaon'
//                 const [fromSlug, toSlug] = slug.split('-to-');
//                 const fromCity = fromSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
//                 const toCity = toSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                
//                 const data = generateRouteData(fromCity, toCity);
//                 if (data) setRoute(data);
//             } catch (err) {
//                 setError("Could not load route details.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchRouteDetails();
//     }, [slug]);

//     const handleBookNowClick = () => {
//         bookingFormRef.current?.scrollIntoView({ behavior: "smooth" });
//     };

//     const horizontalImages = [
//         { src: img1, alt: "Hatchback Cab", description: "Swift, Celerio or equivalent" },
//         { src: img3, alt: "Sedan Cab", description: "Dzire, Etios or equivalent" },
//         { src: img2, alt: "SUV Cab", description: "Innova, Ertiga or equivalent" },
//         { src: img4, alt: "Tempo Traveller", description: "Tempo Traveller (12 seater)" },
//     ];

//     if (loading) return <p className="text-center py-20">Loading route details...</p>;
//     if (error) return <p className="text-center py-20 text-red-500">{error}</p>;
//     if (!route) return <p className="text-center py-20">No details found for this route.</p>;

//     return (
//         <div className="bg-white">
         
//             <div ref={bookingFormRef} >
//                 <GoZoBooking prefillData={{...prefillData, from: route.from, to: route.to }} />
//             </div>

//             <div className="bg-slate-50 py-16">
//                 <div className="max-w-7xl mx-auto px-6">
//                     <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">Our Fleet for {route.from} to {route.to}</h2>
//                     <p className="text-center text-slate-600 mb-12">Choose from a wide range of cars to suit your journey.</p>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//                         {horizontalImages.map((img, index) => (
//                             <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300">
//                                 <div className="w-full h-48 bg-white flex items-center justify-center p-4"><img src={img.src} alt={img.alt} className="max-w-full max-h-full object-contain" /></div>
//                                 {img.description && <p className="px-4 pt-4 pb-2 text-black font-semibold text-center text-base">{img.description}</p>}
//                                 <div className="px-4 py-4 flex justify-center mt-auto"><button onClick={handleBookNowClick} className="px-5 py-2 bg-gradient-to-r from-blue-600 to-orange-500 text-white font-semibold rounded-lg hover:opacity-90 transition w-full">Book Now</button></div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             <div className="max-w-6xl mx-auto px-4 py-16">
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-16">
//                     <div className="lg:col-span-2 space-y-12">
//                         <div className="flex items-center gap-3 border-b pb-4">
//                             <div className="flex items-center gap-1 text-yellow-500"><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /></div>
//                             <span className="text-sm text-gray-600 font-medium">(4.5/5 based on 2,000+ user ratings)</span>
//                         </div>
                        
//                         {route.sections.map((sec, i) => (
//                              <div key={i}>
//                                 {sec.title && <h2 className="text-3xl font-extrabold text-slate-800 mb-4">{sec.title}</h2>}
//                                 <p className="text-slate-600 leading-relaxed text-base">{sec.content}</p>
//                             </div>
//                         ))}
                        
//                         <div>
//                             <h2 className="text-3xl font-extrabold text-slate-800 mb-6">Fare Chart from {route.from} to {route.to}</h2>
//                             <div className="space-y-3">
//                                 {/* ✅ FIXED: Price is replaced with a "Book Now" button */}
//                                 {route.fares.map((fare, index) => (
//                                     <div key={index} className="flex justify-between items-center p-4 border rounded-lg bg-slate-50 shadow-sm hover:shadow-md transition-shadow">
//                                         <span className="font-semibold text-slate-700">{fare.vehicleType}</span>
//                                         <button onClick={handleBookNowClick} className="px-5 py-2 bg-blue-600 text-white font-semibold text-sm rounded-md hover:bg-blue-700 transition-colors">
//                                             Book Now
//                                         </button>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>

//                     <div className="lg:col-span-1">
//                         <div className="sticky top-24 space-y-8">
//                             <div className="bg-white p-6 rounded-lg shadow-md border">
//                                 <h3 className="text-xl font-bold mb-4 text-slate-800">Route Details</h3>
//                                 <div className="space-y-3 text-slate-700">
//                                     <p className="flex items-center gap-2"><MapPin size={18} className="text-blue-500" /> <strong>Distance:</strong> {route.distance} km</p>
//                                     <p className="flex items-center gap-2"><Clock size={18} className="text-blue-500" /> <strong>Duration:</strong> {route.duration}</p>
//                                 </div>
//                             </div>

//                             <div className="bg-white p-6 rounded-lg shadow-md border">
//                                 <h4 className="font-bold text-xl text-slate-800 mb-4">Why book with us</h4>
//                                 <ul className="space-y-3">
//                                     {route.whyBook?.map((point, index) => (
//                                         <li key={index} className="flex items-center gap-3">
//                                             <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
//                                             <span className="text-slate-700">{point}</span>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
                            
//                             <div className="bg-white p-6 rounded-lg shadow-md border">
//                                 <h4 className="text-xl font-bold mb-4 text-slate-800">Route FAQs</h4>
//                                 <div className="space-y-3">
//                                     {/* ✅ FIXED: Replaced simple text with accordion-style <details> tag */}
//                                     {route.faqs.map((faq, i) => (
//                                         <div key={i} className="border rounded-lg text-sm">
//                                           <details className="group p-3">
//                                             <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
//                                               {faq.question}
//                                               <ChevronRight className="transform transition-transform duration-200 group-open:rotate-90" size={16} />
//                                             </summary>
//                                             <p className="text-slate-600 mt-2 pt-2 border-t">{faq.answer}</p>
//                                           </details>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* ✅ FIXED: Added back the final popular routes section */}
//             {!slug.includes('-to-') && route.popularRoutes && (
//               <div className="bg-blue-50 py-12">
//                   <div className="max-w-6xl mx-auto px-4">
//                   <h2 className="text-2xl font-bold text-slate-800 mb-6">Popular Outstation Routes</h2>
//                   <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-3 text-sm">
//                       {route.popularRoutes.map((popRoute, idx) => {
//                           const destinationSlug = popRoute.toLowerCase().replace(/ /g, '-');
//                           const routePath = `/outstation/${slug}-to-${destinationSlug}`;
//                           return (
//                               <Link to={routePath} key={idx} className="text-slate-700 hover:text-blue-600 flex items-center gap-2">
//                                   <ChevronRight size={14} /> <span>{route.from} to {popRoute}</span>
//                               </Link>
//                           );
//                       })}
//                   </div>
//                   </div>
//               </div>
//             )}

//             <Footer />
//         </div>
//     );
// };

// export default PopularRouteDetailPage;







import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { CheckCircle, Star,  ChevronRight } from 'lucide-react';
import GoZoBooking from "../components/RideBookingForm";
import { Helmet } from "react-helmet";


// --- DUMMY IMPORTS FOR CAR IMAGES (replace with your actual paths) ---
import img1 from "../assets/car-mini-motucabs.webp";
import img2 from "../assets/innova-motucabs.jpg";
import img3 from "../assets/prime-sedan.webp";
import img4 from "../assets/tempo_12_seater-motucabs.webp";

// --- DYNAMIC MOCK DATA GENERATOR ---
const generateRouteData = (from, to) => {
    // Define 10 popular destination cities for the "Fare Chart" section
    const popularDestinationCities = [
        "Dehradun", "Jaipur", "Agra", "Vrindavan", "Bareilly",
        "Haridwar", "Mathura", "Moradabad", "Chandigarh", "Rishikesh"
    ];

    // Map these popular destinations to the new 'fares' structure
    const dynamicFares = popularDestinationCities.map(city => ({
        to: city // The 'to' city for each popular route
    }));

    return {
        from, to,
        
        sections: [
            { title: null, content: `Looking for a comfortable and affordable way to travel from ${from} to ${to}? Book your outstation cab with Motu Cabs from ${from} to ${to} and experience safe, reliable, and on-time rides every time. Whether it’s a short weekend getaway, a business trip, or a family vacation, our outstation taxis are designed to make your journey stress-free. Choose from a wide range of cars — hatchbacks, sedans, SUVs, and tempo travellers — all driven by verified professional chauffeurs. With transparent pricing and 24/7 customer support, Motu Cabs is your trusted travel partner for every route across India.` },
            { title: `${from} to ${to} Outstation Cab Prices and Options`, content: `At Motu Cabs, we offer competitive and flexible ${from} to ${to} outstation cab prices that suit every budget and travel need. Choose from one-way, roundtrip, rentals or multi-city taxi options from ${from} to ${to} at an unbeatable fares. Our fleet includes economy cars for budget trips, luxury sedans for business travel, and SUVs or travellers for family and group tours. All fares are inclusive of driver allowance, fuel, and tolls — no hidden costs, just honest pricing.` },
            { title: `Book Outstation Roundtrip from ${from} to ${to}`, content: `Planning a return journey from ${from} to ${to}? Save more by booking your roundtrip outstation cab from ${from} to ${to} with Motu Cabs. Our roundtrip taxi service ensures that your driver stays with you throughout your trip, giving you flexibility for sightseeing, short stops, or last-minute changes. Enjoy a personalized experience, door-to-door service, and zero cancellation hassles.` },
            { title: `${from} to ${to} Outstation Cabs with Driver`, content: `Enjoy a smooth and stress-free travel experience with ${from} to ${to} outstation cabs with driver by Motu Cabs at pocket friendly deals. Every driver in our network is trained, top rated, licensed, and experienced to handle both city and highway routes. Sit back and relax while your chauffeur navigates the roads, manages parking, and ensures a punctual arrival at every stop.` },
            { title: `How to Book Your ${from} to ${to} Cab`, content: `Booking your cab is simple and quick. 1. Visit our website or open the Motu Cabs app. 2. Enter your pickup location (${from}) and destination (${to}). 3. Choose your preferred car type from our fleet. 4. Confirm your booking and receive instant confirmation with driver details. It's that easy!` },
            { title: "Our Commitment to Your Safety", content: `Your safety is our top priority. All our cabs are regularly sanitized and inspected. Our drivers are verified and trained in safety protocols. We also offer 24/7 GPS tracking on all our rides, so you can travel with complete peace of mind.` },
            { title: "24/7 Customer Support for Your Journey", content: `Have a question or need assistance during your trip from ${from} to ${to}? Our dedicated 24/7 customer support team is always available to help. Whether you need to make a change to your booking or have a query during your ride, we're just a call or a message away.` }
        ],
        fares: dynamicFares, // Use the dynamically generated popular destinations
        whyBook: ["Excellent reputation", "No credit card fees", "Tolls included", "Free cancellation", "Professional drivers", "Hassle-free booking"],
        faqs: [
            { question: `What is the best way to travel from ${from} to ${to}?`, answer: "Booking a one-way outstation cab is the most convenient and comfortable option." },
            { question: "How far is the journey?", answer: "The approximate distance can vary, but it is a journey best made with a professional driver." },
        ],
        // popularRoutes removed as per request to remove "Explore Other Routes" section
    };
};

// --- LOCAL DATA FETCHER ---
const getRouteDetailsBySlug = async (slug) => {
    if (!slug || !slug.includes('-to-')) {
        // Fallback for direct access without a slug, or invalid slug
        return generateRouteData("Delhi", "Gurgaon"); 
    }
    const [fromSlug, toSlug] = slug.split('-to-');
    const fromCity = fromSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const toCity = toSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    
    return generateRouteData(fromCity, toCity);
};

// --- Dummy Header Component (replace with your actual Header) ---


const Footer = () => (
    <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-8 py-12"><div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8"><div><div className="text-2xl font-bold mb-4 flex items-center gap-2"><span className="text-blue-600">Motu<span className="text-orange-500">Cab</span></span></div><p className="text-sm text-gray-400 leading-relaxed">Reliable, safe, and affordable transportation solutions across India.</p></div><div><h4 className="font-semibold text-white mb-4">Services</h4><ul className="text-sm space-y-2"><li><a href="/city-rides" className="hover:text-blue-400">City Rides</a></li><li><a href="/outstation" className="hover:text-blue-400">Outstation</a></li><li><a href="/airport-transfer" className="hover:text-blue-400">Airport Transfer</a></li><li><a href="/corporate" className="hover:text-blue-400">Corporate</a></li></ul></div><div><h4 className="font-semibold text-white mb-4">Company</h4><ul className="text-sm space-y-2"><li><a href="/" className="hover:text-blue-400">Home</a></li><li><a href="/about" className="hover:text-blue-400">About Us</a></li><li><a href="/contact" className="hover:text-blue-400">Contact</a></li><li><a href="/careers" className="hover:text-blue-400">Careers</a></li></ul></div><div><h4 className="font-semibold text-white mb-4">Legal</h4><ul className="text-sm space-y-2"><li><a href="/privacy-policy" className="hover:text-blue-400">Privacy Policy</a></li><li><a href="/terms-and-conditions" className="hover:text-blue-400">Terms of Service</a></li><li><a href="/refund-policy" className="hover:text-blue-400">Refund Policy</a></li><li><a href="/cookie-policy" className="hover:text-blue-400">Cookie Policy</a></li></ul></div></div><div className="border-t border-gray-800 pt-8 text-center"><p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} MotuCab Technologies Pvt. Ltd. All Rights Reserved.</p></div></div>
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
                setLoading(true);
                setError(null);
                const data = await getRouteDetailsBySlug(slug);
                setRoute(data);
            } catch (err) {
                setError("Could not load route details.");
            } finally {
                setLoading(false);
            }
        };
        fetchRouteDetails();
    }, [slug]);

    // This function will handle "Book Now" clicks and scroll to the top form.
    // It also pre-fills the 'to' destination in the form.
    const handleBookNowClick = (destinationCity) => {
        // Here you would likely update the form state (e.g., using context or a prop drilling function)
        // For this example, we'll just scroll and assume GoZoBooking can pick it up from 'prefillData' on re-render.
        // In a real app, you might pass 'setPrefillData' down or use a global state manager.
        if (bookingFormRef.current) {
            bookingFormRef.current.scrollIntoView({ behavior: "smooth" });
            // Optionally, you might update a state variable in parent to pass to GoZoBooking
            // For now, GoZoBooking uses prefillData from location state, so we just scroll.
            // If you need to dynamically update 'to' in GoZoBooking based on this click,
            // the GoZoBooking component or its parent would need a way to receive this 'destinationCity'.
        }
    };

    const horizontalImages = [
        { src: img1, alt: "Hatchback Cab", description: "Swift, Celerio or equivalent" },
        { src: img3, alt: "Sedan Cab", description: "Dzire, Etios or equivalent" },
        { src: img2, alt: "SUV Cab", description: "Innova, Ertiga or equivalent" },
        { src: img4, alt: "Tempo Traveller", description: "Tempo Traveller (12 seater)" },
    ];

    if (loading) return <p className="text-center py-20">Loading route details...</p>;
    if (error) return <p className="text-center py-20 text-red-500">{error}</p>;
    if (!route) return <p className="text-center py-20">No details found for this route.</p>;

    return (
        <div className="bg-white">
             {/* 🔹 Dynamic Meta Tags */}
            <Helmet>
                <title>Book Outstation Cabs from {route.from} to {route.to}</title>
                <meta name="title" content={`Book Outstation Cabs from ${route.from} to ${route.to}`} />
                <meta name="description" content={`Book Outstation Cabs from ${route.from} to ${route.to} at the best deals.`} />
                <meta name="keywords" content={`${route.from.toLowerCase()} to ${route.to.toLowerCase()} oneway, ${route.from.toLowerCase()} to ${route.to.toLowerCase()} taxi fare, online cab booking ${route.from.toLowerCase()} to ${route.to.toLowerCase()}, cabs for ${route.from.toLowerCase()} to ${route.to.toLowerCase()}, ${route.from.toLowerCase()} to ${route.to.toLowerCase()} car rental, outstation taxi ${route.from.toLowerCase()} to ${route.to.toLowerCase()}, outstation cabs in ${route.from.toLowerCase()}, ${route.from.toLowerCase()} to ${route.to.toLowerCase()} taxi, ${route.from.toLowerCase()} to ${route.to.toLowerCase()} distance, ${route.from.toLowerCase()} to ${route.to.toLowerCase()} round trip taxi fare, outstation cab booking ${route.from.toLowerCase()} to ${route.to.toLowerCase()}`} />
                <link rel="canonical" href={`https://www.motucabs.com/book-taxi/${route.from.toLowerCase().replace(/\s+/g,'-')}-to-${route.to.toLowerCase().replace(/\s+/g,'-')}`} />
                <meta name="copyright" content="copyright @motucabs. All Rights Reserved" />
                <meta name="robots" content="index, follow" />
            </Helmet>
            
            <div ref={bookingFormRef} >
                {/* Ensure GoZoBooking receives dynamic 'from' and 'to' from the route */}
                <GoZoBooking prefillData={{...prefillData, from: route.from, to: route.to }} />
            </div>

            <div className="bg-slate-50 py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">Our Fleet for {route.from} to {route.to}</h2>
                    <p className="text-center text-slate-600 mb-12">Choose from a wide range of cars to suit your journey.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {horizontalImages.map((img, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300">
                                <div className="w-full h-48 bg-white flex items-center justify-center p-4"><img src={img.src} alt={img.alt} className="max-w-full max-h-full object-contain" /></div>
                                {img.description && <p className="px-4 pt-4 pb-2 text-black font-semibold text-center text-base">{img.description}</p>}
                                <div className="px-4 py-4 flex justify-center mt-auto"><button onClick={() => handleBookNowClick(route.to)} className="px-5 py-2 bg-gradient-to-r from-blue-600 to-orange-500 text-white font-semibold rounded-lg hover:opacity-90 transition w-full">Book Now</button></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-16">
                    
                    <div className="lg:col-span-2 space-y-12">

                        <div className="flex items-center gap-3 border-b pb-4">

                            <div className="flex items-center gap-1 text-yellow-500"><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} className="text-gray-300" /></div>
                            <span className="text-sm text-gray-600 font-medium">(4.0/5 based on 1,500+ user ratings)</span>
                            
                        </div>
                        <heading className="font-bold text-3xl mt-4 text-slate-800"> Book Outstation Cabs from {route.from} to {route.to} </heading>
                        
                        {route.sections.map((sec, i) => (
                             <div key={i}>
                                {sec.title && <h2 className="text-3xl font-extrabold text-slate-800 mb-4">{sec.title}</h2>}
                                <p className="text-slate-600 leading-relaxed text-base">{sec.content}</p>
                            </div>
                        ))}
                        
                        <div>
                            <h2 className="text-3xl font-extrabold text-slate-800 mb-6">Popular Routes from {route.from}</h2>
                            <div className="space-y-3">
                                {/* Changed to list popular destinations with Book Now buttons */}
                                {route.fares.map((fare, index) => (
                                    <div key={index} className="flex justify-between items-center p-4 border rounded-lg bg-slate-50 shadow-sm hover:shadow-md transition-shadow">
                                        <span className="font-semibold text-slate-700">{route.from} to {fare.to}</span>
                                        <button onClick={() => handleBookNowClick(fare.to)} className="px-5 py-2 bg-blue-600 text-white font-semibold text-sm rounded-md hover:bg-blue-700 transition-colors">
                                            Book Now
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-8">
                            {/* <div className="bg-white p-6 rounded-lg shadow-md border">
                                <h3 className="text-xl font-bold mb-4 text-slate-800">Route Details</h3>
                                <div className="space-y-3 text-slate-700">
                                    <p className="flex items-center gap-2"><MapPin size={18} className="text-blue-500" /> <strong>Distance:</strong> {route.distance} km</p>
                                    <p className="flex items-center gap-2"><Clock size={18} className="text-blue-500" /> <strong>Duration:</strong> {route.duration}</p>
                                </div>
                            </div> */}

                            <div className="bg-white p-6 rounded-lg shadow-md border">
                                <h4 className="font-bold text-xl text-slate-800 mb-4">Why Book With Us</h4>
                                <ul className="space-y-3">
                                    {route.whyBook?.map((point, index) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                                            <span className="text-slate-700">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div className="bg-white p-6 rounded-lg shadow-md border">
                                <h4 className="text-xl font-bold mb-4 text-slate-800">Route FAQs</h4>
                                <div className="space-y-3">
                                    {route.faqs.map((faq, i) => (
                                        <div key={i} className="border rounded-lg text-sm">
                                          <details className="group p-3">
                                            <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                                              {faq.question}
                                              <ChevronRight className="transform transition-transform duration-200 group-open:rotate-90" size={16} />
                                            </summary>
                                            <p className="text-slate-600 mt-2 pt-2 border-t">{faq.answer}</p>
                                          </details>
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