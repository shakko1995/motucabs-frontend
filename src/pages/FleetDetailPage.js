// import React from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import { ArrowLeft, Check } from 'lucide-react';

// // Reusable Header Component
// const Header = () => {
//     const navigate = useNavigate();
//     return (
//         <header className="bg-white shadow-sm sticky top-0 z-40">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
//                 <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>
//                     <span className="text-blue-600">Motu</span><span className="text-orange-500">Cab</span>
//                 </div>
//                 <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
//                     <a href="/about" className="hover:text-blue-600">About Us</a>
//                     <a href="/contact" className="hover:text-blue-600">Contact Us</a>
//                 </nav>
//             </div>
//         </header>
//     );
// };

// // Reusable Footer Component
// const Footer = () => (
//     <footer className="bg-gray-100 border-t">
//         <div className="max-w-7xl mx-auto px-8 py-12 text-center text-gray-500">
//             <div className="text-xl font-bold mb-4">
//                 <span className="text-blue-600">Motu</span><span className="text-orange-500">Cab</span>
//             </div>
//             <div className="text-sm flex flex-wrap justify-center gap-x-4 gap-y-2 mb-6">
//                 <a href="/" className="hover:text-blue-600">Home</a>
//                 <a href="/about" className="hover:text-blue-600">About Us</a>
//                 <a href="/contact" className="hover:text-blue-600">Contact</a>
//             </div>
//             <p className="text-xs">© {new Date().getFullYear()} MotuCab Technologies Pvt. Ltd. All Rights Reserved.</p>
//         </div>
//     </footer>
// );


// const fleetDetailsData = {
//     compact: {
//         name: 'Compact',
//         image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Hatchback_2x.png',
//         description: 'Most economical cab class, perfect for short trips and budget-conscious travelers.',
//         features: ['Upto 4 passengers', '2 small bags', 'Available in Diesel & Petrol']
//     },
//     sedan: {
//         name: 'Sedan',
//         image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png',
//         description: 'An affordable cab category, ideal for city rides and small group travel.',
//         features: ['Upto 4 passengers', '2 mid-sized bags', 'Available in CNG, Diesel & Petrol']
//     },
//     suv: {
//         name: 'Small SUV',
//         image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png',
//         description: 'Ideal for group travel or road trips, have ample space and comfort.',
//         features: ['Upto 6 passengers', '3 mid-sized bags', 'Available in Diesel & Petrol']
//     }
    
// };

// const FleetDetailPage = () => {
//     const { carType } = useParams(); 
//     const navigate = useNavigate();
//     const carData = fleetDetailsData[carType];

//     if (!carData) {
//         return (
//             <div className="text-center p-10">
//                 <h2 className="text-2xl font-bold">Car Not Found!</h2>
//                 <button onClick={() => navigate('/fleet')} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Back to Fleet</button>
//             </div>
//         );
//     }

//     return (
//         <div className="bg-white">
//             <Header />
//             <div className="max-w-5xl mx-auto px-6 py-12">
//                 <button onClick={() => navigate('/fleet')} className="flex items-center text-sm text-blue-600 font-semibold mb-6">
//                     <ArrowLeft size={16} className="mr-2"/> Back to All Fleets
//                 </button>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//                     <div>
//                         <img src={carData.image} alt={carData.name} className="rounded-lg shadow-xl w-full"/>
//                     </div>
//                     <div>
//                         <h1 className="text-4xl font-extrabold text-gray-800">{carData.name}</h1>
//                         <p className="mt-4 text-lg text-gray-600">{carData.description}</p>
//                         <ul className="mt-6 space-y-3">
//                             {carData.features.map((feature, index) => (
//                                 <li key={index} className="flex items-center text-gray-700">
//                                     <Check size={20} className="text-green-500 mr-3"/>
//                                     <span>{feature}</span>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// };

// export default FleetDetailPage;



// import React, { useState } from 'react';
// import { ArrowLeft, Check, Star, Users, Luggage, Fuel, Shield, Zap, Car, Crown, Phone, MapPin, Clock, Calendar } from 'lucide-react';

// // Enhanced Header Component
// const Header = () => {
//     return (
//         <header className="bg-white shadow-lg sticky top-0 z-50 backdrop-blur-md bg-white/95">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
//                 <div className="text-3xl font-black cursor-pointer group">
//                     <span className="text-blue-600 group-hover:text-blue-700 transition-colors">Motu</span>
//                     <span className="text-orange-500 group-hover:text-orange-600 transition-colors">Cab</span>
//                 </div>
//                 <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-700">
//                     <a href="#about" className="hover:text-blue-600 transition-colors duration-200">About Us</a>
//                     <a href="#contact" className="hover:text-blue-600 transition-colors duration-200">Contact Us</a>
//                     <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg">
//                         Book Now
//                     </button>
//                 </nav>
//             </div>
//         </header>
//     );
// };

// // Enhanced Footer Component
// const Footer = () => (
//     <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
//         <div className="max-w-7xl mx-auto px-8 py-16">
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
//                 <div className="col-span-2">
//                     <div className="text-3xl font-black mb-4">
//                         <span className="text-blue-400">Motu</span><span className="text-orange-400">Cab</span>
//                     </div>
//                     <p className="text-gray-300 mb-4">Your trusted ride partner for safe, comfortable, and affordable journeys across the city.</p>
//                 </div>
//                 <div>
//                     <h3 className="font-bold mb-4">Quick Links</h3>
//                     <div className="space-y-2 text-gray-300">
//                         <a href="#home" className="block hover:text-white transition-colors">Home</a>
//                         <a href="#fleet" className="block hover:text-white transition-colors">Our Fleet</a>
//                         <a href="#about" className="block hover:text-white transition-colors">About Us</a>
//                         <a href="#contact" className="block hover:text-white transition-colors">Contact</a>
//                     </div>
//                 </div>
//                 <div>
//                     <h3 className="font-bold mb-4">Services</h3>
//                     <div className="space-y-2 text-gray-300">
//                         <p>City Rides</p>
//                         <p>Outstation</p>
//                         <p>Airport Transfer</p>
//                         <p>Corporate Booking</p>
//                     </div>
//                 </div>
//             </div>
//             <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
//                 <p>© {new Date().getFullYear()} MotuCab Technologies Pvt. Ltd. All Rights Reserved.</p>
//             </div>
//         </div>
//     </footer>
// );

// // Enhanced fleet data
// const fleetDetailsData = {
//     compact: {
//         name: 'MotuMini',
//         category: 'Economy',
//         image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Hatchback_2x.png',
//         description: 'Perfect for budget-conscious travelers and short city trips. Our compact cars offer great fuel efficiency without compromising on comfort and safety.',
//         longDescription: 'The MotuMini is designed for urban mobility with excellent fuel efficiency and compact design. Ideal for solo travelers or couples looking for an economical ride option.',
//         features: ['Up to 4 passengers', '2 small bags', 'Air conditioning included', 'GPS tracking'],
//         detailedFeatures: [
//             'Professional verified drivers',
//             'Real-time GPS tracking',
//             'Sanitized before every ride',
//             'Music system with AUX/Bluetooth',
//             '24/7 customer support',
//             'Cashless payment options',
//             'SOS emergency button',
//             'Regular vehicle maintenance'
//         ],
//         specifications: {
//             capacity: '4 passengers',
//             luggage: '2 small bags',
//             fuelType: 'CNG/Petrol',
//             airConditioning: 'Yes',
//             musicSystem: 'Yes'
//         },
//         pricing: {
//             perKm: '₹8',
//             baseFare: '₹25',
//             waitingCharges: '₹2/min',
//             nightCharges: '+25% (11 PM - 6 AM)'
//         },
//         rating: 4.2,
//         totalRides: '50,000+',
//         badge: 'POPULAR',
//         badgeColor: 'bg-green-500',
//         icon: Car,
//         galleryImages: [
//             'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Hatchback_2x.png',
//             'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Hatchback_2x.png',
//             'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Hatchback_2x.png'
//         ]
//     },
//     sedan: {
//         name: 'MotuGo',
//         category: 'Comfort',
//         image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png',
//         description: 'The perfect balance of comfort and affordability. Ideal for business trips and comfortable city rides with premium amenities.',
//         longDescription: 'MotuGo offers premium comfort with spacious interiors and advanced features. Perfect for professionals and travelers who value comfort and reliability.',
//         features: ['Up to 4 passengers', '2 medium bags', 'Premium comfort', 'Professional drivers'],
//         detailedFeatures: [
//             'Leather seat covers',
//             'Climate control AC',
//             'Phone charging ports',
//             'Complimentary water bottle',
//             'Wi-Fi hotspot available',
//             'Professional chauffeurs',
//             'Premium sound system',
//             'Reading lights'
//         ],
//         specifications: {
//             capacity: '4 passengers',
//             luggage: '2 medium bags',
//             fuelType: 'CNG/Diesel',
//             airConditioning: 'Climate Control',
//             musicSystem: 'Premium System'
//         },
//         pricing: {
//             perKm: '₹12',
//             baseFare: '₹40',
//             waitingCharges: '₹3/min',
//             nightCharges: '+25% (11 PM - 6 AM)'
//         },
//         rating: 4.5,
//         totalRides: '75,000+',
//         badge: 'BESTSELLER',
//         badgeColor: 'bg-blue-500',
//         icon: Car,
//         galleryImages: [
//             'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png',
//             'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png',
//             'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png'
//         ]
//     },
//     suv: {
//         name: 'MotuXL',
//         category: 'Spacious',
//         image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png',
//         description: 'Spacious and comfortable for family trips and group travel. Perfect for outstation journeys and airport transfers.',
//         longDescription: 'The MotuXL provides maximum space and comfort for larger groups and families. Ideal for long-distance travel and special occasions.',
//         features: ['Up to 6 passengers', '3 large bags', 'Extra legroom', 'Family friendly'],
//         detailedFeatures: [
//             'Spacious 6-seater configuration',
//             'Multiple USB charging ports',
//             'Entertainment system',
//             'Child seat available on request',
//             'Extra legroom and headroom',
//             'Ample luggage space',
//             'Captain seats (middle row)',
//             'Premium interior lighting'
//         ],
//         specifications: {
//             capacity: '6 passengers',
//             luggage: '3 large bags',
//             fuelType: 'Diesel/Petrol',
//             airConditioning: 'Dual Zone AC',
//             musicSystem: 'Entertainment System'
//         },
//         pricing: {
//             perKm: '₹15',
//             baseFare: '₹60',
//             waitingCharges: '₹4/min',
//             nightCharges: '+25% (11 PM - 6 AM)'
//         },
//         rating: 4.6,
//         totalRides: '40,000+',
//         badge: 'FAMILY',
//         badgeColor: 'bg-purple-500',
//         icon: Car,
//         galleryImages: [
//             'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png',
//             'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png',
//             'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png'
//         ]
//     }
// };

// const FleetDetailPage = () => {
//     const [selectedCarType, setSelectedCarType] = useState('sedan');
//     const [activeTab, setActiveTab] = useState('overview');
//     const [selectedImage, setSelectedImage] = useState(0);

//     const carData = fleetDetailsData[selectedCarType];
//     const IconComponent = carData.icon;

//     const tabs = ['overview', 'features', 'pricing', 'gallery'];

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
//             <Header />
            
//             {/* Breadcrumb and Back Button */}
//             <div className="bg-white border-b">
//                 <div className="max-w-6xl mx-auto px-6 py-4">
//                     <button 
//                         onClick={() => window.history.back()}
//                         className="flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors mb-4"
//                     >
//                         <ArrowLeft size={20} className="mr-2"/>
//                         Back to Fleet
//                     </button>
//                     <nav className="text-sm text-gray-500">
//                         <span>Home</span> <span className="mx-2">/</span>
//                         <span>Fleet</span> <span className="mx-2">/</span>
//                         <span className="text-gray-900 font-medium">{carData.name}</span>
//                     </nav>
//                 </div>
//             </div>

//             {/* Vehicle Selection */}
//             <div className="bg-white py-6 border-b">
//                 <div className="max-w-6xl mx-auto px-6">
//                     <div className="flex flex-wrap gap-4">
//                         {Object.entries(fleetDetailsData).map(([key, vehicle]) => (
//                             <button
//                                 key={key}
//                                 onClick={() => setSelectedCarType(key)}
//                                 className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
//                                     selectedCarType === key
//                                         ? 'bg-blue-600 text-white shadow-lg'
//                                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                                 }`}
//                             >
//                                 {vehicle.name}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div className="max-w-6xl mx-auto px-6 py-12">
//                 {/* Vehicle Header */}
//                 <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//                         <div className="relative">
//                             <img 
//                                 src={carData.galleryImages[selectedImage]} 
//                                 alt={carData.name} 
//                                 className="rounded-2xl shadow-lg w-full h-80 object-contain bg-gradient-to-br from-blue-50 to-purple-50"
//                             />
//                             <div className={`absolute top-4 right-4 ${carData.badgeColor} text-white text-sm font-bold px-4 py-2 rounded-full`}>
//                                 {carData.badge}
//                             </div>
//                         </div>
//                         <div>
//                             <div className="flex items-center mb-4">
//                                 <IconComponent className="w-8 h-8 text-blue-600 mr-3" />
//                                 <div>
//                                     <h1 className="text-4xl font-black text-gray-800">{carData.name}</h1>
//                                     <p className="text-lg text-blue-600 font-semibold">{carData.category}</p>
//                                 </div>
//                             </div>
                            
//                             <p className="text-xl text-gray-600 mb-6">{carData.description}</p>
                            
//                             <div className="grid grid-cols-2 gap-6 mb-6">
//                                 <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
//                                     <div className="text-3xl font-bold text-blue-600">{carData.pricing.perKm}</div>
//                                     <div className="text-sm text-gray-600">per kilometer</div>
//                                 </div>
//                                 <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
//                                     <div className="flex items-center justify-center mb-1">
//                                         <Star className="w-5 h-5 text-yellow-400 fill-current" />
//                                         <span className="text-2xl font-bold text-green-600 ml-1">{carData.rating}</span>
//                                     </div>
//                                     <div className="text-sm text-gray-600">{carData.totalRides} rides</div>
//                                 </div>
//                             </div>
                            
//                             <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-lg shadow-lg">
//                                 Book {carData.name} Now
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Tabs Navigation */}
//                 <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//                     <div className="flex border-b">
//                         {tabs.map(tab => (
//                             <button
//                                 key={tab}
//                                 onClick={() => setActiveTab(tab)}
//                                 className={`flex-1 py-4 px-6 font-semibold capitalize transition-colors ${
//                                     activeTab === tab
//                                         ? 'bg-blue-600 text-white'
//                                         : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
//                                 }`}
//                             >
//                                 {tab}
//                             </button>
//                         ))}
//                     </div>

//                     <div className="p-8">
//                         {/* Overview Tab */}
//                         {activeTab === 'overview' && (
//                             <div className="space-y-8">
//                                 <div>
//                                     <h3 className="text-2xl font-bold text-gray-800 mb-4">About {carData.name}</h3>
//                                     <p className="text-gray-600 mb-6">{carData.longDescription}</p>
                                    
//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                                         <div>
//                                             <h4 className="text-lg font-bold text-gray-800 mb-4">Vehicle Specifications</h4>
//                                             <div className="space-y-3">
//                                                 {Object.entries(carData.specifications).map(([key, value]) => (
//                                                     <div key={key} className="flex items-center justify-between py-2 border-b border-gray-100">
//                                                         <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
//                                                         <span className="font-semibold text-gray-800">{value}</span>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                         <div>
//                                             <h4 className="text-lg font-bold text-gray-800 mb-4">Key Highlights</h4>
//                                             <ul className="space-y-3">
//                                                 {carData.features.map((feature, index) => (
//                                                     <li key={index} className="flex items-center text-gray-700">
//                                                         <Check size={20} className="text-green-500 mr-3 flex-shrink-0"/>
//                                                         <span>{feature}</span>
//                                                     </li>
//                                                 ))}
//                                             </ul>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         {/* Features Tab */}
//                         {activeTab === 'features' && (
//                             <div>
//                                 <h3 className="text-2xl font-bold text-gray-800 mb-6">Premium Features & Amenities</h3>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                     {carData.detailedFeatures.map((feature, index) => (
//                                         <div key={index} className="flex items-start p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
//                                             <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
//                                                 <Check className="w-5 h-5 text-white" />
//                                             </div>
//                                             <div>
//                                                 <h4 className="font-semibold text-gray-800 mb-1">{feature}</h4>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}

//                         {/* Pricing Tab */}
//                         {activeTab === 'pricing' && (
//                             <div>
//                                 <h3 className="text-2xl font-bold text-gray-800 mb-6">Transparent Pricing</h3>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                                     <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
//                                         <h4 className="text-lg font-bold text-blue-800 mb-4">Fare Structure</h4>
//                                         <div className="space-y-4">
//                                             {Object.entries(carData.pricing).map(([key, value]) => (
//                                                 <div key={key} className="flex items-center justify-between">
//                                                     <span className="text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
//                                                     <span className="font-bold text-blue-600">{value}</span>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                     <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
//                                         <h4 className="text-lg font-bold text-green-800 mb-4">What's Included</h4>
//                                         <ul className="space-y-2">
//                                             <li className="flex items-center text-green-700">
//                                                 <Check className="w-4 h-4 mr-2" />
//                                                 Professional driver
//                                             </li>
//                                             <li className="flex items-center text-green-700">
//                                                 <Check className="w-4 h-4 mr-2" />
//                                                 Fuel charges
//                                             </li>
//                                             <li className="flex items-center text-green-700">
//                                                 <Check className="w-4 h-4 mr-2" />
//                                                 GPS tracking
//                                             </li>
//                                             <li className="flex items-center text-green-700">
//                                                 <Check className="w-4 h-4 mr-2" />
//                                                 24/7 support
//                                             </li>
//                                         </ul>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         {/* Gallery Tab */}
//                         {activeTab === 'gallery' && (
//                             <div>
//                                 <h3 className="text-2xl font-bold text-gray-800 mb-6">Vehicle Gallery</h3>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                                     {carData.galleryImages.map((image, index) => (
//                                         <div 
//                                             key={index}
//                                             onClick={() => setSelectedImage(index)}
//                                             className={`cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 ${
//                                                 selectedImage === index ? 'ring-4 ring-blue-500' : ''
//                                             }`}
//                                         >
//                                             <img 
//                                                 src={image} 
//                                                 alt={`${carData.name} ${index + 1}`}
//                                                 className="w-full h-48 object-contain bg-gradient-to-br from-gray-50 to-gray-100"
//                                             />
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* Quick Booking Section */}
//                 <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mt-8 text-white">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//                         <div>
//                             <h3 className="text-3xl font-bold mb-4">Ready to Book?</h3>
//                             <p className="text-blue-100 mb-6">Get your {carData.name} in just a few clicks. Available 24/7 for your convenience.</p>
//                             <div className="flex items-center space-x-6">
//                                 <div className="flex items-center">
//                                     <Phone className="w-5 h-5 mr-2" />
//                                     <span>+91 9876543210</span>
//                                 </div>
//                                 <div className="flex items-center">
//                                     <Clock className="w-5 h-5 mr-2" />
//                                     <span>24/7 Available</span>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="space-y-4">
//                             <button className="w-full bg-white text-blue-600 font-bold py-4 rounded-xl hover:bg-gray-50 transition-colors">
//                                 Book Now
//                             </button>
//                             <button className="w-full border-2 border-white text-white font-bold py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-200">
//                                 Call to Book
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <Footer />
//         </div>
//     );
// };

// export default FleetDetailPage;