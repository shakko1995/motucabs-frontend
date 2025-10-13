// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { ChevronDown, Users } from 'lucide-react';

// // --- API Function to fetch a single tempo traveller page by its slug ---
// const getTempoTravellerBySlug = async (slug) => {
//     try {
//         const response = await axios.get(`http://localhost:5000/api/tempo-traveller/${slug}`);
//         return response.data;
//     } catch (error) {
//         console.error("Failed to fetch Tempo Traveller data", error);
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

// // --- Main Tempo Traveller Page Component ---
// export default function TempoTravellerPage() {
//     const { slug } = useParams(); // Gets city slug from URL (e.g., "patna")
//     const [travellerData, setTravellerData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchData = async () => {
//             if (!slug) return;
//             setLoading(true);
//             setError('');
//             const data = await getTempoTravellerBySlug(slug);
//             if (data) {
//                 setTravellerData(data);
//             } else {
//                 setError(`Could not find Tempo Traveller services for the city: ${slug}.`);
//             }
//             setLoading(false);
//         };
//         fetchData();
//     }, [slug]);

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="text-center py-20 px-4">
//                 <h1 className="text-2xl font-bold text-red-600">Service Not Available</h1>
//                 <p className="text-gray-700 mt-2">{error}</p>
//             </div>
//         );
//     }

//     if (!travellerData) {
//         return null;
//     }

//     // Sort sections by the 'order' field to ensure correct display order
//     const sortedSections = travellerData.sections.sort((a, b) => a.order - b.order);

//     return (
//         <div className="bg-gray-50 font-sans">
//             {/* --- Hero Section --- */}
//             <header className="bg-gradient-to-r from-orange-500 to-red-600 text-white text-center py-20 px-4">
//                 <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{travellerData.title || `Tempo Traveller in ${travellerData.city}`}</h1>
//                 <p className="max-w-3xl mx-auto text-lg md:text-xl opacity-90">{travellerData.description || `Book comfortable and spacious Tempo Travellers for your group travel needs in ${travellerData.city}.`}</p>
//                 <button className="mt-8 bg-white text-orange-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300">
//                     Book Your Ride Now
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
//                             {section.subheading && <p className="text-xl text-orange-500 mb-4">{section.subheading}</p>}
//                             {section.paragraph && <p className="text-gray-600 leading-relaxed whitespace-pre-line">{section.paragraph}</p>}
//                         </div>
//                     </section>
//                 ))}

//                 {/* --- Packages Section --- */}
//                 {travellerData.packages && travellerData.packages.length > 0 && (
//                     <section className="bg-white p-8 rounded-lg shadow-md my-16">
//                         <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Choose Your Tempo Traveller</h2>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                             {travellerData.packages.map((pkg, index) => (
//                                 <div key={index} className="border rounded-lg p-6 text-center flex flex-col items-center transition-shadow hover:shadow-xl">
//                                     <h3 className="text-2xl font-semibold text-gray-900">{pkg.packageName}</h3>
//                                     {pkg.capacity && (
//                                         <div className="flex items-center text-gray-500 mt-2">
//                                             <Users size={18} className="mr-2" />
//                                             <span>Up to {pkg.capacity} Passengers</span>
//                                         </div>
//                                     )}
//                                     <p className="text-gray-600 mt-4 text-sm">{pkg.description}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </section>
//                 )}

//                 {/* --- FAQ Section --- */}
//                 {travellerData.faqs && travellerData.faqs.length > 0 && (
//                     <section className="max-w-3xl mx-auto my-16">
//                         <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Frequently Asked Questions</h2>
//                         <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
//                             {travellerData.faqs.map((faq, index) => (
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
import { ChevronDown, Users } from 'lucide-react';

// --- Components & Assets ---
import GoZoBooking from '../components/RideBookingForm'; // Adjust the import path as needed

// Import your car images (make sure the path is correct)
import img1 from '../assets/car-mini-motucabs.webp';
import img2 from '../assets/innova-motucabs.jpg';
import img3 from '../assets/prime-sedan.webp';
import img4 from '../assets/tempo_12_seater-motucabs.webp';


// --- API Function to fetch a single tempo traveller page by its slug ---
const getTempoTravellerBySlug = async (slug) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/tempo-traveller/${slug}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch Tempo Traveller data", error);
        return null;
    }
};

// --- Reusable FAQ Item Component ---
const FaqItem = ({ faq }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full py-4 text-left"
            >
                <h3 className="text-lg font-medium text-gray-800">{faq.question}</h3>
                <ChevronDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={20} />
            </button>
            {isOpen && (
                <div className="pb-4 text-gray-600">
                    <p>{faq.answer}</p>
                </div>
            )}
        </div>
    );
};

// --- Main Tempo Traveller Page Component ---
export default function TempoTravellerPage() {
    const { slug } = useParams(); // Gets city slug from URL (e.g., "delhi")
    const [travellerData, setTravellerData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const bookingFormRef = useRef(null);

    const horizontalImages = [
        { src: img1, alt: "Mini Cab", description: "Swift, Celerio or equivalent" },
        { src: img3, alt: "Sedan Cab", description: "Dzire, Etios or equivalent" },
        { src: img2, alt: "SUV Cab", description: "Innova, Ertiga or equivalent" },
        { src: img4, alt: "Tempo Traveller", description: "Tempo Traveller (12 seater)" },
    ];

    const handleBookNowClick = () => {
        bookingFormRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!slug) return;
            setLoading(true);
            setError('');
            const data = await getTempoTravellerBySlug(slug);
            if (data) {
                setTravellerData(data);
            } else {
                setError(`Could not find Tempo Traveller services for the city: ${slug}.`);
            }
            setLoading(false);
        };
        fetchData();
    }, [slug]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20 px-4">
                <h1 className="text-2xl font-bold text-red-600">Service Not Available</h1>
                <p className="text-gray-700 mt-2">{error}</p>
            </div>
        );
    }

    if (!travellerData) {
        return null;
    }

    // Sort sections by the 'order' field to ensure correct display order
    const sortedSections = travellerData.sections?.sort((a, b) => a.order - b.order) || [];

    return (
        <div className="bg-gray-50 font-sans">
            {/* --- Hero Section --- */}
            {/* <header className="bg-gradient-to-r from-orange-500 to-red-600 text-white text-center py-20 px-4">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{travellerData.title || `Tempo Traveller in ${travellerData.city}`}</h1>
                <p className="max-w-3xl mx-auto text-lg md:text-xl opacity-90">{travellerData.description || `Book comfortable and spacious Tempo Travellers for your group travel needs in ${travellerData.city}.`}</p>
                <button onClick={handleBookNowClick} className="mt-8 bg-white text-orange-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300">
                    Book Your Ride Now
                </button>
            </header> */}

            <main className="container mx-auto ">

                {/* --- Ride Booking Form --- */}
                <div ref={bookingFormRef} >
                    <GoZoBooking />
                </div>

                {/* --- Fleet Section --- */}
                <section className="bg-white py-16 px-6 rounded-lg shadow-md mb-16">
                    <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">Our Fleet</h2>
                    <p className="text-center text-slate-600 mb-12">Choose from a wide range of cars to suit your needs.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {horizontalImages.map((img, index) => (
                            <div key={index} className="bg-white rounded-xl border overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300">
                                <div className="w-full h-48 bg-gray-100 flex items-center justify-center p-4">
                                    <img src={img.src} alt={img.alt} className="max-w-full max-h-full object-contain" />
                                </div>
                                {img.description && <p className="px-4 pt-4 pb-2 text-black font-semibold text-center text-base">{img.description}</p>}
                                <div className="px-4 py-4 flex justify-center mt-auto">
                                    <button onClick={handleBookNowClick} className="px-5 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-lg hover:opacity-90 transition w-full">Book Now</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- Static Content Section --- */}
                <section className="bg-white p-6 md:p-8 rounded-lg shadow-md mb-16 space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Book Tempo Traveller in Delhi with Motu Cabs – Spacious, Safe & Comfortable Group Travel</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Planning a group trip, wedding, corporate event, or family vacation from Delhi? Motu Cabs offers the best Tempo Traveller booking in Delhi, designed to make your journey comfortable, enjoyable, and hassle-free. We provide a wide range of tempo travellers and minibuses, from 9-seaters to 26-seaters, equipped with luxury interiors, AC, pushback seats, LED TVs, and ample luggage space. Whether you’re exploring Delhi city or heading outstation, our vehicles and professional chauffeurs ensure a smooth travel experience every time. At Motu Cabs Delhi, we focus on comfort, reliability, and safety — ensuring every trip feels premium yet affordable.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Types of Tempo Travellers Available in Delhi</h3>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Every group has different needs — and that’s why Motu Cabs offers multiple seating capacities and configurations to fit your travel style, group size, and budget.
                        </p>
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-xl font-semibold text-gray-700">1. 9-Seater Tempo Traveller in Delhi</h4>
                                <p className="text-gray-600 mt-1">Perfect for small families, business meetings, or weekend getaways. This compact yet comfortable traveller is equipped with soft pushback seats, AC, and USB charging points for a smooth ride.</p>
                                <p className="text-gray-600 mt-2"><b>Ideal for:</b> Airport transfers, Delhi sightseeing, and short-distance outstation trips.</p>
                                <p className="text-gray-600"><b>Benefits:</b> Easy to maneuver in city traffic. Comfortable and spacious for 6–9 passengers. Low rental cost for short trips.</p>
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold text-gray-700">2. 12-Seater Tempo Traveller in Delhi</h4>
                                <p className="text-gray-600 mt-1">Our most popular category, perfect for medium-sized groups traveling for vacations, pilgrimages, or team outings. Comes with individual headrests, high-roof design, LED lighting, and an advanced audio system.</p>
                                <p className="text-gray-600 mt-2"><b>Ideal for:</b> Family holidays, office picnics, and group tours.</p>
                                <p className="text-gray-600"><b>Benefits:</b> Spacious interiors and large luggage area. Reclining seats with seatbelts for each passenger. Fully air-conditioned and sanitized after every trip.</p>
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold text-gray-700">3. 17-Seater Tempo Traveller in Delhi</h4>
                                <p className="text-gray-600 mt-1">The 17-seater tempo traveller is designed for bigger families, school tours, or wedding events, providing both comfort and capacity. It comes with premium seating, reading lights, wide windows, and full-length curtains for privacy.</p>
                                <p className="text-gray-600 mt-2"><b>Ideal for:</b> Group travel to hill stations or interstate destinations.</p>
                                <p className="text-gray-600"><b>Benefits:</b> Luxury interior finish with extra legroom. Ideal for long-distance routes. Professional driver with route expertise.</p>
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold text-gray-700">4. 20-Seater Tempo Traveller in Delhi</h4>
                                <p className="text-gray-600 mt-1">If you’re planning a large group journey or corporate team outing, the 20-seater tempo traveller offers the perfect balance of capacity and comfort. Equipped with AC, charging ports, spacious interiors, and music systems, this vehicle ensures a pleasant ride.</p>
                                <p className="text-gray-600 mt-2"><b>Ideal for:</b> Educational tours, team travel, and pilgrimage trips.</p>
                                <p className="text-gray-600"><b>Benefits:</b> Ideal for big groups traveling together. Ample overhead storage for luggage. Affordable cost per seat for large groups.</p>
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold text-gray-700">5. 26-Seater Tempo Traveller / Minibus in Delhi</h4>
                                <p className="text-gray-600 mt-1">For large events, destination weddings, or group tours, the 26-seater luxury tempo traveller or minibus provides a high-end travel experience. These vehicles include comfortable pushback seats, large panoramic windows, LED TVs, and smooth air suspension systems.</p>
                                <p className="text-gray-600 mt-2"><b>Ideal for:</b> Weddings, corporate delegations, long tours.</p>
                                <p className="text-gray-600"><b>Benefits:</b> Ultimate comfort for 20–26 passengers. Suitable for long-distance travel across states. Comes with professional chauffeur and support crew if needed.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Choose Motu Cabs for Tempo Traveller Booking in Delhi</h3>
                        <p className="text-gray-600 leading-relaxed mb-4">When it comes to tempo traveller hire in Delhi, Motu Cabs stands apart with its customer-first approach, quality fleet, and transparent service. Here’s why thousands of families, corporates, and travel groups choose us:</p>
                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                            <li><b>Wide Range of Vehicles:</b> From 9-seater luxury travellers to 26-seater minibuses.</li>
                            <li><b>Well-Maintained Fleet:</b> Regularly serviced, clean, and sanitized vehicles.</li>
                            <li><b>Transparent Pricing:</b> No hidden charges; pay only for what you see.</li>
                            <li><b>Experienced Drivers:</b> Polite, trained, and knowledgeable about routes and destinations.</li>
                            <li><b>Round-the-Clock Support:</b> Our 24×7 customer care team assists you before and during the trip.</li>
                            <li><b>Flexible Booking Options:</b> One-way, roundtrip, local, and outstation packages available.</li>
                            <li><b>Corporate Billing Support:</b> Perfect for businesses booking multiple vehicles.</li>
                        </ul>
                        <p className="text-gray-600 leading-relaxed mt-4">When you choose Motu Cabs, you’re not just hiring a vehicle — you’re partnering with a reliable travel brand that prioritizes your safety, comfort, and satisfaction.</p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Tempo Traveller Booking in Delhi for All Occasions</h3>
                        <p className="text-gray-600 leading-relaxed mb-4">No matter the occasion, Motu Cabs offers tailor-made travel solutions to meet your specific needs:</p>
                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                            <li><b>Family Tours & Vacations:</b> Perfect for comfortable family getaways to any destination.</li>
                            <li><b>Corporate Travel:</b> Reliable transportation for meetings, office trips, or client pickups.</li>
                            <li><b>Wedding Events:</b> Luxury travellers and minibuses for guest transport, airport transfers, or destination weddings.</li>
                            <li><b>School & College Trips:</b> Safe, comfortable, and budget-friendly options for students.</li>
                            <li><b>Pilgrimage Tours:</b> Special packages for religious tours to Mathura, Haridwar, Vaishno Devi, etc.</li>
                            <li><b>Airport Transfers:</b> Hassle-free pickup and drop to IGI Airport for groups.</li>
                        </ul>
                         <p className="text-gray-600 leading-relaxed mt-4">Whatever your purpose, Motu Cabs ensures a safe, timely, and enjoyable ride every time.</p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Benefits of Booking Tempo Traveller with Motu Cabs</h3>
                        <p className="text-gray-600 leading-relaxed mb-4">Booking a tempo traveller or minibus with Motu Cabs Delhi gives you access to the best-in-class features and unmatched comfort.</p>
                        <ul className="space-y-3 text-gray-700">
                           <li className="flex items-start"><span className="mr-2 text-green-500">✅</span> Comfortable Pushback Seats: Relax during long journeys.</li>
                           <li className="flex items-start"><span className="mr-2 text-green-500">✅</span> Powerful Air Conditioning: Stay cool even during Delhi summers.</li>
                           <li className="flex items-start"><span className="mr-2 text-green-500">✅</span> Music & Entertainment System: Enjoy every mile with your favorite tunes.</li>
                           <li className="flex items-start"><span className="mr-2 text-green-500">✅</span> On-Time Pickup & Drop: We value your time and ensure punctual service.</li>
                           <li className="flex items-start"><span className="mr-2 text-green-500">✅</span> Affordable Group Travel: Lower per-person cost compared to multiple cabs.</li>
                           <li className="flex items-start"><span className="mr-2 text-green-500">✅</span> Ample Luggage Space: Ideal for families and large groups.</li>
                           <li className="flex items-start"><span className="mr-2 text-green-500">✅</span> Professional Drivers: Courteous and safety-trained chauffeurs.</li>
                           <li className="flex items-start"><span className="mr-2 text-green-500">✅</span> Customizable Packages: Choose hourly, daily, or trip-based rental.</li>
                        </ul>
                         <p className="text-gray-600 leading-relaxed mt-4">We believe your travel experience should be memorable, stress-free, and worth every rupee. That’s why every tempo traveller booking in Delhi with Motu Cabs comes with complete transparency and support.</p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">How to Book a Tempo Traveller in Delhi with Motu Cabs</h3>
                        <p className="text-gray-600 leading-relaxed mb-4">Booking your tempo traveller or minibus in Delhi is simple, fast, and convenient.</p>
                         <ol className="list-decimal list-inside space-y-2 text-gray-600">
                             <li><b>Step 1:</b> Visit www.motucabs.com or call our 24×7 booking helpline.</li>
                             <li><b>Step 2:</b> Choose your preferred vehicle type and seating capacity.</li>
                             <li><b>Step 3:</b> Enter your pickup point, travel date, and duration.</li>
                             <li><b>Step 4:</b> Get instant fare details and confirm your booking.</li>
                             <li><b>Step 5:</b> Receive driver details and enjoy your journey with Motu Cabs.</li>
                         </ol>
                        <p className="text-gray-600 leading-relaxed mt-4">We offer instant booking confirmations, flexible payment options, and dedicated trip coordination — making travel planning effortless.</p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Motu Cabs – Delhi’s Trusted Name for Tempo Traveller and Minibus Rentals</h3>
                        <p className="text-gray-600 leading-relaxed">
                            With years of service excellence, Motu Cabs has become Delhi’s preferred choice for tempo traveller, minibus, and group travel bookings. Our satisfied customers range from families to corporate groups, schools, and travel planners. We understand that comfort, reliability, and safety matter the most — and that’s why every vehicle under Motu Cabs is maintained to the highest standards. Whether you need a luxury tempo traveller for a corporate trip or a budget-friendly minibus for a family vacation, Motu Cabs Delhi has the right option for you.
                        </p>
                    </div>

                    <div className="mt-8 text-center bg-orange-50 p-6 rounded-lg border border-orange-200">
                        <p className="font-semibold text-gray-800">Your journey deserves the comfort and reliability that only Motu Cabs’ Tempo Traveller in Delhi can provide. From small groups to large gatherings, our range of tempo travellers and minibuses (9 to 26 seaters) ensures every trip is smooth, stylish, and comfortable.</p>
                        <p className="mt-4">
                            📞 Call Motu Cabs today or visit <a href="http://www.motucabs.com/tempo-traveller-in-delhi" className="text-orange-600 font-bold hover:underline" target="_blank" rel="noopener noreferrer">www.motucabs.com/tempo-traveller-in-delhi</a> to book your tempo traveller, traveller, or minibus in Delhi for local or outstation travel.
                        </p>
                        <p className="mt-4 text-xl font-bold text-gray-900">Motu Cabs – Your Travel Partner for Every Journey.</p>
                    </div>
                </section>

                {/* --- Dynamically Rendered Content Sections --- */}
                {sortedSections.map((section, index) => (
                    <section key={index} className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                        {/* Alternate image and text position */}
                        <div className={`order-2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                            {section.image && (
                                <img
                                    src={section.image}
                                    alt={section.imageAltText || section.heading}
                                    title={section.imageTitle || section.heading}
                                    className="rounded-lg shadow-xl w-full h-auto object-cover"
                                />
                            )}
                        </div>
                        <div className={`order-1 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                            {section.heading && <h2 className="text-3xl font-bold text-gray-800 mb-3">{section.heading}</h2>}
                            {section.subheading && <p className="text-xl text-orange-500 mb-4">{section.subheading}</p>}
                            {section.paragraph && <p className="text-gray-600 leading-relaxed whitespace-pre-line">{section.paragraph}</p>}
                        </div>
                    </section>
                ))}

                {/* --- Packages Section --- */}
                {travellerData.packages && travellerData.packages.length > 0 && (
                    <section className="bg-white p-8 rounded-lg shadow-md my-16">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Choose Your Tempo Traveller</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {travellerData.packages.map((pkg, index) => (
                                <div key={index} className="border rounded-lg p-6 text-center flex flex-col items-center transition-shadow hover:shadow-xl">
                                    <h3 className="text-2xl font-semibold text-gray-900">{pkg.packageName}</h3>
                                    {pkg.capacity && (
                                        <div className="flex items-center text-gray-500 mt-2">
                                            <Users size={18} className="mr-2" />
                                            <span>Up to {pkg.capacity} Passengers</span>
                                        </div>
                                    )}
                                    <p className="text-gray-600 mt-4 text-sm">{pkg.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* --- FAQ Section --- */}
                {travellerData.faqs && travellerData.faqs.length > 0 && (
                    <section className="max-w-3xl mx-auto my-16">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Frequently Asked Questions</h2>
                        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
                            {travellerData.faqs.map((faq, index) => (
                                <FaqItem key={index} faq={faq} />
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}