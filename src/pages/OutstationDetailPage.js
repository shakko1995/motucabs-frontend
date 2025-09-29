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


import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { getOutstationBySlug } from "../api/outstationApi";
import { CheckCircle, ChevronRight } from 'lucide-react';
import GoZoBooking from "../components/RideBookingForm";


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


export default function OutstationDetailPage() {
  const { slug } = useParams();
  const location = useLocation();
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract prefillData from location state
  const prefillData = location.state?.prefillData;

  useEffect(() => {
    getOutstationBySlug(slug)
      .then((data) => {
        if (data) setCity(data);
        else setError("City details not found.");
      })
      .catch(() => setError("Failed to fetch city details."))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

  return (
    <div>
      {/* ✅ Booking Form Hero Section - Pass prefillData */}
      <div>
        <GoZoBooking prefillData={prefillData} />
      </div>


      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-12">
            <h1 className="text-3xl font-extrabold text-slate-800">
              Outstation Cabs in {city.name}
            </h1>

            {/* Descriptions */}
            {city.descriptions?.length > 0 && (
              <div className="space-y-6">
                {city.descriptions
                  .sort((a, b) => a.order - b.order)
                  .map((desc, idx) => (
                    <div key={idx} className="space-y-2">
                      {desc.title && <h2 className="text-2xl font-semibold">{desc.title}</h2>}
                      <p className="text-slate-600">{desc.content}</p>
                    </div>
                  ))}
              </div>
            )}

            {/* Popular Fares */}
            {city.fares?.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-6">
                  Popular Outstation Fares from {city.name}
                </h2>
                <div className="space-y-3">
                  {city.fares.map((fare, idx) => (
                    <Link
                      key={idx}
                      to="#"
                      className="flex justify-between items-center p-4 border rounded-lg hover:bg-slate-50"
                    >
                      <span className="font-semibold">{fare.route}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">starting at</span>
                        <span className="font-bold">₹{fare.price}</span>
                        <ChevronRight size={20} />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Sections */}
            {city.sections?.length > 0 && (
              <div className="space-y-12">
                {city.sections.map((sec, idx) => {
                  const HeadingTag = sec.headingType || "h2";
                  const paragraphAlign = sec.paragraphAlign === "center" ? "text-center" : "text-left";
                  return (
                    <div key={idx} className="space-y-4">
                      {sec.heading && (
                        <HeadingTag className="font-bold text-slate-800 text-2xl">
                          {sec.heading}
                        </HeadingTag>
                      )}
                      {sec.subheading && <h4 className="text-lg text-slate-600">{sec.subheading}</h4>}
                      {sec.paragraph && <p className={`text-slate-600 ${paragraphAlign}`}>{sec.paragraph}</p>}
                      {sec.image && (
                        <figure>
                          <img
                            src={sec.image}
                            alt={sec.imageAltText || "Section"}
                            className="rounded-lg shadow-md"
                          />
                          {sec.imageTitle && (
                            <figcaption className="text-sm text-gray-500 mt-1">{sec.imageTitle}</figcaption>
                          )}
                        </figure>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* FAQs */}
            {city.faqs?.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">FAQs</h2>
                <div className="space-y-4">
                  {city.faqs.map((faq, idx) => (
                    <div key={idx} className="border rounded-lg p-4">
                      <h4 className="font-semibold text-slate-700">{faq.question}</h4>
                      <p className="text-slate-600 mt-1">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-8">
              {city.atAGlance && (
                <div className="bg-slate-50 p-6 rounded-lg border">
                  <h3 className="font-bold text-xl text-slate-800 mb-4">{city.atAGlance}</h3>
                  <p className="text-sm text-slate-600">{city.extraInfo}</p>
                </div>
              )}

              {city.whyBook?.length > 0 && (
                <div className="bg-slate-50 p-6 rounded-lg border">
                  <h4 className="font-bold text-xl text-slate-800 mb-4">Why book with us</h4>
                  <ul className="space-y-3">
                    {city.whyBook.map((point, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <CheckCircle size={18} className="text-green-500" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
      
    </div>
  );
}