import React from 'react';
import { Car, Users, MapPin, Megaphone, Handshake, TrendingUp, Target, Zap, BarChart3, Star, Globe, Shield, Rocket, Gift } from 'lucide-react';

const TravellerPartner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* City Skyline Illustration */}
          <div className="flex justify-between items-end mb-12 opacity-20">
            <div className="flex space-x-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`bg-gray-300 ${i % 2 === 0 ? 'h-20 w-12' : 'h-16 w-10'} rounded-t-lg`}></div>
              ))}
            </div>
            <div className="flex space-x-2">
              <div className="bg-gray-300 h-24 w-16 rounded-full"></div>
              <div className="bg-gray-300 h-20 w-12 rounded-t-full"></div>
              <div className="bg-gray-300 h-28 w-20 rounded-full"></div>
            </div>
          </div>

          <div className="text-center relative z-10">
            {/* Logo */}
            <div className="mb-8">
              <span className="text-4xl font-bold">
                <span className="text-blue-600">Motu</span>
                <span className="text-orange-500">Cab</span>
              </span>
            </div>

            {/* Car Icon */}
            <div className="mb-8 flex justify-center">
              <div className="p-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-xl">
                <Car className="w-16 h-16 text-white" />
              </div>
            </div>

            <h1 className="text-2xl text-gray-600 mb-2">Quality cabs</h1>
            <h2 className="text-2xl text-gray-500 mb-12">at amazing prices</h2>

            {/* Main Heading */}
            <h1 className="text-4xl font-bold text-blue-500 mb-8">Grow with MotuCab</h1>
            
            <div className="max-w-4xl mx-auto text-gray-700 text-lg leading-relaxed">
              <p className="mb-4">
                The <strong>Grow with MotuCab Program</strong> offers your business an unparalleled opportunity to grow by reaching millions of customers across India through MotuCab's powerful network. Powered by the <strong>co-marketing collaboration platform by ConnectChief</strong>, this program allows your business to tap into a large, engaged audience of <strong>MotuCab customers and drivers</strong>, driving revenue, loyalty, and growth—all with zero upfront cost.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Expand Your Reach Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-blue-500 mb-6">Expand Your Reach to Millions</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  MotuCab's <strong>nationwide presence</strong> connects <strong>millions of people</strong> including <strong>MotuCab customers, drivers</strong>, and <strong>employees</strong> across <strong>every city</strong> in India. By joining the <strong>Grow with MotuCab Program</strong>, you can promote your services to this large, highly diverse, and growing audience.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-72 h-72 bg-gradient-to-br from-blue-100 via-purple-50 to-orange-100 rounded-3xl flex items-center justify-center shadow-lg">
                  <div className="text-center">
                    <div className="relative mb-6">
                      <Globe className="w-20 h-20 text-blue-600 mx-auto animate-pulse" />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="text-3xl mb-2">🇮🇳</div>
                    <div className="text-sm font-semibold text-gray-600">Millions Connected</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Direct Access Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-3xl shadow-xl border border-blue-100">
                <div className="flex items-center justify-center space-x-6 mb-8">
                  <div className="relative">
                    <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg transform -rotate-12">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="relative">
                    <div className="p-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-lg transform rotate-12">
                      <Car className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-6xl mb-4">📱</div>
                  <div className="text-lg font-semibold text-gray-700">Direct Customer Access</div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold text-blue-500 mb-6">Direct Access to High-Value Customers and Drivers</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  Whether you run a <strong>restaurant, hotel, local tourist attraction, sweet shop</strong>, or <strong>any business</strong> that travelers and commuters use, this program offers you direct exposure to <strong>MotuCab customers</strong> & our drivers visiting your city. Our <strong>driver network</strong> is also a major part of the ecosystem, with drivers constantly on the move and in need of services for their work and travel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mutual Growth Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-blue-500 mb-6">Mutual Growth through Co-Marketing</h2>
              <p className="text-gray-700 mb-6">
                The <strong>Grow with MotuCab Program</strong> is designed to be a <strong>true partnership</strong>. Here's how it works:
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-3"></div>
                  <p className="text-gray-700">We promote your business to MotuCab's customers and drivers by distributing your coupons and promotions through our platform.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-3"></div>
                  <p className="text-gray-700">In return, you promote MotuCab's services to your customers and distribute MotuCab's coupons at your business.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-3"></div>
                  <p className="text-gray-700">The program's design ensures mutual benefit by generating new customers for both your business and MotuCab's services.</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-72 h-72 bg-gradient-to-br from-green-100 via-blue-50 to-purple-100 rounded-3xl flex items-center justify-center shadow-xl">
                  <div className="text-center">
                    <div className="relative mb-6">
                      <BarChart3 className="w-24 h-24 text-green-600 mx-auto" />
                      <div className="absolute -top-3 -right-3 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center animate-bounce">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="text-xl font-bold text-gray-700 bg-white px-4 py-2 rounded-full shadow-md">
                      CO-MARKETING
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Effortless Integration Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-3xl shadow-xl border border-orange-200">
                <div className="flex items-center justify-center mb-8">
                  <div className="relative">
                    <div className="p-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-full shadow-2xl">
                      <Megaphone className="w-16 h-16 text-white transform -rotate-12" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl inline-block shadow-lg font-bold text-lg">
                    SMART PROMOTION
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold text-blue-500 mb-6">Effortless Integration with the Co-Marketing Collaboration Platform</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  Participation in the <strong>Grow with MotuCab Program</strong> is <strong>simple and seamless</strong>. Powered by the <strong>co-marketing collaboration platform by our partner, ConnectChief</strong>, this technology handles the promotion and tracking of all activities. Once you're onboard:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-3"></div>
                    <p><strong>Share MotuCab's promotions</strong> with your customers and give out MotuCab coupons at your business.</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-3"></div>
                    <p><strong>Update your promotions</strong> regularly within the platform to ensure they are always up to date.</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-3"></div>
                    <p>MotuCab will take care of the <strong>promotion and tracking</strong> to ensure both parties are getting the maximum benefit.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ongoing Partnership Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-blue-500 mb-6">Ongoing Partnership Opportunities</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  The <strong>Grow with MotuCab Program</strong> goes beyond one-time promotions. As you participate, our system will actively identify <strong>other potential business partners</strong> you can collaborate with for additional cross-promotion. The platform continuously creates opportunities for you to <strong>expand your network, reach new customers</strong>, and <strong>grow your business</strong> with minimal effort.
                </p>
                <p>
                  In addition, if you are operating a storefront, your location can also become a MotuCab Spot (learn more on our MotuCab spot page).
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-72 h-72 bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 rounded-3xl flex items-center justify-center shadow-xl">
                  <div className="relative">
                    <Handshake className="w-24 h-24 text-blue-600" />
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                      <Gift className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Join Section */}
      <div className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-blue-500 mb-12 text-center">Why Join the Grow with MotuCab Program?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-100">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg mr-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-800">Exposure to Millions</h3>
              </div>
              <p className="text-gray-700">
                Gain direct access to MotuCab's massive network of <strong>customers, drivers</strong>, and <strong>employees</strong> across India.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-green-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-green-100">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg mr-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-800">No Upfront Costs</h3>
              </div>
              <p className="text-gray-700">
                There are no fees to participate—just a simple, <strong>mutual cross-promotion</strong> between businesses.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-red-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-red-100">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg mr-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-800">Targeted Reach</h3>
              </div>
              <p className="text-gray-700">
                Promote your products and services to MotuCab's <strong>travelers</strong> and <strong>drivers</strong>, who need and use services just like yours.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-orange-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-orange-100">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg mr-4">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-800">Effortless Promotion</h3>
              </div>
              <p className="text-gray-700">
                The <strong>co-marketing collaboration platform by ConnectChief</strong> streamlines the process of distributing and tracking promotions for you.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-purple-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-purple-100 md:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg mr-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-800">Continuous Growth</h3>
              </div>
              <p className="text-gray-700">
                The platform identifies new partnerships and cross-promotion opportunities, creating <strong>ongoing value</strong> for your business.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-sm text-gray-600">
            <a href="#" className="hover:text-blue-600">Ask us to be official partner</a>
            <a href="#" className="hover:text-blue-600">Business travel</a>
            <a href="#" className="hover:text-blue-600">For startups</a>
            <a href="#" className="hover:text-blue-600">Your travel desk</a>
            <a href="#" className="hover:text-blue-600">Join our agent network</a>
            <a href="#" className="hover:text-blue-600">Brand Partners</a>
            <a href="#" className="hover:text-blue-600">Price guarantee</a>
            <a href="#" className="hover:text-blue-600">Double back</a>
            <a href="#" className="hover:text-blue-600">Home</a>
            <a href="#" className="hover:text-blue-600">Blog</a>
            <a href="#" className="hover:text-blue-600">About us</a>
            <a href="#" className="hover:text-blue-600">Faqs</a>
            <a href="#" className="hover:text-blue-600">Contact us</a>
            <a href="#" className="hover:text-blue-600">Careers</a>
            <a href="#" className="hover:text-blue-600">Terms and conditions</a>
            <a href="#" className="hover:text-blue-600">Disclaimer</a>
            <a href="#" className="hover:text-blue-600">Privacy policy</a>
            <a href="#" className="hover:text-blue-600">Sitemap</a>
            <a href="#" className="hover:text-blue-600">One way cabs</a>
            <a href="#" className="hover:text-blue-600">Packages</a>
            <a href="#" className="hover:text-blue-600">Day rental</a>
            <a href="#" className="hover:text-blue-600">Airport transfers</a>
            <a href="#" className="hover:text-blue-600">Why MotuCabs</a>
            <a href="#" className="hover:text-blue-600">News room</a>
            <a href="#" className="hover:text-blue-600">International Partnerships</a>
            <a href="#" className="hover:text-blue-600">Grow with MotuCab</a>
            <a href="#" className="hover:text-blue-600">MotuCab's Best Price</a>
            <a href="#" className="hover:text-blue-600">Services</a>
            <a href="#" className="hover:text-blue-600">MotuCab for our Seniors</a>
            <a href="#" className="hover:text-blue-600">MotuCab for Students</a>
            <a href="#" className="hover:text-blue-600">Armed Forces</a>
            <a href="#" className="hover:text-blue-600">MotuCab Airport Transfers</a>
            <a href="#" className="hover:text-blue-600">MotuCab Friends & Family</a>
            <a href="#" className="hover:text-blue-600">MotuCab Spots</a>
          </div>
          <div className="mt-8 text-center text-gray-500 text-sm">
            © 2025 MotuCab Technologies Pvt. Ltd. All Rights Reserved
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TravellerPartner;