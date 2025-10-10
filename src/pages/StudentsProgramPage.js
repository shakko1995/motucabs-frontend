import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Percent, Gift, Zap, UserPlus, UploadCloud, CheckCircle, ShieldCheck } from "lucide-react";

// Header
const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div
          className="text-2xl font-extrabold cursor-pointer flex items-center gap-1"
          onClick={() => navigate("/")}
        >
          <span className="text-blue-600">Motu</span>
          <span className="text-orange-500">Cab</span>
        </div>
        <button
          onClick={() => navigate("/login")}
          className="hidden md:block px-6 py-2 rounded-2xl bg-blue-600 text-white font-semibold shadow hover:scale-105 hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
    </header>
  );
};

// Footer
const Footer = () => (
  <footer className="bg-gray-50 border-t mt-20">
    <div className="max-w-7xl mx-auto px-6 py-12 text-center text-gray-500">
      <div className="text-xl font-bold mb-4">
        <span className="text-blue-600">Motu</span>
        <span className="text-orange-500">Cab</span>
      </div>
      <p className="text-sm mb-4">
        Affordable, safe & reliable rides — now with exclusive Student Benefits.
      </p>
      <p className="text-xs">
        © {new Date().getFullYear()} MotuCab Technologies Pvt. Ltd. All Rights Reserved.
      </p>
    </div>
  </footer>
);

// Students Program Page
const StudentsProgramPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", purpose: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks ${formData.name}, we’ll get back to you shortly!`);
    setFormData({ name: "", email: "", phone: "", purpose: "" });
  };

  const handleJoinClick = () => navigate("/");

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-600 to-blue-400 text-white">
        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow">
            MotuCab <span className="text-yellow-300">for Students</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-blue-50 max-w-2xl mx-auto">
            Travel made smarter, cheaper, and safer. Unlock exclusive benefits designed especially for students.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleJoinClick}
              className="px-8 py-3 rounded-2xl bg-yellow-400 text-gray-900 font-semibold shadow-lg hover:scale-105 transition"
            >
              Join Now
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 rounded-2xl bg-white/20 text-white border border-white font-semibold shadow hover:bg-white/30 transition"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-6 py-20 space-y-20">

          {/* Ambassador Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Become a Motu Campus Ambassador
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Represent your college, earn rewards, and make travel affordable for your peers. Grow your leadership skills and be part of a student-first movement.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-2">✅ Be Motu’s trusted point of contact in your college</li>
                <li className="flex gap-2">✅ Help identify key pickup/drop-off spots</li>
                <li className="flex gap-2">✅ Recommend offers and deals to peers</li>
                <li className="flex gap-2">✅ Coordinate group rides during holidays</li>
                <li className="flex gap-2">✅ Earn commissions on referrals</li>
              </ul>
            </div>
            <div className="flex justify-center">
              <img
                src="https://storyset.com/illustration/student-life/amico"
                alt="Students"
                className="max-w-sm w-full rounded-2xl shadow-xl"
              />
            </div>
          </div>

          {/* Form + Student Benefits */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Form */}
            <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl border">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Apply Now 🚀</h3>
              <p className="text-sm text-gray-600 mb-6">
                Fill out the form, and our team will connect with you shortly.
              </p>
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone"
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
                <textarea
                  name="purpose"
                  rows="3"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  placeholder="Purpose / Details"
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition"
                >
                  Submit Application
                </button>
              </form>
            </div>

            {/* Student Benefits */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg border">
              <h3 className="text-2xl font-semibold text-blue-600 mb-6">
                Student Exclusive Benefits 🎓
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4 items-start group">
                  <Percent className="text-blue-500 group-hover:scale-110 transition" size={28} />
                  <div>
                    <h4 className="font-semibold text-lg">10% Off on All Rides</h4>
                    <p className="text-sm text-gray-600">Automatically applied to every booking.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start group">
                  <Gift className="text-blue-500 group-hover:scale-110 transition" size={28} />
                  <div>
                    <h4 className="font-semibold text-lg">50% Off Concierge Program</h4>
                    <p className="text-sm text-gray-600">Premium support at half the price.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start group">
                  <Zap className="text-blue-500 group-hover:scale-110 transition" size={28} />
                  <div>
                    <h4 className="font-semibold text-lg">Double Motu Points</h4>
                    <p className="text-sm text-gray-600">Earn 2x rewards on every trip.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start group">
                  <ShieldCheck className="text-blue-500 group-hover:scale-110 transition" size={28} />
                  <div>
                    <h4 className="font-semibold text-lg">Complimentary Cancellation Upgrade</h4>
                    <p className="text-sm text-gray-600">Extra flexibility for your unpredictable schedule.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-sm">
                <h4 className="font-bold text-gray-900 mb-2">How to Join?</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Create Your Motu Account</li>
                  <li>Verify with Student ID</li>
                  <li>Activate Your Benefits</li>
                  <li>Refer & Earn</li>
                </ul>
              </div>

              <button
                onClick={handleJoinClick}
                className="w-full mt-6 bg-blue-600 text-white font-semibold py-3 rounded-xl hover:scale-105 hover:bg-blue-700 transition"
              >
                Join & Unlock Benefits
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StudentsProgramPage;
