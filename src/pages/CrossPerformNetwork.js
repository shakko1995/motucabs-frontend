import React from 'react';
import { Car, Users, MapPin, Megaphone, Handshake, TrendingUp, Target, Zap, BarChart3 } from 'lucide-react';

const CrossPerformNetwork = () => {
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
                <span className="text-blue-600">go</span>
                <span className="text-orange-500">z</span>
                <span className="text-blue-600">o</span>
              </span>
            </div>

            {/* Car Icon */}
            <div className="mb-8 flex justify-center">
              <div className="p-4 bg-white rounded-full shadow-lg">
                <Car className="w-12 h-12 text-gray-600" />
              </div>
            </div>

            <h1 className="text-2xl text-gray-600 mb-2">Quality cabs</h1>
            <h2 className="text-2xl text-gray-500 mb-12">at amazing prices</h2>

            {/* Main Heading */}
            <h1 className="text-4xl font-bold text-blue-500 mb-8">Grow with Gozo</h1>
            
            <div className="max-w-4xl mx-auto text-gray-700 text-lg leading-relaxed">
              <p className="mb-4">
                The <strong>Grow with Gozo Program</strong> offers your business an unparalleled opportunity to grow by reaching millions of customers across India through Gozo's powerful network. Powered by the <strong>co-marketing collaboration platform by ConnectChief</strong>, this program allows your business to tap into a large, engaged audience of <strong>Gozo customers and drivers</strong>, driving revenue, loyalty, and growth—all with zero upfront cost.
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
                  Gozo's <strong>nationwide presence</strong> connects <strong>millions of people</strong> including <strong>Gozo customers, drivers</strong>, and <strong>employees</strong> (Gozens) across <strong>every city</strong> in India. By joining the <strong>Grow with Gozo Program</strong>, you can promote your services to this large, highly diverse, and growing audience.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 bg-gradient-to-br from-orange-100 to-blue-100 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <Users className="w-20 h-20 text-blue-500 mx-auto mb-4" />
                    <div className="text-2xl font-bold text-orange-500">🇮🇳</div>
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
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <MapPin className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="p-3 bg-orange-100 rounded-full">
                    <Car className="w-8 h-8 text-orange-600" />
                  </div>
                </div>
                <div className="text-4xl mb-4">📱</div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold text-blue-500 mb-6">Direct Access to High-Value Customers and Drivers</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  Whether you run a <strong>restaurant, hotel, local tourist attraction, sweet shop</strong>, or <strong>any business</strong> that travelers and commuters use, this program offers you direct exposure to <strong>Gozo customers</strong> & our drivers visiting your city. Our <strong>driver network</strong> is also a major part of the ecosystem, with drivers constantly on the move and in need of services for their work and travel.
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
                The <strong>Grow with Gozo Program</strong> is designed to be a <strong>true partnership</strong>. Here's how it works:
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-3"></div>
                  <p className="text-gray-700">We promote your business to Gozo's customers and drivers by distributing your coupons and promotions through our platform.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-3"></div>
                  <p className="text-gray-700">In return, you promote Gozo's services to your customers and distribute Gozo's coupons at your business.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-3"></div>
                  <p className="text-gray-700">The program's design ensures mutual benefit by generating new customers for both your business and Gozo's services.</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-20 h-20 text-green-600 mx-auto mb-4" />
                    <div className="text-lg font-bold text-gray-700">MARKETING</div>
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
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center justify-center mb-6">
                  <Megaphone className="w-16 h-16 text-orange-500" />
                </div>
                <div className="text-center">
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-lg inline-block">
                    PROMOTION
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold text-blue-500 mb-6">Effortless Integration with the Co-Marketing Collaboration Platform</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  Participation in the <strong>Grow with Gozo Program</strong> is <strong>simple and seamless</strong>. Powered by the <strong>co-marketing collaboration platform by our partner, ConnectChief</strong>, this technology handles the promotion and tracking of all activities. Once you're onboard:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-3"></div>
                    <p><strong>Share Gozo's promotions</strong> with your customers and give out Gozo coupons at your business.</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-3"></div>
                    <p><strong>Update your promotions</strong> regularly within the platform to ensure they are always up to date.</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-3"></div>
                    <p>Gozo will take care of the <strong>promotion and tracking</strong> to ensure both parties are getting the maximum benefit.</p>
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
                  The <strong>Grow with Gozo Program</strong> goes beyond one-time promotions. As you participate, our system will actively identify <strong>other potential business partners</strong> you can collaborate with for additional cross-promotion. The platform continuously creates opportunities for you to <strong>expand your network, reach new customers</strong>, and <strong>grow your business</strong> with minimal effort.
                </p>
                <p>
                  In addition, if you are operating a storefront, your location can also become a Gozo Spot (learn more on our Gozo spot page).
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 bg-gradient-to-br from-orange-100 to-blue-100 rounded-2xl flex items-center justify-center">
                  <Handshake className="w-20 h-20 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Join Section */}
      <div className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-blue-500 mb-12 text-center">Why Join the Grow with Gozo Program?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <Users className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="font-bold text-lg">Exposure to Millions</h3>
              </div>
              <p className="text-gray-700">
                Gain direct access to Gozo's massive network of <strong>customers, drivers</strong>, and <strong>employees</strong> across India.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <Zap className="w-8 h-8 text-green-600 mr-3" />
                <h3 className="font-bold text-lg">No Upfront Costs</h3>
              </div>
              <p className="text-gray-700">
                There are no fees to participate—just a simple, <strong>mutual cross-promotion</strong> between businesses.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <Target className="w-8 h-8 text-red-600 mr-3" />
                <h3 className="font-bold text-lg">Targeted Reach</h3>
              </div>
              <p className="text-gray-700">
                Promote your products and services to Gozo's <strong>travelers</strong> and <strong>drivers</strong>, who need and use services just like yours.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <Megaphone className="w-8 h-8 text-orange-600 mr-3" />
                <h3 className="font-bold text-lg">Effortless Promotion</h3>
              </div>
              <p className="text-gray-700">
                The <strong>co-marketing collaboration platform by ConnectChief</strong> streamlines the process of distributing and tracking promotions for you.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow md:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600 mr-3" />
                <h3 className="font-bold text-lg">Continuous Growth</h3>
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
            <a href="#" className="hover:text-blue-600">Why GozoCabs</a>
            <a href="#" className="hover:text-blue-600">News room</a>
            <a href="#" className="hover:text-blue-600">International Partnerships</a>
            <a href="#" className="hover:text-blue-600">Grow with Gozo</a>
            <a href="#" className="hover:text-blue-600">Gozo's Best Price</a>
            <a href="#" className="hover:text-blue-600">Services</a>
            <a href="#" className="hover:text-blue-600">Gozo for our Seniors</a>
            <a href="#" className="hover:text-blue-600">Gozo for Students</a>
            <a href="#" className="hover:text-blue-600">Armed Forces</a>
            <a href="#" className="hover:text-blue-600">Gozo Airport Transfers</a>
            <a href="#" className="hover:text-blue-600">Gozo Friends & Family</a>
            <a href="#" className="hover:text-blue-600">Gozo Spots</a>
          </div>
          <div className="mt-8 text-center text-gray-500 text-sm">
            © 2025 Gozo Technologies Pvt. Ltd. All Rights Reserved
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CrossPerformNetwork;