import { Link } from "react-router-dom";

import { Facebook, Instagram, Linkedin, CheckCircle } from "lucide-react";

export default function Footer() {
  const bottomLinks = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "About us", href: "/about" },
    { name: "Faq's", href: "/faqs" },
    { name: "Contact us", href: "/contact" },
    { name: "Careers", href: "/careers" },
    { name: "Terms and conditions", href: "/terms" },
    { name: "Disclaimer", href: "/disclaimer" },
    { name: "Privacy policy", href: "/privacy" },
    { name: "Sitemap", href: "/sitemap" },
    { name: "One way cabs", href: "/one-way" },
    { name: "Day-rental", href: "/day-rental" },
    { name: "Airport-transfers", href: "/airport" },
    { name: "Packages", href: "/packages" },
    { name: "Why Motu Cabs", href: "/why-motu" },
    { name: "News room", href: "/news" },
  ];

  return (
    <footer className="bg-white border-t">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Logo + Website */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold">
            <span className="text-blue-600">Motu</span>
            <span className="text-orange-500">Cab</span>
          </h1>
          <p className="text-gray-600">www.google.com</p>
          <div className="flex justify-center gap-4 mt-2">
            <Facebook className="w-5 h-5 text-blue-600 cursor-pointer" />
            <Instagram className="w-5 h-5 text-pink-500 cursor-pointer" />
            <Linkedin className="w-5 h-5 text-blue-500 cursor-pointer" />
            <CheckCircle className="w-5 h-5 text-green-500 cursor-pointer" />
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-3 text-sm text-gray-800 mb-6">
          <div className="space-y-2 text-left">
            <p>› Ask us to be official partner</p>
            <p>› Business travel</p>
            <p>› For startups</p>
          </div>
          <div className="space-y-2 text-center">
            <p>› Your travel desk</p>
            <p>› Join our agent network</p>
            <p>› Brand Partners</p>
          </div>
          <div className="space-y-2 text-right">
            <p>› Price guarantee</p>
            <p>› Double back</p>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4" />

        {/* Bottom Links */}
        <div className="text-center text-sm text-gray-700 flex flex-wrap justify-center gap-2">
          {bottomLinks.map((link, i) => (
            <a key={i} href={link.href} className="hover:underline">
              {link.name}
              {i !== bottomLinks.length - 1 && <span className="mx-1">|</span>}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-center text-gray-500 text-sm mt-3">
          © 2025 Motu Technologies Pvt. Ltd. All Rights Reserved.
        </p>
         <div className="mt-4 md:mt-0">
          <Link
            to="/sitemap"
            className="hover:underline hover:text-yellow-400 transition"
          >
            Sitemap
          </Link>
        </div>
      </div>
    </footer>
  );
}
