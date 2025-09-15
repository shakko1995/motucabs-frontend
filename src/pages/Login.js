

import React, { useState, useContext, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Login({ onClose }) {
  const { login } = useContext(AuthContext);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [step, setStep] = useState("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  const sendOtp = async () => {

    setError("");
    if (!/^[1-9][0-9]{9}$/.test(phone)) {
      setError("Please enter a valid mobile number without starting with '0' and provide your name.");
      return;
    }
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/auth/send-otp", { phone: `+91${phone}` });
      setStep("otp");
    } catch (err) {
      setError(err.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    const finalOtp = otp.join('');
    if (finalOtp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp", {
        phone: `+91${phone}`,
        otp: finalOtp,
        name,
        email: email || "",
      });



      login(res.data.token, res.data.user);

      alert("✅ Login Successful");


      if (onClose) {
        onClose();
      } else {
        window.location.href = "/";
      }

    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };


  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (

    <div className="max-w-md mx-auto p-6 bg-white rounded-3xl shadow-2xl">
      {/* ... Logo and other elements */}
      <div className="text-center mb-4">
        <h1 className="text-5xl font-extrabold">
          <span className="text-blue-600">Motu</span>
          <span className="text-orange-500">Cab</span>
        </h1>
      </div>

      <h3 className="text-center text-orange-500 text-lg font-semibold mb-6">
        Login Now To Book A City Ride!
      </h3>
      {step === 'phone' ? (
        // Phone input JSX
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 shadow-sm focus:ring-2 focus:ring-orange-400 outline-none transition"
          />
          <input
            type="email"
            placeholder="Enter Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 shadow-sm focus:ring-2 focus:ring-orange-400 outline-none transition"
          />
          <div className="flex border border-gray-300 rounded-xl shadow-sm overflow-hidden">
            <span className="px-4 flex items-center bg-gray-100 text-gray-700">+91</span>
            <input
              type="text"
              placeholder="Enter Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              maxLength={10}
              className="flex-1 p-3 outline-none"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            onClick={sendOtp}
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </div>
      ) : (
        // OTP input JSX
        <div className="space-y-4">
          <p className="text-center text-gray-600">
            Enter the 6-digit OTP sent to +91 {phone}
          </p>
          <div className="flex justify-center space-x-2">
            {otp.map((data, index) => {
              return (
                <input
                  key={index}
                  type="text"
                  value={data}
                  maxLength="1"
                  onChange={(e) => handleOtpChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onFocus={(e) => e.target.select()}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-12 h-14 text-center text-2xl font-semibold border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-400 outline-none transition"
                />
              );
            })}
          </div>
          {error && <p className="text-center text-red-500 text-sm">{error}</p>}
          <button
            onClick={verifyOtp}
            disabled={loading || otp.join('').length < 6}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
          <button
            onClick={() => { setStep("phone"); setError(""); setOtp(new Array(6).fill("")); }}
            className="text-center w-full text-sm text-blue-600 hover:underline"
          >
            Change Number?
          </button>
        </div>
      )}
    </div>
  );
}