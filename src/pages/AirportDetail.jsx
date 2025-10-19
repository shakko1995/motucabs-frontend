// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { getAirportBySlug } from "../api/airportApi";
// import { CheckCircle, ChevronRight } from 'lucide-react';
// import GoZoBooking from "../components/RideBooking"

// // Reusable Header & Footer Components
// const Header = () => { /* ... Your Header Component ... */ };
// const Footer = () => { /* ... Your Footer Component ... */ };

// const AirportDetailPage = () => {
//     const { slug } = useParams();
//     const [airport, setAirport] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchAirportData = async () => {
//             try {
//                 const data = await getAirportBySlug(slug);
//                 if (data) setAirport(data);
//                 else setError("Airport details not found.");
//             } catch {
//                 setError("Failed to load airport details.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchAirportData();
//     }, [slug]);

//     if (loading) return <p className="text-center py-20 text-gray-500">Loading...</p>;
//     if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

//     return (
//         <div className="bg-white">
           
//             <Header />
//              <div className="max-w-6xl mx-auto px-4 py-6">
//         <GoZoBooking />
//       </div>
//             <div className="max-w-6xl mx-auto px-4 py-12">
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
//                     {/* Main Content */}
//                     <div className="lg:col-span-2">
//                         <h1 className="text-3xl font-extrabold text-slate-800 mb-4">
//                             Book {airport.name} Transfer Cabs Online
//                         </h1>
//                         <div className="prose max-w-none text-slate-600 leading-relaxed mb-8">
//                             <p>{airport.description}</p>
//                         </div>

//                         {/* Transfers */}
//                         {airport.transfers?.length > 0 && (
//                             <div className="mb-12">
//                                 <h2 className="text-2xl font-bold text-slate-800 mb-6">
//                                     Popular airport transfers in {airport.name}
//                                 </h2>
//                                 <div className="space-y-3">
//                                     {airport.transfers.map((route, index) => (
//                                         <Link to="#" key={index} className="flex justify-between items-center p-4 border rounded-lg hover:bg-slate-50 transition-colors">
//                                             <span className="font-semibold text-slate-700">{airport.name} Airport to {route.destination} transfer</span>
//                                             <div className="flex items-center gap-2">
//                                                 <span className="text-sm text-slate-500">starting at</span>
//                                                 <span className="font-bold text-slate-800">₹{route.price.toLocaleString('en-IN')}</span>
//                                                 <ChevronRight size={20} className="text-slate-400" />
//                                             </div>
//                                         </Link>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}

//                         {/* Sections */}
//                         {airport.sections?.length > 0 && airport.sections.map((section, idx) => (
//                             <div key={idx} className="mb-8">
//                                 {/* Heading */}
//                                 {section.heading && React.createElement(
//                                     section.headingType || "h2",
//                                     { className: "text-xl font-bold text-slate-800 mb-2" },
//                                     section.heading
//                                 )}
//                                 {/* Subheading */}
//                                 {section.subheading && <h3 className="text-lg font-semibold text-slate-700 mb-2">{section.subheading}</h3>}
//                                 {/* Paragraph */}
//                                 {section.paragraph && <p className={`text-slate-600 mb-2 text-${section.paragraphAlign || 'left'}`}>{section.paragraph}</p>}
//                                 {/* Image */}
//                                 {section.image && <img src={section.image} alt={section.imageAltText || ""} className="rounded-md mt-2 mb-4" />}
//                             </div>
//                         ))}

//                         {/* FAQs */}
//                         {airport.faqs?.length > 0 && (
//                             <div className="mt-12">
//                                 <h2 className="text-2xl font-bold text-slate-800 mb-6">FAQs</h2>
//                                 <div className="space-y-4">
//                                     {airport.faqs.map((faq, index) => (
//                                         <div key={index} className="border p-4 rounded-md">
//                                             <h3 className="font-semibold text-slate-800 mb-2">{faq.question}</h3>
//                                             <p className="text-slate-600">{faq.answer}</p>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* Sidebar */}
//                     <div className="lg:col-span-1">
//                         <div className="sticky top-28 space-y-8">
//                             {/* Why Book & Extra Info */}
//                             <div className="bg-white p-6 rounded-lg shadow-lg border">
//                                 <img src="https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png" alt="Luxury Car" className="w-full rounded-md mb-4" />
//                                 <h3 className="font-bold text-center text-lg text-blue-600 mb-6">Luxury Car Rental at {airport.name}</h3>
//                                 {airport.whyBook?.length > 0 && (
//                                     <div className="bg-slate-50 p-6 rounded-md">
//                                         <h4 className="font-bold text-xl text-slate-800 mb-4">Why book with us</h4>
//                                         <ul className="space-y-3">
//                                             {airport.whyBook.map((point, index) => (
//                                                 <li key={index} className="flex items-center gap-3">
//                                                     <CheckCircle size={18} className="text-green-500" />
//                                                     <span className="text-slate-700">{point}</span>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </div>
//                                 )}
//                             </div>

//                             {airport.extraInfo && (
//                                 <div className="bg-slate-50 p-6 rounded-lg border">
//                                     <h4 className="font-bold text-xl text-slate-800 mb-4">Extra Info</h4>
//                                     <p className="text-sm text-slate-600">{airport.extraInfo}</p>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Optional: Popular Outstation Routes */}
//                 {airport.name && (
//                     <div className="bg-blue-50 py-12">
//                         <div className="max-w-6xl mx-auto px-4">
//                             <h2 className="text-2xl font-bold text-slate-800 mb-6">Popular outstation cab routes from {airport.name}</h2>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3 text-blue-600 font-semibold">
//                                 {/* Placeholder links */}
//                                 <Link to="#" className="hover:underline"> &gt; {airport.name} to Dalhousie</Link>
//                                 <Link to="#" className="hover:underline"> &gt; {airport.name} to Chandigarh</Link>
//                                 <Link to="#" className="hover:underline"> &gt; {airport.name} to Jalandhar</Link>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//             <Footer />
//         </div>
//     );
// };

// export default AirportDetailPage;


// New Code Added

// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { getAirportBySlug } from "../api/airportApi";
// import { CheckCircle, ChevronRight } from "lucide-react";
// import GoZoBooking from "../components/RideBookingForm";

// // Reusable Header & Footer Components
// const Header = () => { /* ... Your Header Component ... */ };
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
//                         <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
//                     </ul>
//                 </div>
//                 <div>
//                     <h4 className="font-semibold text-white mb-4">Legal</h4>
//                     <ul className="text-sm space-y-2">
//                         <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
//                         <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
//                         <li><a href="#" className="hover:text-blue-400 transition-colors">Refund Policy</a></li>
//                         <li><a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a></li>
//                     </ul>
//                 </div>
//             </div>
//             <div className="border-t border-gray-800 pt-8 text-center">
//                 <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} MotuCab Technologies Pvt. Ltd. All Rights Reserved.</p>
//             </div>
//         </div>
//     </footer>
// );

// const AirportDetailPage = () => {
//   const { slug } = useParams();
//   const [airport, setAirport] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchAirportData = async () => {
//       try {
//         const data = await getAirportBySlug(slug);
//         if (data) setAirport(data);
//         else setError("Airport details not found.");
//       } catch {
//         setError("Failed to load airport details.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAirportData();
//   }, [slug]);

//   if (loading)
//     return <p className="text-center py-20 text-gray-500">Loading...</p>;
//   if (error)
//     return <p className="text-center py-20 text-red-500">{error}</p>;

//   return (
//     <div className="bg-white">
//       {/* Header */}
//       <Header />

//       {/* ✅ Booking Form Hero Section */}
//      <div >
//         <GoZoBooking />
//       </div>

//       {/* ================= MAIN CONTENT + SIDEBAR ================= */}
//       <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
//         {/* Main Content */}
//         <div className="lg:col-span-2">
//           <h1 className="text-3xl font-extrabold text-slate-800 mb-4">
//             Book {airport.name} Transfer Cabs Online
//           </h1>
//           <p className="text-slate-600 mb-8">
//             {airport.description || "Detailed description not available for this airport."}
//           </p>

//           {/* Transfers */}
//           {airport.transfers?.length > 0 && (
//             <div className="mb-12">
//               <h2 className="text-2xl font-bold text-slate-800 mb-6">
//                 Popular airport transfers in {airport.name}
//               </h2>
//               <div className="space-y-3">
//                 {airport.transfers.map((route, index) => (
//                   <Link
//                     to="#"
//                     key={index}
//                     className="flex justify-between items-center p-4 border rounded-lg hover:bg-slate-50 transition-colors"
//                   >
//                     <span className="font-semibold text-slate-700">
//                       {airport.name} Airport to {route.destination} transfer
//                     </span>
//                     <div className="flex items-center gap-2">
//                       <span className="text-sm text-slate-500">starting at</span>
//                       <span className="font-bold text-slate-800">
//                         ₹{route.price.toLocaleString("en-IN")}
//                       </span>
//                       <ChevronRight size={20} className="text-slate-400" />
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Sections */}
//           {airport.sections?.length > 0 &&
//             airport.sections.map((section, idx) => (
//               <div key={idx} className="mb-8">
//                 {section.heading &&
//                   React.createElement(
//                     section.headingType || "h2",
//                     { className: "text-xl font-bold text-slate-800 mb-2" },
//                     section.heading
//                   )}
//                 {section.subheading && (
//                   <h3 className="text-lg font-semibold text-slate-700 mb-2">
//                     {section.subheading}
//                   </h3>
//                 )}
//                 {section.paragraph && (
//                   <p
//                     className={`text-slate-600 mb-2 text-${
//                       section.paragraphAlign || "left"
//                     }`}
//                   >
//                     {section.paragraph}
//                   </p>
//                 )}
//                 {section.image && (
//                   <img
//                     src={section.image}
//                     alt={section.imageAltText || ""}
//                     className="rounded-md mt-2 mb-4"
//                   />
//                 )}
//               </div>
//             ))}

//           {/* FAQs */}
//           {airport.faqs?.length > 0 && (
//             <div className="mt-12">
//               <h2 className="text-2xl font-bold text-slate-800 mb-6">FAQs</h2>
//               <div className="space-y-4">
//                 {airport.faqs.map((faq, index) => (
//                   <div key={index} className="border p-4 rounded-md">
//                     <h3 className="font-semibold text-slate-800 mb-2">
//                       {faq.question}
//                     </h3>
//                     <p className="text-slate-600">{faq.answer}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Sidebar */}
//         <div className="lg:col-span-1">
//           <div className="sticky top-24 space-y-8">
//             {/* Why Book & Extra Info */}
//             <div className="bg-white p-6 rounded-lg shadow-lg border">
//               <img
//                 src="https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png"
//                 alt="Luxury Car"
//                 className="w-full rounded-md mb-4"
//               />
//               <h3 className="font-bold text-center text-lg text-blue-600 mb-6">
//                 Luxury Car Rental at {airport.name}
//               </h3>
//               {airport.whyBook?.length > 0 && (
//                 <div className="bg-slate-50 p-6 rounded-md">
//                   <h4 className="font-bold text-xl text-slate-800 mb-4">
//                     Why book with us
//                   </h4>
//                   <ul className="space-y-3">
//                     {airport.whyBook.map((point, index) => (
//                       <li key={index} className="flex items-center gap-3">
//                         <CheckCircle size={18} className="text-green-500" />
//                         <span className="text-slate-700">{point}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>

//             {airport.extraInfo && (
//               <div className="bg-slate-50 p-6 rounded-lg border">
//                 <h4 className="font-bold text-xl text-slate-800 mb-4">
//                   Extra Info
//                 </h4>
//                 <p className="text-sm text-slate-600">{airport.extraInfo}</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Popular Outstation Routes */}
//       {airport.name && (
//         <div className="bg-blue-50 py-12">
//           <div className="max-w-6xl mx-auto px-4">
//             <h2 className="text-2xl font-bold text-slate-800 mb-6">
//               Popular outstation cab routes from {airport.name}
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3 text-blue-600 font-semibold">
//               <Link to="#" className="hover:underline">
//                 &gt; {airport.name} to Dalhousie
//               </Link>
//               <Link to="#" className="hover:underline">
//                 &gt; {airport.name} to Chandigarh
//               </Link>
//               <Link to="#" className="hover:underline">
//                 &gt; {airport.name} to Jalandhar
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default AirportDetailPage;



// // Added 
// import React, { useEffect, useState } from "react";
// import { useParams, Link, useLocation } from "react-router-dom";
// import { getAirportBySlug } from "../api/airportApi";
// import { CheckCircle, ChevronRight } from "lucide-react";
// import GoZoBooking from "../components/RideBookingForm";

// // Reusable Header & Footer Components
// const Header = () => { /* ... Your Header Component ... */ };

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
//                         <li><a href="/cityrides" className="hover:text-blue-400 transition-colors">City Rides</a></li>
//                         <li><a href="/out-station" className="hover:text-blue-400 transition-colors">Outstation</a></li>
//                         <li><a href="/airport-transfer" className="hover:text-blue-400 transition-colors">Airport Transfer</a></li>
//                         <li><a href="/corporate" className="hover:text-blue-400 transition-colors">Corporate</a></li>
//                     </ul>
//                 </div>
//                 <div>
//                     <h4 className="font-semibold text-white mb-4">Company</h4>
//                     <ul className="text-sm space-y-2">
//                         <li><a href="/" className="hover:text-blue-400 transition-colors">Home</a></li>
//                         <li><a href="/about" className="hover:text-blue-400 transition-colors">About Us</a></li>
//                         <li><a href="/contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
//                         <li><a href="/careers" className="hover:text-blue-400 transition-colors">Careers</a></li>
//                     </ul>
//                 </div>
//                 <div>
//                     <h4 className="font-semibold text-white mb-4">Legal</h4>
//                     <ul className="text-sm space-y-2">
//                         <li><a href="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
//                         <li><a href="/terms-of-service" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
//                         <li><a href="/refund-policy" className="hover:text-blue-400 transition-colors">Refund Policy</a></li>
//                         <li><a href="/cookie-policy" className="hover:text-blue-400 transition-colors">Cookie Policy</a></li>
//                     </ul>
//                 </div>
//             </div>
//             <div className="border-t border-gray-800 pt-8 text-center">
//                 <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} MotuCab Technologies Pvt. Ltd. All Rights Reserved.</p>
//             </div>
//         </div>
//     </footer>
// );

// const AirportDetailPage = () => {
//   const { slug } = useParams();
//   const location = useLocation();
//   const [airport, setAirport] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   // Get prefilled data from navigation state
//   const prefilledData = location.state?.prefillData || null;

//   useEffect(() => {
//     const fetchAirportData = async () => {
//       try {
//         const data = await getAirportBySlug(slug);
//         if (data) setAirport(data);
//         else setError("Airport details not found.");
//       } catch {
//         setError("Failed to load airport details.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAirportData();
//   }, [slug]);

//   if (loading)
//     return <p className="text-center py-20 text-gray-500">Loading...</p>;
//   if (error)
//     return <p className="text-center py-20 text-red-500">{error}</p>;

//   return (
//     <div className="bg-white">
//       {/* Header */}
//       <Header />

//       {/* ✅ Booking Form Hero Section */}
//       <div>
//         <GoZoBooking prefillData={prefilledData} />
//       </div>

//       {/* ================= MAIN CONTENT + SIDEBAR ================= */}
//       <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
//         {/* Main Content */}
//         <div className="lg:col-span-2">
//           <h1 className="text-3xl font-extrabold text-slate-800 mb-4">
//             Book {airport.name} Transfer Cabs Online
//           </h1>
//           <p className="text-slate-600 mb-8">
//             {airport.description || "Detailed description not available for this airport."}
//           </p>

//           {/* Transfers */}
//           {airport.transfers?.length > 0 && (
//             <div className="mb-12">
//               <h2 className="text-2xl font-bold text-slate-800 mb-6">
//                 Popular airport transfers in {airport.name}
//               </h2>
//               <div className="space-y-3">
//                 {airport.transfers.map((route, index) => (
//                   <Link
//                     to="#"
//                     key={index}
//                     className="flex justify-between items-center p-4 border rounded-lg hover:bg-slate-50 transition-colors"
//                   >
//                     <span className="font-semibold text-slate-700">
//                       {airport.name} Airport to {route.destination} transfer
//                     </span>
//                     <div className="flex items-center gap-2">
//                       <span className="text-sm text-slate-500">starting at</span>
//                       <span className="font-bold text-slate-800">
//                         ₹{route.price.toLocaleString("en-IN")}
//                       </span>
//                       <ChevronRight size={20} className="text-slate-400" />
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Sections */}
//           {airport.sections?.length > 0 &&
//             airport.sections.map((section, idx) => (
//               <div key={idx} className="mb-8">
//                 {section.heading &&
//                   React.createElement(
//                     section.headingType || "h2",
//                     { className: "text-xl font-bold text-slate-800 mb-2" },
//                     section.heading
//                   )}
//                 {section.subheading && (
//                   <h3 className="text-lg font-semibold text-slate-700 mb-2">
//                     {section.subheading}
//                   </h3>
//                 )}
//                 {section.paragraph && (
//                   <p
//                     className={`text-slate-600 mb-2 text-${
//                       section.paragraphAlign || "left"
//                     }`}
//                   >
//                     {section.paragraph}
//                   </p>
//                 )}
//                 {section.image && (
//                   <img
//                     src={section.image}
//                     alt={section.imageAltText || ""}
//                     className="rounded-md mt-2 mb-4"
//                   />
//                 )}
//               </div>
//             ))}

//           {/* FAQs */}
//           {airport.faqs?.length > 0 && (
//             <div className="mt-12">
//               <h2 className="text-2xl font-bold text-slate-800 mb-6">FAQs</h2>
//               <div className="space-y-4">
//                 {airport.faqs.map((faq, index) => (
//                   <div key={index} className="border p-4 rounded-md">
//                     <h3 className="font-semibold text-slate-800 mb-2">
//                       {faq.question}
//                     </h3>
//                     <p className="text-slate-600">{faq.answer}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Sidebar */}
//         <div className="lg:col-span-1">
//           <div className="sticky top-24 space-y-8">
//             {/* Why Book & Extra Info */}
//             <div className="bg-white p-6 rounded-lg shadow-lg border">
//               <img
//                 src="https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png"
//                 alt="Luxury Car"
//                 className="w-full rounded-md mb-4"
//               />
//               <h3 className="font-bold text-center text-lg text-blue-600 mb-6">
//                 Luxury Car Rental at {airport.name}
//               </h3>
//               {airport.whyBook?.length > 0 && (
//                 <div className="bg-slate-50 p-6 rounded-md">
//                   <h4 className="font-bold text-xl text-slate-800 mb-4">
//                     Why book with us
//                   </h4>
//                   <ul className="space-y-3">
//                     {airport.whyBook.map((point, index) => (
//                       <li key={index} className="flex items-center gap-3">
//                         <CheckCircle size={18} className="text-green-500" />
//                         <span className="text-slate-700">{point}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>

//             {airport.extraInfo && (
//               <div className="bg-slate-50 p-6 rounded-lg border">
//                 <h4 className="font-bold text-xl text-slate-800 mb-4">
//                   Extra Info
//                 </h4>
//                 <p className="text-sm text-slate-600">{airport.extraInfo}</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Popular Outstation Routes */}
//       {airport.name && (
//         <div className="bg-blue-50 py-12">
//           <div className="max-w-6xl mx-auto px-4">
//             <h2 className="text-2xl font-bold text-slate-800 mb-6">
//               Popular outstation cab routes from {airport.name}
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3 text-blue-600 font-semibold">
//               <Link to="#" className="hover:underline">
//                 &gt; {airport.name} to Dalhousie
//               </Link>
//               <Link to="#" className="hover:underline">
//                 &gt; {airport.name} to Chandigarh
//               </Link>
//               <Link to="#" className="hover:underline">
//                 &gt; {airport.name} to Jalandhar
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default AirportDetailPage;


// import React, { useEffect, useState, useRef } from "react";
// import { useParams, Link, useLocation } from "react-router-dom";
// import { CheckCircle } from "lucide-react";
// import GoZoBooking from "../components/RideBookingForm";
// import { getAirportBySlug } from "../api/airportApi";

// // Import your car images (make sure the path is correct)
// import img1 from "../assets/car-mini-motucabs.webp";
// import img2 from "../assets/innova-motucabs.jpg";
// import img3 from "../assets/prime-sedan.webp";
// import img4 from "../assets/tempo_12_seater-motucabs.webp";

// // --- DYNAMIC MOCK DATA GENERATOR ---
// const generateAirportData = (airportName) => {
//   return {
//     name: airportName,
//     description:
//       `Motu Cabs Offers a hassle-free airport transfer cabs booking option at a cheaper price from ${airportName} Airport to anywhere you want, be it in intercity, one-way or outstation or anything Motu Cabs covers it all by just clicking Motu Cabs app from your smartphone or from Motu Cabs official website. Book online the cheapest and best Airport cab booking service from the airport to anywhere in India with Motu.`,
//     transfers: [
//       { destination: `${airportName} (within City)`, price: 1076 },
//       { destination: "Kanpur", price: 1356 },
//       { destination: "Prayagraj", price: 2725 },
//       { destination: "Agra", price: 3996 },
//       { destination: "Bareilly", price: 3065 },
//       { destination: "Delhi", price: 6101 },
//       { destination: "Noida", price: 6459 },
//       { destination: "Varanasi", price: 4269 },
//       { destination: "Gurugram", price: 6782 },
//       { destination: "Ayodhya", price: 2025 },
//       { destination: "Gorakhpur", price: 3794 },
//     ],
//     sections: [
//       {
//         heading: `${airportName} Airport Transfers, with Motu's airport cab service`,
//         paragraph: `When arriving in ${airportName} Airport, why wait in long lines for taxi or try to figure out the local transport options when you can have your driver waiting at the airport to pick you up. We can have you driver be waiting for you at arrivals, help you with your luggage and answer any questions you may have about your journey. All our airport pickup drivers are local and in many cases, can understand English. You will receive the phone contact details of your driver my email and SMS, so you can be worry-free. Gozo's 24x7 customer support is available by phone or chat should you need any assistance.`,
//       },
//       {
//         heading: `Motu Cabs is available to you for your travel to and beyond ${airportName}`,
//         paragraph: `Motu Cabs is with you on your travel to or From ${airportName} and throughout India. Our cabs are available for simple one-way intercity and outstation drops to cities like and many more. You can also book transfers straight to ${airportName} Airport from Travel to and from ${airportName} can be done by booking your one-way trip, round-trip, customized multi-city itinerary in a AC sedan, SUVs or for larger groups to take tempo travellers (minibus) in ${airportName}.`,
//       },
//       {
//         heading: `Luxury chauffeur driven car rentals and limos in ${airportName}`,
//         paragraph: `You can also book luxury vehicles of various classes and brands like Hondas, Toyotas, Audis, BMWs, Mercedes in ${airportName} for airport transfers or day-based rentals. Simply contact us to check for availability and pricing for Luxury vehicles.`,
//       },
//     ],
//     whyBook: [
//       "Excellent reputation",
//       "No credit card fees",
//       "Tolls included",
//       "Free cancellation",
//       "Professional drivers",
//       "Hassle-free booking",
//     ],
//     faqs: [
//         {
//           question: `How can I book a cab from ${airportName} Airport?`,
//           answer: `You can easily book a cab from ${airportName} Airport through our website or mobile app. Just enter your pickup location, destination, and travel date, and choose from the available cab options.`,
//         },
//         {
//           question: "Are the fares inclusive of all taxes?",
//           answer: "Yes, the fares shown are all-inclusive. They include GST, tolls, and state taxes. There are no hidden charges.",
//         },
//         {
//           question: "Can I cancel my booking?",
//           answer: "Yes, we offer free cancellation on most bookings. Please refer to our cancellation policy for more details on the specific terms and conditions."
//         }
//     ],
//     extraInfo: `For any queries or assistance, our 24/7 customer support is always available to help you. Travel with peace of mind with MotuCab.`
//   };
// };


// // --- MOCK API FUNCTION ---
// // const getAirportBySlug = async (slug) => {
// //   console.log("Fetching data for slug:", slug);
// //   // Create a display-friendly name from the slug (e.g., "patna" -> "Patna")
// //   const airportName = slug.charAt(0).toUpperCase() + slug.slice(1);
  
// //   // Generate the data dynamically
// //   const airportData = generateAirportData(airportName);

// //   // Simulating an API call delay
// //   return new Promise(resolve => {
// //     setTimeout(() => {
// //       resolve(airportData);
// //     }, 500);
// //   });
// // };
// // --- END of MOCK ---

// const Header = () => { /* ... Your Existing Header Component ... */ };

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
//                         <li><a href="/cityrides" className="hover:text-blue-400 transition-colors">City Rides</a></li>
//                         <li><a href="/out-station" className="hover:text-blue-400 transition-colors">Outstation</a></li>
//                         <li><a href="/airport-transfer" className="hover:text-blue-400 transition-colors">Airport Transfer</a></li>
//                         <li><a href="/corporate" className="hover:text-blue-400 transition-colors">Corporate</a></li>
//                     </ul>
//                 </div>
//                 <div>
//                     <h4 className="font-semibold text-white mb-4">Company</h4>
//                     <ul className="text-sm space-y-2">
//                         <li><a href="/" className="hover:text-blue-400 transition-colors">Home</a></li>
//                         <li><a href="/about" className="hover:text-blue-400 transition-colors">About Us</a></li>
//                         <li><a href="/contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
//                         <li><a href="/careers" className="hover:text-blue-400 transition-colors">Careers</a></li>
//                     </ul>
//                 </div>
//                 <div>
//                     <h4 className="font-semibold text-white mb-4">Legal</h4>
//                     <ul className="text-sm space-y-2">
//                         <li><a href="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
//                         <li><a href="/terms-of-service" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
//                         <li><a href="/refund-policy" className="hover:text-blue-400 transition-colors">Refund Policy</a></li>
//                         <li><a href="/cookie-policy" className="hover:text-blue-400 transition-colors">Cookie Policy</a></li>
//                     </ul>
//                 </div>
//             </div>
//             <div className="border-t border-gray-800 pt-8 text-center">
//                 <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} MotuCab Technologies Pvt. Ltd. All Rights Reserved.</p>
//             </div>
//         </div>
//     </footer>
// );


// const AirportDetailPage = () => {
//   const { slug } = useParams();
//   const location = useLocation();
//   const [airport, setAirport] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   const [dynamicPrefill, setDynamicPrefill] = useState(null);
//   const bookingFormRef = useRef(null);
//   const prefilledDataFromLocation = location.state?.prefillData || null;

//   const horizontalImages = [
//     { src: img1, alt: "Mini Cab", description: "Swift, Celerio or equivalent" },
//     { src: img3, alt: "Sedan Cab", description: "Dzire, Etios or equivalent" },
//     { src: img2, alt: "SUV Cab", description: "Innova, Ertiga or equivalent" },
//     { src: img4, alt: "Tempo Traveller", description: "Tempo Traveller (12 seater)" },
//   ];
// useEffect(() => {
//     const fetchAirportData = async () => {
//       if (!slug) {
//         setError("No airport specified in the URL.");
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);
//         setError(null); 
//         // ✅ STEP 3: THIS NOW CALLS THE CORRECT, IMPORTED FUNCTION
//         const data = await getAirportBySlug(slug);

//         if (data) {
//           setAirport(data);
//         } else {
//           setError(`Sorry, we couldn't find details for "${slug}".`);
//           setAirport(null); 
//         }
//       } catch (error) {
//         console.error("Failed to fetch airport data:", error);
//         setError("Failed to load airport details. Please check your connection.");
//         setAirport(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAirportData();
//   }, [slug]);


//   const handleBookNowClick = () => {
//     bookingFormRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
//   };
  
//   const handleRouteBookClick = (destination) => {
//     setDynamicPrefill({
//         from: `${airport.name} Airport`,
//         to: destination,
//     });
//     bookingFormRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
//   };


//   if (loading)
//     return <p className="text-center py-20 text-gray-500">Loading...</p>;
//   if (error)
//     return <p className="text-center py-20 text-red-500">{error}</p>;
//   if (!airport)
//     return <p className="text-center py-20 text-gray-500">No airport data available.</p>;


//   return (
//     <div className="bg-white">
//       <Header />

//       <div ref={bookingFormRef}>
//         <GoZoBooking prefillData={dynamicPrefill || prefilledDataFromLocation} />
//       </div>

//       <div className="bg-gray-100 py-16">
//         <div className="max-w-7xl mx-auto px-6">
//             <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">Our Fleet of Cabs</h2>
//             <p className="text-center text-slate-600 mb-12">Choose from a wide range of cars to suit your needs.</p>
//            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//               {horizontalImages.map((img, index) => (
//                 <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300">
//                   <div className="w-full h-48 bg-gray-50 flex items-center justify-center p-4">
//                     <img src={img.src} alt={img.alt} className="max-w-full max-h-full object-contain" />
//                   </div>
//                   {img.description && <p className="px-4 pt-4 pb-2 text-black font-semibold text-center text-base">{img.description}</p>}
//                   <div className="px-4 py-4 flex justify-center mt-auto">
//                     <button onClick={handleBookNowClick} className="px-5 py-2 bg-gradient-to-r from-blue-600 to-orange-500 text-white font-semibold rounded-lg hover:opacity-90 transition w-full">
//                       Book Now
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
//         <div className="lg:col-span-2">
//           <h1 className="text-3xl font-extrabold text-slate-800 mb-4">
//             Book {airport.name} Transfer Cabs Online
//           </h1>
//           <p className="text-slate-600 mb-8 leading-relaxed">
//             {airport.description}
//           </p>
          
//           {airport.sections?.map((section, idx) => (
//             <div key={idx} className="mb-8">
//               {section.heading && React.createElement("h2", { className: "text-2xl font-bold text-slate-800 mb-4" }, section.heading)}
//               {section.paragraph && <p className="text-slate-600 mb-2 leading-relaxed">{section.paragraph}</p>}
//             </div>
//           ))}

//           {airport.transfers?.length > 0 && (
//             <div className="my-12">
//               <h2 className="text-2xl font-bold text-slate-800 mb-6">
//                 Popular airport transfers from {airport.name} Airport
//               </h2>
//               <div className="space-y-3">
//                 {airport.transfers.map((route, index) => (
//                   <div key={index} className="flex justify-between items-center p-4 border rounded-lg hover:bg-slate-50 transition-colors">
//                     <span className="font-semibold text-slate-700">
//                        {airport.name} Airport to {route.destination} transfer
//                     </span>
//                     <button onClick={() => handleRouteBookClick(route.destination)} className="px-4 py-2 bg-blue-600 text-white font-semibold text-sm rounded-md hover:bg-blue-700 transition-colors">
//                        Book Now
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* FAQs Section */}
//           {airport.faqs?.length > 0 && (
//             <div className="mt-12">
//               <h2 className="text-2xl font-bold text-slate-800 mb-6">Frequently Asked Questions</h2>
//               <div className="space-y-4">
//                 {airport.faqs.map((faq, index) => (
//                   <div key={index} className="border p-4 rounded-lg bg-slate-50">
//                     <h3 className="font-semibold text-slate-800 mb-2">{faq.question}</h3>
//                     <p className="text-slate-600">{faq.answer}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="lg:col-span-1">
//           <div className="sticky top-24 space-y-8">
//             <div className="bg-white p-6 rounded-lg shadow-lg border">
//               <img src="https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png" alt="Luxury Car" className="w-full rounded-md mb-4" />
//               <h3 className="font-bold text-center text-lg text-blue-600 mb-6">
//                 Luxury Car Rental at {airport.name} Airport
//               </h3>
//               {airport.whyBook?.length > 0 && (
//                 <div className="bg-slate-50 p-6 rounded-md">
//                   <h4 className="font-bold text-xl text-slate-800 mb-4">Why book with us</h4>
//                   <ul className="space-y-3">
//                     {airport.whyBook.map((point, index) => (
//                       <li key={index} className="flex items-center gap-3">
//                         <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
//                         <span className="text-slate-700">{point}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>

//             {airport.extraInfo && (
//               <div className="bg-slate-50 p-6 rounded-lg border">
//                 <h4 className="font-bold text-xl text-slate-800 mb-4">Extra Info</h4>
//                 <p className="text-sm text-slate-600">{airport.extraInfo}</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {airport.name && (
//         <div className="bg-blue-50 py-12">
//           <div className="max-w-6xl mx-auto px-4">
//             <h2 className="text-2xl font-bold text-slate-800 mb-6">
//               Popular outstation cab routes from {airport.name}
//             </h2>
//             <div className="space-y-3">
//               {[ "Dalhousie", "Chandigarh", "Jalandhar", "Manali", "Shimla", "Dehradun" ].map((destination, index) => (
//                 <div key={index} className="flex justify-between items-center p-4 border rounded-lg bg-white hover:bg-slate-50 transition-colors">
//                   <span className="font-semibold text-slate-700">{airport.name} to {destination}</span>
//                   <button onClick={() => handleRouteBookClick(destination)} className="px-4 py-2 bg-blue-600 text-white font-semibold text-sm rounded-md hover:bg-blue-700 transition-colors">
//                     Book Now
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </div>
//   );
// };

// export default AirportDetailPage;



import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import GoZoBooking from "../components/RideBookingForm";
import { Helmet } from "react-helmet";

// Import your car images (make sure the path is correct)
import img1 from "../assets/car-mini-motucabs.webp";
import img2 from "../assets/innova-motucabs.jpg";
import img3 from "../assets/prime-sedan.webp";
import img4 from "../assets/tempo_12_seater-motucabs.webp";

// --- PERMANENT DATA GENERATOR (STYLES FIXED) ---
const generateAirportData = (airportName) => {
  // airportName will be "Jaipur Airport"
  const cityName = airportName.split(' ')[0]; // This will be "Jaipur"
  return {
    name: airportName,
    description:
      `Motu Cabs Offers a hassle-free airport transfer cabs booking option at a cheaper price from ${airportName} to anywhere you want, be it in intercity, one-way or outstation or anything Motu Cabs covers it all by just clicking Motu Cabs app from your smartphone or from Motu Cabs official website. Book online the cheapest and best Airport cab booking service from the airport to anywhere in India with Motu.`,
    transfers: [
      { destination: `${cityName} (within City)` },
      { destination: "Kanpur" },
      { destination: "Prayagraj" },
      { destination: "Agra" },
      { destination: "Bareilly" },
      { destination: "Delhi" },
    ],
    sections: [
      {
        heading: `${airportName} Transfers, with Motu's airport cab service`,
        paragraph: `When arriving in ${airportName}, why wait in long lines for taxi or try to figure out the local transport options when you can have your driver waiting at the airport to pick you up. We can have you driver be waiting for you at arrivals, help you with your luggage and answer any questions you may have about your journey. All our airport pickup drivers are local and in many cases, can understand English. You will receive the phone contact details of your driver my email and SMS, so you can be worry-free. Gozo's 24x7 customer support is available by phone or chat should you need any assistance.`,
      },
      {
        heading: `Motu Cabs is available to you for your travel to and beyond ${cityName}`,
        paragraph: `Motu Cabs is with you on your travel to or From ${cityName} and throughout India. Our cabs are available for simple one-way intercity and outstation drops to cities like and many more. You can also book transfers straight to ${airportName} from Travel to and from ${cityName} can be done by booking your one-way trip, round-trip, customized multi-city itinerary in a AC sedan, SUVs or for larger groups to take tempo travellers (minibus) in ${cityName}.`,
      },
      {
        heading: `Luxury chauffeur driven car rentals and limos in ${cityName}`,
        paragraph: `You can also book luxury vehicles of various classes and brands like Hondas, Toyotas, Audis, BMWs, Mercedes in ${cityName} for airport transfers or day-based rentals. Simply contact us to check for availability and pricing for Luxury vehicles.`,
      },
    ],
    whyBook: [ "Excellent reputation", "No credit card fees", "Tolls included", "Free cancellation", "Professional drivers", "Hassle-free booking" ],
    faqs: [
        {
          question: `How can I book a cab from ${airportName}?`,
          answer: `You can easily book a cab from ${airportName} through our website or mobile app. Just enter your pickup location, destination, and travel date, and choose from the available cab options.`,
        },
        { question: "Are the fares inclusive of all taxes?", answer: "Yes, the fares shown are all-inclusive. They include GST, tolls, and state taxes. There are no hidden charges." },
        { question: "Can I cancel my booking?", answer: "Yes, we offer free cancellation on most bookings. Please refer to our cancellation policy for more details on the specific terms and conditions." }
    ],
    extraInfo: `For any queries or assistance, our 24/7 customer support is always available to help you. Travel with peace of mind with MotuCab.`
  };
};

// --- LOCAL DATA FETCHER ---
const getAirportBySlug = async (slug) => {
  const airportName = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  const airportData = generateAirportData(airportName);
  return new Promise(resolve => setTimeout(() => resolve(airportData), 300));
};

const Header = () => { /* ... Your Header Component ... */ };
const Footer = () => { /* ... Your Footer Component ... */ };

const AirportDetailPage = () => {
  const { slug } = useParams();
  const location = useLocation();
  const [airport, setAirport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [dynamicPrefill, setDynamicPrefill] = useState(null);
  const bookingFormRef = useRef(null);
  const prefilledDataFromLocation = location.state?.prefillData || null;

  const horizontalImages = [
    { src: img1, alt: "Mini Cab", description: "Swift, Celerio or equivalent" },
    { src: img3, alt: "Sedan Cab", description: "Dzire, Etios or equivalent" },
    { src: img2, alt: "SUV Cab", description: "Innova, Ertiga or equivalent" },
    { src: img4, alt: "Tempo Traveller", description: "Tempo Traveller (12 seater)" },
  ];

  useEffect(() => {
    const fetchAirportData = async () => {
      if (!slug) {
        setError("No airport specified in the URL.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null); 
        const data = await getAirportBySlug(slug);
        if (data) {
          setAirport(data);
        } else {
          setError(`Sorry, we couldn't find details for "${slug}".`);
          setAirport(null); 
        }
      } catch (error) {
        console.error("Failed to fetch airport data:", error);
        setError("Failed to load airport details. Please check your connection.");
        setAirport(null);
      } finally {
        setLoading(false);
      }
    };
    fetchAirportData();
  }, [slug]);

  const handleBookNowClick = () => {
    bookingFormRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  
  const handleRouteBookClick = (destination) => {
    setDynamicPrefill({
        from: airport.name, // ✅ FIXED: Extra "Airport" removed
        to: destination,
    });
    bookingFormRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  if (loading) return <p className="text-center py-20 text-gray-500">Loading...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;
  if (!airport) return <p className="text-center py-20 text-gray-500">No airport data available.</p>;

  return (
    <div className="bg-white">

       <Helmet>
        <title>Book {airport.name} Transfer Cabs Online</title>
        <meta name="title" content={`Book ${airport.name} Transfer Cabs Online`} />
        <meta
          name="description"
          content={`Hire ${airport.name} transfer cabs with MotuCabs. Book the cheapest and best airport taxi service from ${airport.name} to anywhere in India.`}
        />
        <meta
          name="keywords"
          content="airport transfer service, delhi airport transfer, cab booking, online cab booking, luxury car rental, airport pickup, airport drop, one-way cab, round-trip cab, SUV rental, AC cab service"
        />
        <link
          rel="canonical"
          href={`https://www.motucabs.com/airport-transfer/${slug}`}
        />
        <meta name="copyright" content="copyright @motucabs. All Rights Reserved" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      
      <Header />
      <div ref={bookingFormRef}>
        <GoZoBooking prefillData={dynamicPrefill || prefilledDataFromLocation} />
      </div>
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">Our Fleet of Cabs</h2>
            <p className="text-center text-slate-600 mb-12">Choose from a wide range of cars to suit your needs.</p>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {horizontalImages.map((img, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300">
                  <div className="w-full h-48 bg-gray-50 flex items-center justify-center p-4">
                    <img src={img.src} alt={img.alt} className="max-w-full max-h-full object-contain" />
                  </div>
                  {img.description && <p className="px-4 pt-4 pb-2 text-black font-semibold text-center text-base">{img.description}</p>}
                  <div className="px-4 py-4 flex justify-center mt-auto">
                    <button onClick={handleBookNowClick} className="px-5 py-2 bg-gradient-to-r from-blue-600 to-orange-500 text-white font-semibold rounded-lg hover:opacity-90 transition w-full">Book Now</button>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-extrabold text-slate-800 mb-6">Book {airport.name} Transfer Cabs Online</h1>
          <p className="text-slate-600 mb-8 leading-relaxed text-lg">{airport.description}</p>
          
          {airport.sections?.map((section, idx) => (
            <div key={idx} className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">{section.heading}</h2>
              <p className="text-slate-600 mb-2 leading-relaxed">{section.paragraph}</p>
            </div>
          ))}
          
          {airport.transfers?.length > 0 && (
            <div className="my-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Popular airport transfers from {airport.name}</h2>
              <div className="space-y-3">
                {airport.transfers.map((route, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                    <span className="font-semibold text-slate-700">{airport.name} to {route.destination} transfer</span>
                    <button onClick={() => handleRouteBookClick(route.destination)} className="px-4 py-2 bg-blue-600 text-white font-semibold text-sm rounded-md hover:bg-blue-700 transition-colors">Book Now</button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {airport.faqs?.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {airport.faqs.map((faq, index) => (
                  <div key={index} className="border p-4 rounded-lg bg-slate-50">
                    <h3 className="font-semibold text-slate-800 mb-2">{faq.question}</h3>
                    <p className="text-slate-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-lg border">
              <img src="https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png" alt="Luxury Car" className="w-full rounded-md mb-4" />
              <h3 className="font-bold text-center text-lg text-blue-600 mb-6">Luxury Car Rental at {airport.name}</h3>
              {airport.whyBook?.length > 0 && (
                <div className="bg-slate-50 p-6 rounded-md">
                  <h4 className="font-bold text-xl text-slate-800 mb-4">Why book with us</h4>
                  <ul className="space-y-3">
                    {airport.whyBook.map((point, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                        <span className="text-slate-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {airport.extraInfo && (
              <div className="bg-slate-50 p-6 rounded-lg border">
                <h4 className="font-bold text-xl text-slate-800 mb-4">Extra Info</h4>
                <p className="text-sm text-slate-600">{airport.extraInfo}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {airport.name && (
        <div className="bg-blue-50 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Popular outstation cab routes from {airport.name}</h2>
            <div className="space-y-3">
              {[ "Dalhousie", "Chandigarh", "Jalandhar", "Manali", "Shimla", "Dehradun" ].map((destination, index) => (
                <div key={index} className="flex justify-between items-center p-4 border rounded-lg bg-white hover:bg-slate-50 transition-colors">
                  <span className="font-semibold text-slate-700">{airport.name} to {destination}</span>
                  <button onClick={() => handleRouteBookClick(destination)} className="px-4 py-2 bg-blue-600 text-white font-semibold text-sm rounded-md hover:bg-blue-700 transition-colors">Book Now</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default AirportDetailPage;









// import React, { useEffect, useState } from "react";
// import { useParams, Link, useLocation } from "react-router-dom";
// import { getAirportBySlug } from "../api/airportApi";
// import { CheckCircle, ChevronRight } from "lucide-react";
// import GoZoBooking from "../components/RideBookingForm";

// // 🟦 Imported Images
// import img1 from "../assets/car-mini-motucabs.webp";
// import img2 from "../assets/innova-motucabs.jpg";
// import img3 from "../assets/prime-sedan.webp";
// import img4 from "../assets/tempo_12_seater-motucabs.webp";


// // 🟩 Header Component
// const Header = () => (
//   <header className="bg-white shadow sticky top-0 z-50">
//     <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
//       <Link to="/" className="text-2xl font-bold text-blue-600">
//         Motu<span className="text-orange-500">Cab</span>
//       </Link>
//       <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
//         <Link to="/cityrides" className="hover:text-blue-600">City Rides</Link>
//         <Link to="/out-station" className="hover:text-blue-600">Outstation</Link>
//         <Link to="/airport-transfer" className="hover:text-blue-600">Airport</Link>
//         <Link to="/corporate" className="hover:text-blue-600">Corporate</Link>
//         <Link to="/contact" className="hover:text-blue-600">Contact</Link>
//       </nav>
//     </div>
//   </header>
// );

// // 🟧 Footer Component
// const Footer = () => (
//   <footer className="bg-gray-900 text-gray-300">
//     <div className="max-w-7xl mx-auto px-8 py-12">
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
//         <div>
//           <div className="text-2xl font-bold mb-4">
//             <span className="text-blue-600">
//               Motu<span className="text-orange-500">Cab</span>
//             </span>
//           </div>
//           <p className="text-sm text-gray-400 leading-relaxed">
//             Reliable, safe, and affordable rides with MotuCab — your trusted travel partner for city, outstation, and airport transfers.
//           </p>
//         </div>
//         <div>
//           <h4 className="font-semibold text-white mb-4">Services</h4>
//           <ul className="text-sm space-y-2">
//             <li><a href="/cityrides" className="hover:text-blue-400">City Rides</a></li>
//             <li><a href="/out-station" className="hover:text-blue-400">Outstation</a></li>
//             <li><a href="/airport-transfer" className="hover:text-blue-400">Airport Transfer</a></li>
//             <li><a href="/corporate" className="hover:text-blue-400">Corporate</a></li>
//           </ul>
//         </div>
//         <div>
//           <h4 className="font-semibold text-white mb-4">Company</h4>
//           <ul className="text-sm space-y-2">
//             <li><a href="/" className="hover:text-blue-400">Home</a></li>
//             <li><a href="/about" className="hover:text-blue-400">About Us</a></li>
//             <li><a href="/contact" className="hover:text-blue-400">Contact</a></li>
//             <li><a href="/careers" className="hover:text-blue-400">Careers</a></li>
//           </ul>
//         </div>
//         <div>
//           <h4 className="font-semibold text-white mb-4">Legal</h4>
//           <ul className="text-sm space-y-2">
//             <li><a href="/privacy-policy" className="hover:text-blue-400">Privacy Policy</a></li>
//             <li><a href="/terms-of-service" className="hover:text-blue-400">Terms of Service</a></li>
//             <li><a href="/refund-policy" className="hover:text-blue-400">Refund Policy</a></li>
//             <li><a href="/cookie-policy" className="hover:text-blue-400">Cookie Policy</a></li>
//           </ul>
//         </div>
//       </div>
//       <div className="border-t border-gray-800 pt-8 text-center">
//         <p className="text-sm text-gray-400">
//           &copy; {new Date().getFullYear()} MotuCab Technologies Pvt. Ltd. All Rights Reserved.
//         </p>
//       </div>
//     </div>
//   </footer>
// );

// const AirportDetailPage = () => {
//   const { slug } = useParams();
//   const location = useLocation();
//   const [airport, setAirport] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const prefilledData = location.state?.prefillData || null;

//   const horizontalImages = [
//     { src: img1, alt: "cab1", description: "Swift, Celerio or equivalent" },
//     { src: img3, alt: "cab2", description: "Dzire, Etios or equivalent" },
//     { src: img2, alt: "cab3", description: "Innova, Ertiga or equivalent" },
//     { src: img4, alt: "cab4", description: "Tempo Traveller (12 seater)" },
//   ];

//   const handleBookNowClick = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   useEffect(() => {
//     const fetchAirportData = async () => {
//       try {
//         const data = await getAirportBySlug(slug);
//         if (data) setAirport(data);
//         else setError("Airport details not found.");
//       } catch {
//         setError("Failed to load airport details.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAirportData();
//   }, [slug]);

//   if (loading) return <p className="text-center py-20 text-gray-500">Loading...</p>;
//   if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

//   return (
//     <div className="bg-white">
//       <Header />

//       {/* Booking Form */}
//       <div>
//         <GoZoBooking prefillData={prefilledData} />
//       </div>

      

//       {/* 4-Car Section */}
//       <div className="max-w-7xl mx-auto px-6 mb-16">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//           {horizontalImages.map((img, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300"
//             >
//               <div className="w-full h-60 md:h-64 lg:h-72 bg-gray-50 flex items-center justify-center">
//                 <img
//                   src={img.src}
//                   alt={img.alt}
//                   className="w-5/6 h-full object-contain object-center"
//                 />
//               </div>
//               {img.description && (
//                 <p className="px-4 pt-4 pb-2 text-black font-semibold text-center text-sm md:text-base">
//                   {img.description}
//                 </p>
//               )}
//               <div className="px-4 py-3 flex justify-center">
//                 <button
//                   onClick={handleBookNowClick}
//                   className="px-5 py-2 bg-gradient-to-r from-blue-600 to-orange-500 text-white font-semibold rounded hover:opacity-90 transition"
//                 >
//                   Book Now
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Airport Text Section */}
//       <div className="max-w-6xl mx-auto px-6 mb-16 text-slate-700 leading-relaxed">
//         <h2 className="text-3xl font-extrabold text-slate-800 mb-6">
//           Book {airport.name} Airport Transfer Cabs Online
//         </h2>
//         <p className="mb-4">
//           <strong>{airport.name} Airport Transfers</strong> with MotuCab offers a
//           seamless, affordable, and comfortable way to reach your destination.
//           Skip long queues and enjoy a professional airport pickup experience with
//           our reliable drivers.
//         </p>
//         <p className="mb-4">
//           MotuCab provides easy online booking for airport transfers from{" "}
//           {airport.name} Airport to any city, one-way or outstation destination.
//           Choose from a variety of cars — hatchbacks, sedans, SUVs, or premium
//           vehicles — depending on your comfort and group size.
//         </p>
//         <p className="mb-4">
//           Our drivers track your flight arrival to ensure timely pickup, even in
//           case of delays. You’ll receive your driver’s details via SMS and email
//           before arrival. All vehicles are sanitized, GPS-enabled, and driven by
//           courteous professionals.
//         </p>
//         <p className="mb-4">
//           <strong>Why choose MotuCab?</strong> Because we offer transparent
//           pricing, 24x7 support, instant booking confirmation, and premium comfort
//           at affordable fares. Whether it’s a business trip, family vacation, or
//           late-night flight, MotuCab ensures a safe and stress-free ride.
//         </p>
//         <p className="mb-4">
//           <strong>Popular airport transfers from {airport.name}:</strong>{" "}
//           {airport.transfers?.slice(0, 3)?.map((t, i) => (
//             <span key={i}> {t.destination}{i < 2 ? "," : ""}</span>
//           ))}{" "}
//           and more.
//         </p>
//         <p>
//           Experience the best airport cab service in India — book your next ride
//           with MotuCab today and travel with peace of mind.
//         </p>
//       </div>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default AirportDetailPage;




