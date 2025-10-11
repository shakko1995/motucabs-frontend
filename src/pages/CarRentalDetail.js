// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from 'axios';
// import { CheckCircle, ChevronRight, Star } from 'lucide-react';

// // Reusable Header & Footer Components
// const Header = () => { /* ... */ };
// const Footer = () => { /* ... */ };

// const CarRentalDetailPage = () => {
//     const { slug } = useParams();
//     const [rental, setRental] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchRentalDetails = async () => {
//             try {
//                 const res = await axios.get(`http://localhost:5000/api/car-rentals/${slug}`);
//                 if (res.data) {
//                     setRental(res.data);
//                 }
//             } catch (err) {
//                 setError("Could not load rental details.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchRentalDetails();
//     }, [slug]);

//     if (loading) return <p className="text-center py-20">Loading...</p>;
//     if (error) return <p className="text-center py-20 text-red-500">{error}</p>;
//     if (!rental) return <p className="text-center py-20">No details found for this location.</p>;

//     return (
//         <div className="bg-white">
//             <Header />
//             <div className="max-w-6xl mx-auto px-4 py-12">
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
//                     {/* Left Column: Main Content */}
//                     <div className="lg:col-span-2 space-y-12">
//                         <div>
//                             <h1 className="text-3xl font-extrabold text-slate-800 mb-2">
//                                 Book Sanitized & Disinfected car rental in {rental.name} with driver for local and outstation trips with Gozo
//                             </h1>
//                             <div className="flex items-center gap-2 text-yellow-500 mb-6">
//                                 <Star size={18} fill="currentColor"/>
//                                 <span className="text-sm text-gray-600">(13685 reviews)</span>
//                             </div>

//                             <div className="prose max-w-none text-slate-600 leading-relaxed space-y-4">
//                                 {rental.description?.map((para, i) => <p key={i}>{para}</p>)}
//                             </div>
//                         </div>
                        
//                         <div>
//                             <h2 className="text-2xl font-bold text-slate-800 mb-6">Hourly car rental fares for local trips with Gozo Cabs Day Rental!</h2>
//                             <div className="space-y-3">
//                                 {rental.packages?.map((pkg, index) => (
//                                     <Link to="#" key={index} className="flex justify-between items-center p-4 border rounded-lg hover:bg-slate-50">
//                                         <span className="font-semibold">{pkg.hours} Hrs & {pkg.distanceLimitKm} Kms local rental</span>
//                                         <div className="flex items-center gap-2">
//                                             <span className="text-sm text-slate-500">starting at</span>
//                                             <span className="font-bold">₹{pkg.price.toLocaleString('en-IN')}</span>
//                                             <ChevronRight size={20} className="text-slate-400"/>
//                                         </div>
//                                     </Link>
//                                 ))}
//                             </div>
//                         </div>

//                         <div>
//                             <h2 className="text-2xl font-bold text-slate-800 mb-4">Why book a day rental with Gozo?</h2>
//                              <ul className="list-disc list-inside space-y-3 text-slate-600">
//                                 {rental.whyBook?.map((point, i) => <li key={i}>{point}</li>)}
//                             </ul>
//                         </div>

//                         <div className="bg-blue-50 p-8 rounded-lg">
//                             <h2 className="text-2xl font-bold text-slate-800 mb-6">Popular outstation cab routes</h2>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3 text-blue-600 font-semibold">
//                                  {rental.outstationFares?.map((route, i) => (
//                                     <Link to="#" key={i} className="hover:underline">&gt; {rental.name} to {route.destination}</Link>
//                                  ))}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Right Column: Sidebar */}
//                     <div className="lg:col-span-1">
//                         <div className="sticky top-28 space-y-8">
//                               <img src="https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png" alt="Luxury Car" className="w-full rounded-md mb-4" />
//                               <h3 className="font-bold text-center text-lg text-blue-600 mb-6">Luxury Car Rental in {rental.name}</h3>
//                              <div className="bg-slate-50 p-6 rounded-lg border">
                                
//                                 <h3 className="font-bold text-xl text-slate-800 mb-4">{rental.name} at a Glance</h3>
//                                 <p className="text-sm text-slate-600">{rental.atAGlance}</p>
//                              </div>
//                              <div className="space-y-2">
//                                 <h3 className="font-bold text-xl text-slate-800 mb-4">FAQs About Delhi Cabs</h3>
//                                 {rental.faqs?.map((faq, i) => (
//                                     <div key={i} className="p-3 bg-white border rounded shadow-sm text-left">
//                                         <h4 className="font-semibold">{faq.question}</h4>
//                                     </div>
//                                 ))}
//                              </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// }

// export default CarRentalDetailPage;


// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import { CheckCircle, ChevronRight, Star } from "lucide-react";
// import GoZoBooking from "../components/RideBookingForm";




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
//                         <li><a href="/city-rides" className="hover:text-blue-400 transition-colors">City Rides</a></li>
//                         <li><a href="/outstation" className="hover:text-blue-400 transition-colors">Outstation</a></li>
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

// const CarRentalDetailPage = () => {
//   const { slug } = useParams();
//   const [rental, setRental] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

  

//   useEffect(() => {
//     const fetchRentalDetails = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/car-rentals/${slug}`
//         );
//         if (res.data) {
//           setRental(res.data);
//         }
//       } catch (err) {
//         setError("Could not load rental details.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchRentalDetails();
//   }, [slug]);

//   if (loading) return <p className="text-center py-20">Loading...</p>;
//   if (error)
//     return <p className="text-center py-20 text-red-500">{error}</p>;
//   if (!rental)
//     return (
//       <p className="text-center py-20">
//         No details found for this location.
//       </p>
//     );

//   return (
//     <div className="bg-white">
//       {/* Header */}
      

//       {/* ✅ Booking Form Hero Section */}
//      <div >
//         <GoZoBooking />
//       </div>

//       {/* ================= MAIN CONTENT + SIDEBAR ================= */}
//       <div className="max-w-6xl mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
//           {/* Left Column: Main Content */}
//           <div className="lg:col-span-2 space-y-12">
//             <div>
//               <h1 className="text-3xl font-extrabold text-slate-800 mb-2">
//                 Book Sanitized & Disinfected car rental in {rental.name} with
//                 driver for local and outstation trips with Gozo
//               </h1>
//               <div className="flex items-center gap-2 text-yellow-500 mb-6">
//                 <Star size={18} fill="currentColor" />
//                 <span className="text-sm text-gray-600">
//                   (13685 reviews)
//                 </span>
//               </div>

//               <div className="prose max-w-none text-slate-600 leading-relaxed space-y-4">
//                 {rental.description?.map((para, i) => (
//                   <p key={i}>{para}</p>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h2 className="text-2xl font-bold text-slate-800 mb-6">
//                 Hourly car rental fares for local trips with Gozo Cabs Day
//                 Rental!
//               </h2>
//               <div className="space-y-3">
//                 {rental.packages?.map((pkg, index) => (
//                   <Link
//                     to="#"
//                     key={index}
//                     className="flex justify-between items-center p-4 border rounded-lg hover:bg-slate-50"
//                   >
//                     <span className="font-semibold">
//                       {pkg.hours} Hrs & {pkg.distanceLimitKm} Kms local rental
//                     </span>
//                     <div className="flex items-center gap-2">
//                       <span className="text-sm text-slate-500">
//                         starting at
//                       </span>
//                       <span className="font-bold">
//                         ₹{pkg.price.toLocaleString("en-IN")}
//                       </span>
//                       <ChevronRight
//                         size={20}
//                         className="text-slate-400"
//                       />
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h2 className="text-2xl font-bold text-slate-800 mb-4">
//                 Why book a day rental with Gozo?
//               </h2>
//               <ul className="list-disc list-inside space-y-3 text-slate-600">
//                 {rental.whyBook?.map((point, i) => (
//                   <li key={i}>{point}</li>
//                 ))}
//               </ul>
//             </div>

//             <div className="bg-blue-50 p-8 rounded-lg">
//               <h2 className="text-2xl font-bold text-slate-800 mb-6">
//                 Popular outstation cab routes
//               </h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3 text-blue-600 font-semibold">
//                 {rental.outstationFares?.map((route, i) => (
//                   <Link to="#" key={i} className="hover:underline">
//                     &gt; {rental.name} to {route.destination}
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right Column: Sidebar */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-28 space-y-8">
//               <img
//                 src="https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png"
//                 alt="Luxury Car"
//                 className="w-full rounded-md mb-4"
//               />
//               <h3 className="font-bold text-center text-lg text-blue-600 mb-6">
//                 Luxury Car Rental in {rental.name}
//               </h3>
//               <div className="bg-slate-50 p-6 rounded-lg border">
//                 <h3 className="font-bold text-xl text-slate-800 mb-4">
//                   {rental.name} at a Glance
//                 </h3>
//                 <p className="text-sm text-slate-600">{rental.atAGlance}</p>
//               </div>
//               <div className="space-y-2">
//                 <h3 className="font-bold text-xl text-slate-800 mb-4">
//                   FAQs About {rental.name} Cabs
//                 </h3>
//                 {rental.faqs?.map((faq, i) => (
//                   <div
//                     key={i}
//                     className="p-3 bg-white border rounded shadow-sm text-left"
//                   >
//                     <h4 className="font-semibold">{faq.question}</h4>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default CarRentalDetailPage;


// import React, { useEffect, useState } from "react";
// import { useParams, Link, useLocation } from "react-router-dom";
// import axios from "axios";
// import { CheckCircle, ChevronRight, Star } from "lucide-react";
// import GoZoBooking from "../components/RideBookingForm";

// // Reusable Header & Footer Components
// const Header = () => {
//   /* ... */
// };

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
//                         <li><a href="/city-rides" className="hover:text-blue-400 transition-colors">City Rides</a></li>
//                         <li><a href="/outstation" className="hover:text-blue-400 transition-colors">Outstation</a></li>
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

// const CarRentalDetailPage = () => {
//   const { slug } = useParams();
//   const location = useLocation();
//   const [rental, setRental] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Extract prefillData from location state
//   const prefillData = location.state?.prefillData;

//   useEffect(() => {
//     const fetchRentalDetails = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/car-rentals/${slug}`
//         );
//         if (res.data) {
//           setRental(res.data);
//         }
//       } catch (err) {
//         setError("Could not load rental details.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchRentalDetails();
//   }, [slug]);

//   if (loading) return <p className="text-center py-20">Loading...</p>;
//   if (error)
//     return <p className="text-center py-20 text-red-500">{error}</p>;
//   if (!rental)
//     return (
//       <p className="text-center py-20">
//         No details found for this location.
//       </p>
//     );

//   return (
//     <div className="bg-white">
//       {/* Header */}
//       <Header />

//       {/* ✅ Booking Form Hero Section - Pass prefillData */}
//       <div>
//         <GoZoBooking prefillData={prefillData} />
//       </div>

//       {/* ================= MAIN CONTENT + SIDEBAR ================= */}
//       <div className="max-w-6xl mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
//           {/* Left Column: Main Content */}
//           <div className="lg:col-span-2 space-y-12">
//             <div>
//               <h1 className="text-3xl font-extrabold text-slate-800 mb-2">
//                 Book Sanitized & Disinfected car rental in {rental.name} with
//                 driver for local and outstation trips with Gozo
//               </h1>
//               <div className="flex items-center gap-2 text-yellow-500 mb-6">
//                 <Star size={18} fill="currentColor" />
//                 <span className="text-sm text-gray-600">
//                   (13685 reviews)
//                 </span>
//               </div>

//               <div className="prose max-w-none text-slate-600 leading-relaxed space-y-4">
//                 {rental.description?.map((para, i) => (
//                   <p key={i}>{para}</p>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h2 className="text-2xl font-bold text-slate-800 mb-6">
//                 Hourly car rental fares for local trips with Gozo Cabs Day
//                 Rental!
//               </h2>
//               <div className="space-y-3">
//                 {rental.packages?.map((pkg, index) => (
//                   <Link
//                     to="#"
//                     key={index}
//                     className="flex justify-between items-center p-4 border rounded-lg hover:bg-slate-50"
//                   >
//                     <span className="font-semibold">
//                       {pkg.hours} Hrs & {pkg.distanceLimitKm} Kms local rental
//                     </span>
//                     <div className="flex items-center gap-2">
//                       <span className="text-sm text-slate-500">
//                         starting at
//                       </span>
//                       <span className="font-bold">
//                         ₹{pkg.price.toLocaleString("en-IN")}
//                       </span>
//                       <ChevronRight
//                         size={20}
//                         className="text-slate-400"
//                       />
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h2 className="text-2xl font-bold text-slate-800 mb-4">
//                 Why book a day rental with Gozo?
//               </h2>
//               <ul className="list-disc list-inside space-y-3 text-slate-600">
//                 {rental.whyBook?.map((point, i) => (
//                   <li key={i}>{point}</li>
//                 ))}
//               </ul>
//             </div>

//             <div className="bg-blue-50 p-8 rounded-lg">
//               <h2 className="text-2xl font-bold text-slate-800 mb-6">
//                 Popular outstation cab routes
//               </h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3 text-blue-600 font-semibold">
//                 {rental.outstationFares?.map((route, i) => (
//                   <Link to="#" key={i} className="hover:underline">
//                     &gt; {rental.name} to {route.destination}
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right Column: Sidebar */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-28 space-y-8">
//               <img
//                 src="https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png"
//                 alt="Luxury Car"
//                 className="w-full rounded-md mb-4"
//               />
//               <h3 className="font-bold text-center text-lg text-blue-600 mb-6">
//                 Luxury Car Rental in {rental.name}
//               </h3>
//               <div className="bg-slate-50 p-6 rounded-lg border">
//                 <h3 className="font-bold text-xl text-slate-800 mb-4">
//                   {rental.name} at a Glance
//                 </h3>
//                 <p className="text-sm text-slate-600">{rental.atAGlance}</p>
//               </div>
//               <div className="space-y-2">
//                 <h3 className="font-bold text-xl text-slate-800 mb-4">
//                   FAQs About {rental.name} Cabs
//                 </h3>
//                 {rental.faqs?.map((faq, i) => (
//                   <div
//                     key={i}
//                     className="p-3 bg-white border rounded shadow-sm text-left"
//                   >
//                     <h4 className="font-semibold">{faq.question}</h4>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default CarRentalDetailPage;




// import React, { useEffect, useState, useRef } from "react";
// import { useParams, useLocation, Link } from "react-router-dom";
// import { CheckCircle, Star, ChevronRight } from 'lucide-react';
// import GoZoBooking from "../components/RideBookingForm";


// import img1 from "../assets/car-mini-motucabs.webp";
// import img2 from "../assets/innova-motucabs.jpg";
// import img3 from "../assets/prime-sedan.webp";
// import img4 from "../assets/tempo_12_seater-motucabs.webp";


// const generateRentalData = (cityName) => {
//     return {
//         name: cityName,
//         description: [
//             `Motu Cabs provides sanitized and well-maintained cars with professional drivers for both local city travel and outstation journeys from ${cityName}. Every vehicle is cleaned and disinfected before and after each ride to ensure complete safety and hygiene. Whether you need a cab for a full day in ${cityName}, a weekend getaway, a family trip, or a one-way drop to another city, Motu Cabs offers a dependable and comfortable travel experience at competitive prices.`,
//             `Book fully sanitized and disinfected car rentals in ${cityName} with a professional driver for both local travel and outstation trips with Motu Cabs. Motu Cabs follows strict hygiene and safety protocols to ensure every journey is safe and comfortable. All cars are thoroughly cleaned, sanitized, and disinfected before and after each ride.`
//         ],
//         sections: [
//             { title: `Hourly Car Rental Fares for Local Trips`, content: `If you need a car within the city for a fixed number of hours, Motu Cabs offers convenient hourly rental packages...` },
//             { title: `Rent a Car with Driver in ${cityName} – Outstation, Airport Transfers & Day Rentals`, content: `Motu Cabs offers complete chauffeur-driven car rental solutions in ${cityName} suitable for all travel needs:\n- One-way and roundtrip outstation cabs\n- Local day rentals...\n` },
//             { title: `Why Book a Day Rental with Motu Cabs?`, content: `Choosing a day rental with Motu Cabs provides multiple advantages:\n- Car and driver at your disposal\n- Multiple pick-ups and drop-offs...` },
//             { title: `Outstation Car Rental Fares for Popular Places to Visit Around ${cityName}`, content: `Motu Cabs offers affordable and dependable outstation taxi services from ${cityName} to nearby and long-distance cities...` },
//             { title: `Hire Airport Taxi with Driver in ${cityName}`, content: `For airport pickups and drops, Motu Cabs provides clean vehicles and professional drivers for all terminals of ${cityName} Airport...` },
//             { title: `Things to Check When Booking a Car Rental Package in ${cityName}`, content: `If you are planning to book a cab in ${cityName}, here are a few important points to consider:\n- Cleanliness and Sanitisation\n- Driver Experience...` }
//         ],
//         packages: [
//             { hours: 4, distanceLimitKm: 40, price: 1200 },
//             { hours: 8, distanceLimitKm: 80, price: 2200 },
//             { hours: 12, distanceLimitKm: 120, price: 3200 },
//         ],
//         whyBook: ["Excellent reputation", "No credit card fees", "Tolls included", "Free cancellation", "Professional drivers", "Hassle-free booking"],
//         faqs: [
//             { question: `What types of cars are available for rent in ${cityName}?`, answer: "We offer Hatchbacks, Sedans, SUVs, and Tempo Travellers." },
//             { question: "Are the drivers verified?", answer: "Yes, all our drivers are background-checked and professionally trained." },
//         ],
//         outstationFares: [
//             { destination: "Agra" }, { destination: "Jaipur" }, { destination: "Chandigarh" },
//         ],
//         atAGlance: `Get the best car rental deals in ${cityName}. We offer a wide range of vehicles, from economy hatchbacks to premium sedans.`
//     };
// };


// const getRentalDetailsBySlug = async (slug) => {
//     const cityName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
//     return generateRentalData(cityName);
// };


// const Footer = () => (
//     <footer className="bg-gray-900 text-gray-300">
//         <div className="max-w-7xl mx-auto px-8 py-12"><div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8"><div><div className="text-2xl font-bold mb-4 flex items-center gap-2"><span className="text-blue-600">Motu<span className="text-orange-500">Cab</span></span></div><p className="text-sm text-gray-400 leading-relaxed">Your trusted partner for reliable, safe, and affordable transportation solutions across India.</p></div><div><h4 className="font-semibold text-white mb-4">Services</h4><ul className="text-sm space-y-2"><li><a href="/city-rides" className="hover:text-blue-400">City Rides</a></li><li><a href="/outstation" className="hover:text-blue-400">Outstation</a></li><li><a href="/airport-transfer" className="hover:text-blue-400">Airport Transfer</a></li><li><a href="/corporate" className="hover:text-blue-400">Corporate</a></li></ul></div><div><h4 className="font-semibold text-white mb-4">Company</h4><ul className="text-sm space-y-2"><li><a href="/" className="hover:text-blue-400">Home</a></li><li><a href="/about" className="hover:text-blue-400">About Us</a></li><li><a href="/contact" className="hover:text-blue-400">Contact</a></li><li><a href="/careers" className="hover:text-blue-400">Careers</a></li></ul></div><div><h4 className="font-semibold text-white mb-4">Legal</h4><ul className="text-sm space-y-2"><li><a href="/privacy-policy" className="hover:text-blue-400">Privacy Policy</a></li><li><a href="/terms-of-service" className="hover:text-blue-400">Terms of Service</a></li><li><a href="/refund-policy" className="hover:text-blue-400">Refund Policy</a></li><li><a href="/cookie-policy" className="hover:text-blue-400">Cookie Policy</a></li></ul></div></div><div className="border-t border-gray-800 pt-8 text-center"><p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} MotuCab Technologies Pvt. Ltd. All Rights Reserved.</p></div></div>
//     </footer>
// );

// const CarRentalDetailPage = () => {
//     const { slug } = useParams();
//     const [rental, setRental] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const bookingFormRef = useRef(null);

//     // This logic is preserved as requested
//     const location = useLocation();
//     const prefillData = location.state?.prefillData;

//     useEffect(() => {
//         const fetchRentalDetails = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);
//                 // Using local data generator instead of axios
//                 const data = await getRentalDetailsBySlug(slug || "delhi");
//                 setRental(data);
//             } catch (err) {
//                 setError("Could not load rental details.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchRentalDetails();
//     }, [slug]);

//     const handleBookNowClick = () => {
//         bookingFormRef.current?.scrollIntoView({ behavior: "smooth" });
//     };

//     const horizontalImages = [
//         { src: img1, alt: "Hatchback Rental", description: "Swift, Celerio or equivalent" },
//         { src: img3, alt: "Sedan Rental", description: "Dzire, Etios or equivalent" },
//         { src: img2, alt: "SUV Rental", description: "Innova, Ertiga or equivalent" },
//         { src: img4, alt: "Tempo Traveller Rental", description: "Tempo Traveller (12 seater)" },
//     ];

//     if (loading) return <p className="text-center py-20">Loading...</p>;
//     if (error) return <p className="text-center py-20 text-red-500">{error}</p>;
//     if (!rental) return <p className="text-center py-20">No details found for this location.</p>;

//     return (
//         <div className="bg-slate-50">
            
//             <div ref={bookingFormRef} className="bg-white py-6 shadow-sm">
//                 {/* This prefill logic is preserved as requested */}
//                 <GoZoBooking prefillData={prefillData || { from: rental.name }} />
//             </div>

//             <div className="py-16">
//                 <div className="max-w-7xl mx-auto px-6">
//                     <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">Our Rental Fleet in {rental.name}</h2>
//                     <p className="text-center text-slate-600 mb-12">Choose from a wide range of cars for your rental needs.</p>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//                         {horizontalImages.map((img, index) => (
//                             <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300">
//                                 <div className="w-full h-48 bg-white flex items-center justify-center p-4"><img src={img.src} alt={img.alt} className="max-w-full max-h-full object-contain" /></div>
//                                 {img.description && <p className="px-4 pt-4 pb-2 text-black font-semibold text-center text-base">{img.description}</p>}
//                                 <div className="px-4 py-4 flex justify-center mt-auto"><button onClick={handleBookNowClick} className="px-5 py-2 bg-gradient-to-r from-blue-600 to-orange-500 text-white font-semibold rounded-lg hover:opacity-90 transition w-full">Book Now</button></div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             <div className="max-w-6xl mx-auto px-4 py-16 bg-white rounded-lg shadow-lg mb-16">
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-16 gap-y-12">
//                     <div className="lg:col-span-2 space-y-12">
//                         <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
//                             <div className="flex items-center gap-1 text-yellow-500"><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} className="text-gray-300" /></div>
//                             <span className="text-sm text-gray-600 font-medium">(4.2/5 based on 13,000+ reviews)</span>
//                         </div>
                        
//                         <div>
//                            <h1 className="text-3xl font-extrabold text-slate-800 mb-4">{rental.sections[0].title}</h1>
//                            <div className="prose max-w-none text-slate-600 leading-relaxed space-y-4">
//                                 {rental.description.map((para, i) => <p key={i}>{para}</p>)}
//                            </div>
//                         </div>

//                         {rental.sections.slice(1).map((sec, i) => (
//                             <div key={i}>
//                                 <h2 className="text-2xl font-bold text-slate-800 mb-4">{sec.title}</h2>
//                                 <p className="text-slate-600 leading-relaxed text-base whitespace-pre-line">{sec.content}</p>
//                             </div>
//                         ))}
 
//                     </div>

//                     <div className="lg:col-span-1">
//                         <div className="sticky top-24 space-y-8">
//                             <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
//                                 {/* <img src={luxuryCarImg} alt={`Luxury Car Rental in ${rental.name}`} className="w-full rounded-md mb-4" /> */}
//                                 <h3 className="font-bold text-center text-lg text-blue-600">Luxury Car Rental in {rental.name}</h3>
//                             </div>
                            
//                             <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
//                                 <h4 className="font-bold text-xl text-slate-800 mb-4">{rental.name} at a Glance</h4>
//                                 <p className="text-sm text-slate-600">{rental.atAGlance}</p>
//                             </div>

//                             <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
//                                 <h4 className="font-bold text-xl text-slate-800 mb-4">Why Book With Us</h4>
//                                 <ul className="space-y-3">
//                                     {rental.whyBook?.map((point, index) => (
//                                         <li key={index} className="flex items-center gap-3">
//                                             <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
//                                             <span className="text-slate-700">{point}</span>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
                            
//                             <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
//                                 <h4 className="text-xl font-bold mb-4 text-slate-800">FAQs for {rental.name} Rentals</h4>
//                                 <div className="space-y-3">
//                                     {rental.faqs.map((faq, i) => (
//                                         <div key={i} className="border border-slate-200 rounded-lg text-sm bg-slate-50">
//                                           <details className="group p-3">
//                                             <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
//                                               {faq.question}
//                                               <ChevronRight className="transform transition-transform duration-200 group-open:rotate-90" size={16} />
//                                             </summary>
//                                             <p className="text-slate-600 mt-2 pt-2 border-t border-slate-200">{faq.answer}</p>
//                                           </details>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <Footer />
//         </div>
//     );
// };

// export default CarRentalDetailPage;



import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { CheckCircle, Star, ChevronRight } from 'lucide-react';
import GoZoBooking from "../components/RideBookingForm"; // Assuming this is your booking form component

// Assuming you have these images in your assets folder
import img1 from "../assets/car-mini-motucabs.webp";
import img2 from "../assets/innova-motucabs.jpg";
import img3 from "../assets/prime-sedan.webp";
import img4 from "../assets/tempo_12_seater-motucabs.webp";

// This function generates the content dynamically based on the city name
const generateRentalData = (cityName) => {
    return {
        name: cityName,
        // Main introductory paragraphs
        description: [
            `Motu Cabs provides sanitized and well-maintained cars with professional drivers for both local city travel and outstation journeys from ${cityName}. Every vehicle is cleaned and disinfected before and after each ride to ensure complete safety and hygiene. Whether you need a cab for a full day in ${cityName}, a weekend getaway, a family trip, or a one-way drop to another city, Motu Cabs offers a dependable and comfortable travel experience at competitive prices.`,
            `Book fully sanitized and disinfected car rentals in ${cityName} with a professional driver for both local travel and outstation trips with Motu Cabs. Motu Cabs follows strict hygiene and safety protocols to ensure every journey is safe and comfortable. All cars are thoroughly cleaned, sanitized, and disinfected before and after each ride.`
        ],
        // All other sections from your text
        sections: [
            {
                title: `Hourly Car Rental Fares for Local Trips with Motu Cabs Day Rental`,
                content: `If you need a car within the city for a fixed number of hours, Motu Cabs offers convenient hourly rental packages. These are ideal for meetings, shopping, sightseeing, events, school runs and daily personal travel. Packages are available for 4, 6, 8 and 12 hours with limited kilometers included. You can extend the duration with minimal extra charges. A dedicated driver stays with you throughout the booking, allowing you to travel to multiple stops without having to book again and again. Rent a car with driver in ${cityName} for hourly local trips or long-distance outstation travel at competitive rates with Motu Cabs. Our fares update dynamically based on demand and availability, so advance booking is always the best option.`
            },
            {
                title: `Rent a Car with Driver in ${cityName} – Outstation, Airport Transfers & Day Rentals`,
                content: `Motu Cabs offers complete chauffeur-driven car rental solutions in ${cityName} suitable for all travel needs:\n\n- One-way and roundtrip outstation cabs\n- Local day rentals and hourly packages\n- Airport pickup and drop services\n- Customized business travel plans\n- Multi-day tour itineraries\n- Family and group travel services\n\nYou can rent a sedan, SUV, tempo traveller, or premium vehicle, depending on your requirements. Whether it is a quick airport run, a weekend trip to Agra or Jaipur, or an all-day rental within ${cityName}, Motu Cabs delivers timely, transparent and flexible service.`
            },
            {
                title: `Why Book a Day Rental with Motu Cabs?`,
                content: `Choosing a day rental with Motu Cabs provides multiple advantages:\n\n- Car and driver at your disposal: Travel freely across the city for the duration of your package.\n- Multiple pick-ups and drop-offs: Visit several locations in a single booking without extra hassle.\n- Flexible durations: Packages start from 4 hours and go up to 12 hours with easy extensions.\n- Transparent pricing: No surge rates or confusing add-ons. Full clarity on inclusions before you travel.\n- Cash or digital payment options: Pay through UPI, card, wallet or cash based on your convenience.\n- Professional drivers: Well-trained chauffeurs who understand routes and ensure a smooth ride.\n\nIt is a practical option for busy schedules, events, shopping trips and city exploration.`
            },
            // {
            //     title: `Outstation Car Rental Fares for Popular Places to Visit Around ${cityName}`,
            //     content: `Motu Cabs offers affordable and dependable outstation taxi services from ${cityName} to nearby and long-distance cities. You can book a one-way drop, a same-day return trip or a multi-day round journey. Popular destinations include:\n\n- ${cityName} to Agra\n- ${cityName} to Jaipur\n- ${cityName} to Chandigarh\n- ${cityName} to Dehradun\n- ${cityName} to Rishikesh and Haridwar\n- ${cityName} to Shimla and Manali\n- ${cityName} to Noida / Gurgaon / Faridabad\n- ${cityName} to Mathura and Vrindavan\n\nFares are based on vehicle type, trip duration and distance. Packages are designed to include driver charges, tolls, and route allowances with no hidden fees.`
            // },
            {
                title: `Hire Airport Taxi with Driver in ${cityName} with Meet-and-Greet Services`,
                content: `For airport pickups and drops, Motu Cabs provides clean vehicles and professional drivers for all terminals of ${cityName} Airport (T1, T2, T3). Meet-and-greet services are available at the arrival gate for travellers who need assistance with luggage or guidance. This service is widely used by corporate travellers, international visitors, tourists and families. You can book in advance for punctual pickup, on-time drop and reliable airport transfers to any destination in ${cityName} NCR or nearby cities.`
            },
            {
                title: `Things to Check When Booking a Car Rental Package in ${cityName}`,
                content: `If you are planning to book a cab in ${cityName} for local or outstation use, here are a few important points to consider:\n\n- Cleanliness and Sanitisation\nConfirm that the car is disinfected before your ride and maintained regularly.\n\n- Driver Experience\nCheck if the driver is familiar with local and highway routes and holds a valid license.\n\n- Inclusions in the Package\nUnderstand what is covered in the price—kilometers, hours, tolls, parking, driver charges, etc.\n\n- Vehicle Type\nChoose a vehicle according to your group size, luggage needs and comfort requirements.\n\n- Payment and Billing Transparency\nEnsure that there are no hidden costs and that the payment modes are convenient.\n\n- Support and Availability\nMake sure the service provider offers assistance during travel and has a 24/7 support option.\n\n- One-way or Round-trip Flexibility\nConfirm whether the company allows different pick-up and drop-off locations if required.\n\nBy checking these points, you can avoid last-minute issues and ensure a smooth travel experience with any car rental company in ${cityName} or elsewhere.`
            }
        ],
        // Sidebar and other data
        faqs: [
            { question: `What types of cars are available for rent in ${cityName}?`, answer: "We offer Hatchbacks, Sedans, SUVs, and Tempo Travellers." },
            { question: "Are the drivers verified?", answer: "Yes, all our drivers are background-checked and professionally trained." },
            { question: "Can I book a one-way outstation trip?", answer: `Yes, we offer one-way, round-trip, and multi-day packages from ${cityName} to many destinations.`}
        ],
        whyBook: ["Sanitized & Disinfected Cars", "Professional Drivers", "Transparent Pricing", "24/7 Customer Support", "On-Time Service", "Flexible Booking Options"],
        atAGlance: `Get the best car rental deals in ${cityName} with Motu Cabs. We offer a wide range of sanitized vehicles, from economy hatchbacks to premium sedans and SUVs for all your travel needs.`
    };
};

const getRentalDetailsBySlug = async (slug) => {
    // Converts a URL slug like "new-delhi" to "New Delhi"
    const cityName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return generateRentalData(cityName);
};

// --- React Component Starts Here ---

const CarRentalPage = () => {
    const { slug } = useParams();
    const [rentalData, setRentalData] = useState(null);
    const [loading, setLoading] = useState(true);
    const bookingFormRef = useRef(null);
    const location = useLocation();
    const prefillData = location.state?.prefillData;

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setLoading(true);
                const data = await getRentalDetailsBySlug(slug || "delhi"); // Default to Delhi if no slug
                setRentalData(data);
            } catch (error) {
                console.error("Failed to load rental data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [slug]);

    const handleBookNowClick = () => {
        bookingFormRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const fleetImages = [
        { src: img1, alt: "Hatchback Rental", description: "Swift, Celerio or equivalent" },
        { src: img3, alt: "Sedan Rental", description: "Dzire, Etios or equivalent" },
        { src: img2, alt: "SUV Rental", description: "Innova, Ertiga or equivalent" },
        { src: img4, alt: "Tempo Traveller Rental", description: "Tempo Traveller (12 seater)" },
    ];

    if (loading) return <div className="text-center py-20 text-lg">Loading page content...</div>;
    if (!rentalData) return <div className="text-center py-20 text-lg text-red-600">Could not find details for this location.</div>;

    return (
        <div className="bg-gray-50">
            <header ref={bookingFormRef} className="bg-white py-6 shadow-md">
                <GoZoBooking prefillData={prefillData || { from: rentalData.name }} />
            </header>

            <main>
                {/* Fleet Section */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Our Rental Fleet in {rentalData.name}</h2>
                        <p className="text-center text-gray-600 mb-12">Choose from a wide range of cars for your rental needs.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {fleetImages.map((car, index) => (
                                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300">
                                    <div className="w-full h-48 bg-white flex items-center justify-center p-4">
                                        <img src={car.src} alt={car.alt} className="max-w-full max-h-full object-contain" />
                                    </div>
                                    <p className="px-4 pt-4 pb-2 text-gray-900 font-semibold text-center text-base">{car.description}</p>
                                    <div className="px-4 py-4 mt-auto">
                                        <button onClick={handleBookNowClick} className="w-full px-5 py-2 bg-gradient-to-r from-blue-600 to-orange-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Main Content Section */}
                <section className="max-w-6xl mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-16 gap-y-12">
                        {/* Left Column with Text Content */}
                        <div className="lg:col-span-2 space-y-12">
                             <div>
                               <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Book Sanitized & Disinfected Car Rental in {rentalData.name} with Driver for Local and Outstation Trips with Motu Cabs </h1>
                               <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
                                    {rentalData.description.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
                               </div>
                            </div>
                            {rentalData.sections.map((section, i) => (
                                <div key={i}>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{section.title}</h2>
                                    <div className="text-gray-700 leading-relaxed text-base whitespace-pre-line">{section.content}</div>
                                </div>
                            ))}
                        </div>

                        {/* Right Column with Sidebar Widgets */}
                        <aside className="lg:col-span-1">
                            <div className="sticky top-24 space-y-8">
                                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                    <h3 className="font-bold text-xl text-gray-800 mb-4">{rentalData.name} at a Glance</h3>
                                    <p className="text-sm text-gray-600">{rentalData.atAGlance}</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                    <h3 className="font-bold text-xl text-gray-800 mb-4">Why Book With Motu Cabs?</h3>
                                    <ul className="space-y-3">
                                        {rentalData.whyBook.map((point, index) => (
                                            <li key={index} className="flex items-center gap-3">
                                                <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                                                <span className="text-gray-700">{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                    <h3 className="text-xl font-bold mb-4 text-gray-800">FAQs for {rentalData.name} Rentals</h3>
                                    <div className="space-y-3">
                                        {rentalData.faqs.map((faq, i) => (
                                            <div key={i} className="border border-gray-200 rounded-lg text-sm bg-gray-50">
                                                <details className="group p-3">
                                                    <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                                                      {faq.question}
                                                      <ChevronRight className="transform transition-transform duration-200 group-open:rotate-90" size={16} />
                                                    </summary>
                                                    <p className="text-gray-600 mt-2 pt-2 border-t border-gray-200">{faq.answer}</p>
                                                </details>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default CarRentalPage;











// import React, { useEffect, useState, useRef } from "react";
// import { useParams, useLocation, Link } from "react-router-dom";
// import { CheckCircle, Star, ChevronRight } from 'lucide-react';
// import GoZoBooking from "../components/RideBookingForm";

// // --- DUMMY IMPORTS FOR CAR IMAGES (replace with your actual paths) ---
// import img1 from "../assets/car-mini-motucabs.webp";
// import img2 from "../assets/innova-motucabs.jpg";
// import img3 from "../assets/prime-sedan.webp";
// import img4 from "../assets/tempo_12_seater-motucabs.webp";


// // --- DYNAMIC MOCK DATA GENERATOR ---
// const generateRentalData = (cityName) => {
//     const popularRoutesByCity = {
//         Delhi: ["Agra", "Jaipur", "Chandigarh", "Dehradun", "Rishikesh", "Manali"],
//         Mumbai: ["Pune", "Lonavala", "Nashik", "Mahabaleshwar", "Shirdi"],
//     };
//     const defaultPopularCities = ["Mumbai", "Pune", "Bangalore", "Chennai", "Hyderabad"];
//     const outstationRoutes = (popularRoutesByCity[cityName] || defaultPopularCities).map(dest => ({ destination: dest }));

//     return {
//         name: cityName,
//         sections: [
//             { title: `Book Sanitized Car Rental in ${cityName} with Driver`, content: `Motu Cabs provides sanitized and well-maintained cars with professional drivers for both local city travel and outstation journeys from ${cityName}. Every vehicle is cleaned and disinfected before and after each ride...` },
//             { title: `Hourly Car Rental Fares for Local Trips`, content: `If you need a car within the city for a fixed number of hours, Motu Cabs offers convenient hourly rental packages. These are ideal for meetings, shopping, sightseeing, events...` },
//             { title: `Rent a Car with Driver in ${cityName}`, content: `Motu Cabs offers complete chauffeur-driven car rental solutions in ${cityName} suitable for all travel needs: one-way and roundtrip outstation cabs, local day rentals, airport pickup and drop services...` },
//             { title: `Why Book a Day Rental with Motu Cabs?`, content: `Choosing a day rental with Motu Cabs provides multiple advantages: a car and driver at your disposal, multiple pick-ups and drop-offs, flexible durations, and transparent pricing...` }
//         ],
//         // packages: [
//         //     { hours: 4, distanceLimitKm: 40 },
//         //     { hours: 8, distanceLimitKm: 80 },
//         //     { hours: 12, distanceLimitKm: 120 },
//         // ],
//         outstationRoutes,
//         faqs: [
//             { question: `What types of cars are available for rent in ${cityName}?`, answer: "We offer Hatchbacks (like Swift), Sedans (like Dzire), SUVs (like Innova), and Tempo Travellers." },
//             { question: "Are the drivers verified?", answer: "Yes, all our drivers are background-checked and professionally trained." },
//             { question: "Can I book a cab for multiple days?", answer: "Absolutely. We offer flexible multi-day packages for both local and outstation travel." }
//         ]
//     };
// };

// // --- LOCAL DATA FETCHER ---
// const getRentalDetailsBySlug = async (slug) => {
//     const cityName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
//     return generateRentalData(cityName);
// };


// const Footer = () => (
//     <footer className="bg-gray-900 text-gray-300">
//         <div className="max-w-7xl mx-auto px-8 py-12"><div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8"><div><div className="text-2xl font-bold mb-4 flex items-center gap-2"><span className="text-blue-600">Motu<span className="text-orange-500">Cab</span></span></div><p className="text-sm text-gray-400 leading-relaxed">Reliable, safe, and affordable transportation solutions across India.</p></div><div><h4 className="font-semibold text-white mb-4">Services</h4><ul className="text-sm space-y-2"><li><a href="/city-rides" className="hover:text-blue-400">City Rides</a></li><li><a href="/outstation" className="hover:text-blue-400">Outstation</a></li><li><a href="/airport-transfer" className="hover:text-blue-400">Airport Transfer</a></li><li><a href="/corporate" className="hover:text-blue-400">Corporate</a></li></ul></div><div><h4 className="font-semibold text-white mb-4">Company</h4><ul className="text-sm space-y-2"><li><a href="/" className="hover:text-blue-400">Home</a></li><li><a href="/about" className="hover:text-blue-400">About Us</a></li><li><a href="/contact" className="hover:text-blue-400">Contact</a></li><li><a href="/careers" className="hover:text-blue-400">Careers</a></li></ul></div><div><h4 className="font-semibold text-white mb-4">Legal</h4><ul className="text-sm space-y-2"><li><a href="/privacy-policy" className="hover:text-blue-400">Privacy Policy</a></li><li><a href="/terms-and-conditions" className="hover:text-blue-400">Terms of Service</a></li><li><a href="/refund-policy" className="hover:text-blue-400">Refund Policy</a></li><li><a href="/cookie-policy" className="hover:text-blue-400">Cookie Policy</a></li></ul></div></div><div className="border-t border-gray-800 pt-8 text-center"><p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} MotuCab Technologies Pvt. Ltd. All Rights Reserved.</p></div></div>
//     </footer>
// );

// const CarRentalDetailPage = () => {
//     const { slug } = useParams();
//     const [rental, setRental] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [dynamicPrefill, setDynamicPrefill] = useState(null);
//     const bookingFormRef = useRef(null);

//     useEffect(() => {
//         const fetchRentalDetails = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);
//                 const data = await getRentalDetailsBySlug(slug || "delhi");
//                 setRental(data);
//             } catch (err) {
//                 setError("Could not load rental details.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchRentalDetails();
//     }, [slug]);

//     const handleBookNowClick = (destination) => {
//         setDynamicPrefill({ from: rental.name, to: destination });
//         bookingFormRef.current?.scrollIntoView({ behavior: "smooth" });
//     };
    
//     const handleGenericBookClick = () => {
//         setDynamicPrefill(null);
//         bookingFormRef.current?.scrollIntoView({ behavior: "smooth" });
//     };

//     const horizontalImages = [
//         { src: img1, alt: "Hatchback Rental", description: "Swift, Celerio or equivalent" },
//         { src: img3, alt: "Sedan Rental", description: "Dzire, Etios or equivalent" },
//         { src: img2, alt: "SUV Rental", description: "Innova, Ertiga or equivalent" },
//         { src: img4, alt: "Tempo Traveller Rental", description: "Tempo Traveller (12 seater)" },
//     ];

//     if (loading) return <p className="text-center py-20">Loading...</p>;
//     if (error) return <p className="text-center py-20 text-red-500">{error}</p>;
//     if (!rental) return <p className="text-center py-20">No details found for this location.</p>;

//     return (
//         <div className="bg-slate-50">
           
//             <div ref={bookingFormRef} className="bg-white py-6 shadow-sm">
//                 <GoZoBooking prefillData={dynamicPrefill || { from: rental.name }} />
//             </div>

//             <div className="py-16">
//                 <div className="max-w-7xl mx-auto px-6">
//                     <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">Our Rental Fleet in {rental.name}</h2>
//                     <p className="text-center text-slate-600 mb-12">Choose from a wide range of cars for your rental needs.</p>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//                         {horizontalImages.map((img, index) => (
//                             <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300">
//                                 <div className="w-full h-48 bg-white flex items-center justify-center p-4"><img src={img.src} alt={img.alt} className="max-w-full max-h-full object-contain" /></div>
//                                 {img.description && <p className="px-4 pt-4 pb-2 text-black font-semibold text-center text-base">{img.description}</p>}
//                                 <div className="px-4 py-4 flex justify-center mt-auto"><button onClick={handleGenericBookClick} className="px-5 py-2 bg-gradient-to-r from-blue-600 to-orange-500 text-white font-semibold rounded-lg hover:opacity-90 transition w-full">Book Now</button></div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {/* ✅ FIXED: Removed the outer white card. Content is now directly on the page background. */}
//             <div className="max-w-6xl mx-auto px-4 py-16">
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-16 gap-y-12">
//                     <div className="lg:col-span-2 space-y-12">
//                         <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
//                             <div className="flex items-center gap-1 text-yellow-500"><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} className="text-gray-300" /></div>
//                             <span className="text-sm text-gray-600 font-medium">(4.2/5 based on 13,000+ reviews)</span>
//                         </div>
                        
//                         {rental.sections.map((sec, i) => (
//                             <div key={i}>
//                                 <h2 className="text-3xl font-extrabold text-slate-800 mb-4">{sec.title}</h2>
//                                 <p className="text-slate-600 leading-relaxed text-base">{sec.content}</p>
//                             </div>
//                         ))}

//                         <div>
//                             {/* <h2 className="text-3xl font-extrabold text-slate-800 mb-6">Hourly Packages in {rental.name}</h2> */}
//                             <div className="space-y-3">
//                                 {/* {rental.packages.map((pkg, index) => (
//                                     <div key={index} className="flex justify-between items-center p-4 border border-slate-200 rounded-lg bg-white hover:shadow-md transition-shadow">
//                                         <span className="font-semibold text-slate-700">{pkg.hours} Hrs / {pkg.distanceLimitKm} Kms Package</span>
//                                         <button onClick={handleGenericBookClick} className="px-5 py-2 bg-blue-600 text-white font-semibold text-sm rounded-md hover:bg-blue-700 transition-colors">Book Now</button>
//                                     </div>
//                                 ))} */}
//                             </div>
//                         </div>

//                         <div>
//                             <h2 className="text-3xl font-extrabold text-slate-800 mb-6">Popular Outstation Routes from {rental.name}</h2>
//                             <div className="space-y-3">
//                                 {rental.outstationRoutes.map((route, index) => (
//                                     <div key={index} className="flex justify-between items-center p-4 border border-slate-200 rounded-lg bg-white hover:shadow-md transition-shadow">
//                                         <span className="font-semibold text-slate-700">{rental.name} to {route.destination}</span>
//                                         <button onClick={() => handleBookNowClick(route.destination)} className="px-5 py-2 bg-blue-600 text-white font-semibold text-sm rounded-md hover:bg-blue-700 transition-colors">Book Now</button>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>

//                     <div className="lg:col-span-1">
//                         <div className="sticky top-24 space-y-8">
//                             {/* ✅ FIXED: Sidebar items are now styled as individual cards */}
//                             <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
//                                 {/* <img src={luxuryCarImg} alt={`Luxury Car Rental in ${rental.name}`} className="w-full rounded-md mb-4" /> */}
//                                 <h3 className="font-bold text-center text-lg text-blue-600">Luxury Car Rental in {rental.name}</h3>
//                             </div>
                            
//                             <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
//                                 <h4 className="text-xl font-bold mb-4 text-slate-800">FAQs for {rental.name} Rentals</h4>
//                                 <div className="space-y-3">
//                                     {rental.faqs.map((faq, i) => (
//                                         <div key={i} className="border border-slate-200 rounded-lg text-sm bg-slate-50">
//                                           <details className="group p-3">
//                                             <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
//                                               {faq.question}
//                                               <ChevronRight className="transform transition-transform duration-200 group-open:rotate-90" size={16} />
//                                             </summary>
//                                             <p className="text-slate-600 mt-2 pt-2 border-t border-slate-200">{faq.answer}</p>
//                                           </details>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <Footer />
//         </div>
//     );
// };

// export default CarRentalDetailPage;
