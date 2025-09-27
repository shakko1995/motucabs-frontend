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

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAirportBySlug } from "../api/airportApi";
import { CheckCircle, ChevronRight } from "lucide-react";
import GoZoBooking from "../components/RideBookingForm";

// Reusable Header & Footer Components
const Header = () => { /* ... Your Header Component ... */ };
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
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-white mb-4">Legal</h4>
                    <ul className="text-sm space-y-2">
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Refund Policy</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center">
                <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} MotuCab Technologies Pvt. Ltd. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
);

const AirportDetailPage = () => {
  const { slug } = useParams();
  const [airport, setAirport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAirportData = async () => {
      try {
        const data = await getAirportBySlug(slug);
        if (data) setAirport(data);
        else setError("Airport details not found.");
      } catch {
        setError("Failed to load airport details.");
      } finally {
        setLoading(false);
      }
    };
    fetchAirportData();
  }, [slug]);

  if (loading)
    return <p className="text-center py-20 text-gray-500">Loading...</p>;
  if (error)
    return <p className="text-center py-20 text-red-500">{error}</p>;

  return (
    <div className="bg-white">
      {/* Header */}
      <Header />

      {/* ✅ Booking Form Hero Section */}
     <div >
        <GoZoBooking />
      </div>

      {/* ================= MAIN CONTENT + SIDEBAR ================= */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-extrabold text-slate-800 mb-4">
            Book {airport.name} Transfer Cabs Online
          </h1>
          <p className="text-slate-600 mb-8">
            {airport.description || "Detailed description not available for this airport."}
          </p>

          {/* Transfers */}
          {airport.transfers?.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">
                Popular airport transfers in {airport.name}
              </h2>
              <div className="space-y-3">
                {airport.transfers.map((route, index) => (
                  <Link
                    to="#"
                    key={index}
                    className="flex justify-between items-center p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-semibold text-slate-700">
                      {airport.name} Airport to {route.destination} transfer
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-500">starting at</span>
                      <span className="font-bold text-slate-800">
                        ₹{route.price.toLocaleString("en-IN")}
                      </span>
                      <ChevronRight size={20} className="text-slate-400" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Sections */}
          {airport.sections?.length > 0 &&
            airport.sections.map((section, idx) => (
              <div key={idx} className="mb-8">
                {section.heading &&
                  React.createElement(
                    section.headingType || "h2",
                    { className: "text-xl font-bold text-slate-800 mb-2" },
                    section.heading
                  )}
                {section.subheading && (
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">
                    {section.subheading}
                  </h3>
                )}
                {section.paragraph && (
                  <p
                    className={`text-slate-600 mb-2 text-${
                      section.paragraphAlign || "left"
                    }`}
                  >
                    {section.paragraph}
                  </p>
                )}
                {section.image && (
                  <img
                    src={section.image}
                    alt={section.imageAltText || ""}
                    className="rounded-md mt-2 mb-4"
                  />
                )}
              </div>
            ))}

          {/* FAQs */}
          {airport.faqs?.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">FAQs</h2>
              <div className="space-y-4">
                {airport.faqs.map((faq, index) => (
                  <div key={index} className="border p-4 rounded-md">
                    <h3 className="font-semibold text-slate-800 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-slate-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-8">
            {/* Why Book & Extra Info */}
            <div className="bg-white p-6 rounded-lg shadow-lg border">
              <img
                src="https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png"
                alt="Luxury Car"
                className="w-full rounded-md mb-4"
              />
              <h3 className="font-bold text-center text-lg text-blue-600 mb-6">
                Luxury Car Rental at {airport.name}
              </h3>
              {airport.whyBook?.length > 0 && (
                <div className="bg-slate-50 p-6 rounded-md">
                  <h4 className="font-bold text-xl text-slate-800 mb-4">
                    Why book with us
                  </h4>
                  <ul className="space-y-3">
                    {airport.whyBook.map((point, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle size={18} className="text-green-500" />
                        <span className="text-slate-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {airport.extraInfo && (
              <div className="bg-slate-50 p-6 rounded-lg border">
                <h4 className="font-bold text-xl text-slate-800 mb-4">
                  Extra Info
                </h4>
                <p className="text-sm text-slate-600">{airport.extraInfo}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Popular Outstation Routes */}
      {airport.name && (
        <div className="bg-blue-50 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              Popular outstation cab routes from {airport.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3 text-blue-600 font-semibold">
              <Link to="#" className="hover:underline">
                &gt; {airport.name} to Dalhousie
              </Link>
              <Link to="#" className="hover:underline">
                &gt; {airport.name} to Chandigarh
              </Link>
              <Link to="#" className="hover:underline">
                &gt; {airport.name} to Jalandhar
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AirportDetailPage;


