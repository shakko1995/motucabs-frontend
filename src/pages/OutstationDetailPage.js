// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { getOutstationBySlug } from "../api/outstationApi"; 
// import { CheckCircle, ChevronRight } from 'lucide-react';
// // import Header from '../components/Header';
// // import Footer from '../components/Footer';

// export default function OutstationDetailPage() {
//   const { slug } = useParams();
//   const [city, setCity] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     getOutstationBySlug(slug)
//       .then((data) => {
//           if(data) {
//               setCity(data);
//           } else {
//               setError("City details not found.");
//           }
//       })
//       .catch((err) => setError("Failed to fetch city details."))
//       .finally(() => setLoading(false));
//   }, [slug]);

//   if (loading) return <p className="text-center py-20">Loading...</p>;
//   if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

//   return (
//     <div className="bg-white">
//         {/* <Header /> */}
//         <div className="max-w-6xl mx-auto px-4 py-12">
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
//                 {/* Left Column: Main Content */}
//                 <div className="lg:col-span-2 space-y-12">
//                     <h1 className="text-3xl font-extrabold text-slate-800">
//                         Outstation Cabs in {city.name}
//                     </h1>
//                     <div className="prose max-w-none text-slate-600">
//                         <p>{city.description}</p>
//                     </div>

//                     {city.fares && city.fares.length > 0 && (
//                         <div>
//                             <h2 className="text-2xl font-bold text-slate-800 mb-6">Popular Outstation Fares from {city.name}</h2>
//                             <div className="space-y-3">
//                                 {city.fares.map((fare, index) => (
//                                     <Link to="#" key={index} className="flex justify-between items-center p-4 border rounded-lg hover:bg-slate-50">
//                                         <span className="font-semibold">{fare.route}</span>
//                                         <div className="flex items-center gap-2">
//                                             <span className="text-sm">starting at</span>
//                                             <span className="font-bold">₹{fare.price}</span>
//                                             <ChevronRight size={20}/>
//                                         </div>
//                                     </Link>
//                                 ))}
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {/* Right Column: Sidebar */}
//                 <div className="lg:col-span-1">
//                     <div className="sticky top-28 space-y-8">
//                          <div className="bg-slate-50 p-6 rounded-lg border">
//                             <h3 className="font-bold text-xl text-slate-800 mb-4">{city.atAGlance}</h3>
//                             <p className="text-sm text-slate-600">{city.extraInfo}</p>
//                          </div>
//                          <div className="bg-slate-50 p-6 rounded-lg border">
//                             <h4 className="font-bold text-xl text-slate-800 mb-4">Why book with us</h4>
//                             <ul className="space-y-3">
//                                 {city.whyBook?.map((point, index) => (
//                                      <li key={index} className="flex items-center gap-3">
//                                          <CheckCircle size={18} className="text-green-500"/>
//                                          <span>{point}</span>
//                                      </li>
//                                 ))}
//                             </ul>
//                          </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         {/* <Footer /> */}
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { getOutstationBySlug } from "../api/outstationApi";
// import { CheckCircle, ChevronRight } from 'lucide-react';
// import GoZoBooking from "../components/RideBookingForm";


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


// export default function OutstationDetailPage() {
//   const { slug } = useParams();
//   const [city, setCity] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     getOutstationBySlug(slug)
//       .then((data) => {
//         if (data) setCity(data);
//         else setError("City details not found.");
//       })
//       .catch(() => setError("Failed to fetch city details."))
//       .finally(() => setLoading(false));
//   }, [slug]);

//   if (loading) return <p className="text-center py-20">Loading...</p>;
//   if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

//   return (
//     <div>
//       {/* ✅ Booking Form Hero Section */}
//       <div >
//         <GoZoBooking />
//       </div>


//       {/* Main Content */}
//       <div className="max-w-6xl mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
//           {/* Left Column */}
//           <div className="lg:col-span-2 space-y-12">
//             <h1 className="text-3xl font-extrabold text-slate-800">
//               Outstation Cabs in {city.name}
//             </h1>

//             {/* Descriptions */}
//             {city.descriptions?.length > 0 && (
//               <div className="space-y-6">
//                 {city.descriptions
//                   .sort((a, b) => a.order - b.order)
//                   .map((desc, idx) => (
//                     <div key={idx} className="space-y-2">
//                       {desc.title && <h2 className="text-2xl font-semibold">{desc.title}</h2>}
//                       <p className="text-slate-600">{desc.content}</p>
//                     </div>
//                   ))}
//               </div>
//             )}

//             {/* Popular Fares */}
//             {city.fares?.length > 0 && (
//               <div>
//                 <h2 className="text-2xl font-bold text-slate-800 mb-6">
//                   Popular Outstation Fares from {city.name}
//                 </h2>
//                 <div className="space-y-3">
//                   {city.fares.map((fare, idx) => (
//                     <Link
//                       key={idx}
//                       to="#"
//                       className="flex justify-between items-center p-4 border rounded-lg hover:bg-slate-50"
//                     >
//                       <span className="font-semibold">{fare.route}</span>
//                       <div className="flex items-center gap-2">
//                         <span className="text-sm">starting at</span>
//                         <span className="font-bold">₹{fare.price}</span>
//                         <ChevronRight size={20} />
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Sections */}
//             {city.sections?.length > 0 && (
//               <div className="space-y-12">
//                 {city.sections.map((sec, idx) => {
//                   const HeadingTag = sec.headingType || "h2";
//                   const paragraphAlign = sec.paragraphAlign === "center" ? "text-center" : "text-left";
//                   return (
//                     <div key={idx} className="space-y-4">
//                       {sec.heading && (
//                         <HeadingTag className="font-bold text-slate-800 text-2xl">
//                           {sec.heading}
//                         </HeadingTag>
//                       )}
//                       {sec.subheading && <h4 className="text-lg text-slate-600">{sec.subheading}</h4>}
//                       {sec.paragraph && <p className={`text-slate-600 ${paragraphAlign}`}>{sec.paragraph}</p>}
//                       {sec.image && (
//                         <figure>
//                           <img
//                             src={sec.image}
//                             alt={sec.imageAltText || "Section"}
//                             className="rounded-lg shadow-md"
//                           />
//                           {sec.imageTitle && (
//                             <figcaption className="text-sm text-gray-500 mt-1">{sec.imageTitle}</figcaption>
//                           )}
//                         </figure>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             )}

//             {/* FAQs */}
//             {city.faqs?.length > 0 && (
//               <div className="mt-12">
//                 <h2 className="text-2xl font-bold text-slate-800 mb-6">FAQs</h2>
//                 <div className="space-y-4">
//                   {city.faqs.map((faq, idx) => (
//                     <div key={idx} className="border rounded-lg p-4">
//                       <h4 className="font-semibold text-slate-700">{faq.question}</h4>
//                       <p className="text-slate-600 mt-1">{faq.answer}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Right Column: Sidebar */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-28 space-y-8">
//               {city.atAGlance && (
//                 <div className="bg-slate-50 p-6 rounded-lg border">
//                   <h3 className="font-bold text-xl text-slate-800 mb-4">{city.atAGlance}</h3>
//                   <p className="text-sm text-slate-600">{city.extraInfo}</p>
//                 </div>
//               )}

//               {city.whyBook?.length > 0 && (
//                 <div className="bg-slate-50 p-6 rounded-lg border">
//                   <h4 className="font-bold text-xl text-slate-800 mb-4">Why book with us</h4>
//                   <ul className="space-y-3">
//                     {city.whyBook.map((point, idx) => (
//                       <li key={idx} className="flex items-center gap-3">
//                         <CheckCircle size={18} className="text-green-500" />
//                         <span>{point}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer/>

//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useParams, Link, useLocation } from "react-router-dom";
// import { getOutstationBySlug } from "../api/outstationApi";
// import { CheckCircle, ChevronRight } from 'lucide-react';
// import GoZoBooking from "../components/RideBookingForm";


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


// export default function OutstationDetailPage() {
//   const { slug } = useParams();
//   const location = useLocation();
//   const [city, setCity] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Extract prefillData from location state
//   const prefillData = location.state?.prefillData;

//   useEffect(() => {
//     getOutstationBySlug(slug)
//       .then((data) => {
//         if (data) setCity(data);
//         else setError("City details not found.");
//       })
//       .catch(() => setError("Failed to fetch city details."))
//       .finally(() => setLoading(false));
//   }, [slug]);

//   if (loading) return <p className="text-center py-20">Loading...</p>;
//   if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

//   return (
//     <div>
//       {/* ✅ Booking Form Hero Section - Pass prefillData */}
//       <div>
//         <GoZoBooking prefillData={prefillData} />
//       </div>


//       {/* Main Content */}
//       <div className="max-w-6xl mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
//           {/* Left Column */}
//           <div className="lg:col-span-2 space-y-12">
//             <h1 className="text-3xl font-extrabold text-slate-800">
//               Outstation Cabs in {city.name}
//             </h1>

//             {/* Descriptions */}
//             {city.descriptions?.length > 0 && (
//               <div className="space-y-6">
//                 {city.descriptions
//                   .sort((a, b) => a.order - b.order)
//                   .map((desc, idx) => (
//                     <div key={idx} className="space-y-2">
//                       {desc.title && <h2 className="text-2xl font-semibold">{desc.title}</h2>}
//                       <p className="text-slate-600">{desc.content}</p>
//                     </div>
//                   ))}
//               </div>
//             )}

//             {/* Popular Fares */}
//             {city.fares?.length > 0 && (
//               <div>
//                 <h2 className="text-2xl font-bold text-slate-800 mb-6">
//                   Popular Outstation Fares from {city.name}
//                 </h2>
//                 <div className="space-y-3">
//                   {city.fares.map((fare, idx) => (
//                     <Link
//                       key={idx}
//                       to="#"
//                       className="flex justify-between items-center p-4 border rounded-lg hover:bg-slate-50"
//                     >
//                       <span className="font-semibold">{fare.route}</span>
//                       <div className="flex items-center gap-2">
//                         <span className="text-sm">starting at</span>
//                         <span className="font-bold">₹{fare.price}</span>
//                         <ChevronRight size={20} />
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Sections */}
//             {city.sections?.length > 0 && (
//               <div className="space-y-12">
//                 {city.sections.map((sec, idx) => {
//                   const HeadingTag = sec.headingType || "h2";
//                   const paragraphAlign = sec.paragraphAlign === "center" ? "text-center" : "text-left";
//                   return (
//                     <div key={idx} className="space-y-4">
//                       {sec.heading && (
//                         <HeadingTag className="font-bold text-slate-800 text-2xl">
//                           {sec.heading}
//                         </HeadingTag>
//                       )}
//                       {sec.subheading && <h4 className="text-lg text-slate-600">{sec.subheading}</h4>}
//                       {sec.paragraph && <p className={`text-slate-600 ${paragraphAlign}`}>{sec.paragraph}</p>}
//                       {sec.image && (
//                         <figure>
//                           <img
//                             src={sec.image}
//                             alt={sec.imageAltText || "Section"}
//                             className="rounded-lg shadow-md"
//                           />
//                           {sec.imageTitle && (
//                             <figcaption className="text-sm text-gray-500 mt-1">{sec.imageTitle}</figcaption>
//                           )}
//                         </figure>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             )}

//             {/* FAQs */}
//             {city.faqs?.length > 0 && (
//               <div className="mt-12">
//                 <h2 className="text-2xl font-bold text-slate-800 mb-6">FAQs</h2>
//                 <div className="space-y-4">
//                   {city.faqs.map((faq, idx) => (
//                     <div key={idx} className="border rounded-lg p-4">
//                       <h4 className="font-semibold text-slate-700">{faq.question}</h4>
//                       <p className="text-slate-600 mt-1">{faq.answer}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Right Column: Sidebar */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-28 space-y-8">
//               {city.atAGlance && (
//                 <div className="bg-slate-50 p-6 rounded-lg border">
//                   <h3 className="font-bold text-xl text-slate-800 mb-4">{city.atAGlance}</h3>
//                   <p className="text-sm text-slate-600">{city.extraInfo}</p>
//                 </div>
//               )}

//               {city.whyBook?.length > 0 && (
//                 <div className="bg-slate-50 p-6 rounded-lg border">
//                   <h4 className="font-bold text-xl text-slate-800 mb-4">Why book with us</h4>
//                   <ul className="space-y-3">
//                     {city.whyBook.map((point, idx) => (
//                       <li key={idx} className="flex items-center gap-3">
//                         <CheckCircle size={18} className="text-green-500" />
//                         <span>{point}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer/>

//     </div>
//   );
// }



import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { CheckCircle, ChevronRight } from 'lucide-react';
import GoZoBooking from "../components/RideBookingForm";
import { Helmet } from "react-helmet";

// --- DUMMY IMPORTS FOR CAR IMAGES (replace with your actual paths) ---
import img1 from "../assets/car-mini-motucabs.webp";
import img2 from "../assets/innova-motucabs.jpg";
import img3 from "../assets/prime-sedan.webp";
import img4 from "../assets/tempo_12_seater-motucabs.webp";
import tempoTravellerImg from "../assets/tempo_12_seater-motucabs.webp"; // for sidebar
import sedanImg from "../assets/prime-sedan.webp"; // for sidebar

// --- DYNAMIC MOCK DATA GENERATOR ---
const generateOutstationData = (cityName) => {
  return {
    name: cityName,
    mainDescription: {
      title: `Book Outstation cabs for travel to or from ${cityName}`,
      subline: `Outstation cab rental with driver for ${cityName} - starting at ₹10/km`,
      content: `Motu Cabs provides outstation cab booking services with driver in ${cityName} for day-based rentals, one way, round trips, multicity travel and many more...`
    },
    sections: [
      { title: `Hire a taxi with driver for the day in ${cityName}`, content: `Most of our corporate clients prefer to have a chauffeur driver car at their disposal for when they are visiting ${cityName} for either a few hours, full day or a few days...` },
      { title: `Are the drivers knowledgeable about the highways and the journey from ${cityName}?`, content: `Motu Cabs uses local taxi operators in ${cityName} for its ${cityName} outstation taxi service who maintain highest level of service quality...` },
      { title: "How clear is the pricing and billing?", content: `Motu's booking and billing process for outstation car hire from ${cityName} is completely transparent...` },
      { title: `Outstation cabs in ${cityName}`, content: `With Motu Cabs you can book an outstation cabs 24x7 from ${cityName} to Haiderpur, Maruti Kunj, Tikli, Jhanjrola, Naurangpur, Kadarpur, Kharkhari Nahar, etc.` }
    ],
    // ✅ FIXED: Added 'distance' property back to each fare object
    fares: [
      { to: "Dehradun" }, { to: "Jaipur" }, { to: "Agra" },
      { to: "Vrindavan" }, { to: "Bareilly" }, { to: "Haridwar" },
      { to: "Mathura"}, { to: "Moradabad" }, { to: "Chandigarh" },
      { to: "Rishikesh" },
    ],
    faqs: [
      { question: `Can I book an outstation cab in ${cityName} on-demand and on-the-fly using my app?`, answer: `Due to the nature of outstation travel, most trips are pre-scheduled and pre-booked...` },
      { question: `What is the daily allowance for the driver when renting an outstation cab in ${cityName}?`, answer: `When renting a vehicle for outstation cab booking, the driver's daily expenses like food and lodging are covered by the daily allowance...` },
      { question: `What are the different types of trips that a person can take for outstation travel from ${cityName}?`, answer: `You can book a one-way trip, round trip or plan an itinerary for travel to multiple cities from ${cityName}...` },
    ],
    sidebar: {
      images: [
        { src: tempoTravellerImg, title: `Book tempo traveller online in ${cityName}` },
        { src: sedanImg, title: `Car rental option in ${cityName}` }
      ],
      // ✅ FIXED: Moved 'whyBook' inside the sidebar object for better organization
      whyBook: ["Excellent reputation", "No credit card fees", "Tolls included", "Free cancellation", "Professional drivers", "Hassle-free booking"],
      faqs: [
        { question: `How much does ${cityName} taxi cost?`, answer: "The cost varies based on the type of car and trip." },
        { question: "Does price includes Driver charges and Night charges?", answer: "Yes, our prices are all-inclusive for the specified itinerary." },
        { question: `Do I need to make payment in advance to book cab in ${cityName}?`, answer: "A partial advance payment is required to confirm your booking." }
      ]
    },
    popularRoutes: ["Jaipur", "Dehradun", "Agra", "Bareilly", "Haridwar", "Moradabad", "Vrindavan", "Roorkee", "Delhi", "Jonk"]
  };
};

// --- MOCK API FETCHER ---
const getOutstationBySlug = async (slug) => {
  // ✅ FIXED: This now correctly handles multi-word slugs like 'delhi-ncr'
  const cityName = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  return generateOutstationData(cityName);
};

const Header = () => { /* ... Your Header Component ... */ };
const Footer = () => (
  <footer className="bg-gray-900 text-gray-300">
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div><div className="text-2xl font-bold mb-4 flex items-center gap-2"><span className="text-blue-600">Motu<span className="text-orange-500">Cab</span></span></div><p className="text-sm text-gray-400 leading-relaxed">Your trusted partner for reliable, safe, and affordable transportation solutions across India.</p></div>
        <div> <h4 className="font-semibold text-white mb-4">Services</h4> <ul className="text-sm space-y-2"> <li><a href="/city-rides" className="hover:text-blue-400 transition-colors">City Rides</a></li> <li><a href="/outstation" className="hover:text-blue-400 transition-colors">Outstation</a></li> <li><a href="/airport-transfer" className="hover:text-blue-400 transition-colors">Airport Transfer</a></li> <li><a href="/corporate" className="hover:text-blue-400 transition-colors">Corporate</a></li> </ul> </div>
        <div> <h4 className="font-semibold text-white mb-4">Company</h4> <ul className="text-sm space-y-2"> <li><a href="/" className="hover:text-blue-400 transition-colors">Home</a></li> <li><a href="/about" className="hover:text-blue-400 transition-colors">About Us</a></li> <li><a href="/contact" className="hover:text-blue-400 transition-colors">Contact</a></li> <li><a href="/careers" className="hover:text-blue-400 transition-colors">Careers</a></li> </ul> </div>
        <div> <h4 className="font-semibold text-white mb-4">Legal</h4> <ul className="text-sm space-y-2"> <li><a href="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li> <li><a href="/terms-of-service" className="hover:text-blue-400 transition-colors">Terms of Service</a></li> <li><a href="/refund-policy" className="hover:text-blue-400 transition-colors">Refund Policy</a></li> <li><a href="/cookie-policy" className="hover:text-blue-400 transition-colors">Cookie Policy</a></li> </ul> </div>
      </div>
      <div className="border-t border-gray-800 pt-8 text-center"> <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} MotuCab Technologies Pvt. Ltd. All Rights Reserved.</p> </div>
    </div>
  </footer>
);

export default function OutstationDetailPage() {
  const { slug } = useParams();
  const location = useLocation();
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [dynamicPrefill, setDynamicPrefill] = useState(null);
  const bookingFormRef = useRef(null);
  const prefillDataFromLocation = location.state?.prefillData;

  const horizontalImages = [
    { src: img1, alt: "Hatchback for Outstation", description: "Swift, Celerio or equivalent" },
    { src: img3, alt: "Sedan for Outstation", description: "Dzire, Etios or equivalent" },
    { src: img2, alt: "SUV for Outstation", description: "Innova, Ertiga or equivalent" },
    { src: img4, alt: "Tempo Traveller for Group Travel", description: "Tempo Traveller (12 seater)" },
  ];

  useEffect(() => {
    const fetchCityData = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getOutstationBySlug(slug || "gurugram");
            if (data) setCity(data);
            else setError("City details not found.");
        } catch (err) {
            setError("Failed to fetch city details.");
        } finally {
            setLoading(false);
        }
    };
    fetchCityData();
  }, [slug]);

  const handleBookNowClick = () => {
    bookingFormRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleRouteBookClick = (destination) => {
    setDynamicPrefill({ from: city.name, to: destination });
    bookingFormRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;
  if (!city) return <p className="text-center py-20 text-gray-500">City data not available.</p>;

  const metaTitle = `Best Outstation Cab Service in ${city.name}`;
  const metaDescription = `Book best Outstation Cab in ${city.name} with driver at the best deals.`;
  const metaKeywords = `cab service in ${city.name.toLowerCase()}, ${city.name.toLowerCase()} cab service, cab in ${city.name.toLowerCase()}, ${city.name.toLowerCase()} cab, taxi in ${city.name.toLowerCase()}, ${city.name.toLowerCase()} taxi, airport cab service in ${city.name.toLowerCase()}, railway station cab service in ${city.name.toLowerCase()}, local cab service in ${city.name.toLowerCase()}, outstation cab service in ${city.name.toLowerCase()}, affordable cab service in ${city.name.toLowerCase()}, reliable cab service in ${city.name.toLowerCase()}, 24/7 cab service in ${city.name.toLowerCase()}, convenient cab service in ${city.name.toLowerCase()}, online cab booking in ${city.name.toLowerCase()}, app cab booking in ${city.name.toLowerCase()}, cab booking in ${city.name.toLowerCase()}, taxi service in ${city.name.toLowerCase()}, hotel transfer in ${city.name.toLowerCase()}, app cab service ${city.name.toLowerCase()}, sedan cab service ${city.name.toLowerCase()}, online cab service ${city.name.toLowerCase()}, one-way cab service ${city.name.toLowerCase()}, car rental ${city.name.toLowerCase()}, rent a car ${city.name.toLowerCase()}, car rental near me, cheap car rental ${city.name.toLowerCase()}, best car rental ${city.name.toLowerCase()}, airport car rental ${city.name.toLowerCase()}, long-term car rental ${city.name.toLowerCase()}, chauffeur driven car rental ${city.name.toLowerCase()}, innova car rental ${city.name.toLowerCase()}, affordable car rental in ${city.name.toLowerCase()}, car hire in ${city.name.toLowerCase()}, round-trip car rental in ${city.name.toLowerCase()}, suv rental in ${city.name.toLowerCase()}, app-based car rental in ${city.name.toLowerCase()}`;
  const canonicalUrl = `https://www.motucabs.com/outstation-cab/${slug}`;

  return (
    <div className="bg-white">

      <Helmet>
        <title>{metaTitle}</title>
        <meta name="title" content={metaTitle} />
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="copyright" content="copyright @motucabs. All Rights Reserved" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      
      <Header />
      <div ref={bookingFormRef}>
        <GoZoBooking prefillData={dynamicPrefill || prefillDataFromLocation} />
      </div>

      <div className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">Our Fleet of Cabs</h2>
          <p className="text-center text-slate-600 mb-12">Choose from a wide range of cars to suit your needs.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {horizontalImages.map((img, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300">
                <div className="w-full h-48 bg-white flex items-center justify-center p-4"><img src={img.src} alt={img.alt} className="max-w-full max-h-full object-contain" /></div>
                {img.description && <p className="px-4 pt-4 pb-2 text-black font-semibold text-center text-base">{img.description}</p>}
                <div className="px-4 py-4 flex justify-center mt-auto"><button onClick={handleBookNowClick} className="px-5 py-2 bg-gradient-to-r from-blue-600 to-orange-500 text-white font-semibold rounded-lg hover:opacity-90 transition w-full">Book Now</button></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-16">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-800 mb-2">{city.mainDescription.title}</h1>
              <p className="text-sm text-slate-500 mb-4">{city.mainDescription.subline}</p>
              <p className="text-slate-600 leading-relaxed">{city.mainDescription.content}</p>
            </div>

            {city.sections?.map((sec, idx) => (
              <div key={idx}>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">{sec.title}</h2>
                <p className="text-slate-600 leading-relaxed">{sec.content}</p>
              </div>
            ))}

            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Popular Outstation Routes from {city.name}</h2>
              <div className="space-y-3">
                {city.fares.map((fare, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                    <span className="font-semibold text-slate-700">{city.name} to {fare.to} Travel</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-slate-500 font-medium">{fare.distance}</span>
                      <button onClick={() => handleRouteBookClick(fare.to)} className="px-5 py-2 bg-blue-600 text-white font-semibold text-sm rounded-md hover:bg-blue-700 transition-colors">Book Now</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-12">
              {city.faqs.map((faq, idx) => (
                <div key={idx}>
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">{faq.question}</h2>
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-8">
              {/* ✅ FIXED: Uncommented the sidebar images section */}
              {/* <div className="space-y-4">
                {city.sidebar.images.map((img, idx) => (
                  <div key={idx} className="text-center">
                    <img src={img.src} alt={img.title} className="w-48 h-auto inline-block mb-2" />
                    <p className="text-sm text-blue-600 font-semibold">{img.title}</p>
                  </div>
                ))}
              </div> */}
              
              {/* ✅ FIXED: Updated to use city.sidebar.whyBook */}
              {city.sidebar.whyBook?.length > 0 && (
                <div className="bg-slate-50 p-6 rounded-lg border">
                  <h4 className="font-bold text-xl text-slate-800 mb-4">Why book with us</h4>
                  <ul className="space-y-3">
                    {city.sidebar.whyBook.map((point, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <CheckCircle size={18} className="text-green-500" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">FAQs About {city.name} Cabs</h3>
                <div className="space-y-3">
                  {city.sidebar.faqs.map((faq, idx) => (
                    <div key={idx} className="border rounded-lg p-3 text-sm">
                      <details>
                        <summary className="font-semibold cursor-pointer flex justify-between items-center">
                          {faq.question}
                          <ChevronRight className="transform transition-transform duration-200" size={16} />
                        </summary>
                        <p className="text-slate-600 mt-2">{faq.answer}</p>
                      </details>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ FIXED: Added back the final popular routes section */}
      {/* {!slug.includes('-to-') && (
        <div className="bg-blue-50 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Popular outstation cab routes</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-3 text-sm">
              {city.popularRoutes.map((route, idx) => {
                const destinationSlug = route.toLowerCase().replace(/ /g, '-');
                const routePath = `/outstation/${slug}-to-${destinationSlug}`;
                return (
                  <Link to={routePath} key={idx} className="text-slate-700 hover:text-blue-600 flex items-center gap-2">
                    <ChevronRight size={14} /> <span>{city.name.split(' ')[0]} to {route}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )} */}

      <Footer />
    </div>
  );
}