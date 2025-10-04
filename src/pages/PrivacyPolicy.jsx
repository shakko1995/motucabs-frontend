import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner Section */}
      <div
        className="relative h-64 flex flex-col justify-center items-center text-white text-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-gray-200 text-sm md:text-base">
            Last updated: October 2025
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-8 mt-10 mb-16">
        {/* Back Button */}
        <div className="flex items-center gap-2 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft size={18} />
            <span className="ml-1 text-sm font-medium">Back</span>
          </button>
        </div>

        {/* Policy Content */}
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            At <b>MotuCab Technologies Private Limited</b> (“MotuCab”, “we”,
            “our”, or “us”), your privacy is extremely important to us. This
            Privacy Policy explains how we collect, use, disclose, and protect
            your information when you use our website{" "}
            <b>www.motucab.com</b> and mobile applications (collectively, the
            “Platform”).
          </p>

          <h2 className="text-2xl font-semibold text-blue-700 mt-8">
            1. Information We Collect
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <b>Personal Information:</b> Name, email, phone number, gender,
              address, and other contact details provided during registration or
              booking.
            </li>
            <li>
              <b>Booking Information:</b> Pickup and drop locations, date and
              time of travel, type of vehicle selected, and payment details.
            </li>
            <li>
              <b>Device Information:</b> IP address, browser type, operating
              system, and mobile device identifiers.
            </li>
            <li>
              <b>Location Information:</b> If you enable GPS or location access,
              we collect your real-time location to provide accurate pickup and
              drop services.
            </li>
            <li>
              <b>Communication Data:</b> Emails, chat messages, or customer
              support requests you send to us.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-blue-700 mt-8">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Process bookings and confirm cab reservations.</li>
            <li>Communicate booking updates, driver details, and trip alerts.</li>
            <li>
              Improve user experience, product design, and technical performance.
            </li>
            <li>
              Send promotional offers, deals, and service-related announcements
              (only with your consent).
            </li>
            <li>Prevent fraud, unauthorized transactions, or misuse of the app.</li>
            <li>Comply with legal and regulatory obligations.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-blue-700 mt-8">
            3. Cookies and Tracking Technologies
          </h2>
          <p>
            We use cookies and similar technologies to improve your browsing
            experience and analyze performance. You can disable cookies in your
            browser settings, but some features may not function properly.
          </p>

          <h2 className="text-2xl font-semibold text-blue-700 mt-8">
            4. Sharing and Disclosure of Information
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <b>Drivers and Partners:</b> To fulfill bookings and provide cab
              services.
            </li>
            <li>
              <b>Payment Gateways:</b> For secure payment processing.
            </li>
            <li>
              <b>Analytics Providers:</b> To analyze app performance and improve
              usability.
            </li>
            <li>
              <b>Legal Authorities:</b> As required by law or government request.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-blue-700 mt-8">
            5. Data Security
          </h2>
          <p>
            We implement strong security measures like encryption and firewalls to
            protect your data, but we cannot guarantee complete security over the
            Internet.
          </p>

          <h2 className="text-2xl font-semibold text-blue-700 mt-8">
            6. Data Retention
          </h2>
          <p>
            Your data is retained as long as needed for legitimate business or
            legal purposes. It is securely deleted or anonymized once no longer
            required.
          </p>

          <h2 className="text-2xl font-semibold text-blue-700 mt-8">
            7. Your Rights and Choices
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Access or update your account details anytime.</li>
            <li>
              Opt out of marketing communications by clicking “unsubscribe.”
            </li>
            <li>
              Request data deletion by emailing <b>privacy@motucab.com</b>.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-blue-700 mt-8">
            8. Children’s Privacy
          </h2>
          <p>
            We do not collect data from anyone under 18. If such data is found, it
            will be deleted immediately.
          </p>

          <h2 className="text-2xl font-semibold text-blue-700 mt-8">
            9. Third-Party Links
          </h2>
          <p>
            Our Platform may link to external sites. Please review their privacy
            policies before sharing any information.
          </p>

          <h2 className="text-2xl font-semibold text-blue-700 mt-8">
            10. Updates to This Policy
          </h2>
          <p>
            We may modify this policy periodically. Changes will be reflected with
            an updated “Last Updated” date and, if necessary, notified via email or
            app.
          </p>

          <h2 className="text-2xl font-semibold text-blue-700 mt-8">
            11. Consent
          </h2>
          <p>
            By using our services, you agree to this Privacy Policy and the
            collection and use of your data as described here.
          </p>

          <h2 className="text-2xl font-semibold text-blue-700 mt-8">
            12. Contact Us
          </h2>
          <p>
            For any questions, concerns, or complaints about this Privacy Policy,
            contact us:
          </p>
          <p className="font-medium">
            📧 Email: privacy@motucab.com <br />
            📍 Address: F - 210, UGF, Sushant Shopping Arcade, Sushant Lok
            Phase-I, Gurugram, Haryana - 122001
          </p>

          <p className="text-center text-gray-500 mt-10">
            © {new Date().getFullYear()} MotuCab Technologies Pvt. Ltd. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
