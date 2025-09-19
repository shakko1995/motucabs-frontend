// import React from 'react';
// import { useNavigate, Link } from 'react-router-dom'; 


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


// // Data for the fleet cards
// const fleetData = [
//     { name: 'Compact', image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Hatchback_2x.png', features: ['Upto 4 passengers can travel.', 'Accommodates upto 2 small sized bags.'], link: '/fleet/compact' },
//     { name: 'Sedan', image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png', features: ['Upto 4 passengers can travel.', 'Accommodates upto 2 mid sized bags.'], link: '/fleet/sedan' },
//     { name: 'Small SUV', image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png', features: ['Upto 5-6 passengers.', 'Accommodates upto 3 mid sized bags.'], link: '/fleet/suv' },
    
// ];

// const FleetOverviewPage = () => {
//     return (
//         <div className="bg-white">
//             <Header />
//             <div className="bg-gray-50 border-b">
//                 <div className="max-w-5xl mx-auto px-6 py-16 text-center">
//                     <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">Our Fleet</h1>
//                     <p className="mt-4 text-lg text-gray-600">We offer a diversified fleet of vehicles, combining comfort, safety, and refinement.</p>
//                 </div>
//             </div>
//             <div className="max-w-6xl mx-auto px-6 py-16">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {fleetData.map(car => (
//                         <Link to={car.link} key={car.name} className="block border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow p-6">
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
//                         </Link>
//                     ))}
//                 </div>
//             </div>
//             {/* ... Comparison Table and Footer ... */}
//         </div>
//     );
// };
// export default FleetOverviewPage;



import React, { useState } from 'react';
import { 
  Star, 
  Users, 
  Fuel, 
  Shield, 
  Zap, 
  Car, 
  Crown, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';

// ✅ Header Component
const Header = () => (
  <header className="bg-white shadow-lg sticky top-0 z-50 backdrop-blur-md bg-white/95">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
      <div className="text-3xl font-black cursor-pointer group">
        <span className="text-blue-600 group-hover:text-blue-700 transition-colors">Motu</span>
        <span className="text-orange-500 group-hover:text-orange-600 transition-colors">Cab</span>
      </div>
      <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-700">
        <a href="#about" className="hover:text-blue-600 transition-colors duration-200">About Us</a>
        <a href="#contact" className="hover:text-blue-600 transition-colors duration-200">Contact Us</a>
        <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg">
          Book Now
        </button>
      </nav>
    </div>
  </header>
);

// ✅ Footer Component
const Footer = () => (
  <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
    <div className="max-w-7xl mx-auto px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="col-span-2">
          <div className="text-3xl font-black mb-4">
            <span className="text-blue-400">Motu</span>
            <span className="text-orange-400">Cab</span>
          </div>
          <p className="text-gray-300 mb-4">
            Your trusted ride partner for safe, comfortable, and affordable journeys across the city.
          </p>
          <div className="flex space-x-4">
            <div className="bg-white/10 p-2 rounded-full">
              <Star className="w-5 h-5 text-yellow-400" />
            </div>
            <div className="bg-white/10 p-2 rounded-full">
              <Shield className="w-5 h-5 text-green-400" />
            </div>
            <div className="bg-white/10 p-2 rounded-full">
              <Zap className="w-5 h-5 text-blue-400" />
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-bold mb-4">Quick Links</h3>
          <div className="space-y-2 text-gray-300">
            <a href="#home" className="block hover:text-white transition-colors">Home</a>
            <a href="#fleet" className="block hover:text-white transition-colors">Our Fleet</a>
            <a href="#about" className="block hover:text-white transition-colors">About Us</a>
            <a href="#contact" className="block hover:text-white transition-colors">Contact</a>
          </div>
        </div>
        <div>
          <h3 className="font-bold mb-4">Services</h3>
          <div className="space-y-2 text-gray-300">
            <p>City Rides</p>
            <p>Outstation</p>
            <p>Airport Transfer</p>
            <p>Corporate Booking</p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
        <p>© {new Date().getFullYear()} MotuCab Technologies Pvt. Ltd. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
);

// ✅ Fleet Data
const fleetData = [
  { 
    id: 'compact',
    name: 'MotuMini', 
    category: 'Economy',
    image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Hatchback_2x.png', 
    features: ['Up to 4 passengers', '2 small bags', 'AC included', 'Most affordable'],
    detailedFeatures: ['GPS tracking', 'Sanitized vehicle', 'Professional driver', 'Music system'],
    price: '₹8/km',
    rating: 4.2,
    badge: 'POPULAR',
    badgeColor: 'bg-green-500',
    icon: Car,
    fuel: 'CNG/Petrol',
    description: 'Perfect for budget-conscious travelers and short city trips. Our compact cars offer great fuel efficiency without compromising on comfort.'
  },
  { 
    id: 'sedan',
    name: 'MotuGo', 
    category: 'Comfort',
    image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png', 
    features: ['Up to 4 passengers', '2 medium bags', 'Premium comfort', 'Professional drivers'],
    detailedFeatures: ['Leather seats', 'Climate control', 'Phone charger', 'Complimentary water'],
    price: '₹12/km',
    rating: 4.5,
    badge: 'BESTSELLER',
    badgeColor: 'bg-blue-500',
    icon: Car,
    fuel: 'CNG/Diesel',
    description: 'The perfect balance of comfort and affordability. Ideal for business trips and comfortable city rides with premium amenities.'
  },
  { 
    id: 'suv',
    name: 'MotuXL', 
    category: 'Spacious',
    image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png', 
    features: ['Up to 6 passengers', '3 large bags', 'Extra legroom', 'Family friendly'],
    detailedFeatures: ['Spacious interior', 'Multiple charging ports', 'Entertainment system', 'Child seat available'],
    price: '₹15/km',
    rating: 4.6,
    badge: 'FAMILY',
    badgeColor: 'bg-purple-500',
    icon: Car,
    fuel: 'Diesel/Petrol',
    description: 'Spacious and comfortable for family trips and group travel. Perfect for outstation journeys and airport transfers.'
  },
  { 
    id: 'premium',
    name: 'MotuPremium', 
    category: 'Luxury',
    image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png', 
    features: ['Up to 4 passengers', 'Premium interiors', 'Leather seats', 'Complimentary water'],
    detailedFeatures: ['Luxury interiors', 'Wi-Fi hotspot', 'Premium sound system', 'Concierge service'],
    price: '₹20/km',
    rating: 4.8,
    badge: 'LUXURY',
    badgeColor: 'bg-yellow-500',
    icon: Crown,
    fuel: 'Petrol/Hybrid',
    description: 'Experience luxury travel with premium vehicles featuring high-end amenities and exceptional service for special occasions.'
  },
  { 
    id: 'business',
    name: 'MotuBusiness', 
    category: 'Executive',
    image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png', 
    features: ['Up to 6 passengers', 'Executive comfort', 'Wi-Fi available', 'Phone charger'],
    detailedFeatures: ['Executive seating', 'Conference calling', 'Document table', 'Privacy partition'],
    price: '₹25/km',
    rating: 4.7,
    badge: 'EXECUTIVE',
    badgeColor: 'bg-gray-600',
    icon: Crown,
    fuel: 'Diesel/Hybrid',
    description: 'Designed for business professionals who need to work on the go. Features executive amenities and professional service.'
  },
  { 
    id: 'electric',
    name: 'MotuElectric', 
    category: 'Eco-Friendly',
    image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Hatchback_2x.png', 
    features: ['Up to 4 passengers', '100% electric', 'Zero emissions', 'Silent ride'],
    detailedFeatures: ['Zero emissions', 'Silent operation', 'Fast charging', 'Eco-friendly'],
    price: '₹10/km',
    rating: 4.4,
    badge: 'ECO',
    badgeColor: 'bg-green-600',
    icon: Zap,
    fuel: 'Electric',
    description: 'Join the green revolution with our electric vehicles. Zero emissions, silent operation, and eco-friendly transportation.'
  }
];

// ✅ Main Page Component
const FleetOverviewPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const categories = ['All', 'Economy', 'Comfort', 'Spacious', 'Luxury', 'Executive', 'Eco-Friendly'];

  const filteredFleet = selectedCategory === 'All' 
    ? fleetData 
    : fleetData.filter(car => car.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      <Header />

      {/* ✅ Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <Sparkles className="w-5 h-5 mr-2" />
            <span className="text-sm font-semibold">Premium Fleet Collection</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Our <span className="text-yellow-300">Amazing</span> Fleet
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto mb-8 opacity-90">
            Experience luxury, comfort, and reliability with our diverse range of vehicles designed for every journey
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Shield className="w-4 h-4 mr-2" />
              100% Safe
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Star className="w-4 h-4 mr-2" />
              4.5+ Rated
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Zap className="w-4 h-4 mr-2" />
              24/7 Available
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Category Filter */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* ✅ Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFleet.map((car, index) => {
            const IconComponent = car.icon;
            return (
              <div 
                key={car.id}
                onClick={() => setSelectedVehicle(car)}
                className="group block cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 group-hover:-translate-y-2 relative overflow-hidden border border-gray-100">
                  {/* Badge */}
                  <div className={`absolute top-4 right-4 ${car.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                    {car.badge}
                  </div>

                  {/* Car Image */}
                  <div className="relative mb-6">
                    <img 
                      src={car.image} 
                      alt={car.name} 
                      className="h-32 w-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-2 bg-gray-200 rounded-full opacity-30"></div>
                  </div>

                  {/* Car Info */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-black text-gray-800 flex items-center">
                          <IconComponent className="w-5 h-5 mr-2 text-blue-600" />
                          {car.name}
                        </h3>
                        <p className="text-sm text-gray-500 font-medium">{car.category}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{car.price}</div>
                        <div className="flex items-center text-yellow-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm font-semibold text-gray-600 ml-1">{car.rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      {car.features.slice(0, 2).map((feature, i) => (
                        <div key={i} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* Specs */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center text-xs text-gray-500">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{car.features[0]}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Fuel className="w-4 h-4 mr-1" />
                        <span>{car.fuel}</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 group-hover:shadow-lg flex items-center justify-center">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ✅ Vehicle Detail Modal */}
      {selectedVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-black text-gray-800">{selectedVehicle.name}</h2>
                <button 
                  onClick={() => setSelectedVehicle(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              <img 
                src={selectedVehicle.image} 
                alt={selectedVehicle.name}
                className="w-full h-48 object-contain mb-6 bg-gray-50 rounded-xl"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold mb-3">Description</h3>
                  <p className="text-gray-600 mb-4">{selectedVehicle.description}</p>

                  <h3 className="text-lg font-bold mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {selectedVehicle.detailedFeatures.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{selectedVehicle.price}</div>
                    <div className="flex items-center mb-4">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="font-semibold ml-1">{selectedVehicle.rating} Rating</span>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className="font-semibold">{selectedVehicle.category}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Fuel Type:</span>
                        <span className="font-semibold">{selectedVehicle.fuel}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Capacity:</span>
                        <span className="font-semibold">{selectedVehicle.features[0]}</span>
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Comparison Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-800 mb-4">Why Choose MotuCab?</h2>
            <p className="text-xl text-gray-600">Experience the difference with our premium services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">100% Safe</h3>
              <p className="text-gray-600">Verified drivers and GPS tracking for your safety</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Top Rated</h3>
              <p className="text-gray-600">4.5+ rating from thousands of satisfied customers</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Quick Booking</h3>
              <p className="text-gray-600">Book in seconds and get a ride within minutes</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FleetOverviewPage;
