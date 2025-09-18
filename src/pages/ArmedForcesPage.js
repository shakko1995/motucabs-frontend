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

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
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

        {/* Only Login Button */}
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
        <a href="/terms" className="hover:text-gray-900">Terms</a>
        <a href="/privacy" className="hover:text-gray-900">Privacy</a>
        <a href="/contact" className="hover:text-gray-900">Contact</a>
      </div>
    </div>
  </footer>
);

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
        <text
          x="20"
          y="170"
          fontSize="14"
          fill="#475569"
          fontWeight="600"
        >
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
      title: "10% discount on rides",
      subtitle: "Automatic savings on every trip — no code required.",
      icon: <Percent size={20} className="text-white" />,
      color: "from-sky-500 to-sky-600",
    },
    {
      id: "concierge",
      title: "50% off concierge",
      subtitle: "Premium support for planning & priority assistance.",
      icon: <Gift size={20} className="text-white" />,
      color: "from-amber-400 to-amber-500",
    },
    {
      id: "rewards",
      title: "Double reward points",
      subtitle: "Earn faster and redeem on future rides.",
      icon: <Zap size={20} className="text-white" />,
      color: "from-emerald-400 to-emerald-500",
    },
    {
      id: "support",
      title: "Priority support",
      subtitle: "Dedicated support channel for members.",
      icon: <ShieldCheck size={20} className="text-white" />,
      color: "from-indigo-500 to-indigo-600",
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
                MotuCab — Armed Forces Program (2025)
              </h1>
              <p className="mt-5 text-lg text-slate-600">
                Honoring our heroes with meaningful benefits: safer rides,
                faster support, and rewards designed for you and your family.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate("/login")}
                  className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-5 py-3 text-white font-semibold shadow hover:bg-sky-700 transition"
                >
                  Join the Program
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-slate-700 bg-white border border-gray-200 shadow-sm hover:shadow-md transition"
                >
                  Learn how it works
                </button>
              </div>
            </div>

            {/* Illustration card */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <InlineHeroSVG />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-semibold text-slate-900 text-center">
            Benefits for Armed Forces Members
          </h2>
          <p className="mt-3 text-center text-slate-600 max-w-2xl mx-auto">
            Designed with practicality and respect — tangible savings, faster
            support and rewards that matter.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
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
              How to join — 3 simple steps
            </h2>
            <p className="mt-2 text-slate-600">
              Quick verification and instant benefits
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Create profile",
                  desc: "Sign up or sign in to your MotuCab account.",
                  icon: <UserPlus size={20} />,
                },
                {
                  step: "2",
                  title: "Verify ID",
                  desc: "Upload your Armed Forces ID securely.",
                  icon: <UploadCloud size={20} />,
                },
                {
                  step: "3",
                  title: "Unlock benefits",
                  desc: "Approval activates discounts & rewards instantly.",
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
                      <div className="font-semibold text-slate-900">
                        {s.title}
                      </div>
                      <div className="text-sm text-slate-600 mt-1">
                        {s.desc}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

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

        {/* MOBILE STICKY CTA */}
        <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between gap-4 bg-sky-600 text-white rounded-xl px-4 py-3 shadow-lg">
              <div>
                <div className="text-sm font-medium">
                  Armed Forces Program
                </div>
                <div className="text-xs opacity-90">
                  Join now — benefits applied instantly
                </div>
              </div>
              <div>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-white text-sky-600 px-4 py-2 rounded-md font-semibold"
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArmedForcesPage;
