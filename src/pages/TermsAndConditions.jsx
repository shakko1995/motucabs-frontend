import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Banner Section */}
      <div
        className="relative h-64 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-blue-900 bg-opacity-70"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Terms and Conditions
          </h1>
          <p className="text-lg opacity-90">Last updated September 1, 2023</p>
        </div>
      </div>

      {/* ✅ Content Section */}
      <div className="max-w-5xl mx-auto px-6 py-12 bg-white shadow-sm rounded-lg mt-8 mb-12">
        <p className="text-gray-700 mb-6">
          Thanks for using our products and services ("Services"). The Services
          are provided by <strong>Gozo Technologies Private Limited</strong>{" "}
          (hereinafter referred to as "Gozo" or "Gozocabs"), with our office
          located at F - 210, UGF, Sushant Shopping Arcade, Sushant Lok
          Phase-I, Gurugram, Haryana-122001.
        </p>

        <p className="text-gray-700 mb-6">
          Please read these terms carefully. By using our services, you are
          agreeing to all terms & conditions set forth.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Definitions</h2>
        <p className="text-gray-700 mb-6">
          Gozocabs or Gozo is a technology company that makes available a
          platform for matchmaking consumers seeking travel services with
          providers who deliver such travel services. The services are delivered
          by independent providers and Gozo acts as a marketplace platform.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Electronic Communications
        </h2>
        <p className="text-gray-700 mb-6">
          When you use the Gozo Platform or send communications electronically,
          you consent to receive communications from us electronically. You
          agree that such electronic communications satisfy any legal
          requirement that such communications be in writing.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Using Our Services
        </h2>
        <p className="text-gray-700 mb-6">
          Using our Services does not give you ownership of any intellectual
          property rights in our Services or the content that you access. You
          may not use content from our Services unless you obtain permission
          from its owner or are otherwise permitted by law.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Security Advisories</h2>
        <p className="text-gray-700 mb-6">
          We take customer and driver safety seriously. Pickup and drop-off
          points must be valid and safe locations. The driver reserves the right
          to refuse unsafe pickups.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Our Platform and Its Contents
        </h2>
        <p className="text-gray-700 mb-6">
          The content on our platform is for general information only and is
          subject to change. We exclude liability for inaccuracies or errors to
          the fullest extent permitted by law.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Your Gozo Account</h2>
        <p className="text-gray-700 mb-6">
          You are responsible for maintaining the confidentiality of your Gozo
          account and password. Notify us immediately of any unauthorized use of
          your account.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Privacy and Copyright Protection
        </h2>
        <p className="text-gray-700 mb-6">
          Gozo’s Privacy Policy explains how we treat your personal data and
          protect your privacy when you use our Services. Content on our website
          is copyrighted by Gozo Cabs and may not be reproduced without consent.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Cancellation & Refund Policy</h2>
        <p className="text-gray-700 mb-6">
          You may cancel your booking any time before your scheduled pickup.
          Free cancellation applies only during the “Free Cancellation Period”.
          Once it ends, applicable cancellation charges shall apply.
        </p>
        <p className="text-gray-700 mb-6">
          Refunds are processed within 21 days from the date of request and are
          limited to the amount paid to us in advance for the booking.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Force Majeure</h2>
        <p className="text-gray-700 mb-6">
          Gozo shall not be liable for failure or delay in performance due to
          causes beyond its reasonable control, including natural disasters,
          war, strikes, terrorism, or government actions.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Modifying and Terminating Our Services
        </h2>
        <p className="text-gray-700 mb-6">
          We may add or remove features, or suspend our services at any time.
          You can stop using our services anytime. Changes made for legal or new
          feature reasons will be effective immediately.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          About These Terms
        </h2>
        <p className="text-gray-700 mb-6">
          These terms are governed by the laws of India. Any disputes will be
          referred to arbitration. Gozo reserves the right to modify these terms
          at any time. Continued use of the service indicates acceptance of the
          modified terms.
        </p>

        <p className="text-gray-700 mt-10">
          For more information, please visit our website or contact us directly.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
