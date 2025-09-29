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


import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { CheckCircle, ChevronRight, Star } from "lucide-react";
import GoZoBooking from "../components/RideBookingForm";

// Reusable Header & Footer Components
const Header = () => {
  /* ... */
};

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
                        <li><a href="/terms-of-service" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
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

const CarRentalDetailPage = () => {
  const { slug } = useParams();
  const location = useLocation();
  const [rental, setRental] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract prefillData from location state
  const prefillData = location.state?.prefillData;

  useEffect(() => {
    const fetchRentalDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/car-rentals/${slug}`
        );
        if (res.data) {
          setRental(res.data);
        }
      } catch (err) {
        setError("Could not load rental details.");
      } finally {
        setLoading(false);
      }
    };
    fetchRentalDetails();
  }, [slug]);

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (error)
    return <p className="text-center py-20 text-red-500">{error}</p>;
  if (!rental)
    return (
      <p className="text-center py-20">
        No details found for this location.
      </p>
    );

  return (
    <div className="bg-white">
      {/* Header */}
      <Header />

      {/* ✅ Booking Form Hero Section - Pass prefillData */}
      <div>
        <GoZoBooking prefillData={prefillData} />
      </div>

      {/* ================= MAIN CONTENT + SIDEBAR ================= */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-800 mb-2">
                Book Sanitized & Disinfected car rental in {rental.name} with
                driver for local and outstation trips with Gozo
              </h1>
              <div className="flex items-center gap-2 text-yellow-500 mb-6">
                <Star size={18} fill="currentColor" />
                <span className="text-sm text-gray-600">
                  (13685 reviews)
                </span>
              </div>

              <div className="prose max-w-none text-slate-600 leading-relaxed space-y-4">
                {rental.description?.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">
                Hourly car rental fares for local trips with Gozo Cabs Day
                Rental!
              </h2>
              <div className="space-y-3">
                {rental.packages?.map((pkg, index) => (
                  <Link
                    to="#"
                    key={index}
                    className="flex justify-between items-center p-4 border rounded-lg hover:bg-slate-50"
                  >
                    <span className="font-semibold">
                      {pkg.hours} Hrs & {pkg.distanceLimitKm} Kms local rental
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-500">
                        starting at
                      </span>
                      <span className="font-bold">
                        ₹{pkg.price.toLocaleString("en-IN")}
                      </span>
                      <ChevronRight
                        size={20}
                        className="text-slate-400"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Why book a day rental with Gozo?
              </h2>
              <ul className="list-disc list-inside space-y-3 text-slate-600">
                {rental.whyBook?.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">
                Popular outstation cab routes
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3 text-blue-600 font-semibold">
                {rental.outstationFares?.map((route, i) => (
                  <Link to="#" key={i} className="hover:underline">
                    &gt; {rental.name} to {route.destination}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-8">
              <img
                src="https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png"
                alt="Luxury Car"
                className="w-full rounded-md mb-4"
              />
              <h3 className="font-bold text-center text-lg text-blue-600 mb-6">
                Luxury Car Rental in {rental.name}
              </h3>
              <div className="bg-slate-50 p-6 rounded-lg border">
                <h3 className="font-bold text-xl text-slate-800 mb-4">
                  {rental.name} at a Glance
                </h3>
                <p className="text-sm text-slate-600">{rental.atAGlance}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-xl text-slate-800 mb-4">
                  FAQs About {rental.name} Cabs
                </h3>
                {rental.faqs?.map((faq, i) => (
                  <div
                    key={i}
                    className="p-3 bg-white border rounded shadow-sm text-left"
                  >
                    <h4 className="font-semibold">{faq.question}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CarRentalDetailPage;
