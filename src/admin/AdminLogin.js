// src/admin/AdminLogin.js
import { useState, useContext } from "react";
import axios from "axios";
import { AdminContext } from "../context/AdminContext";

export default function AdminLogin() {
  const { loginAdmin } = useContext(AdminContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });

      console.log("✅ Admin Login Success:", res.data);
      loginAdmin(res.data.token); // ✅ Save token in context + localStorage
      window.location.href = "/admin/dashboard"; // ✅ Redirect
    } catch (err) {
      console.error("❌ Admin Login Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <h2 className="text-xl font-bold text-center mb-4">Admin Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full rounded mb-3"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full rounded mb-3"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white w-full p-2 rounded"
      >
        Login
      </button>
    </div>
  );
}
