import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState(""); // Name field
  const [email, setEmail] = useState(""); // Optional email
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    if (!otp) return setError("Enter OTP");
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp", {
        phone: `+91${phone}`,
        otp,
        name,
        email: email || "",
      });
      login(res.data.token);
      alert("✅ Login Successful");
      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-3xl shadow-2xl mt-6">
      {/* Large MotuCab Logo Text */}
      <div className="text-center mb-4">
        <h1 className="text-5xl font-extrabold">
          <span className="text-blue-600">Motu</span>
          <span className="text-orange-500">Cab</span>
        </h1>
      </div>

      {/* Sub Text */}
      <h3 className="text-center text-orange-500 text-lg font-semibold mb-6">
        Login Now To Book A City Ride!
      </h3>

      {/* Login / Signup Form */}
      {step === "phone" ? (
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
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 shadow-sm focus:ring-2 focus:ring-green-400 outline-none transition"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            onClick={verifyOtp}
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      )}
    </div>
  );
}
