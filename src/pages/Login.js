import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("phone");
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    if (!phone) return alert("Enter phone number");
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/auth/send-otp", { phone });
      setStep("otp");
    } catch (err) {
      alert(err.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) return alert("Enter OTP");
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp", { phone, otp });
      login(res.data.token);
      alert("✅ Login Successful");
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <h2 className="text-xl font-bold text-center mb-4">Login / Signup</h2>

      {step === "phone" ? (
        <>
          <input
            type="text"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 w-full rounded mb-3"
          />
          <button
            onClick={sendOtp}
            disabled={loading}
            className="bg-blue-600 text-white w-full p-2 rounded"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border p-2 w-full rounded mb-3"
          />
          <button
            onClick={verifyOtp}
            disabled={loading}
            className="bg-green-600 text-white w-full p-2 rounded"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </>
      )}
    </div>
  );
}
