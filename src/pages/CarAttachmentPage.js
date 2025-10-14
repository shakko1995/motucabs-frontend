// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { ChevronDown } from 'lucide-react';

// // --- API Function to fetch a single car attachment page by its slug ---
// const getCarAttachmentBySlug = async (slug) => {
//     try {
//         const response = await axios.get(`http://localhost:5000/api/car-attachment/${slug}`);
//         return response.data;
//     } catch (error) {
//         console.error("Failed to fetch car attachment data", error);
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

// // --- Main Car Attachment Page Component ---
// export default function CarAttachmentPage() {
//     const { slug } = useParams(); // Gets the city slug from the URL (e.g., "patna")
//     const [attachmentData, setAttachmentData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchData = async () => {
//             if (!slug) return;
//             setLoading(true);
//             setError('');
//             const data = await getCarAttachmentBySlug(slug);
//             if (data) {
//                 setAttachmentData(data);
//             } else {
//                 setError(`Could not find information for the city: ${slug}.`);
//             }
//             setLoading(false);
//         };
//         fetchData();
//     }, [slug]);

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="text-center py-20 px-4">
//                 <h1 className="text-2xl font-bold text-red-600">Page Not Found</h1>
//                 <p className="text-gray-700 mt-2">{error}</p>
//             </div>
//         );
//     }

//     if (!attachmentData) {
//         return null; // Render nothing if there's no data
//     }

//     // Sort sections by the 'order' field to ensure correct display order
//     const sortedSections = attachmentData.sections.sort((a, b) => a.order - b.order);

//     return (
//         <div className="bg-gray-50 font-sans">
//             {/* --- Hero Section --- */}
//             <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center py-20 px-4">
//                 <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{attachmentData.title || `Attach Your Car in ${attachmentData.city}`}</h1>
//                 <p className="max-w-3xl mx-auto text-lg md:text-xl opacity-90">{attachmentData.description || `Partner with us and earn a steady income by attaching your car in ${attachmentData.city}.`}</p>
//                 <a href="#contact-form" className="mt-8 inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300">
//                     Become a Partner Today
//                 </a>
//             </header>

//             <main className="container mx-auto px-4 py-12 md:py-16">

//                 {/* --- Dynamically Rendered Content Sections --- */}
//                 {sortedSections.map((section, index) => (
//                     <section key={index} className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
//                         {/* Alternate image and text position for better visual flow */}
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
//                             {section.subheading && <p className="text-xl text-indigo-500 mb-4">{section.subheading}</p>}
//                             {section.paragraph && <p className="text-gray-600 leading-relaxed whitespace-pre-line">{section.paragraph}</p>}
//                         </div>
//                     </section>
//                 ))}

//                 {/* --- Fleet Types Section --- */}
//                 {attachmentData.fleets && attachmentData.fleets.length > 0 && (
//                     <section className="bg-white p-8 rounded-lg shadow-md my-16">
//                         <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Vehicle Types We Accept</h2>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//                             {attachmentData.fleets.map((fleet, index) => (
//                                 <div key={index} className="border rounded-lg p-6 text-center transition-shadow hover:shadow-lg">
//                                     <h3 className="text-xl font-semibold text-gray-900">{fleet.vehicleType}</h3>
//                                     {fleet.capacity && <p className="text-gray-500">{fleet.capacity} Seater</p>}
//                                     <p className="text-gray-600 mt-2 text-sm">{fleet.description}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </section>
//                 )}

//                 {/* --- FAQ Section --- */}
//                 {attachmentData.faqs && attachmentData.faqs.length > 0 && (
//                     <section className="max-w-3xl mx-auto my-16">
//                         <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Frequently Asked Questions</h2>
//                         <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
//                             {attachmentData.faqs.map((faq, index) => (
//                                 <FaqItem key={index} faq={faq} />
//                             ))}
//                         </div>
//                     </section>
//                 )}
//             </main>
//         </div>
//     );
// }






// import React, { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { Check, ChevronDown } from "lucide-react";
// import HeroForm from "./HeroForm";

// // --- Car Images ---
// import img1 from "../assets/car-mini-motucabs.webp";
// import img2 from "../assets/innova-motucabs.jpg";
// import img3 from "../assets/prime-sedan.webp";
// import img4 from "../assets/tempo_12_seater-motucabs.webp";

// // --- Header ---
// const Header = () => (
//   <nav className="bg-white shadow-sm sticky top-0 z-50">
//     <div className="container mx-auto px-4 h-20 flex justify-between items-center">
//       <div className="text-3xl font-bold">
//         <span className="text-blue-600">Motu</span>
//         <span className="text-orange-500">Cab</span>
//       </div>
//       <div>
//         <button className="font-semibold text-blue-600 border border-blue-600 rounded-full px-6 py-2 hover:bg-blue-600 hover:text-white transition-colors">
//           Request a call
//         </button>
//       </div>
//     </div>
//   </nav>
// );

// // --- API Function ---
// const getCarAttachmentBySlug = async (slug) => {
//   try {
//     const response = await axios.get(
//       `http://localhost:5000/api/car-attachment/${slug}`
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Failed to fetch car attachment data", error);
//     // Fallback mock data
//     const cityName =
//       slug.charAt(0).toUpperCase() + slug.slice(1).replace("-", " ");
//     return {
//       city: cityName,
//       sections: [],
//       faqs: [
//         {
//           question: `What documents are required for car attachment in ${cityName}?`,
//           answer:
//             "You will need your RC Book, Driving License, Car Insurance, PUC, Aadhaar Card, PAN Card, and vehicle photographs.",
//         },
//         {
//           question: "How are payments processed?",
//           answer:
//             "Payments are processed weekly and transferred directly to your registered bank account.",
//         },
//       ],
//     };
//   }
// };

// // --- FAQ Component ---
// const FaqItem = ({ faq }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   return (
//     <div className="border-b">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="flex justify-between items-center w-full py-4 text-left"
//       >
//         <h3 className="text-lg font-medium text-gray-800">{faq.question}</h3>
//         <ChevronDown
//           className={`transform transition-transform duration-300 ${
//             isOpen ? "rotate-180" : ""
//           }`}
//           size={20}
//         />
//       </button>
//       {isOpen && (
//         <div className="pb-4 text-gray-600">
//           <p>{faq.answer}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// // --- MAIN COMPONENT ---
// export default function CarAttachmentPage() {
//   const { slug } = useParams();
//   const [attachmentData, setAttachmentData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const formRef = useRef(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!slug) {
//         setError("City not specified in the URL.");
//         setLoading(false);
//         return;
//       }
//       setLoading(true);
//       const data = await getCarAttachmentBySlug(slug);
//       if (data) setAttachmentData(data);
//       else setError(`Could not find information for: ${slug}.`);
//       setLoading(false);
//     };
//     fetchData();
//   }, [slug]);

//   const handleAttachClick = () => {
//     formRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const horizontalImages = [
//     { src: img1, alt: "Hatchback Cab", description: "Attach your Hatchback" },
//     { src: img3, alt: "Sedan Cab", description: "Attach your Sedan" },
//     { src: img2, alt: "SUV Cab", description: "Attach your SUV" },
//     { src: img4, alt: "Tempo Traveller", description: "Attach your Minibus" },
//   ];

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="text-center py-20 px-4">
//         <h1 className="text-2xl font-bold text-red-600">
//           Information Not Available
//         </h1>
//         <p className="text-gray-700 mt-2">{error}</p>
//       </div>
//     );

//   if (!attachmentData) return null;
//   const sortedSections = attachmentData.sections?.sort(
//     (a, b) => a.order - b.order
//   );

//   return (
//     <div className="bg-gray-50 font-sans">
//       <Header />

//       {/* Hero Section */}
//       <header ref={formRef} className="bg-gradient-to-r from-slate-100 to-blue-50">
//         <div className="container mx-auto px-4 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 text-white">
//             <h2 className="text-3xl font-bold mb-2">Become a Partner</h2>
//             <p className="text-slate-400 mb-6">Fill in your details to get started.</p>
//             <HeroForm />
//           </div>
//           <div className="text-slate-700">
//             <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-800 mb-6">
//               Car Attachment in Delhi with Motu Cabs – Earn More, Drive Smart
//             </h1>
//             <p className="text-lg text-slate-600 mb-8">
//               If you own a car and are searching for a genuine platform to earn daily, Motu Cabs’ Car Attachment in Delhi is your best opportunity. We offer flexible, transparent, and rewarding partnerships for car owners and drivers looking to make steady income through city rides, airport transfers, and long-distance trips.
//             </p>
//             <ul className="space-y-4">
//               <li className="flex items-start gap-3">
//                 <Check className="text-green-500 flex-shrink-0 mt-1" size={22}/>
//                 <div>
//                   <h3 className="font-bold">High & Consistent Earnings</h3>
//                   <p className="text-sm text-slate-600">
//                     Regular city and outstation rides help you earn more daily.
//                   </p>
//                 </div>
//               </li>
//               <li className="flex items-start gap-3">
//                 <Check className="text-green-500 flex-shrink-0 mt-1" size={22}/>
//                 <div>
//                   <h3 className="font-bold">Transparent Payout System</h3>
//                   <p className="text-sm text-slate-600">
//                     No hidden fees — you earn what you deserve.
//                   </p>
//                 </div>
//               </li>
//               <li className="flex items-start gap-3">
//                 <Check className="text-green-500 flex-shrink-0 mt-1" size={22}/>
//                 <div>
//                   <h3 className="font-bold">Flexible Work Hours</h3>
//                   <p className="text-sm text-slate-600">
//                     Drive when you want — full-time or part-time.
//                   </p>
//                 </div>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </header>

//       {/* Vehicles Section */}
//       <div className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-6">
//           <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">
//             Vehicles We Onboard
//           </h2>
//           <p className="text-center text-slate-600 mb-12">
//             We accept a wide range of commercial vehicles in good condition.
//           </p>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//             {horizontalImages.map((img, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300"
//               >
//                 <div className="w-full h-48 flex items-center justify-center p-4">
//                   <img
//                     src={img.src}
//                     alt={img.alt}
//                     className="max-w-full max-h-full object-contain"
//                   />
//                 </div>
//                 {img.description && (
//                   <p className="px-4 pt-4 pb-2 text-black font-semibold text-center text-base">
//                     {img.description}
//                   </p>
//                 )}
//                 <div className="px-4 py-4 mt-auto border-t border-slate-100">
//                   <button
//                     onClick={handleAttachClick}
//                     className="w-full px-5 py-2 bg-gradient-to-r from-blue-600 to-orange-500 text-white font-semibold rounded-lg hover:opacity-90 transition"
//                   >
//                     Attach Now
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Delhi-Specific Information */}
//       <main className="container mx-auto px-4 py-12 md:py-16">
//         <section className="max-w-4xl mx-auto text-left space-y-12 mb-16">
//           <div>
//             <h2 className="text-3xl font-bold text-gray-800 mb-4">
//               Why Attach Your Car with Motu Cabs in Delhi?
//             </h2>
//             <p className="text-gray-600 leading-relaxed mb-6">
//               Delhi is one of India’s busiest travel hubs, and ride demand is always high. Attaching your car with Motu Cabs ensures you get maximum trip opportunities and steady earnings every day.
//             </p>
//             <ul className="space-y-4 text-gray-700">
//               <li className="flex gap-3">
//                 <Check className="text-green-500 mt-1" />
//                 <span><strong>Instant Ride Bookings</strong> – Our smart platform keeps your vehicle engaged with real-time requests.</span>
//               </li>
//               <li className="flex gap-3">
//                 <Check className="text-green-500 mt-1" />
//                 <span><strong>Weekly Payments</strong> – Get your earnings directly in your account or Motu Wallet.</span>
//               </li>
//               <li className="flex gap-3">
//                 <Check className="text-green-500 mt-1" />
//                 <span><strong>Driver Support 24×7</strong> – From onboarding to trip help, our team is always available.</span>
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h2 className="text-3xl font-bold text-gray-800 mb-4">
//               Car Attachment Options Available in Delhi
//             </h2>
//             <ul className="list-disc list-inside text-gray-600 space-y-2">
//               <li>Full-Time Car Attachment – Work daily and maximize your earnings.</li>
//               <li>Part-Time Car Attachment – Drive at your convenience and earn side income.</li>
//               <li>Driver or Owner Model – Either drive your car or attach it with a driver.</li>
//               <li>Corporate/Fleet Attachment – Attach multiple cars and grow your business.</li>
//             </ul>
//           </div>

//           <div>
//             <h2 className="text-3xl font-bold text-gray-800 mb-4">
//               Documents Required for Car Attachment in Delhi
//             </h2>
//             <ul className="list-disc list-inside text-gray-600 space-y-2">
//               <li>RC Book (Vehicle Registration Certificate)</li>
//               <li>Valid Driving License</li>
//               <li>Car Insurance Copy</li>
//               <li>Pollution Certificate (PUC)</li>
//               <li>Aadhaar Card & PAN Card</li>
//               <li>Passport Size Photo</li>
//               <li>Vehicle Photographs</li>
//             </ul>
//           </div>

//           <div>
//             <h2 className="text-3xl font-bold text-gray-800 mb-4">
//               How to Attach Your Car with Motu Cabs in Delhi
//             </h2>
//             <ol className="list-decimal list-inside text-gray-600 space-y-2">
//               <li>Submit your details and upload documents on our website or app.</li>
//               <li>Complete vehicle verification by our team.</li>
//               <li>Start receiving ride requests and earning immediately.</li>
//             </ol>
//             <p className="mt-4 text-gray-600">
//               Our process is 100% transparent, paperless, and fast — designed to help you start earning without delay.
//             </p>
//           </div>

//           <div className="text-center bg-blue-50 p-8 rounded-lg">
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">
//               Join Motu Cabs Delhi Today – Drive. Earn. Grow.
//             </h2>
//             <p className="text-gray-600">
//               Thousands of car owners across India are already earning through Motu Cabs. Don’t let your car sit idle — turn it into a source of consistent income today.
//             </p>
//             <p className="mt-4 text-gray-700 font-semibold">
//               📞 Contact Motu Cabs Delhi or visit{" "}
//               <a
//                 href="https://www.motucabs.com"
//                 className="text-blue-600 underline"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 www.motucabs.com
//               </a>{" "}
//               to start your car attachment journey!
//             </p>
//           </div>
//         </section>

//         {/* FAQs */}
//         {attachmentData.faqs?.length > 0 && (
//           <section className="max-w-3xl mx-auto my-16">
//             <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
//               Frequently Asked Questions
//             </h2>
//             <div className="bg-white p-8 rounded-lg shadow-md">
//               {attachmentData.faqs.map((faq, i) => (
//                 <FaqItem key={i} faq={faq} />
//               ))}
//             </div>
//           </section>
//         )}
//       </main>
//     </div>
//   );
// }











import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Check, ChevronDown } from "lucide-react";
import HeroForm from "./HeroForm";

// --- Car Images ---
import img1 from "../assets/car-mini-motucabs.webp";
import img2 from "../assets/innova-motucabs.jpg";
import img3 from "../assets/prime-sedan.webp";
import img4 from "../assets/tempo_12_seater-motucabs.webp";

// --- Header ---
const Header = () => (
  <nav className="bg-white shadow-sm sticky top-0 z-50">
    <div className="container mx-auto px-4 h-20 flex justify-between items-center">
      <div className="text-3xl font-bold">
        <span className="text-blue-600">Motu</span>
        <span className="text-orange-500">Cab</span>
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
const getCarAttachmentBySlug = async (slug) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/car-attachment/${slug}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch car attachment data", error);
    // Fallback mock data
    const cityName =
      slug.charAt(0).toUpperCase() + slug.slice(1).replace("-", " ");
    return {
      city: cityName,
      sections: [],
      faqs: [
        {
          question: `What documents are required for car attachment in ${cityName}?`,
          answer:
            "You will need your RC Book, Driving License, Car Insurance, PUC, Aadhaar Card, PAN Card, and vehicle photographs.",
        },
        {
          question: "How are payments processed?",
          answer:
            "Payments are processed weekly and transferred directly to your registered bank account.",
        },
      ],
    };
  }
};

// --- FAQ Component ---
const FaqItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-4 text-left"
      >
        <h3 className="text-lg font-medium text-gray-800">{faq.question}</h3>
        <ChevronDown
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          size={20}
        />
      </button>
      {isOpen && (
        <div className="pb-4 text-gray-600">
          <p>{faq.answer}</p>
        </div>
      )}
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function CarAttachmentPage() {
  const { slug } = useParams();
  const [attachmentData, setAttachmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const formRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) {
        setError("City not specified in the URL.");
        setLoading(false);
        return;
      }
      setLoading(true);
      const data = await getCarAttachmentBySlug(slug);
      if (data) setAttachmentData(data);
      else setError(`Could not find information for: ${slug}.`);
      setLoading(false);
    };
    fetchData();
  }, [slug]);

  const handleAttachClick = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const horizontalImages = [
    { src: img1, alt: "Hatchback Cab", description: "Attach your Hatchback" },
    { src: img3, alt: "Sedan Cab", description: "Attach your Sedan" },
    { src: img2, alt: "SUV Cab", description: "Attach your SUV" },
    { src: img4, alt: "Tempo Traveller", description: "Attach your Minibus" },
  ];

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 px-4">
        <h1 className="text-2xl font-bold text-red-600">
          Information Not Available
        </h1>
        <p className="text-gray-700 mt-2">{error}</p>
      </div>
    );

  if (!attachmentData) return null;
  const sortedSections = attachmentData.sections?.sort(
    (a, b) => a.order - b.order
  );

  return (
    <div className="bg-gray-50 font-sans">
      <Header />

      {/* Hero Section */}
      <header ref={formRef} className="bg-gradient-to-r from-slate-100 to-blue-50">
        <div className="container mx-auto px-4 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-2">Become a Partner</h2>
            <p className="text-slate-400 mb-6">Fill in your details to get started.</p>
            <HeroForm />
          </div>
          <div className="text-slate-700">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-800 mb-6">
              {`Car Attachment in ${attachmentData.city} with Motu Cabs – Earn More, Drive Smart`}
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              {`If you own a car and are searching for a genuine platform to earn daily, Motu Cabs’ Car Attachment in ${attachmentData.city} is your best opportunity. We offer flexible, transparent, and rewarding partnerships for car owners and drivers looking to make steady income through city rides, airport transfers, and long-distance trips.`}
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Check className="text-green-500 flex-shrink-0 mt-1" size={22}/>
                <div>
                  <h3 className="font-bold">High & Consistent Earnings</h3>
                  <p className="text-sm text-slate-600">
                    Regular city and outstation rides help you earn more daily.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-green-500 flex-shrink-0 mt-1" size={22}/>
                <div>
                  <h3 className="font-bold">Transparent Payout System</h3>
                  <p className="text-sm text-slate-600">
                    No hidden fees — you earn what you deserve.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-green-500 flex-shrink-0 mt-1" size={22}/>
                <div>
                  <h3 className="font-bold">Flexible Work Hours</h3>
                  <p className="text-sm text-slate-600">
                    Drive when you want — full-time or part-time.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* Vehicles Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">
            Vehicles We Onboard
          </h2>
          <p className="text-center text-slate-600 mb-12">
            We accept a wide range of commercial vehicles in good condition.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {horizontalImages.map((img, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-full h-48 flex items-center justify-center p-4">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                {img.description && (
                  <p className="px-4 pt-4 pb-2 text-black font-semibold text-center text-base">
                    {img.description}
                  </p>
                )}
                <div className="px-4 py-4 mt-auto border-t border-slate-100">
                  <button
                    onClick={handleAttachClick}
                    className="w-full px-5 py-2 bg-gradient-to-r from-blue-600 to-orange-500 text-white font-semibold rounded-lg hover:opacity-90 transition"
                  >
                    Attach Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* City-Specific Information */}
      <main className="container mx-auto px-4 py-12 md:py-16">
        <section className="max-w-4xl mx-auto text-left space-y-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {`Why Attach Your Car with Motu Cabs in ${attachmentData.city}?`}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              {`${attachmentData.city} is one of India’s busiest travel hubs, and ride demand is always high. Attaching your car with Motu Cabs ensures you get maximum trip opportunities and steady earnings every day.`}
            </p>
            <ul className="space-y-4 text-gray-700">
              <li className="flex gap-3">
                <Check className="text-green-500 mt-1" />
                <span><strong>Instant Ride Bookings</strong> – Our smart platform keeps your vehicle engaged with real-time requests.</span>
              </li>
              <li className="flex gap-3">
                <Check className="text-green-500 mt-1" />
                <span><strong>Weekly Payments</strong> – Get your earnings directly in your account or Motu Wallet.</span>
              </li>
              <li className="flex gap-3">
                <Check className="text-green-500 mt-1" />
                <span><strong>Driver Support 24×7</strong> – From onboarding to trip help, our team is always available.</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {`Car Attachment Options Available in ${attachmentData.city}`}
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Full-Time Car Attachment – Work daily and maximize your earnings.</li>
              <li>Part-Time Car Attachment – Drive at your convenience and earn side income.</li>
              <li>Driver or Owner Model – Either drive your car or attach it with a driver.</li>
              <li>Corporate/Fleet Attachment – Attach multiple cars and grow your business.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {`Documents Required for Car Attachment in ${attachmentData.city}`}
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>RC Book (Vehicle Registration Certificate)</li>
              <li>Valid Driving License</li>
              <li>Car Insurance Copy</li>
              <li>Pollution Certificate (PUC)</li>
              <li>Aadhaar Card & PAN Card</li>
              <li>Passport Size Photo</li>
              <li>Vehicle Photographs</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {`How to Attach Your Car with Motu Cabs in ${attachmentData.city}`}
            </h2>
            <ol className="list-decimal list-inside text-gray-600 space-y-2">
              <li>Submit your details and upload documents on our website or app.</li>
              <li>Complete vehicle verification by our team.</li>
              <li>Start receiving ride requests and earning immediately.</li>
            </ol>
            <p className="mt-4 text-gray-600">
              Our process is 100% transparent, paperless, and fast — designed to help you start earning without delay.
            </p>
          </div>

          <div className="text-center bg-blue-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {`Join Motu Cabs ${attachmentData.city} Today – Drive. Earn. Grow.`}
            </h2>
            <p className="text-gray-600">
              Thousands of car owners across India are already earning through Motu Cabs. Don’t let your car sit idle — turn it into a source of consistent income today.
            </p>
            <p className="mt-4 text-gray-700 font-semibold">
              {`📞 Contact Motu Cabs ${attachmentData.city} or visit`}{" "}
              <a
                href="https://www.motucabs.com"
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.motucabs.com
              </a>{" "}
              to start your car attachment journey!
            </p>
          </div>
        </section>

        {/* FAQs */}
        {attachmentData.faqs?.length > 0 && (
          <section className="max-w-3xl mx-auto my-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Frequently Asked Questions
            </h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              {attachmentData.faqs.map((faq, i) => (
                <FaqItem key={i} faq={faq} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}