import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Percent,
  Gift,
  Zap,
  UserPlus,
  UploadCloud,
  CheckCircle,
} from "lucide-react";

// HEADER
const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          aria-label="Go to homepage"
          className="flex items-center gap-2"
        >
          <div className="text-2xl font-extrabold tracking-tight">
            <span className="text-sky-600">Motu</span>
            <span className="text-amber-500">Cab</span>
          </div>
        </button>
        <button
          onClick={() => navigate("/login")}
          className="px-5 py-2 rounded-lg bg-sky-600 text-white font-semibold shadow hover:bg-sky-700 transition"
        >
          Login
        </button>
      </div>
    </header>
  );
};

// FOOTER
const Footer = () => (
  <footer className="bg-white border-t mt-24">
    <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-500">
      <div className="flex items-center gap-3">
        <div className="text-lg font-semibold">
          <span className="text-sky-600">Motu</span>
          <span className="text-amber-500">Cab</span>
        </div>
        <span className="hidden md:inline">— Trusted urban mobility</span>
      </div>
      <div className="flex gap-6">
        <a href="/terms" className="hover:text-gray-900">
          Terms
        </a>
        <a href="/privacy" className="hover:text-gray-900">
          Privacy
        </a>
        <a href="/contact" className="hover:text-gray-900">
          Contact
        </a>
      </div>
    </div>
  </footer>
);

// HERO ILLUSTRATION
const InlineHeroSVG = ({ className = "w-full h-full" }) => (
  <svg
    viewBox="0 0 600 420"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="g1" x1="0" x2="1">
        <stop offset="0" stopColor="#60a5fa" />
        <stop offset="1" stopColor="#fb923c" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" rx="18" fill="#ffffff" />
    <g transform="translate(18,18)">
      <rect x="0" y="0" width="564" height="384" rx="14" fill="#f8fafc" />
      <g transform="translate(28,36)">
        <path
          d="M0 120 C80 20, 260 220, 360 120 C420 60, 520 180, 540 120 L540 240 L0 240 Z"
          fill="url(#g1)"
          opacity="0.18"
        />
        <text
          x="20"
          y="120"
          fontFamily="Inter, system-ui, -apple-system"
          fontWeight="800"
          fontSize="86"
          fill="#0f172a"
        >
          2025
        </text>
        <text x="20" y="170" fontSize="14" fill="#475569" fontWeight="600">
          Armed Forces Benefits
        </text>
      </g>
    </g>
  </svg>
);

const ArmedForcesPage = () => {
  const navigate = useNavigate();

  const perks = [
    {
      id: "discount",
      title: "10% Discount on All Motu Cabs Rides",
      subtitle:
        "No promo code required! Simply sign in to your Motu account and enjoy 10% off every ride—every time.",
      icon: <Percent size={20} className="text-white" />,
      color: "from-sky-500 to-sky-600",
    },
    {
      id: "concierge",
      title: "50% Off Motu Concierge Membership",
      subtitle:
        "Enjoy our premium Motu Concierge Service at just ₹750/month (regularly ₹1500). Dedicated travel assistance, priority bookings, and personalized ride support.",
      icon: <Gift size={20} className="text-white" />,
      color: "from-amber-400 to-amber-500",
    },
    {
      id: "cancellation",
      title: "Complimentary Upgrade on Cancellation Policies",
      subtitle:
        "Travel flexibility matters. Enjoy an upgraded cancellation policy at no extra cost for peace of mind.",
      icon: <ShieldCheck size={20} className="text-white" />,
      color: "from-indigo-500 to-indigo-600",
    },
    {
      id: "points",
      title: "Double Motu Points on Every Ride",
      subtitle:
        "Earn 2x Motu Points on all rides and redeem them faster for exclusive rewards, offers, and ride credits.",
      icon: <Zap size={20} className="text-white" />,
      color: "from-emerald-400 to-emerald-500",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* HERO */}
      <main>
        <section className="bg-gradient-to-b from-sky-50 to-white border-b">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900">
                Motu Community — Honoring Our Armed Forces, Veterans & Families
              </h1>
              <p className="mt-5 text-lg text-slate-600">
                At Motu Cabs, we hold immense respect for the bravery and
                dedication of our Armed Forces, Veterans, and their families.
                Your courage, commitment, and sacrifices inspire us every day.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate("/login")}
                  className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-5 py-3 text-white font-semibold shadow hover:bg-sky-700 transition"
                >
                  Join the Program
                </button>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <InlineHeroSVG />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OUR SALUTE */}
        <section className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            Our Salute to Your Service
          </h2>
          <p className="text-slate-600">
            To every soldier, veteran, and family member — thank you. Your
            strength and selflessness make our country stronger, and we’re
            honored to serve you in return. Through the Motu Community Program,
            we offer special privileges to make your journeys more affordable,
            flexible, and rewarding.
          </p>
        </section>

        {/* BENEFITS */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-semibold text-slate-900 text-center mb-3">
            Exclusive Benefits for Armed Forces, Veterans & Their Families
          </h2>
          <p className="text-center text-slate-600 mb-10 max-w-2xl mx-auto">
            As a part of the Motu Community, you’ll receive these perks:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {perks.map((p) => (
              <article
                key={p.id}
                className="flex items-start gap-4 bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1"
              >
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${p.color} flex-shrink-0`}
                >
                  {p.icon}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">{p.subtitle}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* HOW TO JOIN */}
        <section className="bg-slate-50 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-semibold text-slate-900">
              How to Join the Motu Community Program
            </h2>
            <p className="mt-2 text-slate-600">
              Quick verification and instant benefits
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Create or Log In to Your Motu Profile",
                  desc: "Sign up or log in using your existing Motu Cabs account.",
                  icon: <UserPlus size={20} />,
                },
                {
                  step: "2",
                  title: "Verify Your Identity",
                  desc: "Upload your Armed Forces ID or Family Member ID to confirm your eligibility.",
                  icon: <UploadCloud size={20} />,
                },
                {
                  step: "3",
                  title: "Activate Your Benefits",
                  desc: "Once verified, your exclusive perks will automatically be applied to your account.",
                  icon: <CheckCircle size={20} />,
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-sky-500 to-amber-400 flex items-center justify-center text-white font-bold">
                      {s.step}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-slate-900">{s.title}</div>
                      <div className="text-sm text-slate-600 mt-1">{s.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 font-bold">Thank you for your service. Jai Hind!</p>

            <div className="mt-10">
              <button
                onClick={() => navigate("/login")}
                className="inline-flex items-center gap-3 rounded-lg bg-sky-600 px-6 py-3 text-white font-semibold shadow hover:bg-sky-700 transition"
              >
                Verify & Join
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ArmedForcesPage;
