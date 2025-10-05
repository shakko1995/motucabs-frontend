// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Check } from 'lucide-react';

// // Reusable Header & Footer Components
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

// const Footer = () => (
//     <footer className="bg-gray-100 border-t">
//         <div className="max-w-7xl mx-auto px-8 py-12 text-center text-gray-500">
//              <div className="text-sm flex flex-wrap justify-center gap-x-4 gap-y-2 mb-6">
//                 <a href="/" className="hover:text-blue-600">Home</a> • 
//                 <a href="/about" className="hover:text-blue-600">About us</a> • 
//                 <a href="#" className="hover:text-blue-600">Contact us</a>
//             </div>
//             <p className="text-xs">© {new Date().getFullYear()} MotuCab Technologies Pvt. Ltd. All Rights Reserved.</p>
//         </div>
//     </footer>
// );

// const fleetData = [
//     {
//         name: 'Compact',
//         image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Hatchback_2x.png',
//         features: [
//             'Upto 4 passengers can travel.',
//             'Accommodates upto 2 small sized bags.',
//             'Available in Diesel and Petrol combustion.'
//         ]
//     },
//     {
//         name: 'Sedan',
//         image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png',
//         features: [
//             'Upto 4 passengers can travel.',
//             'Accommodates upto 2 mid sized bags.',
//             'Available in eco-fuels like CNG combustion (as per local laws).'
//         ]
//     },
//     {
//         name: 'Small SUV',
//         image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png',
//         features: [
//             'Upto 5-6 passengers.',
//             'Accommodates upto 3 mid sized bags.',
//             'Available in CNG (where permitted), Diesel and Petrol.'
//         ]
//     },
//     {
//         name: 'Large SUV',
//         image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png',
//         features: [
//             'Upto 5-7 passengers.',
//             'Accommodates upto 3 mid sized bags.',
//             'Can accommodate more luggage with roof top carrier.'
//         ]
//     },
//      {
//         name: 'Traveller/ Minivan',
//         image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Traveller_2x.png',
//         features: [
//             'Available with 8-26 seating capacity.',
//             'Can accommodate multiple small & large bags.',
//             'Available in Diesel combustion.'
//         ]
//     },
//      {
//         name: 'Business Sedan',
//         image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png',
//         features: [
//             'Having seating capacity of 4 passengers.',
//             'Accommodates upto 2 large bags.',
//             'Available in Petrol combustion.'
//         ]
//     },
//     {
//         name: 'Luxury Sedan',
//         image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png',
//         features: [
//             'Upto 4 passengers can travel comfortably.',
//             'Accommodates upto 2 large bags.',
//             'Available in Petrol combustion.'
//         ]
//     }
// ];

// const preferenceData = [
//     { name: 'Compact', image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Hatchback_2x.png', comfort: true, premium: true, elite: false },
//     { name: 'Sedan', image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png', comfort: true, premium: true, elite: false },
//     { name: 'Small SUV', image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png', comfort: true, premium: true, elite: false },
//     { name: 'Large SUV', image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png', comfort: true, premium: true, elite: true },
//     { name: 'Traveller/ Minivan', image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Traveller_2x.png', comfort: true, premium: false, elite: false },
//     { name: 'Business Sedan', image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png', comfort: false, premium: false, elite: true },
//     { name: 'Luxury Sedans', image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png', comfort: false, premium: false, elite: true },
// ];

// const FleetPage = () => {
//     return (
//         <div className="bg-white">
//             <Header />

//             <div className="bg-gray-50 border-b">
//                 <div className="max-w-5xl mx-auto px-6 py-16 text-center">
//                     <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
//                         Our Fleet
//                     </h1>
//                     <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
//                         We offer a diversified fleet of vehicles, combining comfort, safety, and refinement. Each model is chosen to offer a personalized transport experience, whether for your business trips or your moments of relaxation, thus guaranteeing an impeccable quality of service.
//                     </p>
//                 </div>
//             </div>

//             <div className="max-w-6xl mx-auto px-6 py-16">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//                     {fleetData.map(car => (
//                         <div key={car.name} className="border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow p-6">
//                             <img src={car.image} alt={car.name} className="h-24 mx-auto mb-4"/>
//                             <h3 className="text-xl font-bold text-gray-800 text-center mb-4">{car.name}</h3>
//                             <ul className="space-y-2 text-sm text-gray-600">
//                                 {car.features.map((feature, i) => (
//                                     <li key={i} className="flex items-start">
//                                         <span className="text-blue-500 mr-2 mt-1">•</span>
//                                         {feature}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div className="bg-gray-50 border-y">
//                 <div className="max-w-6xl mx-auto px-6 py-16">
//                     <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Your Travel Preference</h2>
//                     <div className="overflow-x-auto shadow-lg rounded-lg">
//                         <table className="w-full text-sm text-left">
//                             <thead className="bg-gray-700 text-white">
//                                 <tr>
//                                     <th className="p-4 w-2/5 font-semibold">YOUR TRAVEL PREFERENCE</th>
//                                     <th className="p-4 text-center font-semibold">COMFORT</th>
//                                     <th className="p-4 text-center font-semibold">PREMIUM</th>
//                                     <th className="p-4 text-center font-semibold">ELITE</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="bg-white">
//                                 {preferenceData.map(pref => (
//                                     <tr key={pref.name} className="border-b">
//                                         <td className="p-4 flex items-center gap-4">
//                                             <img src={pref.image} alt={pref.name} className="h-12 w-20 object-contain"/>
//                                             <span className="font-semibold">{pref.name}</span>
//                                         </td>
//                                         <td className="p-4 text-center">{pref.comfort && <Check className="mx-auto text-green-500"/>}</td>
//                                         <td className="p-4 text-center">{pref.premium && <Check className="mx-auto text-green-500"/>}</td>
//                                         <td className="p-4 text-center">{pref.elite && <Check className="mx-auto text-green-500"/>}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
            
//             <Footer />
//         </div>
//     );
// };

// export default FleetPage;

import React, { useState } from 'react';
import { Check, Users, Luggage, Fuel, Star, Shield, Car, Clock, Award } from 'lucide-react';

// Reusable Header & Footer Components
const Header = () => {
    return (
        <header className="bg-white shadow-lg sticky top-0 z-40 backdrop-blur-sm bg-white/95">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                <div className="text-3xl font-bold cursor-pointer">
                    <span className="text-blue-600 drop-shadow-sm">Motu</span>
                    <span className="text-orange-500 drop-shadow-sm">Cab</span>
                </div>
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                    <a href="/about" className="hover:text-blue-600 transition-colors duration-300 hover:scale-105 transform">About Us</a>
                    <a href="/contact" className="hover:text-blue-600 transition-colors duration-300 hover:scale-105 transform">Contact Us</a>
                </nav>
            </div>
        </header>
    );
};

const Footer = () => (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 border-t">
        <div className="max-w-7xl mx-auto px-8 py-16 text-center text-gray-300">
             <div className="text-sm flex flex-wrap justify-center gap-x-6 gap-y-3 mb-8">
                <a href="/" className="hover:text-blue-400 transition-colors duration-300">Home</a>
                <span>•</span>
                <a href="/about" className="hover:text-blue-400 transition-colors duration-300">About us</a>
                <span>•</span>
                <a href="/contact" className="hover:text-blue-400 transition-colors duration-300">Contact us</a>
            </div>
            <p className="text-xs text-gray-400">© {new Date().getFullYear()} MotuCab Technologies Pvt. Ltd. All Rights Reserved.</p>
        </div>
    </footer>
);

const fleetData = [
    {
        name: 'Compact',
        image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Hatchback_2x.png',
        passengers: '4',
        luggage: '2 Small',
        fuelType: 'Petrol/Diesel',
        priceRange: '₹8-12/km',
        rating: 4.2,
        features: [
            'Upto 4 passengers can travel',
            'Accommodates upto 2 small sized bags',
            'Available in Diesel and Petrol combustion',
            'GPS Navigation included',
            'Air Conditioning'
        ],
        amenities: ['AC', 'GPS', 'Music System'],
        popular: false
    },
    {
        name: 'Sedan',
        image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png',
        passengers: '4',
        luggage: '2 Medium',
        fuelType: 'CNG/Petrol',
        priceRange: '₹10-15/km',
        rating: 4.5,
        features: [
            'Upto 4 passengers can travel',
            'Accommodates upto 2 mid sized bags',
            'Available in eco-fuels like CNG combustion',
            'Premium interiors',
            'Enhanced comfort seating'
        ],
        amenities: ['AC', 'GPS', 'WiFi', 'USB Charging'],
        popular: true
    },
    {
        name: 'Small SUV',
        image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png',
        passengers: '5-6',
        luggage: '3 Medium',
        fuelType: 'CNG/Diesel/Petrol',
        priceRange: '₹12-18/km',
        rating: 4.4,
        features: [
            'Upto 5-6 passengers',
            'Accommodates upto 3 mid sized bags',
            'Available in CNG, Diesel and Petrol',
            'Higher ground clearance',
            'Spacious interior'
        ],
        amenities: ['AC', 'GPS', 'WiFi', 'USB Charging', 'Premium Audio'],
        popular: false
    },
    {
        name: 'Large SUV',
        image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png',
        passengers: '5-7',
        luggage: '3+ Medium',
        fuelType: 'Diesel/Petrol',
        priceRange: '₹15-22/km',
        rating: 4.6,
        features: [
            'Upto 5-7 passengers',
            'Accommodates upto 3 mid sized bags',
            'Can accommodate more luggage with roof top carrier',
            'Premium comfort features',
            'Advanced safety systems'
        ],
        amenities: ['AC', 'GPS', 'WiFi', 'USB Charging', 'Premium Audio', 'Roof Carrier'],
        popular: true
    },
     {
        name: 'Traveller/ Minivan',
        image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Traveller_2x.png',
        passengers: '8-26',
        luggage: 'Multiple',
        fuelType: 'Diesel',
        priceRange: '₹18-25/km',
        rating: 4.3,
        features: [
            'Available with 8-26 seating capacity',
            'Can accommodate multiple small & large bags',
            'Available in Diesel combustion',
            'Perfect for group travels',
            'Professional driver included'
        ],
        amenities: ['AC', 'GPS', 'Music System', 'Reading Lights'],
        popular: false
    },
     {
        name: 'Business Sedan',
        image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png',
        passengers: '4',
        luggage: '2 Large',
        fuelType: 'Petrol',
        priceRange: '₹20-28/km',
        rating: 4.7,
        features: [
            'Having seating capacity of 4 passengers',
            'Accommodates upto 2 large bags',
            'Available in Petrol combustion',
            'Executive class interiors',
            'Professional chauffeur service'
        ],
        amenities: ['AC', 'GPS', 'WiFi', 'USB Charging', 'Premium Audio', 'Leather Seats'],
        popular: false
    },
    {
        name: 'Luxury Sedan',
        image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png',
        passengers: '4',
        luggage: '2 Large',
        fuelType: 'Petrol',
        priceRange: '₹25-35/km',
        rating: 4.8,
        features: [
            'Upto 4 passengers can travel comfortably',
            'Accommodates upto 2 large bags',
            'Available in Petrol combustion',
            'Luxury amenities included',
            'VIP treatment guaranteed'
        ],
        amenities: ['AC', 'GPS', 'WiFi', 'USB Charging', 'Premium Audio', 'Leather Seats', 'Mini Bar'],
        popular: true
    }
];

const preferenceData = [
    { name: 'Compact', image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Hatchback_2x.png', comfort: true, premium: true, elite: false },
    { name: 'Sedan', image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png', comfort: true, premium: true, elite: false },
    { name: 'Small SUV', image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png', comfort: true, premium: true, elite: false },
    { name: 'Large SUV', image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png', comfort: true, premium: true, elite: true },
    { name: 'Traveller/ Minivan', image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Traveller_2x.png', comfort: true, premium: false, elite: false },
    { name: 'Business Sedan', image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png', comfort: false, premium: false, elite: true },
    { name: 'Luxury Sedans', image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png', comfort: false, premium: false, elite: true },
];

const pricingData = [
    { category: 'Compact', baseRate: 8, peakRate: 12, nightRate: 10, weekendRate: 11, availability: '24/7', bookingFee: 20 },
    { category: 'Sedan', baseRate: 10, peakRate: 15, nightRate: 12, weekendRate: 13, availability: '24/7', bookingFee: 25 },
    { category: 'Small SUV', baseRate: 12, peakRate: 18, nightRate: 15, weekendRate: 16, availability: '24/7', bookingFee: 30 },
    { category: 'Large SUV', baseRate: 15, peakRate: 22, nightRate: 18, weekendRate: 20, availability: '24/7', bookingFee: 35 },
    { category: 'Traveller', baseRate: 18, peakRate: 25, nightRate: 20, weekendRate: 22, availability: '6AM-11PM', bookingFee: 50 },
    { category: 'Business Sedan', baseRate: 20, peakRate: 28, nightRate: 24, weekendRate: 26, availability: '24/7', bookingFee: 40 },
    { category: 'Luxury Sedan', baseRate: 25, peakRate: 35, nightRate: 30, weekendRate: 32, availability: '24/7', bookingFee: 50 },
];

const FleetPage = () => {
    const [activeTab, setActiveTab] = useState('all');

    const filteredFleet = activeTab === 'all' ? fleetData : 
                         activeTab === 'popular' ? fleetData.filter(car => car.popular) :
                         fleetData.filter(car => car.name.toLowerCase().includes(activeTab));

    return (
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
            <Header />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80"></div>
                <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
                    <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
                        <Car className="w-5 h-5 mr-2" />
                        <span className="text-sm font-medium">Premium Fleet Collection</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                        Our Elite Fleet
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
                        Experience luxury, comfort, and reliability with our meticulously curated collection of premium vehicles. From compact city rides to luxury sedans, we have the perfect vehicle for every journey.
                    </p>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {['all', 'popular', 'sedan', 'suv'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                                activeTab === tab 
                                ? 'bg-blue-600 text-white shadow-lg' 
                                : 'bg-white text-gray-600 hover:bg-blue-50 shadow-md'
                            }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Fleet Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredFleet.map((car, index) => (
                        <div 
                            key={car.name} 
                            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group relative"
                        >
                            {car.popular && (
                                <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                                    POPULAR
                                </div>
                            )}
                            
                            <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 p-6">
                                <img 
                                    src={car.image} 
                                    alt={car.name} 
                                    className="h-24 w-full object-contain mb-4 group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-gray-800">{car.name}</h3>
                                    <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                                        <span className="text-sm font-semibold text-yellow-700">{car.rating}</span>
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Users className="w-4 h-4 mr-2 text-blue-500" />
                                        <span>{car.passengers}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Luggage className="w-4 h-4 mr-2 text-green-500" />
                                        <span>{car.luggage}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Fuel className="w-4 h-4 mr-2 text-orange-500" />
                                        <span className="truncate">{car.fuelType}</span>
                                    </div>
                                    <div className="flex items-center text-sm font-semibold text-blue-600">
                                        <Clock className="w-4 h-4 mr-2" />
                                        <span>{car.priceRange}</span>
                                    </div>
                                </div>

                                {/* Amenities */}
                                <div className="mb-4">
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Amenities</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {car.amenities.map((amenity, i) => (
                                            <span key={i} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-lg text-xs font-medium">
                                                {amenity}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Features */}
                                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                                    {car.features.slice(0, 3).map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Travel Preference Table */}
            <div className="bg-white border-y shadow-inner">
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center bg-blue-50 rounded-full px-6 py-2 mb-4">
                            <Award className="w-5 h-5 mr-2 text-blue-600" />
                            <span className="text-sm font-medium text-blue-600">Service Categories</span>
                        </div>
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Your Travel Preference</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Choose from our three service categories designed to match your comfort and budget preferences.</p>
                    </div>
                    
                    <div className="overflow-x-auto shadow-2xl rounded-2xl">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
                                <tr>
                                    <th className="p-6 w-2/5 font-bold text-lg">VEHICLE TYPE</th>
                                    <th className="p-6 text-center font-bold">
                                        <div className="flex flex-col items-center">
                                            <Shield className="w-6 h-6 mb-2 text-blue-300" />
                                            <span>COMFORT</span>
                                        </div>
                                    </th>
                                    <th className="p-6 text-center font-bold">
                                        <div className="flex flex-col items-center">
                                            <Star className="w-6 h-6 mb-2 text-yellow-300" />
                                            <span>PREMIUM</span>
                                        </div>
                                    </th>
                                    <th className="p-6 text-center font-bold">
                                        <div className="flex flex-col items-center">
                                            <Award className="w-6 h-6 mb-2 text-purple-300" />
                                            <span>ELITE</span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {preferenceData.map((pref, index) => (
                                    <tr key={pref.name} className={`border-b hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-gray-25' : ''}`}>
                                        <td className="p-6 flex items-center gap-6">
                                            <div className="flex-shrink-0 bg-gray-100 rounded-lg p-2">
                                                <img src={pref.image} alt={pref.name} className="h-12 w-20 object-contain"/>
                                            </div>
                                            <span className="font-bold text-gray-800 text-lg">{pref.name}</span>
                                        </td>
                                        <td className="p-6 text-center">
                                            {pref.comfort && (
                                                <div className="inline-flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                                                    <Check className="w-6 h-6 text-green-600"/>
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-6 text-center">
                                            {pref.premium && (
                                                <div className="inline-flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                                                    <Check className="w-6 h-6 text-green-600"/>
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-6 text-center">
                                            {pref.elite && (
                                                <div className="inline-flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                                                    <Check className="w-6 h-6 text-green-600"/>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Pricing Structure Table */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-y">
                <div className="max-w-7xl mx-auto px-6 py-16">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center bg-white rounded-full px-6 py-2 mb-4 shadow-md">
                            <Clock className="w-5 h-5 mr-2 text-green-600" />
                            <span className="text-sm font-medium text-green-600">Transparent Pricing</span>
                        </div>
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Pricing Structure</h2>
                        <p className="text-gray-600 max-w-3xl mx-auto">Our transparent pricing model ensures you know exactly what you're paying for. Rates vary based on time, demand, and vehicle category.</p>
                    </div>
                    
                    <div className="overflow-x-auto shadow-2xl rounded-2xl">
                        <table className="w-full text-sm text-left bg-white">
                            <thead className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
                                <tr>
                                    <th className="p-4 font-bold">VEHICLE</th>
                                    <th className="p-4 text-center font-bold">
                                        BASE RATE<br/>
                                        <span className="text-xs font-normal">(per km)</span>
                                    </th>
                                    <th className="p-4 text-center font-bold">
                                        PEAK HOURS<br/>
                                        <span className="text-xs font-normal">(per km)</span>
                                    </th>
                                    <th className="p-4 text-center font-bold">
                                        NIGHT RATE<br/>
                                        <span className="text-xs font-normal">(11PM-6AM)</span>
                                    </th>
                                    <th className="p-4 text-center font-bold">
                                        WEEKEND<br/>
                                        <span className="text-xs font-normal">(per km)</span>
                                    </th>
                                    <th className="p-4 text-center font-bold">AVAILABILITY</th>
                                    <th className="p-4 text-center font-bold">BOOKING FEE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pricingData.map((price, index) => (
                                    <tr key={price.category} className={`border-b hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                        <td className="p-4 font-bold text-gray-800">{price.category}</td>
                                        <td className="p-4 text-center font-semibold text-green-600">₹{price.baseRate}</td>
                                        <td className="p-4 text-center font-semibold text-red-600">₹{price.peakRate}</td>
                                        <td className="p-4 text-center font-semibold text-purple-600">₹{price.nightRate}</td>
                                        <td className="p-4 text-center font-semibold text-blue-600">₹{price.weekendRate}</td>
                                        <td className="p-4 text-center">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                price.availability === '24/7' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {price.availability}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center font-semibold text-gray-700">₹{price.bookingFee}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                            <Clock className="w-5 h-5 mr-2 text-blue-600" />
                            Pricing Notes
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div className="flex items-start">
                                <span className="text-blue-500 mr-2 mt-1">•</span>
                                <span>Peak hours: 8AM-11AM & 5PM-9PM on weekdays</span>
                            </div>
                            <div className="flex items-start">
                                <span className="text-blue-500 mr-2 mt-1">•</span>
                                <span>Minimum booking charge applies for all rides</span>
                            </div>
                            <div className="flex items-start">
                                <span className="text-blue-500 mr-2 mt-1">•</span>
                                <span>Tolls and parking charges are extra</span>
                            </div>
                            <div className="flex items-start">
                                <span className="text-blue-500 mr-2 mt-1">•</span>
                                <span>Cancellation charges may apply</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default FleetPage;