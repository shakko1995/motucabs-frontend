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
      title: "Up to 20% Discount on All Motu Services",
      desc: "Get up to 20% off every time you ride with Motu Cabs — no promo codes required. Just sign in and enjoy the savings.",
    },
    {
      icon: <Gift size={28} />,
      title: "50% Off Motu Concierge Membership",
      desc: "Our premium concierge plan, usually ₹1500/month, is yours for only ₹750. Get dedicated travel assistance and priority support.",
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Free Upgrade on Cancellation Policies",
      desc: "Enjoy complimentary upgrades on cancellation terms — travel freely without worry.",
    },
    {
      icon: <Zap size={28} />,
      title: "Double Motu Points",
      desc: "Earn 2× Motu Points on every ride and get rewarded faster with exclusive perks and surprises.",
    },
  ];

  return (
    <div className="bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white text-center py-28 overflow-hidden">
        <div className="absolute top-10 left-20 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-10 right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse" />

        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Motu Friends & Family
          </h1>
          <p className="mt-6 text-lg md:text-xl text-blue-100">
            Once a Motu, Always a Motu — because family deserves the best ride.
          </p>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <motion.h2
          className="text-3xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          The Spirit of Motu Cabs
        </motion.h2>
        <motion.p
          className="text-gray-600 text-lg leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          The spirit of Motu Cabs lives in our people. Our Motus are the heart
          of everything we do — and without them, there’s no Motu. Our
          dedication to providing a smooth, reliable, and personalized travel
          experience goes beyond our riders. If you’re related to or connected
          with a current or former Motu, you’re automatically part of our
          extended Motu family. And family always gets VIP treatment!
        </motion.p>
      </section>

      {/* Welcome Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl font-bold text-gray-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Welcome to the Motu Family
          </motion.h2>
          <motion.p
            className="text-gray-600 text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            At Motu Cabs, we believe great rides are better when shared with
            those who matter most. That’s why we’ve launched the Motu Friends &
            Family Program — a special initiative designed exclusively for
            friends and family of our Motus. As a valued member, you’ll enjoy
            the same premium perks and recognition as our Motu community.
          </motion.p>
        </div>
      </section>

      {/* Exclusive Benefits Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.h2
          className="text-3xl font-bold text-center text-gray-800 mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Exclusive Benefits for Motu Friends & Family
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
      </section>

      {/* How to Join Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl font-bold text-gray-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            How to Join the Motu Friends & Family Program
          </motion.h2>

          <motion.div
            className="text-gray-600 space-y-4 text-base"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p>
              <span className="font-semibold">Step 1:</span> Get an invite from
              a current or former Motu. Don’t have one yet? Reach out to someone
              in the Motu network!
            </p>
            <p>
              <span className="font-semibold">Step 2:</span> Create your profile
              by signing up or logging in to your Motu account.
            </p>
            <p>
              <span className="font-semibold">Step 3:</span> Activate your
              Friends & Family benefits once your account is verified and linked
              to a Motu.
            </p>
          </motion.div>

          <motion.button
            className="mt-10 px-12 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Join Now
          </motion.button>

          <motion.p
            className="mt-10 text-gray-600 text-base leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            And that’s it! You’re now an official member of the Motu Friends &
            Family Program — ready to ride, save, and enjoy the same trusted
            experience that our Motu community loves.
          </motion.p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FriendsAndFamilyPage;
