
import React from "react";
import { useNavigate } from "react-router-dom";
import { Gift, Percent, Zap, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

// Header
const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div
          className="text-2xl font-extrabold cursor-pointer tracking-tight"
          onClick={() => navigate("/")}
        >
          <span className="text-blue-600">Motu</span>
          <span className="text-orange-500">Cab</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <a href="/about" className="hover:text-blue-600 transition-colors">
            About
          </a>
          <a href="/contact" className="hover:text-blue-600 transition-colors">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

// Footer
const Footer = () => (
  <footer className="bg-gray-50 border-t mt-20">
    <div className="max-w-7xl mx-auto px-6 py-12 text-center text-gray-500">
      <div className="text-xl font-bold mb-6">
        <span className="text-blue-600">Motu</span>
        <span className="text-orange-500">Cab</span>
      </div>
      <div className="text-sm flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6">
        <a href="/" className="hover:text-blue-600 transition-colors">
          Home
        </a>
        <a href="/about" className="hover:text-blue-600 transition-colors">
          About Us
        </a>
        <a href="/contact" className="hover:text-blue-600 transition-colors">
          Contact
        </a>
      </div>
      <p className="text-xs">
        © {new Date().getFullYear()} MotuCab Technologies Pvt. Ltd. All Rights
        Reserved.
      </p>
    </div>
  </footer>
);

const FriendsAndFamilyPage = () => {
  const perks = [
    {
      icon: <Percent size={28} />,
      title: "Upto 20% Off Rides",
      desc: "Save more every time you travel, across all MotuCab services.",
    },
    {
      icon: <Gift size={28} />,
      title: "50% Off Premium Support",
      desc: "Enjoy our Concierge Program at half price for priority assistance.",
    },
    {
      icon: <Zap size={28} />,
      title: "Double Rewards",
      desc: "Earn 2X loyalty points and redeem faster on future rides.",
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Hassle-Free Cancellations",
      desc: "Get upgraded cancellation policies at no extra charge.",
    },
  ];

  return (
    <div className="bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white text-center py-28 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-10 left-20 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-10 right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse" />

        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Friends & Family by MotuCab
          </h1>
          <p className="mt-6 text-lg md:text-xl text-blue-100">
            Exclusive benefits, priority rides & rewards — just for our inner
            circle.
          </p>
        </motion.div>
      </section>

      {/* Intro Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Travel Like an Insider
            </h2>
            <p className="text-gray-600 leading-relaxed">
              At MotuCab, our riders are family. The Friends & Family program
              unlocks premium travel benefits for you and your loved ones —
              because journeys matter more when shared.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why Choose This
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Whether you ride daily, plan weekend trips, or book for parents
              and kids — MotuCab ensures more savings, more comfort, and more
              rewards with every ride.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <img
            src="https://images.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/exclusive_benefits.png"
            alt="Family enjoying travel"
            className="max-w-sm w-full h-auto rounded-2xl shadow-xl"
          />
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            className="text-3xl font-bold text-center text-gray-800 mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Your Exclusive Perks
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {perks.map((item, idx) => (
              <motion.div
                key={idx}
                className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
              >
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-full">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <motion.h2
          className="text-3xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Join the Inner Circle
        </motion.h2>
        <motion.div
          className="text-gray-600 space-y-4 text-base"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p>
            <span className="font-semibold">Step 1:</span> Get an invite from an
            existing MotuCab rider.
          </p>
          <p>
            <span className="font-semibold">Step 2:</span> Sign up or log in to
            your MotuCab account.
          </p>
          <p>
            <span className="font-semibold">Step 3:</span> Activate your Friends
            & Family benefits instantly.
          </p>
        </motion.div>
        <motion.button
          className="mt-10 px-12 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Join Now
        </motion.button>
      </section>

      <Footer />
    </div>
  );
};

export default FriendsAndFamilyPage;



