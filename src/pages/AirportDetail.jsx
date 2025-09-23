// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getAirportBySlug } from "../api/airportApi";

// export default function AirportDetail() {
//   const { slug } = useParams();
//   const [airport, setAirport] = useState(null);

//   useEffect(() => {
//     getAirportBySlug(slug).then((data) => setAirport(data));
//   }, [slug]);

//   if (!airport) {
//     return <p className="text-center py-10 text-gray-500">Loading...</p>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold">{airport.name}</h1>
//       <p className="text-gray-600">{airport.city}, {airport.state}</p>

//       {/* ✅ Booking form integrate karein */}
//       <div className="mt-6 p-4 bg-gray-50 rounded-xl shadow">
//         <h2 className="text-xl font-semibold mb-4">Book Your Ride</h2>
//         {/* Yaha pickup/drop search aur booking ka flow attach karenge */}
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { getAirportBySlug } from "../api/airportApi";
// import { CheckCircle, ChevronRight } from 'lucide-react';

// // Reusable Header & Footer Components
// const Header = () => { /* ... Your Header Component ... */ };
// const Footer = () => { /* ... Your Footer Component ... */ };

// const AirportDetail = () => {
//   const { slug } = useParams();
//   const [airport, setAirport] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchAirportData = async () => {
//         try {
//             const data = await getAirportBySlug(slug);
//             if (data) {
//                 setAirport(data);
//             } else {
//                 setError("Airport details not found.");
//             }
//         } catch (err) {
//             setError("Failed to load airport details.");
//         } finally {
//             setLoading(false);
//         }
//     };
//     fetchAirportData();
//   }, [slug]);

//   if (loading) {
//     return <p className="text-center py-20 text-gray-500">Loading...</p>;
//   }

//   if (error) {
//     return <p className="text-center py-20 text-red-500">{error}</p>
//   }

//   return (
//     <div className="bg-white">
//         <Header />
//         <div className="max-w-6xl mx-auto px-4 py-12">
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
//                 {/* Left Column: Main Content */}
//                 <div className="lg:col-span-2">
//                     <h1 className="text-3xl font-extrabold text-slate-800 mb-4">
//                         Book {airport.name} Transfer Cabs Online
//                     </h1>
//                     <div className="prose max-w-none text-slate-600 leading-relaxed">
//                         {/* <p>{airport.content.description}</p> */}
//                         <p>
//                             When arriving in {airport.city}, why wait in long lines for taxi or try to figure out the local transport options when you can have your driver waiting at the airport to pick you up. We can have you be worry-free. Our airport pickup drivers are local and in many cases, can understand English. You will receive the phone contact details of your driver by email and SMS.
//                         </p>
//                     </div>

//                     <div className="mt-12">
//                         <h2 className="text-2xl font-bold text-slate-800 mb-6">Popular airport transfers in {airport.city}</h2>
//                         <div className="space-y-3">
//                             {airport.popularRoutes && airport.popularRoutes.map((route, index) => (
//                                 <Link to="#" key={index} className="flex justify-between items-center p-4 border rounded-lg hover:bg-slate-50 transition-colors">
//                                     <span className="font-semibold text-slate-700">{airport.city} Airport to {route.destination} transfer</span>
//                                     <div className="flex items-center gap-2">
//                                         <span className="text-sm text-slate-500">starting at</span>
//                                         <span className="font-bold text-slate-800">₹{route.startingPrice.toLocaleString('en-IN')}</span>
//                                         <ChevronRight size={20} className="text-slate-400"/>
//                                     </div>
//                                 </Link>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="mt-12">
//                          <h2 className="text-2xl font-bold text-slate-800 mb-6">Popular outstation cab routes</h2>
//                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-blue-600 font-semibold">
//                             <Link to="#" className="hover:underline"> &gt; {airport.name} to Dalhousie</Link>
//                             <Link to="#" className="hover:underline"> &gt; {airport.name} to Chandigarh</Link>
//                             <Link to="#" className="hover:underline"> &gt; {airport.name} to Jalandhar</Link>
//                             <Link to="#" className="hover:underline"> &gt; {airport.name} to Dharamshala</Link>
//                             <Link to="#" className="hover:underline"> &gt; {airport.name} to Shimla</Link>
//                             <Link to="#" className="hover:underline"> &gt; {airport.name} to McLeod Ganj</Link>
//                          </div>
//                     </div>
//                 </div>

//                 {/* Right Column: Sidebar */}
//                 <div className="lg:col-span-1">
//                     <div className="sticky top-28 space-y-8">
//                          <div className="bg-white p-6 rounded-lg shadow-lg border">
//                              <img src="https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png" alt="Luxury Car" className="w-full rounded-md mb-4"/>
//                              <h3 className="font-bold text-center text-lg text-blue-600 mb-6">Luxury Car Rental in {airport.city}</h3>

//                              <div className="bg-slate-50 p-6 rounded-md">
//                                 <h4 className="font-bold text-xl text-slate-800 mb-4">Why book with us</h4>
//                                 {/* <ul className="space-y-3">
//                                     {airport.content.whyBookWithUs && airport.content.whyBookWithUs.map((point, index) => (
//                                          <li key={index} className="flex items-center gap-3">
//                                              <CheckCircle size={18} className="text-green-500"/>
//                                              <span className="text-slate-700">{point}</span>
//                                          </li>
//                                     ))}
//                                 </ul> */}
//                              </div>
//                          </div>
//                          <div className="bg-slate-50 p-6 rounded-lg border">
//                             <h4 className="font-bold text-xl text-slate-800 mb-4">Flights delayed?</h4>
//                             <p className="text-sm text-slate-600">Don't worry our drivers are tasked with tracking your flight and will plan to be at the airport when you're flight arrives.</p>
//                          </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         <Footer />
//     </div>
//   );
// }

// export default AirportDetail;


// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { getAirportBySlug } from "../api/airportApi";
// import { CheckCircle, ChevronRight } from 'lucide-react';

// // Reusable Header & Footer Components
// const Header = () => { /* ... Your Header Component ... */ };
// const Footer = () => { /* ... Your Footer Component ... */ };

// const AirportDetailPage = () => {
//   const { slug } = useParams();
//   const [airport, setAirport] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchAirportData = async () => {
//         try {
//             const data = await getAirportBySlug(slug);
//             if (data) {
//                 setAirport(data);
//             } else {
//                 setError("Airport details not found.");
//             }
//         } catch (err) {
//             setError("Failed to load airport details.");
//         } finally {
//             setLoading(false);
//         }
//     };
//     fetchAirportData();
//   }, [slug]);

//   if (loading) {
//     return <p className="text-center py-20 text-gray-500">Loading...</p>;
//   }

//   if (error) {
//     return <p className="text-center py-20 text-red-500">{error}</p>
//   }

//   return (
//     <div className="bg-white">
//         <Header />
//         <div className="max-w-6xl mx-auto px-4 py-12">
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
//                 {/* Left Column: Main Content */}
//                 <div className="lg:col-span-2">
//                     <h1 className="text-3xl font-extrabold text-slate-800 mb-4">
//                         Book {airport.name} Transfer Cabs Online
//                     </h1>
//                     <div className="prose max-w-none text-slate-600 leading-relaxed">
//                         <p>{airport.content?.description}</p>
//                         <p>
//                             When arriving in {airport.name}, why wait in long lines for taxi or try to figure out the local transport options when you can have your driver waiting at the airport to pick you up. We can have you be worry-free. Our airport pickup drivers are local and in many cases, can understand English.
//                         </p>
//                     </div>

//                     <div className="mt-12">
//                         <h2 className="text-2xl font-bold text-slate-800 mb-6">Popular airport transfers in {airport.city}</h2>
//                         <div className="space-y-3">
//                             {airport.popularTransfers?.map((route, index) => (
//                                 <Link to="#" key={index} className="flex justify-between items-center p-4 border rounded-lg hover:bg-slate-50 transition-colors">
//                                     <span className="font-semibold text-slate-700">{airport.city} Airport to {route.destination} transfer</span>
//                                     <div className="flex items-center gap-2">
//                                         <span className="text-sm text-slate-500">starting at</span>
//                                         <span className="font-bold text-slate-800">₹{route.startingPrice}</span>
//                                         <ChevronRight size={20} className="text-slate-400"/>
//                                     </div>
//                                 </Link>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="mt-12">
//                          <h2 className="text-2xl font-bold text-slate-800 mb-6">Popular outstation cab routes from {airport.city}</h2>
//                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-blue-600 font-semibold">
//                             {airport.popularOutstationRoutes?.map((route, index) => (
//                                 <Link to="#" key={index} className="hover:underline"> &gt; {airport.city} to {route.destination}</Link>
//                             ))}
//                          </div>
//                     </div>
//                 </div>

//                 {/* Right Column: Sidebar */}
//                 <div className="lg:col-span-1">
//                     <div className="sticky top-28 space-y-8">
//                          <div className="bg-white p-6 rounded-lg shadow-lg border">
//                              <img src="https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png" alt="Luxury Car" className="w-full rounded-md mb-4"/>
//                              <h3 className="font-bold text-center text-lg text-blue-600 mb-6">Luxury Car Rental in {airport.city}</h3>
//                              <div className="bg-slate-50 p-6 rounded-md">
//                                 <h4 className="font-bold text-xl text-slate-800 mb-4">Why book with us</h4>
//                                 <ul className="space-y-3">
//                                     {airport.content?.whyBookWithUs?.map((point, index) => (
//                                          <li key={index} className="flex items-center gap-3">
//                                              <CheckCircle size={18} className="text-green-500"/>
//                                              <span className="text-slate-700">{point}</span>
//                                          </li>
//                                     ))}
//                                 </ul>
//                              </div>
//                          </div>
//                          <div className="bg-slate-50 p-6 rounded-lg border">
//                             <h4 className="font-bold text-xl text-slate-800 mb-4">Flights delayed?</h4>
//                             <p className="text-sm text-slate-600">Don't worry our drivers are tasked with tracking your flight and will plan to be at the airport when you're flight arrives.</p>
//                          </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         <Footer />
//     </div>
//   );
// }

// export default AirportDetailPage;


import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAirportBySlug } from "../api/airportApi";
import { CheckCircle, ChevronRight } from 'lucide-react';

// Reusable Header & Footer Components
const Header = () => { /* ... Your Header Component ... */ };
const Footer = () => { /* ... Your Footer Component ... */ };

const AirportDetailPage = () => {
    const { slug } = useParams();
    const [airport, setAirport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAirportData = async () => {
            try {
                const data = await getAirportBySlug(slug);
                if (data) {
                    setAirport(data);
                } else {
                    setError("Airport details not found.");
                }
            } catch (err) {
                setError("Failed to load airport details.");
            } finally {
                setLoading(false);
            }
        };
        fetchAirportData();
    }, [slug]);

    if (loading) {
        return <p className="text-center py-20 text-gray-500">Loading...</p>;
    }

    if (error) {
        return <p className="text-center py-20 text-red-500">{error}</p>
    }

    return (
        <div className="bg-white">
            <Header />
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    {/* Left Column: Main Content */}
                    <div className="lg:col-span-2">
                        <h1 className="text-3xl font-extrabold text-slate-800 mb-4">
                            Book {airport.name} Transfer Cabs Online
                        </h1>
                        <div className="prose max-w-none text-slate-600 leading-relaxed">
                            <p>{airport.description}</p>
                            <p>
                                When arriving in {airport.city}, why wait in long lines for taxi or try to figure out the local transport options when you can have your driver waiting at the airport to pick you up. We can have you be worry-free. Our airport pickup drivers are local and in many cases, can understand English.
                            </p>
                        </div>

                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">Popular airport transfers in {airport.city}</h2>
                            <div className="space-y-3">
                                {airport.transfers?.map((route, index) => (
                                    <Link to="#" key={index} className="flex justify-between items-center p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                                        <span className="font-semibold text-slate-700">{airport.city} Airport to {route.destination} transfer</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-slate-500">starting at</span>
                                            <span className="font-bold text-slate-800">₹{route.price.toLocaleString('en-IN')}</span>
                                            <ChevronRight size={20} className="text-slate-400" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 space-y-8">
                            <div className="bg-white p-6 rounded-lg shadow-lg border">
                                <img src="https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png" alt="Luxury Car" className="w-full rounded-md mb-4" />
                                <h3 className="font-bold text-center text-lg text-blue-600 mb-6">Luxury Car Rental in {airport.city}</h3>
                                <div className="bg-slate-50 p-6 rounded-md">
                                    <h4 className="font-bold text-xl text-slate-800 mb-4">Why book with us</h4>
                                    <ul className="space-y-3">
                                        {airport.whyBook?.map((point, index) => (
                                            <li key={index} className="flex items-center gap-3">
                                                <CheckCircle size={18} className="text-green-500" />
                                                <span className="text-slate-700">{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-lg border">
                                <h4 className="font-bold text-xl text-slate-800 mb-4">Flights delayed?</h4>
                                <p className="text-sm text-slate-600">{airport.extraInfo}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Popular Outstation Routes Section */}
                <div className="bg-blue-50 py-12">
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">Popular outstation cab routes from {airport.city}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3 text-blue-600 font-semibold">
                            {/* This part needs to be made dynamic from your backend as well */}
                            <Link to="#" className="hover:underline"> &gt; {airport.name} to Dalhousie</Link>
                            <Link to="#" className="hover:underline"> &gt; {airport.name} to Chandigarh</Link>
                            <Link to="#" className="hover:underline"> &gt; {airport.name} to Jalandhar</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AirportDetailPage;